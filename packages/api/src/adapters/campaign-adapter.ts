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
  | "RECRUITING"
  | "full";

export type CampaignResponse = {
  advertiser_id?: number;
  advertiserId?: number;
  applicantCount?: number;
  approvedCount?: number;
  campaign_id?: number;
  campaignId?: number;
  deadline?: string;
  guidelines?: unknown;
  guidelineImageUrls?: string[];
  guideline_image_urls?: string[];
  id?: number;
  advertiserName?: string;
  brandName?: string;
  companyName?: string;
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
    brandName:
      response.brandName?.trim() ||
      response.companyName?.trim() ||
      response.advertiserName?.trim() ||
      "Pacto",
    title: response.title ?? "캠페인",
    thumbnailUrl: response.thumbnailUrl ?? response.thumbnail_url ?? getFallbackThumbnail(id),
    rewardPoint: response.rewardPoint ?? response.reward_point ?? 0,
    recruitCount: totalSlots,
    approvedCount,
    applicantCount: response.applicantCount ?? 0,
    totalSlots,
    remainingSlots,
    guidelines: normalizeGuidelines(response.guidelines),
    guidelineImageUrls: response.guidelineImageUrls ?? response.guideline_image_urls ?? [],
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

function normalizeGuidelines(guidelines?: unknown): string {
  if (Array.isArray(guidelines)) {
    return guidelines.join("\n");
  }

  if (typeof guidelines === "object" && guidelines !== null) {
    if (isTiptapGuidelines(guidelines)) {
      return JSON.stringify(guidelines);
    }
    if ("items" in guidelines && Array.isArray(guidelines.items)) {
      return guidelines.items.join("\n");
    }
    if ("content" in guidelines && typeof guidelines.content === "string") {
      return guidelines.content;
    }
    if ("note" in guidelines && typeof guidelines.note === "string") {
      return guidelines.note;
    }
    return JSON.stringify(guidelines);
  }

  return typeof guidelines === "string" ? guidelines : "캠페인 가이드를 확인해 주세요.";
}

function isTiptapGuidelines(value: object): value is {
  content: { content?: unknown[]; type?: string };
  editor: "tiptap";
} {
  return (
    "editor" in value &&
    "content" in value &&
    (value as { editor?: unknown }).editor === "tiptap" &&
    typeof (value as { content?: unknown }).content === "object" &&
    (value as { content?: unknown }).content !== null
  );
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
    case "in_progress":
      return "in_progress";
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
