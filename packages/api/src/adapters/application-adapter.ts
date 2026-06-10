import type {
  Applicant,
  ApplicantStatus,
  ApplicationResponse,
  ApplicationStatusResponse,
  Mission,
  MissionStatus,
} from "@pacto/types";

export function adaptApplication(response: ApplicationResponse): Applicant {
  return {
    id: response.applicationId,
    name: response.bloggerEmail?.split("@")[0] || "블로거",
    blogUrl: `https://blog.naver.com/${response.bloggerEmail?.split("@")[0] || ""}`,
    status: mapApplicationStatus(response.status),
    fitScore: "보통",
    appliedAt: response.createdAt,
  };
}

export function adaptApplicationToMission(response: ApplicationResponse): Mission {
  return {
    id: response.applicationId,
    campaignId: response.campaignId,
    bloggerId: response.bloggerId,
    campaignTitle: `캠페인 #${response.campaignId}`, // Note: Backend list doesn't have title
    brandName: "Pacto",
    thumbnailUrl: getFallbackThumbnail(response.campaignId),
    rewardPoint: 0, // Note: Backend list doesn't have rewardPoint
    dueDate: response.createdAt,
    status: mapApplicationStatusToMissionStatus(response.status),
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

export function mapApplicationStatus(status: ApplicationStatusResponse): ApplicantStatus {
  switch (status) {
    case "PENDING":
      return "pending";
    case "ACCEPTED":
      return "approved";
    case "REJECTED":
      return "rejected";
    case "CANCELLED":
      return "rejected";
    default:
      return "pending";
  }
}

export function mapApplicationStatusToMissionStatus(
  status: ApplicationStatusResponse,
): MissionStatus {
  switch (status) {
    case "PENDING":
      return "applied";
    case "REJECTED":
    case "CANCELLED":
      return "application_rejected";
    case "ACCEPTED":
      return "not_started";
    default:
      return "applied";
  }
}
