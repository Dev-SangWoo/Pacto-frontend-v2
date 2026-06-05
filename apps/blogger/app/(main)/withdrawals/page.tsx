import { getMyWallet } from "@pacto/api";
import { formatPoint } from "@pacto/utils";

import { getBloggerSession } from "../../_lib/session";

const preferences = ["맛집 체험", "뷰티 리뷰", "운동/라이프", "서울 근거리"];

export default async function WithdrawalsPage() {
  const session = await getBloggerSession();
  const wallet = await getMyWallet(session.accessToken);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="withdrawals-title">
      <section className="money-hero compact-hero">
        <p className="section-label">출금 신청</p>
        <h1 id="withdrawals-title">받을 계정 정보를 확인하세요</h1>
        <strong>{formatPoint(wallet.availableBalance)}</strong>
      </section>

      <section className="section-block" aria-labelledby="account-title">
        <div className="section-head">
          <div>
            <p className="section-label">계정 정보</p>
            <h2 id="account-title">정산에 쓰이는 정보</h2>
          </div>
          <span>확인 필요</span>
        </div>
        <div className="info-list">
          <div>
            <span>이메일</span>
            <strong>{session.email ?? "로그인이 필요해요"}</strong>
          </div>
          <div>
            <span>정산 계좌</span>
            <strong>등록 후 출금 가능</strong>
          </div>
          <div>
            <span>참가자 유형</span>
            <strong>블로거</strong>
          </div>
        </div>
      </section>

      <section className="section-block" aria-labelledby="preference-title">
        <div className="section-head">
          <div>
            <p className="section-label">캠페인 추천 정보</p>
            <h2 id="preference-title">선호 캠페인</h2>
          </div>
        </div>
        <div className="preference-cloud">
          {preferences.map((preference) => (
            <span key={preference}>{preference}</span>
          ))}
        </div>
      </section>

      <div className="fixed-cta">
        <a className="primary-button weak-button" href="/profile">
          내 정보에서 계좌 확인
        </a>
      </div>
    </section>
  );
}
