import { getMe } from "@pacto/api";
import { redirect } from "next/navigation";

import { ProfileEditForm } from "../../../_components/profile-edit-form";
import { getBloggerSession } from "../../../_lib/session";

export default async function ProfileEditPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const user = await getMe(session.accessToken).catch(() => undefined);

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
        <ProfileEditForm profile={user?.bloggerProfile} />
      </section>
    </section>
  );
}
