import type { Applicant, Campaign } from "@pacto/types";

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
import type { CommonResponse } from "../client/http-client";
import { mockCampaigns } from "../mocks/data";

export type GetCampaignsParams = {
  page?: number;
  size?: number;
  status?: CampaignStatusResponse;
};

type MockFallbackOptions = {
  mockFallback?: boolean;
};

export type CreateCampaignPayload = {
  deadline: string;
  guidelines: string;
  rewardPoint: number;
  thumbnailUrl?: string;
  title: string;
  totalSlots: number;
};

export type UpdateCampaignStatusPayload = {
  status: CampaignStatusResponse;
};

export async function getCampaigns(
  params: GetCampaignsParams = {},
  token?: string,
  options: MockFallbackOptions = {},
): Promise<Campaign[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/campaigns", { query: params, token });

      return unwrapListResponse<CampaignResponse>(response).map(adaptCampaign);
    },
    () => mockCampaigns.map(adaptCampaign),
    options,
  );
}

export async function getCampaignDetail(
  campaignId: number,
  token?: string,
  options: MockFallbackOptions = {},
): Promise<Campaign | undefined> {
  return withMockFallback(
    async () => {
      const response = await apiRequest<CommonResponse<CampaignResponse> | CampaignResponse>(
        `/api/v1/campaigns/${campaignId}`,
        { token },
      );

      return adaptCampaign(unwrapCommonResponse<CampaignResponse>(response));
    },
    () => {
      const campaign = mockCampaigns.find((item) => item.id === campaignId);

      return campaign == null ? undefined : adaptCampaign(campaign);
    },
    options,
  );
}

export async function createCampaign(payload: CreateCampaignPayload, token?: string) {
  const response = await apiRequest<
    CommonResponse<CreateCampaignResponse> | CreateCampaignResponse
  >("/api/v1/campaigns", {
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

export async function getApplicants(
  campaignId: number,
  token?: string,
  options: MockFallbackOptions = {},
): Promise<Applicant[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest(`/api/v1/campaigns/${campaignId}/applicants`, { token });
      return unwrapListResponse<Applicant>(response);
    },
    () => [
      {
        id: 1,
        name: "김하린",
        blogUrl: "blog.naver.com/harin",
        status: "pending",
        fitScore: "높음",
        appliedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "이도윤",
        blogUrl: "blog.naver.com/doyoon",
        status: "approved",
        fitScore: "보통",
        appliedAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "박서아",
        blogUrl: "blog.naver.com/seoa",
        status: "pending",
        fitScore: "낮음",
        appliedAt: new Date().toISOString(),
      },
    ],
    options,
  );
}

export async function approveApplicant(
  campaignId: number,
  applicantId: number,
  token?: string,
): Promise<void> {
  await apiRequest(`/api/v1/campaigns/${campaignId}/applicants/${applicantId}/approve`, {
    method: "POST",
    token,
  });
}

export async function approveAllApplicants(campaignId: number, token?: string): Promise<void> {
  await apiRequest(`/api/v1/campaigns/${campaignId}/applicants/approve-all`, {
    method: "POST",
    token,
  });
}

async function withMockFallback<T>(
  request: () => Promise<T>,
  fallback: () => T,
  options: MockFallbackOptions = {},
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (options.mockFallback === false || isMockFallbackDisabled()) {
      throw error;
    }

    return fallback();
  }
}
