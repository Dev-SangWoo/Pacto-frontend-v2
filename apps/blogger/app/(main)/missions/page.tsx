import { redirect } from "next/navigation";

import { MissionPageClient } from "../../_components/mission-page-client";
import { getBloggerSession } from "../../_lib/session";

export default async function MissionsPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  return <MissionPageClient />;
}
