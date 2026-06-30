import { getAdvertiserDashboard, getMyPointHistories, getMyWallet } from "@pacto/api";
import type { PointHistory } from "@pacto/types";
import { formatKoreanDate, formatPoint } from "@pacto/utils";
import { redirect } from "next/navigation";

import { getDashboardSession } from "../../_lib/session";
import { PaymentActionModals } from "./_components/payment-action-modals";

export default async function PaymentsPage() {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const [wallet, histories, dashboard] = await Promise.all([
    getMyWallet(session.accessToken),
    getMyPointHistories({ page: 1, size: 10 }, session.accessToken),
    getAdvertiserDashboard(session.accessToken),
  ]);
  const releasedAmount = dashboard.escrowSummary.releasedAmount;
  const refundedAmount = dashboard.escrowSummary.canceledAmount;
  const trackedTotal =
    wallet.availableBalance + wallet.lockedBalance + releasedAmount + refundedAmount;
  const distributionItems = [
    {
      amount: wallet.availableBalance,
      className: "available",
      label: "사용 가능",
    },
    {
      amount: wallet.lockedBalance,
      className: "locked",
      label: "잠긴 예산",
    },
    {
      amount: releasedAmount,
      className: "released",
      label: "정산 완료",
    },
    {
      amount: refundedAmount,
      className: "refunded",
      label: "환불/취소",
    },
  ];

  return (
    <>
      <header className="topbar topbar-pro">
        <div>
          <p className="eyebrow">Payments</p>
          <h1>예산 관리</h1>
          <p className="topbar-copy">
            광고주 지갑의 사용 가능 금액, 잠긴 예산, 정산 흐름을 확인합니다.
          </p>
        </div>
        <PaymentActionModals
          accessToken={session.accessToken}
          availableBalance={wallet.availableBalance}
          buyerEmail={session.email}
          buyerUserId={session.userId}
        />
      </header>

      <section className="payment-overview-grid" aria-label="지갑 예산 요약">
        <article className="summary-card emphasis">
          <p>사용 가능 잔액</p>
          <strong>{formatPoint(wallet.availableBalance)}</strong>
          <span>{formatKoreanDate(wallet.updatedAt)} 업데이트</span>
        </article>
        <article className="summary-card">
          <p>잠긴 예산</p>
          <strong>{formatPoint(wallet.lockedBalance)}</strong>
          <span>{dashboard.escrowSummary.lockedEscrows}건 잠금 상태</span>
        </article>
        <article className="summary-card">
          <p>정산 완료</p>
          <strong>{formatPoint(releasedAmount)}</strong>
          <span>{dashboard.escrowSummary.releasedEscrows}건 RELEASED</span>
        </article>
        <article className="summary-card">
          <p>환불/취소</p>
          <strong>{formatPoint(refundedAmount)}</strong>
          <span>{dashboard.escrowSummary.canceledEscrows}건 CANCELED</span>
        </article>
      </section>

      <section className="payment-main-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>예산 분포</h2>
              <p>현재 잔액과 캠페인 운영 과정에서 움직인 예산을 함께 봅니다.</p>
            </div>
          </div>
          <div className="budget-distribution-body">
            <div className="budget-stacked-bar" aria-label="예산 분포">
              {distributionItems.map((item) =>
                item.amount > 0 ? (
                  <span
                    className={item.className}
                    key={item.label}
                    style={{ width: `${getDistributionPercent(item.amount, trackedTotal)}%` }}
                    title={`${item.label} ${formatPoint(item.amount)}`}
                  />
                ) : null,
              )}
              {trackedTotal <= 0 ? <span className="empty" style={{ width: "100%" }} /> : null}
            </div>
            <div className="budget-distribution-legend">
              {distributionItems.map((item) => (
                <div key={item.label}>
                  <span className={`legend-dot ${item.className}`} />
                  <p>{item.label}</p>
                  <strong>{formatPoint(item.amount)}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="panel">
          <div className="panel-heading">
            <div>
              <h2>예산 상태</h2>
              <p>충전과 출금은 상단 버튼에서 처리합니다.</p>
            </div>
          </div>
          <div className="payment-status-strip">
            <div>
              <span>LOCKED</span>
              <strong>{dashboard.escrowSummary.lockedEscrows}건</strong>
            </div>
            <div>
              <span>RELEASED</span>
              <strong>{dashboard.escrowSummary.releasedEscrows}건</strong>
            </div>
            <div>
              <span>CANCELED</span>
              <strong>{dashboard.escrowSummary.canceledEscrows}건</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>최근 포인트 흐름</h2>
            <p>충전, 예산 잠금, 정산, 환불, 출금 내역을 시간순으로 확인합니다.</p>
          </div>
        </div>
        <div className="money-flow-list">
          {histories.length > 0 ? (
            histories.map((history) => (
              <article className="money-flow-item" key={history.id}>
                <span className={`money-flow-dot ${getPointHistoryTone(history.type)}`} />
                <div>
                  <strong>{getPointHistoryLabel(history.type)}</strong>
                  <p>
                    {formatKoreanDate(history.createdAt)}
                    {history.referenceId != null ? ` · 참조 #${history.referenceId}` : ""}
                  </p>
                </div>
                <em className={history.amount >= 0 ? "positive" : "negative"}>
                  {formatSignedPoint(history.amount)}
                </em>
              </article>
            ))
          ) : (
            <div className="panel-body">
              <p>아직 표시할 포인트 내역이 없어요.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function getPointHistoryLabel(type: PointHistory["type"]) {
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

function getPointHistoryTone(type: PointHistory["type"]) {
  switch (type) {
    case "CHARGE":
    case "REFUND":
      return "positive";
    case "LOCK":
    case "WITHDRAW":
      return "negative";
    case "RELEASE":
      return "settled";
  }
}

function getDistributionPercent(amount: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.max(4, Math.round((amount / total) * 100));
}

function formatSignedPoint(amount: number) {
  const prefix = amount > 0 ? "+" : "";

  return `${prefix}${formatPoint(amount)}`;
}
