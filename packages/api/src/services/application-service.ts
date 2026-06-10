import type { Applicant, ApplicationResponse, Mission } from "@pacto/types";

import { adaptApplication, adaptApplicationToMission } from "../adapters/application-adapter";
import { adaptMissionAction } from "../adapters/mission-adapter";
import type { MissionActionResponse } from "../adapters/mission-adapter";
import { isMockFallbackDisabled } from "../client/env";
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";

export type ApplyPayload = {
  campaignId: number;
};

type MockFallbackOptions = {
  mockFallback?: boolean;
};

export async function applyToCampaign(payload: ApplyPayload, token?: string): Promise<void> {
  await apiRequest("/api/v1/applications", {
    body: payload,
    method: "POST",
    token,
  });
}

export async function getApplicants(campaignId: number, token?: string): Promise<Applicant[]> {
  const response = await apiRequest(`/api/v1/applications/campaign/${campaignId}`, { token });
  return unwrapListResponse<ApplicationResponse>(response).map(adaptApplication);
}

export async function getMyApplications(
  token?: string,
  options: MockFallbackOptions = {},
): Promise<Applicant[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/applications/me", { token });
      return unwrapListResponse<ApplicationResponse>(response).map(adaptApplication);
    },
    () => [],
    options,
  );
}

export async function getMyApplicationsAsMissions(
  token?: string,
  options: MockFallbackOptions = {},
): Promise<Mission[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/applications/me", { token });
      // Filter out ACCEPTED applications because they already exist as Missions
      return unwrapListResponse<ApplicationResponse>(response)
        .filter((app) => app.status !== "ACCEPTED")
        .map(adaptApplicationToMission);
    },
    () => [],
    options,
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
