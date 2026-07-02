import type { ApplicationResponse, CampaignApplicant, Mission } from "@pacto/types";

import { adaptApplication } from "../adapters/application-adapter";
import { adaptMissionAction } from "../adapters/mission-adapter";
import type { MissionActionResponse } from "../adapters/mission-adapter";
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";

export type ApplyPayload = {
  campaignId: number;
};

export async function applyToCampaign(payload: ApplyPayload, token?: string): Promise<void> {
  await apiRequest("/api/v1/applications", {
    body: payload,
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

export async function getMyApplications(token?: string): Promise<CampaignApplicant[]> {
  const response = await apiRequest("/api/v1/applications/me", { token });
  return unwrapListResponse<ApplicationResponse>(response).map(adaptApplication);
}

export async function getMyApplicationResponses(token?: string): Promise<ApplicationResponse[]> {
  const response = await apiRequest("/api/v1/applications/me", { token });
  return unwrapListResponse<ApplicationResponse>(response);
}

export async function getMyApplicationByCampaign(
  campaignId: number,
  token?: string,
): Promise<ApplicationResponse | undefined> {
  const response = await apiRequest("/api/v1/applications/me", { token });
  return unwrapListResponse<ApplicationResponse>(response).find(
    (application) => application.campaignId === campaignId,
  );
}

export async function approveApplication(applicationId: number, token?: string): Promise<Mission> {
  const response = await apiRequest<MissionActionResponse>(
    `/api/v1/applications/${applicationId}/accept`,
    {
      method: "PATCH",
      token,
    },
  );

  return adaptMissionAction(unwrapCommonResponse<MissionActionResponse>(response));
}

export async function rejectApplication(applicationId: number, token?: string): Promise<void> {
  await apiRequest(`/api/v1/applications/${applicationId}/reject`, {
    method: "PATCH",
    token,
  });
}

export async function cancelApplication(applicationId: number, token?: string): Promise<void> {
  await apiRequest(`/api/v1/applications/${applicationId}/cancel`, {
    method: "PATCH",
    token,
  });
}
