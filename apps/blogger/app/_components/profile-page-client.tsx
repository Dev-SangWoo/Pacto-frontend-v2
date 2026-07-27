"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Landmark, PencilLine, WalletCards } from "lucide-react";
import Link from "next/link";

import { getProfilePageDataAction } from "../_actions/blogger-actions";
import { profilePageQueryKey } from "./blogger-query-provider";
import { MainTabLoading } from "./main-tab-loading";
import { PushAwareLogoutButton } from "./push-aware-logout-button";
import { PushNotificationSetting } from "./push-notification-setting";
import { PwaInstallSetting } from "./pwa-install-setting";

type ProfilePageClientProps = {
  fallbackEmail?: string;
};

export function ProfilePageClient({ fallbackEmail }: ProfilePageClientProps) {
  const profileQuery = useQuery({
    queryFn: getProfilePageDataAction,
    queryKey: profilePageQueryKey,
  });

  if (profileQuery.data == null) {
    if (profileQuery.isError) {
      return (
        <section className="campaign-discovery-empty query-load-error" role="alert">
          <strong>내 정보를 불러오지 못했어요.</strong>
          <p>네트워크 상태를 확인한 뒤 다시 시도해 주세요.</p>
          <button onClick={() => void profileQuery.refetch()} type="button">
            다시 불러오기
          </button>
        </section>
      );
    }

    return <MainTabLoading />;
  }

  const user = profileQuery.data;
  const email = user.email || fallbackEmail || "이메일 정보 없음";
  const profile = user.bloggerProfile;
  const profileImageUrl = profile?.profileImageDownloadUrl ?? profile?.profileImageUrl;
  const blogUrl = profile?.blogUrl?.trim();
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
            <span className="profile-blog-url">{blogUrl || "블로그 주소 없음"}</span>
          </div>
        </div>
        <Link className="profile-edit-link" href="/profile/edit">
          <PencilLine aria-hidden="true" size={18} strokeWidth={2.2} />내 정보 수정
        </Link>
      </section>

      <section className="profile-quick-actions" aria-label="정산 바로가기">
        <Link href="/wallet">
          <span className="profile-quick-action-icon">
            <WalletCards aria-hidden="true" size={21} strokeWidth={2.1} />
          </span>
          <strong>지갑</strong>
          <ChevronRight aria-hidden="true" size={19} />
        </Link>
        <Link href="/withdrawals">
          <span className="profile-quick-action-icon">
            <Landmark aria-hidden="true" size={21} strokeWidth={2.1} />
          </span>
          <strong>출금 계좌</strong>
          <ChevronRight aria-hidden="true" size={19} />
        </Link>
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
