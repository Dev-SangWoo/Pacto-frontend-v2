import { logoutAction } from "../../_actions/auth-actions";
import { getBloggerSession } from "../../_lib/session";

export default async function ProfilePage() {
  const session = await getBloggerSession();
  const email = session.email ?? "로그인이 필요해요";
  const avatarLabel = getAvatarLabel(session.email);

  return (
    <section className="screen-stack" aria-labelledby="profile-title">
      <section className="profile-title-block">
        <p className="section-label">내 정보</p>
        <h1 id="profile-title">계정 설정</h1>
        <p>로그인 정보와 정산 메뉴를 확인하세요.</p>
      </section>

      <section className="profile-section" aria-labelledby="account-profile-title">
        <div className="section-head">
          <div>
            <p className="section-label">계정</p>
            <h2 id="account-profile-title">프로필</h2>
          </div>
        </div>
        <div className="profile-card">
          <span className="profile-photo-preview" aria-hidden="true">
            {avatarLabel}
          </span>
          <div className="profile-card-copy">
            <strong>{email}</strong>
            <span>블로거 ID #{session.bloggerId}</span>
            <span>블로거 계정</span>
          </div>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="payout-profile-title">
        <div className="section-head">
          <div>
            <p className="section-label">정산 정보</p>
            <h2 id="payout-profile-title">지갑과 출금</h2>
          </div>
        </div>
        <div className="profile-action-list">
          <a href="/wallet">
            <span>지갑</span>
            <strong>정산과 거래 내역 확인</strong>
          </a>
          <a href="/withdrawals">
            <span>출금 계좌</span>
            <strong>출금 신청 화면에서 입력</strong>
          </a>
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

function getAvatarLabel(email?: string) {
  if (email == null || email.trim().length === 0) {
    return "P";
  }

  return email.trim().slice(0, 1).toUpperCase();
}
