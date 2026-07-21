import { getMe } from "@pacto/api";

import { PushNotificationSetting } from "../../_components/push-notification-setting";
import { PushAwareLogoutButton } from "../../_components/push-aware-logout-button";
import { PwaInstallSetting } from "../../_components/pwa-install-setting";
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
    <section aria-label="계정 설정" className="screen-stack mobile-system-page profile-system-page">
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
        <div className="profile-action-list">
          <a href="/profile/edit">
            <span>내 정보 수정</span>
            <strong>프로필과 정산 계좌 관리</strong>
          </a>
        </div>
      </section>

      <a className="profile-image-cta" href="/profile/edit">
        <span>
          <small>프로필 완성하기</small>
          <strong>활동 정보와 정산 계좌를 확인해 주세요</strong>
          <em>정보 수정하기</em>
        </span>
        <img alt="" aria-hidden="true" src="/illustrations/goal-mountain.webp" />
      </a>

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

      <PwaInstallSetting />

      <PushNotificationSetting />

      <PushAwareLogoutButton />
    </section>
  );
}

function getAvatarLabel(value?: string) {
  if (value == null || value.trim().length === 0) {
    return "P";
  }

  return value.trim().slice(0, 1).toUpperCase();
}
