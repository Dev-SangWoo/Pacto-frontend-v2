import { getMe } from "@pacto/api";
import { ChevronRight, Landmark, PencilLine, WalletCards } from "lucide-react";

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
  const profileImageUrl = profile?.profileImageDownloadUrl ?? profile?.profileImageUrl;
  const avatarLabel = getAvatarLabel(profile?.nickname ?? profile?.name ?? email);

  return (
    <section
      aria-label="계정 설정"
      className="screen-stack mobile-system-page profile-system-page profile-home-page"
    >
      <h1 className="profile-page-title">내 정보</h1>

      <section className="profile-overview" aria-labelledby="account-profile-title">
        <div className="profile-overview-identity">
          {profileImageUrl != null && profileImageUrl.length > 0 ? (
            <img className="profile-photo-preview image" src={profileImageUrl} alt="프로필 사진" />
          ) : (
            <span className="profile-photo-preview" aria-hidden="true">
              {avatarLabel}
            </span>
          )}
          <div className="profile-card-copy">
            <h2 id="account-profile-title">{profile?.nickname || profile?.name || email}</h2>
            <span>{email}</span>
            <span>블로거 ID #{session.bloggerId}</span>
          </div>
        </div>
        <a className="profile-edit-link" href="/profile/edit">
          <PencilLine aria-hidden="true" size={18} strokeWidth={2.2} />내 정보 수정
        </a>
      </section>

      <section className="profile-quick-actions" aria-label="정산 바로가기">
        <a href="/wallet">
          <span className="profile-quick-action-icon">
            <WalletCards aria-hidden="true" size={21} strokeWidth={2.1} />
          </span>
          <strong>지갑</strong>
          <ChevronRight aria-hidden="true" size={19} />
        </a>
        <a href="/withdrawals">
          <span className="profile-quick-action-icon">
            <Landmark aria-hidden="true" size={21} strokeWidth={2.1} />
          </span>
          <strong>출금 계좌</strong>
          <ChevronRight aria-hidden="true" size={19} />
        </a>
      </section>

      <section className="profile-settings-list" aria-label="앱과 계정 설정">
        <PwaInstallSetting compact />
        <PushNotificationSetting compact />
        <PushAwareLogoutButton compact />
      </section>
    </section>
  );
}

function getAvatarLabel(value?: string) {
  if (value == null || value.trim().length === 0) {
    return "P";
  }

  return value.trim().slice(0, 1).toUpperCase();
}
