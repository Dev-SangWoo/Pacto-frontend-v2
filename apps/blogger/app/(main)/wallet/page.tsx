import { getCampaignDetail, getMyMissions, getMyPointHistories, getMyWallet } from "@pacto/api";
import type { Campaign, Mission, PointHistory, Wallet } from "@pacto/types";
import { redirect } from "next/navigation";

import { WalletLedger, type WalletLedgerItem } from "../../_components/wallet-ledger";
import { WalletSummary } from "../../_components/wallet-summary";
import { fallbackOnNonAuthError } from "../../_lib/auth-error";
import { getBloggerSession } from "../../_lib/session";

export default async function WalletPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const fallbackWallet: Wallet = {
    availableBalance: 0,
    id: 0,
    lockedBalance: 0,
    updatedAt: new Date().toISOString(),
  };
  const [wallet, pointHistories] = await Promise.all([
    getMyWallet(session.accessToken).catch((error: unknown) =>
      fallbackOnNonAuthError(error, fallbackWallet),
    ),
    getMyPointHistories({}, session.accessToken).catch((error: unknown) =>
      fallbackOnNonAuthError<PointHistory[]>(error, []),
    ),
  ]);
  const missions = await getMyMissions({}, session.accessToken).catch((error: unknown) =>
    fallbackOnNonAuthError<Mission[]>(error, []),
  );
  const campaignMap = await getCampaignMap(missions, session.accessToken);
  const missionByEscrowId = new Map(missions.map((mission) => [mission.escrowId, mission]));
  const pendingMissionItems = missions
    .filter((mission) => mission.status === "in_progress" || mission.status === "submitted")
    .map((mission) => {
      const campaign = campaignMap.get(mission.campaignId);

      return {
        amount: mission.rewardPoint,
        campaignId: mission.campaignId,
        category: "locked",
        date: mission.dueDate,
        detail: mission.status === "submitted" ? "광고주 검수 대기" : "리뷰 등록 대기",
        headline: campaign?.title ?? mission.campaignTitle,
        id: `mission-${mission.id}`,
        tone: mission.status === "submitted" ? "blue" : "grey",
        type: "locked",
      } satisfies WalletLedgerItem;
    });
  const historyLedgerItems = pointHistories.map((history) => {
    const mission = missionByEscrowId.get(history.referenceId);
    const campaign = mission == null ? undefined : campaignMap.get(mission.campaignId);
    const isWithdrawal = history.amount < 0;
    let category: WalletLedgerItem["category"] = "charge";
    let detail = isWithdrawal ? "차감" : "적립";
    let headline = "포인트 변동";
    let tone: WalletLedgerItem["tone"] = isWithdrawal ? "red" : "green";
    let type: WalletLedgerItem["type"] = isWithdrawal ? "withdrawal" : "deposit";
    const campaignTitle = history.campaignTitle ?? campaign?.title ?? mission?.campaignTitle;

    switch (history.type) {
      case "CHARGE":
        category = "charge";
        detail = "결제 충전";
        headline = "포인트 충전";
        tone = "green";
        type = "deposit";
        break;
      case "WITHDRAW":
        category = "withdrawal";
        detail = "계좌 출금 신청";
        headline = "출금 신청";
        tone = "red";
        type = "withdrawal";
        break;
      case "LOCK":
        category = "locked";
        detail = "에스크로 잠금";
        headline = campaignTitle ?? `광고주 에스크로 #${history.referenceId}`;
        tone = "red";
        type = "locked";
        break;
      case "RELEASE":
        category = "settlement";
        detail = "미션 정산";
        headline = campaignTitle ?? `미션 정산 #${history.referenceId}`;
        tone = "green";
        type = "deposit";
        break;
      case "REFUND":
        category = "refund";
        detail = "취소/반려 환불";
        headline = campaignTitle ?? `환불 #${history.referenceId}`;
        tone = "green";
        type = "deposit";
        break;
    }

    return {
      amount: history.amount,
      campaignId: history.campaignId ?? mission?.campaignId,
      category,
      date: history.createdAt,
      detail,
      headline,
      id: `history-${history.id}`,
      tone,
      type,
    } satisfies WalletLedgerItem;
  });
  const ledgerItems = [...pendingMissionItems, ...historyLedgerItems].sort(
    (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
  const latestSettlement = ledgerItems.find((item) => item.category === "settlement");
  const lockedItems = ledgerItems.filter((item) => item.category === "locked");
  const pendingMissionAmount = pendingMissionItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="wallet-title">
      <WalletSummary
        availableBalance={wallet.availableBalance}
        latestSettlement={latestSettlement}
        lockedBalance={wallet.lockedBalance + pendingMissionAmount}
        lockedItems={lockedItems}
        updatedAt={wallet.updatedAt}
      />

      <section className="section-block" aria-labelledby="ledger-title">
        <div className="section-head">
          <div>
            <p className="section-label">입금 · 출금 내역</p>
            <h2 id="ledger-title">거래 내역</h2>
          </div>
          <span>{ledgerItems.length}건</span>
        </div>
        <WalletLedger items={ledgerItems} />
      </section>

      <div className="fixed-cta">
        <a
          aria-disabled={wallet.availableBalance === 0}
          className={`primary-button ${wallet.availableBalance === 0 ? "disabled" : ""}`}
          href="/withdrawals"
        >
          출금 신청하기
        </a>
      </div>
    </section>
  );
}

async function getCampaignMap(missions: Mission[], token?: string): Promise<Map<number, Campaign>> {
  const campaignIds = Array.from(
    new Set(missions.map((mission) => mission.campaignId).filter((id) => id > 0)),
  );
  const campaigns = await Promise.all(
    campaignIds.map((campaignId) => getCampaignDetail(campaignId, token).catch(() => undefined)),
  );

  return new Map(
    campaigns
      .filter((campaign): campaign is Campaign => campaign != null)
      .map((campaign) => [campaign.id, campaign]),
  );
}
