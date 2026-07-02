import { getMe } from "@pacto/api";
import type { Campaign } from "@pacto/types";

import type { DashboardSession } from "../../_lib/session";

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
