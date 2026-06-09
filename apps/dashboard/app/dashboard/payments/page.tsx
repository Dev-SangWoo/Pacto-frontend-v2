import { getMyPointHistories, getMyWallet } from "@pacto/api";
import { formatKoreanDate, formatPoint } from "@pacto/utils";

import { getDashboardSession } from "../../_lib/session";
import { ChargePanel } from "./_components/charge-panel";
import { WithdrawPanel } from "./_components/withdraw-panel";

export default async function PaymentsPage() {
  const session = await getDashboardSession();
  const [wallet, histories] = await Promise.all([
    getMyWallet(session.accessToken, { mockFallback: true }),
    getMyPointHistories({ page: 1, size: 10 }, session.accessToken, { mockFallback: true }),
  ]);

  return (
    <>
      <header className="topbar topbar-pro">
        <div>
          <p className="eyebrow">Payments</p>
          <h1>결제 및 정산</h1>
          <p className="topbar-copy">지갑 잔액을 확인하고 포인트를 충전하거나 수익을 출금합니다.</p>
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card emphasis">
          <p>사용 가능 잔액</p>
          <strong>{formatPoint(wallet.availableBalance)}</strong>
          <span>{formatKoreanDate(wallet.updatedAt)} 업데이트</span>
        </article>
        <article className="summary-card">
          <p>에스크로 잠금</p>
          <strong>{formatPoint(wallet.lockedBalance)}</strong>
          <span>캠페인 미션 정산 대기</span>
        </article>
        <article className="summary-card">
          <p>누적 수익/결제</p>
          <strong>{formatPoint(wallet.totalEarned)}</strong>
          <span>전체 거래 흐름 기준</span>
        </article>
      </section>

      <section className="content-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <ChargePanel buyerEmail={session.email} />
          <WithdrawPanel
            accessToken={session.accessToken}
            availableBalance={wallet.availableBalance}
          />
        </div>
        <aside className="panel">
          <div className="panel-heading compact">
            <h2>최근 포인트 내역</h2>
          </div>
          {histories.length > 0 ? (
            <div className="compact-list">
              {histories.map((history) => (
                <div key={history.id}>
                  <span>{getPointHistoryLabel(history.type)}</span>
                  <strong>{formatPoint(history.amount)}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="panel-body">
              <p>아직 표시할 포인트 내역이 없어요.</p>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}

function getPointHistoryLabel(type: string) {
  switch (type) {
    case "CHARGE":
      return "충전";
    case "LOCK":
      return "에스크로 잠금";
    case "RELEASE":
      return "정산 지급";
    case "REFUND":
      return "환불";
    case "WITHDRAW":
      return "출금";
    default:
      return "포인트 변동";
  }
}
