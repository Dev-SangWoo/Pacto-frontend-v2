import { getCampaigns, getMyEscrows, getMyWallet } from "@pacto/api";
import { formatKoreanDate, formatPoint, getSettlementStatusView } from "@pacto/utils";

import { getBloggerSession } from "../../_lib/session";

type WalletLedgerItem = {
  amount: number;
  date: string;
  description: string;
  id: string;
  title: string;
  tone: "blue" | "green" | "grey" | "red";
  type: "deposit" | "withdrawal" | "locked";
};

const withdrawalHistory: WalletLedgerItem[] = [
  {
    amount: -30000,
    date: "2026-05-24T14:20:00",
    description: "국민은행 1234로 출금",
    id: "withdrawal-20260524",
    title: "출금 완료",
    tone: "grey",
    type: "withdrawal",
  },
  {
    amount: -20000,
    date: "2026-05-18T11:00:00",
    description: "카카오뱅크 9876으로 출금",
    id: "withdrawal-20260518",
    title: "출금 완료",
    tone: "grey",
    type: "withdrawal",
  },
];

export default async function WalletPage() {
  const session = await getBloggerSession();
  const [wallet, escrows, campaigns] = await Promise.all([
    getMyWallet(session.accessToken),
    getMyEscrows(),
    getCampaigns(),
  ]);
  const campaignTitleById = new Map(campaigns.map((campaign) => [campaign.id, campaign.title]));
  const ledgerItems: WalletLedgerItem[] = [
    ...escrows.map((escrow) => {
      const statusView = getSettlementStatusView(escrow.status);
      const campaignTitle =
        campaignTitleById.get(escrow.campaignId) ?? `캠페인 #${escrow.campaignId}`;
      const isPaid = escrow.status === "paid";

      return {
        amount: escrow.amount,
        date: escrow.createdAt,
        description: isPaid ? "정산 입금" : statusView.label,
        id: `escrow-${escrow.id}`,
        title: campaignTitle,
        tone: statusView.tone,
        type: isPaid ? "deposit" : "locked",
      } satisfies WalletLedgerItem;
    }),
    ...withdrawalHistory,
  ].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

  return (
    <section className="screen-stack detail-screen" aria-labelledby="wallet-title">
      <section className="wallet-brief">
        <p className="section-label">내 지갑</p>
        <h1 id="wallet-title">성과 정산</h1>
        <p>{formatKoreanDate(wallet.updatedAt)} 기준</p>
      </section>

      <section className="wallet-balance-grid" aria-label="지갑 잔액">
        <article className="wallet-balance-card primary">
          <span>출금할 수 있는 돈</span>
          <strong>{formatPoint(wallet.availableBalance)}</strong>
          <p>정산이 끝나 바로 출금 가능한 금액</p>
        </article>
        <article className="wallet-balance-card">
          <span>잠겨있는 돈</span>
          <strong>{formatPoint(wallet.lockedBalance)}</strong>
          <p>검수 또는 정산 대기 중인 금액</p>
        </article>
      </section>

      <section className="section-block" aria-labelledby="ledger-title">
        <div className="section-head">
          <div>
            <p className="section-label">입금 · 출금 내역</p>
            <h2 id="ledger-title">거래 내역</h2>
          </div>
          <span>{ledgerItems.length}건</span>
        </div>
        <div className="ledger-list wallet-ledger-list">
          {ledgerItems.map((item) => (
            <article key={item.id}>
              <div>
                <span className={`status-dot ${item.tone}`} aria-hidden="true" />
                <div>
                  <strong>{item.title}</strong>
                  <p>
                    {getLedgerTypeLabel(item.type)} · {formatKoreanDate(item.date)} ·{" "}
                    {item.description}
                  </p>
                </div>
              </div>
              <strong className={item.amount < 0 ? "negative" : "positive"}>
                {item.amount < 0 ? "-" : "+"}
                {formatPoint(Math.abs(item.amount))}
              </strong>
            </article>
          ))}
        </div>
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

function getLedgerTypeLabel(type: WalletLedgerItem["type"]) {
  switch (type) {
    case "deposit":
      return "입금";
    case "withdrawal":
      return "출금";
    case "locked":
      return "잠김";
  }
}
