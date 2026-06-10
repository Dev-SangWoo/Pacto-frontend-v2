import type { Applicant, ApplicationResponse, Campaign, Mission } from "@pacto/types";

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
import { adaptMission, adaptMissionAction } from "../adapters/mission-adapter";
import type { MissionActionResponse, MissionResponse } from "../adapters/mission-adapter";
import { adaptApplication } from "../adapters/application-adapter";
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
  guidelines: unknown;
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
  const guidelines =
    typeof payload.guidelines === "string" ? { content: payload.guidelines } : payload.guidelines;

  const response = await apiRequest<
    CommonResponse<CreateCampaignResponse> | CreateCampaignResponse
  >("/api/v1/campaigns", {
    body: {
      ...payload,
      guidelines,
    },
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

export async function acceptMission(campaignId: number, token?: string): Promise<void> {
  // Now this is 'Applying' to a campaign
  await apiRequest("/api/v1/applications", {
    body: { campaignId },
    method: "POST",
    token,
  });
}

export async function getApplicants(
  campaignId: number,
  token?: string,
  options: MockFallbackOptions = {},
): Promise<Applicant[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest(`/api/v1/applications/campaign/${campaignId}`, { token });
      return unwrapListResponse<ApplicationResponse>(response).map(adaptApplication);
    },
    () => mockCampaigns.find((c) => c.id === campaignId)?.applicants?.map(adaptApplication) ?? [],
    options,
  );
}

export async function getCampaignMissions(
  campaignId: number,
  token?: string,
  options: MockFallbackOptions = {},
): Promise<Mission[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest(`/api/v1/campaigns/${campaignId}/missions`, { token });
      return unwrapListResponse<MissionResponse>(response).map(adaptMission);
    },
    async () => {
      try {
        const applicants = await getApplicants(campaignId, token, options);
        return applicants
          .filter((a) => a.status === "approved")
          .map((a) => ({
            id: a.id,
            campaignId: campaignId,
            bloggerId: 0,
            campaignTitle: "캠페인 미션",
            brandName: a.name,
            thumbnailUrl: "/campaigns/seongsu-brunch-cafe.png",
            rewardPoint: 0,
            dueDate: a.appliedAt,
            status: "submitted" as const, // Default to submitted for testing review flow
          }));
      } catch {
        return [];
      }
    },
    options,
  );
}

export async function approveApplicant(
  campaignId: number,
  applicantId: number,
  token?: string,
): Promise<Mission> {
  // In the new API, we use applicationId (which is applicantId here)
  const response = await apiRequest<MissionActionResponse>(
    `/api/v1/applications/${applicantId}/accept`,
    {
      method: "PATCH",
      token,
    },
  );

  return adaptMissionAction(unwrapCommonResponse<MissionActionResponse>(response));
}

export async function rejectApplicant(
  campaignId: number,
  applicantId: number,
  token?: string,
): Promise<void> {
  await apiRequest(`/api/v1/applications/${applicantId}/reject`, {
    method: "PATCH",
    token,
  });
}

export async function approveAllApplicants(_campaignId: number, _token?: string): Promise<void> {
  // Not implemented in backend yet, but we could loop or just throw
  console.warn("approveAllApplicants is not supported by the backend yet.");
}

async function withMockFallback<T>(
  request: () => Promise<T>,
  fallback: () => T | Promise<T>,
  options: MockFallbackOptions = {},
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    const isForced = options.mockFallback === true;
    const isDisabled = options.mockFallback === false || isMockFallbackDisabled();

    if (!isForced && isDisabled) {
      throw error;
    }

    return await fallback();
  }
}
