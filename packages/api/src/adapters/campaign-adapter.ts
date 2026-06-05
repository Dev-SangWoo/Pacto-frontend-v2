import type { Campaign, CampaignStatus } from "@pacto/types";

export type CampaignStatusResponse =
  | CampaignStatus
  | "CANCELED"
  | "CANCELLED"
  | "CLOSED"
  | "COMPLETED"
  | "DRAFT"
  | "FULL"
  | "IN_PROGRESS"
  | "RECRUITING";

export type CampaignResponse = {
  advertiser_id?: number;
  advertiserId?: number;
  applicantCount?: number;
  approvedCount?: number;
  campaign_id?: number;
  campaignId?: number;
  deadline?: string;
  guidelines?: string | string[];
  id?: number;
  recruitCount?: number;
  remaining_slots?: number;
  remainingSlots?: number;
  reward_point?: number;
  rewardPoint?: number;
  status?: CampaignStatusResponse;
  thumbnail_url?: string;
  thumbnailUrl?: string;
  title?: string;
  total_slots?: number;
  totalSlots?: number;
};

export type CreateCampaignResponse = {
  campaign_id?: number;
  campaignId?: number;
  remainingSlots?: number;
  status?: CampaignStatusResponse;
  totalSlots?: number;
};

export function adaptCampaign(response: CampaignResponse): Campaign {
  const id = response.id ?? response.campaignId ?? response.campaign_id ?? 0;
  const totalSlots = response.totalSlots ?? response.total_slots ?? response.recruitCount ?? 0;
  const remainingSlots =
    response.remainingSlots ??
    response.remaining_slots ??
    Math.max(totalSlots - (response.approvedCount ?? 0), 0);
  const approvedCount =
    response.approvedCount ??
    (totalSlots > 0 && remainingSlots >= 0 ? Math.max(totalSlots - remainingSlots, 0) : 0);

  return {
    id,
    advertiserId: response.advertiserId ?? response.advertiser_id ?? 0,
    brandName: "Pacto",
    title: response.title ?? "캠페인",
    thumbnailUrl: response.thumbnailUrl ?? response.thumbnail_url ?? getFallbackThumbnail(id),
    rewardPoint: response.rewardPoint ?? response.reward_point ?? 0,
    recruitCount: totalSlots,
    approvedCount,
    applicantCount: response.applicantCount ?? 0,
    totalSlots,
    remainingSlots,
    guidelines: normalizeGuidelines(response.guidelines),
    deadline: response.deadline ?? new Date().toISOString(),
    status: mapCampaignStatus(response.status),
  };
}

export function adaptCreateCampaign(
  response: CreateCampaignResponse,
): Pick<Campaign, "id" | "status"> {
  return {
    id: response.campaignId ?? response.campaign_id ?? 0,
    status: mapCampaignStatus(response.status),
  };
}

function normalizeGuidelines(guidelines?: string | string[]): string {
  if (Array.isArray(guidelines)) {
    return guidelines.join("\n");
  }

  return guidelines ?? "캠페인 가이드를 확인해 주세요.";
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

export function mapCampaignStatus(status: CampaignResponse["status"]): CampaignStatus {
  switch (status) {
    case "DRAFT":
    case "draft":
      return "draft";
    case "RECRUITING":
    case "open":
      return "open";
    case "IN_PROGRESS":
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
    case "CANCELLED":
    case "cancelled":
      return "cancelled";
    default:
      return "open";
  }
}
