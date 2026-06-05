import { getCampaigns } from "@pacto/api";
import { redirect } from "next/navigation";

import { CampaignExplorer } from "../../_components/campaign-explorer";
import { getBloggerSession } from "../../_lib/session";

export default async function CampaignsPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const campaigns = await getCampaigns({}, session.accessToken, { mockFallback: false }).catch(() =>
    redirect("/login"),
  );

  return <CampaignExplorer campaigns={campaigns} />;
}
