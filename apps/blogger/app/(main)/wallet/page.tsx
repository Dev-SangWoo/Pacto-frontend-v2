import { getMyWallet } from "@pacto/api";
import { formatKoreanDate, formatPoint } from "@pacto/utils";

import { getBloggerSession } from "../../_lib/session";

export default async function WalletPage() {
  const session = await getBloggerSession();
  const wallet = await getMyWallet(session.accessToken);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="wallet-title">
      <div className="page-heading">
        <h1 id="wallet-title">지갑</h1>
      </div>

      <section className="wallet-hero" aria-label="출금 가능 금액">
        <span>출금 가능</span>
        <strong>{formatPoint(wallet.availableBalance)}</strong>
        <p>{formatKoreanDate(wallet.updatedAt)} 업데이트</p>
      </section>

      <section className="info-list" aria-label="지갑 상세">
        <div>
          <span>에스크로 잠긴 금액</span>
          <strong>{formatPoint(wallet.lockedBalance)}</strong>
        </div>
        <div>
          <span>누적 수익</span>
          <strong>{formatPoint(wallet.totalEarned)}</strong>
        </div>
      </section>

      <section className="content-section" aria-labelledby="wallet-helper-title">
        <h2 id="wallet-helper-title">잠긴 금액이란?</h2>
        <p>미션 검수 또는 정산 확인을 기다리는 금액이에요. 승인 후 출금 가능 금액으로 이동해요.</p>
      </section>

      <section className="flow-steps compact" aria-label="정산 흐름">
        <div>
          <span>1</span>
          <strong>미션 제출</strong>
          <p>리뷰 URL을 제출해요.</p>
        </div>
        <div>
          <span>2</span>
          <strong>검수 진행</strong>
          <p>승인 전까지 잠긴 금액으로 보여요.</p>
        </div>
        <div>
          <span>3</span>
          <strong>출금 신청</strong>
          <p>승인 후 계좌로 받을 수 있어요.</p>
        </div>
      </section>

      <div className="fixed-cta">
        <a
          className={`primary-button cta-link ${wallet.availableBalance === 0 ? "disabled" : ""}`}
          href="/withdrawals"
          aria-disabled={wallet.availableBalance === 0}
        >
          출금 신청하기
        </a>
      </div>
    </section>
  );
}
