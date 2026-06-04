import type { Campaign, CampaignStatus } from "@pacto/types";

export type CampaignResponse = Omit<Partial<Campaign>, "status"> & {
  campaignId?: number;
  status?:
    | CampaignStatus
    | "CANCELED"
    | "CLOSED"
    | "COMPLETED"
    | "DRAFT"
    | "FULL"
    | "IN_PROGRESS"
    | "RECRUITING";
};

export function adaptCampaign(response: CampaignResponse): Campaign {
  return {
    id: response.id ?? response.campaignId ?? 0,
    advertiserId: response.advertiserId ?? 0,
    brandName: response.brandName ?? "Pacto",
    title: response.title ?? "캠페인",
    thumbnailUrl: response.thumbnailUrl ?? getFallbackThumbnail(response.id ?? response.campaignId),
    rewardPoint: response.rewardPoint ?? 0,
    recruitCount: response.recruitCount ?? 0,
    approvedCount: response.approvedCount ?? 0,
    applicantCount: response.applicantCount ?? 0,
    guidelines: response.guidelines ?? "캠페인 가이드를 확인해 주세요.",
    deadline: response.deadline ?? new Date().toISOString(),
    status: mapCampaignStatus(response.status),
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

function mapCampaignStatus(status: CampaignResponse["status"]): CampaignStatus {
  switch (status) {
    case "DRAFT":
    case "draft":
      return "draft";
    case "RECRUITING":
    case "open":
      return "open";
    case "IN_PROGRESS":
      return "full";
    case "FULL":
    case "full":
      return "full";
    case "CLOSED":
    case "closed":
      return "closed";
    case "COMPLETED":
    case "completed":
      return "completed";
    case "CANCELED":
    case "cancelled":
      return "cancelled";
    default:
      return "open";
  }
}
