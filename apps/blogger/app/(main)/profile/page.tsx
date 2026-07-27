import { redirect } from "next/navigation";

import { ProfilePageClient } from "../../_components/profile-page-client";
import { getBloggerSession } from "../../_lib/session";

export default async function ProfilePage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  return <ProfilePageClient fallbackEmail={session.email} />;
}
