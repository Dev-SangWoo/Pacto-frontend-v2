import type { ApplicationResponse, CampaignApplicant, Mission } from "@pacto/types";

import { adaptApplication } from "../adapters/application-adapter";
import { adaptMission } from "../adapters/mission-adapter";
import type { MissionResponse } from "../adapters/mission-adapter";
import { adaptPointHistory } from "../adapters/wallet-adapter";
import type { PointHistoryResponse } from "../adapters/wallet-adapter";
import { apiRequest, unwrapCommonResponse } from "../client/http-client";
import type { CommonResponse } from "../client/http-client";

export type AdvertiserDashboardSummary = {
  applicationSummary: {
    acceptedApplications: number;
    pendingApplications: number;
  };
  campaignSummary: {
    completedCampaigns: number;
    inProgressCampaigns: number;
    recruitingCampaigns: number;
    totalCampaigns: number;
  };
  missionSummary: {
    approvedMissions: number;
    rejectedMissions: number;
    submittedMissions: number;
  };
  escrowSummary: {
    canceledAmount: number;
    canceledEscrows: number;
    lockedAmount: number;
    lockedEscrows: number;
    releasedAmount: number;
    releasedEscrows: number;
  };
  pendingMissions: Mission[];
  recentApplications: CampaignApplicant[];
  recentPointHistories: ReturnType<typeof adaptPointHistory>[];
  wallet: {
    balance: number;
    lockedBalance: number;
  };
};

type AdvertiserDashboardResponse = {
  applicationSummary?: {
    acceptedApplications?: number;
    pendingApplications?: number;
  };
  campaignSummary?: {
    completedCampaigns?: number;
    inProgressCampaigns?: number;
    recruitingCampaigns?: number;
    totalCampaigns?: number;
  };
  missionSummary?: {
    approvedMissions?: number;
    rejectedMissions?: number;
    submittedMissions?: number;
  };
  escrowSummary?: {
    canceledAmount?: number;
    canceledEscrows?: number;
    lockedAmount?: number;
    lockedEscrows?: number;
    releasedAmount?: number;
    releasedEscrows?: number;
  };
  pendingMissions?: MissionResponse[];
  recentApplications?: ApplicationResponse[];
  recentPointHistories?: PointHistoryResponse[];
  wallet?: {
    balance?: number;
    lockedBalance?: number;
  };
};

export async function getAdvertiserDashboard(token?: string): Promise<AdvertiserDashboardSummary> {
  const response = await apiRequest<
    CommonResponse<AdvertiserDashboardResponse> | AdvertiserDashboardResponse
  >("/api/v1/advertiser/dashboard", { token });

  return adaptAdvertiserDashboard(unwrapCommonResponse<AdvertiserDashboardResponse>(response));
}

function adaptAdvertiserDashboard(
  response: AdvertiserDashboardResponse,
): AdvertiserDashboardSummary {
  return {
    applicationSummary: {
      acceptedApplications: response.applicationSummary?.acceptedApplications ?? 0,
      pendingApplications: response.applicationSummary?.pendingApplications ?? 0,
    },
    campaignSummary: {
      completedCampaigns: response.campaignSummary?.completedCampaigns ?? 0,
      inProgressCampaigns: response.campaignSummary?.inProgressCampaigns ?? 0,
      recruitingCampaigns: response.campaignSummary?.recruitingCampaigns ?? 0,
      totalCampaigns: response.campaignSummary?.totalCampaigns ?? 0,
    },
    missionSummary: {
      approvedMissions: response.missionSummary?.approvedMissions ?? 0,
      rejectedMissions: response.missionSummary?.rejectedMissions ?? 0,
      submittedMissions: response.missionSummary?.submittedMissions ?? 0,
    },
    escrowSummary: {
      canceledAmount: response.escrowSummary?.canceledAmount ?? 0,
      canceledEscrows: response.escrowSummary?.canceledEscrows ?? 0,
      lockedAmount: response.escrowSummary?.lockedAmount ?? 0,
      lockedEscrows: response.escrowSummary?.lockedEscrows ?? 0,
      releasedAmount: response.escrowSummary?.releasedAmount ?? 0,
      releasedEscrows: response.escrowSummary?.releasedEscrows ?? 0,
    },
    pendingMissions: (response.pendingMissions ?? []).map(adaptMission),
    recentApplications: (response.recentApplications ?? []).map(adaptApplication),
    recentPointHistories: (response.recentPointHistories ?? []).map(adaptPointHistory),
    wallet: {
      balance: response.wallet?.balance ?? 0,
      lockedBalance: response.wallet?.lockedBalance ?? 0,
    },
  };
}
