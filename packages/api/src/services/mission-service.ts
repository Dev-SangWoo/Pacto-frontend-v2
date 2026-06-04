import type { Mission } from "@pacto/types";

import { adaptMission } from "../adapters/mission-adapter";
import type { MissionResponse } from "../adapters/mission-adapter";
import { isMockFallbackDisabled } from "../client/env";
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";
import { mockMissions } from "../mocks/data";

export type GetMyMissionsParams = {
  bloggerId?: number;
  status?: string;
};

export type SubmitMissionPayload = {
  submittedUrl: string;
};

export type CancelMissionPayload = {
  reason: string;
};

export async function getMyMissions(params: GetMyMissionsParams = {}): Promise<Mission[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/missions/me", { query: params });

      return unwrapListResponse<MissionResponse>(response).map(adaptMission);
    },
    () => mockMissions.map(adaptMission),
  );
}

export async function getMissionDetail(
  missionId: number,
  params: GetMyMissionsParams = {},
): Promise<Mission | undefined> {
  const missions = await getMyMissions(params);

  return missions.find((item) => item.id === missionId);
}

export async function submitMission(
  missionId: number,
  payload: SubmitMissionPayload,
  token?: string,
): Promise<Mission> {
  const response = await apiRequest<MissionResponse>(`/api/v1/missions/${missionId}/submit`, {
    body: payload,
    method: "PATCH",
    token,
  });

  return adaptMission(unwrapCommonResponse<MissionResponse>(response));
}

export async function approveMission(missionId: number, token?: string): Promise<Mission> {
  const response = await apiRequest<MissionResponse>(`/api/v1/missions/${missionId}/approve`, {
    method: "PATCH",
    token,
  });

  return adaptMission(unwrapCommonResponse<MissionResponse>(response));
}

export async function cancelMission(
  missionId: number,
  payload: CancelMissionPayload,
  token?: string,
): Promise<Mission> {
  const response = await apiRequest<MissionResponse>(`/api/v1/missions/${missionId}/cancel`, {
    body: payload,
    method: "PATCH",
    token,
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
