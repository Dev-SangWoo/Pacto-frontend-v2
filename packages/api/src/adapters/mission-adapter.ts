import type { Mission, MissionStatus } from "@pacto/types";

export type MissionStatusResponse =
  | MissionStatus
  | "APPROVED"
  | "CANCELLED"
  | "IN_PROGRESS"
  | "READY"
  | "REJECTED"
  | "SUBMITTED";

export type MissionResponse = {
  approvalDueDate?: string;
  bloggerId?: number;
  campaign_id?: number;
  campaignId?: number;
  campaignTitle?: string;
  created_at?: string;
  dueDate?: string;
  escrow_id?: number;
  escrowId?: number;
  id?: number;
  mission_id?: number;
  missionId?: number;
  reason?: string;
  rewardPoint?: number;
  settledAt?: string;
  status?: MissionStatusResponse;
  submitted_url?: string | null;
  submittedUrl?: string | null;
  thumbnailUrl?: string;
  updated_at?: string;
};

export type MissionActionResponse = {
  escrow_status?: "CANCELED" | "LOCKED" | "RELEASED";
  mission_id?: number;
  missionId?: number;
  status?: MissionStatusResponse;
  submitted_url?: string | null;
  submittedUrl?: string | null;
};

export function adaptMission(response: MissionResponse): Mission {
  const id = response.id ?? response.missionId ?? response.mission_id ?? 0;
  const campaignId = response.campaignId ?? response.campaign_id ?? 0;

  return {
    id,
    campaignId,
    bloggerId: response.bloggerId ?? 0,
    escrowId: response.escrowId ?? response.escrow_id ?? 0,
    campaignTitle: response.campaignTitle ?? `캠페인 #${campaignId}`,
    brandName: `광고주 #${campaignId}`,
    thumbnailUrl: response.thumbnailUrl ?? getFallbackThumbnail(campaignId || id),
    rewardPoint: response.rewardPoint ?? 0,
    approvalDueDate: response.approvalDueDate,
    dueDate:
      response.dueDate ?? response.updated_at ?? response.created_at ?? new Date().toISOString(),
    settledAt: response.settledAt,
    submittedUrl: response.submittedUrl ?? response.submitted_url ?? undefined,
    reason: response.reason,
    status: mapMissionStatus(response.status),
  };
}

export function adaptMissionAction(response: MissionActionResponse): Mission {
  return adaptMission({
    mission_id: response.mission_id ?? response.missionId,
    status: response.status,
    submitted_url: response.submitted_url ?? response.submittedUrl,
  });
}

function getFallbackThumbnail(id?: number): string {
  const thumbnails = [
    "/campaigns/seongsu-brunch-cafe.webp",
    "/campaigns/hongdae-nail-studio.webp",
    "/campaigns/jamsil-fitness-lounge.webp",
  ];
  const index = id == null ? 0 : Math.abs(id - 1) % thumbnails.length;

  return thumbnails[index] ?? thumbnails[0];
}

export function mapMissionStatus(status: MissionResponse["status"]): MissionStatus {
  switch (status) {
    case "READY":
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
    case "CANCELLED":
    case "cancelled":
      return "cancelled";
    default:
      return "in_progress";
  }
}
