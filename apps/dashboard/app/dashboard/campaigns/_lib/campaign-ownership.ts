import type { Campaign } from "@pacto/types";

import type { DashboardSession } from "../../../_lib/session";
import { getDashboardUserId } from "../../_lib/owned-campaigns";

export async function isOwnedCampaign(campaign: Campaign, session: DashboardSession) {
  const userId = await getDashboardUserId(session);

  return userId != null && campaign.advertiserId === userId;
}
