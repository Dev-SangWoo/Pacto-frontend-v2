import { getMyPointHistories, getMyWallet } from "@pacto/api";
import { formatKoreanDate, formatPoint } from "@pacto/utils";
import { redirect } from "next/navigation";

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

export default async function WalletPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const [wallet, pointHistories] = await Promise.all([
    getMyWallet(session.accessToken).catch(() => redirect("/login")),
    getMyPointHistories({}, session.accessToken).catch(() => []),
  ]);
  const ledgerItems = pointHistories
    .map((history) => {
      const isWithdrawal = history.amount < 0;
      let title = "포인트 변동";
      let tone: WalletLedgerItem["tone"] = isWithdrawal ? "red" : "green";
      let type: WalletLedgerItem["type"] = isWithdrawal ? "withdrawal" : "deposit";

      switch (history.type) {
        case "CHARGE":
          title = "포인트 충전";
          tone = "green";
          type = "deposit";
          break;
        case "WITHDRAW":
          title = "출금 신청";
          tone = "red";
          type = "withdrawal";
          break;
        case "LOCK":
          title = "에스크로 잠금";
          tone = "red";
          type = "locked";
          break;
        case "RELEASE":
          title = "정산 입금";
          tone = "green";
          type = "deposit";
          break;
        case "REFUND":
          title = "환불 입금";
          tone = "green";
          type = "deposit";
          break;
      }

      return {
        amount: history.amount,
        date: history.createdAt,
        description: getPointHistoryDescription(history.type, isWithdrawal),
        id: `history-${history.id}`,
        title,
        tone,
        type,
      } satisfies WalletLedgerItem;
    })
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

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
          {ledgerItems.length > 0 ? (
            ledgerItems.map((item) => (
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
            ))
          ) : (
            <div className="empty-ledger">
              <p>거래 내역이 아직 없습니다.</p>
            </div>
          )}
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

function getPointHistoryDescription(type: string, isWithdrawal: boolean) {
  switch (type) {
    case "CHARGE":
      return "결제 충전";
    case "WITHDRAW":
      return "계좌 출금 신청";
    case "LOCK":
      return "캠페인 참여 예치";
    case "RELEASE":
      return "미션 완료 정산";
    case "REFUND":
      return "취소/반려 환불";
    default:
      return isWithdrawal ? "차감" : "적립";
  }
}
