import type { Campaign } from "@pacto/types";

import { adaptCampaign } from "../adapters/campaign-adapter";
import { mockCampaigns } from "../mocks/data";

export async function getCampaigns(): Promise<Campaign[]> {
  return mockCampaigns.map(adaptCampaign);
}

export async function getCampaignDetail(campaignId: number): Promise<Campaign | undefined> {
  const campaign = mockCampaigns.find((item) => item.id === campaignId);

  return campaign == null ? undefined : adaptCampaign(campaign);
}
