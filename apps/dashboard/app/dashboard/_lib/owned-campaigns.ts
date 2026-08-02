import { getCampaigns, getMe } from "@pacto/api";
import type { Campaign } from "@pacto/types";

import type { DashboardSession } from "../../_lib/session";

const BACKEND_CAMPAIGN_STATUSES = [
  "RECRUITING",
  "CLOSED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

export async function getOwnedDashboardCampaigns(session: DashboardSession): Promise<Campaign[]> {
  const campaignsByStatus = await Promise.all(
    BACKEND_CAMPAIGN_STATUSES.map((status) =>
      getCampaigns({ page: 0, size: 100, sort: "campaignId,desc", status }, session.accessToken),
    ),
  );
  const campaigns = Array.from(
    new Map(campaignsByStatus.flat().map((campaign) => [campaign.id, campaign])).values(),
  );

  return filterOwnedCampaigns(campaigns, session);
}

export async function filterOwnedCampaigns(campaigns: Campaign[], session: DashboardSession) {
  const userId = await getDashboardUserId(session);

  if (userId == null) {
    return [];
  }

  return campaigns.filter((campaign) => campaign.advertiserId === userId);
}

export async function getDashboardUserId(session: DashboardSession) {
  if (session.accessToken != null) {
    const user = await getMe(session.accessToken).catch(() => undefined);

    if (user?.id != null) {
      return user.id;
    }
  }

  return session.userId;
}
