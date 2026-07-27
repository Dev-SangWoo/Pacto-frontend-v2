"use client";

import { useQuery } from "@tanstack/react-query";

import type { Mission } from "@pacto/types";

import { getWalletPageDataAction } from "../_actions/blogger-actions";
import { walletPageQueryKey } from "./blogger-query-provider";
import { MainTabLoading } from "./main-tab-loading";
import { WalletLedger, type WalletLedgerItem } from "./wallet-ledger";
import { WalletSummary } from "./wallet-summary";

export function WalletPageClient() {
  const walletQuery = useQuery({
    queryFn: getWalletPageDataAction,
    queryKey: walletPageQueryKey,
  });

  if (walletQuery.data == null) {
    if (walletQuery.isError) {
      return (
        <section className="campaign-discovery-empty query-load-error" role="alert">
          <strong>지갑 정보를 불러오지 못했어요.</strong>
          <p>네트워크 상태를 확인한 뒤 다시 시도해 주세요.</p>
          <button onClick={() => void walletQuery.refetch()} type="button">
            다시 불러오기
          </button>
        </section>
      );
    }

    return <MainTabLoading />;
  }

  const { missions, pointHistories, wallet } = walletQuery.data;
  const missionByEscrowId = new Map(missions.map((mission) => [mission.escrowId, mission]));
  const pendingMissionItems = getPendingMissionItems(missions);
  const historyLedgerItems = pointHistories.map((history) => {
    const mission = missionByEscrowId.get(history.referenceId);
    const isWithdrawal = history.amount < 0;
    let category: WalletLedgerItem["category"] = "charge";
    let detail = isWithdrawal ? "차감" : "적립";
    let headline = "포인트 변동";
    let tone: WalletLedgerItem["tone"] = isWithdrawal ? "red" : "green";
    let type: WalletLedgerItem["type"] = isWithdrawal ? "withdrawal" : "deposit";
    const campaignTitle = history.campaignTitle ?? mission?.campaignTitle;

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
    <section
      className="screen-stack detail-screen mobile-system-page wallet-system-page"
      aria-labelledby="wallet-title"
    >
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
          className={`primary-button withdrawal-button ${wallet.availableBalance === 0 ? "disabled" : ""}`}
          href="/withdrawals"
        >
          출금 신청하기
        </a>
      </div>
    </section>
  );
}

function getPendingMissionItems(missions: Mission[]): WalletLedgerItem[] {
  return missions
    .filter((mission) => mission.status === "in_progress" || mission.status === "submitted")
    .map((mission) => ({
      amount: mission.rewardPoint,
      campaignId: mission.campaignId,
      category: "locked",
      date: mission.dueDate,
      detail: mission.status === "submitted" ? "광고주 검수 대기" : "리뷰 등록 대기",
      headline: mission.campaignTitle,
      id: `mission-${mission.id}`,
      tone: mission.status === "submitted" ? "blue" : "grey",
      type: "locked",
    }));
}
