"use client";

import { useQuery } from "@tanstack/react-query";

import { getProfilePageDataAction } from "../_actions/blogger-actions";
import { profilePageQueryKey } from "./blogger-query-provider";
import { MainTabLoading } from "./main-tab-loading";
import { ProfileEditForm } from "./profile-edit-form";

export function ProfileEditPageClient() {
  const profileQuery = useQuery({
    queryFn: getProfilePageDataAction,
    queryKey: profilePageQueryKey,
  });

  if (profileQuery.data == null) {
    if (profileQuery.isError) {
      return (
        <section className="campaign-discovery-empty query-load-error" role="alert">
          <strong>프로필 정보를 불러오지 못했어요.</strong>
          <p>네트워크 상태를 확인한 뒤 다시 시도해 주세요.</p>
          <button onClick={() => void profileQuery.refetch()} type="button">
            다시 불러오기
          </button>
        </section>
      );
    }

    return <MainTabLoading />;
  }

  return (
    <section
      className="screen-stack mobile-system-page profile-system-page profile-edit-page"
      aria-labelledby="profile-edit-page-title"
    >
      <header className="mobile-page-heading">
        <h1 id="profile-edit-page-title">내 정보 수정</h1>
      </header>

      <section className="profile-section" aria-labelledby="profile-edit-form-title">
        <div className="section-head">
          <div>
            <p className="section-label">기본 정보 · 정산 계좌</p>
            <h2 id="profile-edit-form-title">프로필 정보</h2>
          </div>
        </div>
        <ProfileEditForm profile={profileQuery.data.bloggerProfile} />
      </section>
    </section>
  );
}
