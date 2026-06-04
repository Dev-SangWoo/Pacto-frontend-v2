import type { Mission, MissionStatus } from "@pacto/types";

export type MissionResponse = Omit<Partial<Mission>, "status"> & {
  missionId?: number;
  status?:
    | MissionStatus
    | "APPROVED"
    | "APPLICATION_REJECTED"
    | "IN_PROGRESS"
    | "NOT_STARTED"
    | "PENDING"
    | "REJECTED"
    | "SUBMITTED";
};

export function adaptMission(response: MissionResponse): Mission {
  return {
    id: response.id ?? response.missionId ?? 0,
    campaignId: response.campaignId ?? 0,
    bloggerId: response.bloggerId ?? 0,
    campaignTitle: response.campaignTitle ?? "미션",
    brandName: response.brandName ?? "Pacto",
    thumbnailUrl:
      response.thumbnailUrl ?? getFallbackThumbnail(response.campaignId ?? response.missionId),
    rewardPoint: response.rewardPoint ?? 0,
    dueDate: response.dueDate ?? new Date().toISOString(),
    submittedUrl: response.submittedUrl,
    reason: response.reason,
    status: mapMissionStatus(response.status),
  };
}

function getFallbackThumbnail(id?: number): string {
  const thumbnails = [
    "/campaigns/seongsu-brunch-cafe.png",
    "/campaigns/hongdae-nail-studio.png",
    "/campaigns/jamsil-fitness-lounge.png",
  ];
  const index = id == null ? 0 : Math.abs(id - 1) % thumbnails.length;

  return thumbnails[index] ?? thumbnails[0];
}

function mapMissionStatus(status: MissionResponse["status"]): MissionStatus {
  switch (status) {
    case "PENDING":
    case "applied":
      return "applied";
    case "APPLICATION_REJECTED":
    case "application_rejected":
      return "application_rejected";
    case "NOT_STARTED":
    case "not_started":
      return "not_started";
    case "IN_PROGRESS":
    case "in_progress":
      return "in_progress";
    case "SUBMITTED":
    case "submitted":
      return "submitted";
    case "APPROVED":
    case "approved":
      return "approved";
    case "REJECTED":
    case "rejected":
      return "rejected";
    default:
      return "in_progress";
  }
}
