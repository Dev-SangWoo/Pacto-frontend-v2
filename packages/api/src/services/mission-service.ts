import type { Mission } from "@pacto/types";

import { adaptMission, adaptMissionAction } from "../adapters/mission-adapter";
import type {
  MissionActionResponse,
  MissionResponse,
  MissionStatusResponse,
} from "../adapters/mission-adapter";
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";

export type GetMyMissionsParams = {
  status?: MissionStatusResponse;
};

export type SubmitMissionPayload = {
  submittedUrl?: string;
  submitted_url?: string;
};

export type CancelMissionPayload = {
  reason: string;
};

export async function getMyMissions(
  params: GetMyMissionsParams = {},
  token?: string,
): Promise<Mission[]> {
  const response = await apiRequest("/api/v1/missions/me", { query: params, token });

  return unwrapListResponse<MissionResponse>(response).map(adaptMission);
}

export async function getMissionDetail(
  missionId: number,
  params: GetMyMissionsParams = {},
  token?: string,
): Promise<Mission | undefined> {
  const missions = await getMyMissions(params, token);

  return missions.find((item) => item.id === missionId);
}

export async function submitMission(
  missionId: number,
  payload: SubmitMissionPayload,
  token?: string,
): Promise<Mission> {
  const response = await apiRequest<MissionActionResponse>(`/api/v1/missions/${missionId}/submit`, {
    body: { submittedUrl: payload.submittedUrl ?? payload.submitted_url },
    method: "PATCH",
    token,
  });

  return adaptMissionAction(unwrapCommonResponse<MissionActionResponse>(response));
}

export async function approveMission(missionId: number, token?: string): Promise<Mission> {
  const response = await apiRequest<MissionActionResponse>(
    `/api/v1/missions/${missionId}/approve`,
    {
      method: "PATCH",
      token,
    },
  );

  return adaptMissionAction(unwrapCommonResponse<MissionActionResponse>(response));
}

export async function cancelMission(
  missionId: number,
  payload?: CancelMissionPayload,
  token?: string,
): Promise<Mission> {
  const response = await apiRequest<MissionActionResponse>(`/api/v1/missions/${missionId}/cancel`, {
    body: payload,
    method: "PATCH",
    token,
  });

  return adaptMissionAction(unwrapCommonResponse<MissionActionResponse>(response));
}

export async function rejectMission(missionId: number, token?: string): Promise<Mission> {
  const response = await apiRequest<MissionActionResponse>(`/api/v1/missions/${missionId}/reject`, {
    method: "PATCH",
    token,
  });

  return adaptMissionAction(unwrapCommonResponse<MissionActionResponse>(response));
}
