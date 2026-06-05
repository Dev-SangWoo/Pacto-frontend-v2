import { logoutAction } from "../../_actions/auth-actions";
import { getBloggerSession } from "../../_lib/session";

export default async function ProfilePage() {
  const session = await getBloggerSession();

  return (
    <section className="screen-stack" aria-labelledby="profile-title">
      <section className="task-hero">
        <p className="section-label">내 정보</p>
        <h1 id="profile-title">캠페인 추천과 정산에 쓰이는 정보</h1>
        <p>{session.email ?? "로그인이 필요해요"}</p>
      </section>

      <section className="section-block" aria-labelledby="creator-profile-title">
        <div className="section-head">
          <div>
            <p className="section-label">참가자 프로필</p>
            <h2 id="creator-profile-title">추천 기준</h2>
          </div>
        </div>
        <div className="info-list">
          <div>
            <span>활동 지역</span>
            <strong>서울 / 수도권</strong>
          </div>
          <div>
            <span>선호 캠페인</span>
            <strong>맛집, 뷰티, 운동</strong>
          </div>
          <div>
            <span>참가자 유형</span>
            <strong>블로거</strong>
          </div>
        </div>
      </section>

      <section className="section-block" aria-labelledby="payout-profile-title">
        <div className="section-head">
          <div>
            <p className="section-label">정산 정보</p>
            <h2 id="payout-profile-title">출금 준비</h2>
          </div>
          <span>확인 필요</span>
        </div>
        <div className="info-list">
          <div>
            <span>정산 계좌</span>
            <strong>등록 후 출금 가능</strong>
          </div>
          <div>
            <span>수익 상태</span>
            <strong>지갑에서 확인</strong>
          </div>
        </div>
      </section>

      <form action={logoutAction}>
        <button className="primary-button weak-button full-width" type="submit">
          로그아웃
        </button>
      </form>
    </section>
  );
}
