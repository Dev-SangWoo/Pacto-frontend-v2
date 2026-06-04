import { getMyWallet } from "@pacto/api";
import { formatPoint } from "@pacto/utils";

export default async function WithdrawalsPage() {
  const wallet = await getMyWallet();

  return (
    <section className="screen-stack detail-screen" aria-labelledby="withdrawals-title">
      <div className="page-heading">
        <p className="section-label">출금 신청</p>
        <h1 id="withdrawals-title">계좌를 등록하면 출금할 수 있어요</h1>
        <p>현재는 출금 가능 금액을 확인하고, 계좌 등록이 필요한 상태예요.</p>
      </div>

      <section className="wallet-hero" aria-label="출금 가능 금액">
        <span>현재 출금 가능</span>
        <strong>{formatPoint(wallet.availableBalance)}</strong>
      </section>

      <section className="info-list" aria-label="출금 계좌">
        <div>
          <span>은행</span>
          <strong>프로필에서 등록해요</strong>
        </div>
        <div>
          <span>계좌번호</span>
          <strong>등록 후 출금 가능</strong>
        </div>
      </section>

      <section className="content-section" aria-labelledby="withdrawal-helper-title">
        <h2 id="withdrawal-helper-title">출금 전에 확인해요</h2>
        <p>정산 받을 계좌를 등록하면 이 화면에서 출금 신청을 이어갈 수 있어요.</p>
      </section>

      <div className="fixed-cta">
        <a className="primary-button weak-button" href="/profile">
          프로필에서 계좌 확인하기
        </a>
      </div>
    </section>
  );
}
