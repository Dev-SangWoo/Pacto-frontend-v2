import type { Campaign } from "@pacto/types";

import type { MissionActionResponse } from "../adapters/mission-adapter";
import {
  adaptCampaign,
  adaptCreateCampaign,
  mapCampaignStatus,
} from "../adapters/campaign-adapter";
import type {
  CampaignResponse,
  CampaignStatusResponse,
  CreateCampaignResponse,
} from "../adapters/campaign-adapter";
import { adaptMissionAction } from "../adapters/mission-adapter";
import { isMockFallbackDisabled } from "../client/env";
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";
import { mockCampaigns } from "../mocks/data";

export type GetCampaignsParams = {
  page?: number;
  size?: number;
  status?: CampaignStatusResponse;
};

export type CreateCampaignPayload = {
  deadline: string;
  guidelines: string[] | string;
  reward_point: number;
  thumbnail_url?: string;
  title: string;
};

export type UpdateCampaignStatusPayload = {
  status: CampaignStatusResponse;
};

export async function getCampaigns(params: GetCampaignsParams = {}): Promise<Campaign[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/campaigns", { query: params });

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

export async function createCampaign(payload: CreateCampaignPayload, token?: string) {
  const response = await apiRequest<CreateCampaignResponse>("/api/v1/campaigns", {
    body: payload,
    method: "POST",
    token,
  });

  return adaptCreateCampaign(unwrapCommonResponse<CreateCampaignResponse>(response));
}

export async function updateCampaignStatus(
  campaignId: number,
  payload: UpdateCampaignStatusPayload,
  token?: string,
) {
  const response = await apiRequest<CreateCampaignResponse | UpdateCampaignStatusPayload>(
    `/api/v1/campaigns/${campaignId}/status`,
    {
      body: payload,
      method: "PATCH",
      token,
    },
  );
  const result = unwrapCommonResponse<CreateCampaignResponse | UpdateCampaignStatusPayload>(
    response,
  );

  return {
    id:
      "campaign_id" in result || "campaignId" in result
        ? adaptCreateCampaign(result).id
        : campaignId,
    status: mapCampaignStatus(result.status),
  };
}

export async function acceptMission(campaignId: number, token?: string) {
  const response = await apiRequest<MissionActionResponse>(
    `/api/v1/campaigns/${campaignId}/missions`,
    {
      method: "POST",
      token,
    },
  );

  return adaptMissionAction(unwrapCommonResponse<MissionActionResponse>(response));
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
