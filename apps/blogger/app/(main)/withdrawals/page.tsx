import { getMyWallet } from "@pacto/api";
import { formatPoint } from "@pacto/utils";

export default async function WithdrawalsPage() {
  const wallet = await getMyWallet();

  return (
    <section className="screen-stack detail-screen" aria-labelledby="withdrawals-title">
      <div className="page-heading">
        <p className="section-label">출금 신청</p>
        <h1 id="withdrawals-title">출금할 금액을 확인하세요</h1>
        <p>출금 가능 금액 안에서 신청할 수 있어요.</p>
      </div>

      <section className="wallet-hero" aria-label="출금 가능 금액">
        <span>현재 출금 가능</span>
        <strong>{formatPoint(wallet.availableBalance)}</strong>
      </section>

      <section className="info-list" aria-label="출금 계좌">
        <div>
          <span>은행</span>
          <strong>등록 필요</strong>
        </div>
        <div>
          <span>계좌번호</span>
          <strong>프로필에서 등록</strong>
        </div>
      </section>

      <div className="fixed-cta">
        <button className="primary-button" disabled type="button">
          계좌 등록 후 신청 가능
        </button>
      </div>
    </section>
  );
}
