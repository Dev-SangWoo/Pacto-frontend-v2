import { redirect } from "next/navigation";

import { ProfileEditPageClient } from "../../../_components/profile-edit-page-client";
import { getBloggerSession } from "../../../_lib/session";

export default async function ProfileEditPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  return <ProfileEditPageClient />;
}
