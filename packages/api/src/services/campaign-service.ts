import type { ApplicationResponse, Campaign, CampaignApplicant, Mission } from "@pacto/types";

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
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";
import type { CommonResponse } from "../client/http-client";

export type GetCampaignsParams = {
  page?: number;
  size?: number;
  sort?: string;
  status?: CampaignStatusResponse;
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
): Promise<Campaign[]> {
  const response = await apiRequest("/api/v1/campaigns", { query: params, token });

  return unwrapListResponse<CampaignResponse>(response).map(adaptCampaign);
}

export async function getCampaignDetail(
  campaignId: number,
  token?: string,
): Promise<Campaign | undefined> {
  const response = await apiRequest<CommonResponse<CampaignResponse> | CampaignResponse>(
    `/api/v1/campaigns/${campaignId}`,
    { token },
  );

  return adaptCampaign(unwrapCommonResponse<CampaignResponse>(response));
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

export async function closeCampaign(campaignId: number, token?: string) {
  return transitionCampaign(campaignId, "close", token);
}

export async function proceedCampaign(campaignId: number, token?: string) {
  return transitionCampaign(campaignId, "proceed", token);
}

export async function completeCampaign(campaignId: number, token?: string) {
  return transitionCampaign(campaignId, "complete", token);
}

export async function cancelCampaign(campaignId: number, token?: string) {
  return transitionCampaign(campaignId, "cancel", token);
}

async function transitionCampaign(
  campaignId: number,
  action: "cancel" | "close" | "complete" | "proceed",
  token?: string,
) {
  const response = await apiRequest<CreateCampaignResponse>(
    `/api/v1/campaigns/${campaignId}/${action}`,
    {
      method: "PATCH",
      token,
    },
  );
  const result = unwrapCommonResponse<CreateCampaignResponse>(response);

  return {
    id: adaptCreateCampaign(result).id,
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
): Promise<CampaignApplicant[]> {
  const response = await apiRequest(`/api/v1/applications/campaign/${campaignId}`, { token });
  return unwrapListResponse<ApplicationResponse>(response).map(adaptApplication);
}

export async function getCampaignMissions(campaignId: number, token?: string): Promise<Mission[]> {
  const response = await apiRequest(`/api/v1/campaigns/${campaignId}/missions`, { token });
  return unwrapListResponse<MissionResponse>(response).map(adaptMission);
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
