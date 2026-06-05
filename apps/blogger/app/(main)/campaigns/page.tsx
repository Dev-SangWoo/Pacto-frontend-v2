import { getCampaigns } from "@pacto/api";

import { CampaignExplorer } from "../../_components/campaign-explorer";

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return <CampaignExplorer campaigns={campaigns} />;
}
