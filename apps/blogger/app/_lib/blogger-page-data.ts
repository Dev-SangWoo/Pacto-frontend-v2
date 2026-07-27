import { getCampaignDetail, getMyMissions, getMyPointHistories, getMyWallet } from "@pacto/api";
import type { ApplicationResponse, Campaign, Mission, PointHistory, Wallet } from "@pacto/types";

import { getBloggerActivity } from "./blogger-activity";

export type EnrichedApplicationResponse = ApplicationResponse & {
  advertiserId?: number;
  campaignTitle?: string;
  rewardPoint?: number;
  thumbnailUrl?: string;
};

export type MissionPageData = {
  applications: EnrichedApplicationResponse[];
  missions: Mission[];
};

export type WalletPageData = {
  missions: Mission[];
  pointHistories: PointHistory[];
  wallet: Wallet;
};

export async function getMissionPageData(accessToken: string): Promise<MissionPageData> {
  const { applications, missions } = await getBloggerActivity(accessToken);
  const campaignMap = await getCampaignMap([...missions, ...applications], accessToken);

  return {
    applications: applications.map((application) => enrichApplication(application, campaignMap)),
    missions: missions.map((mission) => enrichMission(mission, campaignMap)),
  };
}

export async function getWalletPageData(accessToken: string): Promise<WalletPageData> {
  const [wallet, pointHistories, missions] = await Promise.all([
    getMyWallet(accessToken),
    getMyPointHistories({}, accessToken),
    getMyMissions({}, accessToken),
  ]);

  return { missions, pointHistories, wallet };
}

function getCampaignId(item: Mission | ApplicationResponse) {
  return item.campaignId;
}

async function getCampaignMap(
  items: Array<Mission | ApplicationResponse>,
  accessToken: string,
): Promise<Map<number, Campaign>> {
  const campaignIds = Array.from(new Set(items.map(getCampaignId).filter((id) => id > 0)));
  const campaigns = await Promise.all(
    campaignIds.map((campaignId) =>
      getCampaignDetail(campaignId, accessToken).catch(() => undefined),
    ),
  );

  return new Map(
    campaigns
      .filter((campaign): campaign is Campaign => campaign != null)
      .map((campaign) => [campaign.id, campaign]),
  );
}

function enrichMission(mission: Mission, campaignMap: Map<number, Campaign>): Mission {
  const campaign = campaignMap.get(mission.campaignId);

  if (campaign == null) {
    return mission;
  }

  return {
    ...mission,
    brandName: campaign.brandName,
    campaignTitle: campaign.title,
    dueDate: campaign.deadline,
    rewardPoint: campaign.rewardPoint,
    thumbnailUrl: campaign.thumbnailUrl ?? mission.thumbnailUrl,
  };
}

function enrichApplication(
  application: ApplicationResponse,
  campaignMap: Map<number, Campaign>,
): EnrichedApplicationResponse {
  const campaign = campaignMap.get(application.campaignId);

  if (campaign == null) {
    return application;
  }

  return {
    ...application,
    advertiserId: campaign.advertiserId,
    campaignTitle: campaign.title,
    rewardPoint: campaign.rewardPoint,
    thumbnailUrl: campaign.thumbnailUrl,
  };
}
