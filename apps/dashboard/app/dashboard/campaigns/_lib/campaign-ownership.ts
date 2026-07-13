import type { Campaign } from "@pacto/types";
import { getCampaigns } from "@pacto/api";

import type { DashboardSession } from "../../../_lib/session";
import { getDashboardUserId } from "../../_lib/owned-campaigns";

export async function isOwnedCampaign(campaign: Campaign, session: DashboardSession) {
  const userId = await getDashboardUserId(session);

  if (userId == null) {
    return false;
  }

  if (campaign.advertiserId === userId) {
    return true;
  }

  if (campaign.advertiserId !== 0) {
    return false;
  }

  const ownedCampaigns = await getCampaigns(
    { page: 0, size: 100, sort: "campaignId,desc" },
    session.accessToken,
  ).catch(() => []);

  return ownedCampaigns.some(
    (ownedCampaign) => ownedCampaign.id === campaign.id && ownedCampaign.advertiserId === userId,
  );
}
