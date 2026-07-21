import { getMe } from "@pacto/api";

import { logoutAction } from "../../_actions/auth-actions";
import { ProfileEditForm } from "../../_components/profile-edit-form";
import { getBloggerSession } from "../../_lib/session";

export default async function ProfilePage() {
  const session = await getBloggerSession();
  const user =
    session.accessToken != null
      ? await getMe(session.accessToken).catch(() => undefined)
      : undefined;
  const email = user?.email ?? session.email ?? "로그인이 필요해요";
  const profile = user?.bloggerProfile;
  const avatarLabel = getAvatarLabel(profile?.nickname ?? profile?.name ?? email);

  return (
    <section
      className="screen-stack mobile-system-page profile-system-page"
      aria-labelledby="profile-title"
    >
      <header className="profile-title-block mobile-page-heading">
        <p className="section-label">내 정보</p>
        <h1 id="profile-title">계정 설정</h1>
        <p>블로그 활동 정보와 정산 계좌를 관리하세요.</p>
      </header>

      <section className="profile-section" aria-labelledby="account-profile-title">
        <div className="section-head">
          <div>
            <p className="section-label">계정</p>
            <h2 id="account-profile-title">프로필</h2>
          </div>
        </div>
        <div className="profile-card">
          {profile?.profileImageUrl != null && profile.profileImageUrl.length > 0 ? (
            <img
              className="profile-photo-preview image"
              src={profile.profileImageUrl}
              alt="프로필"
            />
          ) : (
            <span className="profile-photo-preview" aria-hidden="true">
              {avatarLabel}
            </span>
          )}
          <div className="profile-card-copy">
            <strong>{profile?.nickname || profile?.name || email}</strong>
            <span>{email}</span>
            <span>블로거 ID #{session.bloggerId}</span>
          </div>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="profile-edit-title">
        <div className="section-head">
          <div>
            <p className="section-label">기본 정보</p>
            <h2 id="profile-edit-title">프로필 수정</h2>
          </div>
        </div>
        <ProfileEditForm profile={profile} />
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

function getAvatarLabel(value?: string) {
  if (value == null || value.trim().length === 0) {
    return "P";
  }

  return value.trim().slice(0, 1).toUpperCase();
}
