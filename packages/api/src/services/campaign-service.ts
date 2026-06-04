import type { Campaign } from "@pacto/types";

import type { MissionResponse } from "../adapters/mission-adapter";
import { adaptCampaign } from "../adapters/campaign-adapter";
import type { CampaignResponse } from "../adapters/campaign-adapter";
import { adaptMission } from "../adapters/mission-adapter";
import { isMockFallbackDisabled } from "../client/env";
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";
import { mockCampaigns } from "../mocks/data";

export async function getCampaigns(): Promise<Campaign[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/campaigns");

      return unwrapListResponse<CampaignResponse>(response).map(adaptCampaign);
    },
    () => mockCampaigns.map(adaptCampaign),
  );
}

export async function getCampaignDetail(campaignId: number): Promise<Campaign | undefined> {
  return withMockFallback(
    async () => {
      const response = await apiRequest<CampaignResponse>(`/api/v1/campaigns/${campaignId}`);

      return adaptCampaign(unwrapCommonResponse<CampaignResponse>(response));
    },
    () => {
      const campaign = mockCampaigns.find((item) => item.id === campaignId);

      return campaign == null ? undefined : adaptCampaign(campaign);
    },
  );
}

export async function acceptMission(campaignId: number, bloggerId?: number) {
  const response = await apiRequest<MissionResponse>(`/api/v1/campaigns/${campaignId}/missions`, {
    method: "POST",
    query: { bloggerId },
  });

  return adaptMission(unwrapCommonResponse<MissionResponse>(response));
}

async function withMockFallback<T>(request: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (isMockFallbackDisabled()) {
      throw error;
    }

    return fallback();
  }
}
