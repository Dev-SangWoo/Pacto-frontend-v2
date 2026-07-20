import type { Campaign } from "@pacto/types";

export const CAMPAIGN_DISCOVERY_CATEGORIES = [
  "전체",
  "일상·리뷰",
  "여행",
  "뷰티",
  "푸드",
  "IT·기기",
] as const;

export type CampaignDiscoveryCategory = (typeof CAMPAIGN_DISCOVERY_CATEGORIES)[number];

export type CampaignDiscoveryBadge = {
  label: "진행중" | "마감 임박";
  tone: "active" | "closing";
};

const CATEGORY_KEYWORDS: Record<Exclude<CampaignDiscoveryCategory, "전체">, string[]> = {
  "일상·리뷰": ["일상", "리뷰", "체험", "후기", "블로그"],
  여행: ["여행", "숙박", "호텔", "펜션", "관광", "지역"],
  뷰티: ["뷰티", "네일", "헤어", "살롱", "화장품", "미용", "스킨케어"],
  푸드: ["맛집", "식당", "카페", "브런치", "디저트", "푸드", "외식"],
  "IT·기기": ["IT", "기기", "노트북", "태블릿", "스마트폰", "가전", "디지털"],
};

const CLOSING_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const FALLBACK_MISSION_COPY = "캠페인 상세에서 수행 미션을 확인해 주세요.";

export function getCampaignDiscoveryBadge(
  campaign: Campaign,
  now = new Date(),
): CampaignDiscoveryBadge {
  const deadlineMs = new Date(campaign.deadline).getTime();
  const remainingMs = deadlineMs - now.getTime();

  if (Number.isFinite(deadlineMs) && remainingMs >= 0 && remainingMs <= CLOSING_WINDOW_MS) {
    return { label: "마감 임박", tone: "closing" };
  }

  return { label: "진행중", tone: "active" };
}

export function getCampaignSummaryText(guidelines: string): string {
  const normalized = guidelines.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return FALLBACK_MISSION_COPY;
  }

  const firstSentence = normalized.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim();
  return firstSentence ?? normalized;
}

export function matchesCampaignDiscoveryCategory(
  campaign: Campaign,
  category: CampaignDiscoveryCategory,
): boolean {
  if (category === "전체") {
    return true;
  }

  const haystack = `${campaign.title} ${campaign.brandName} ${campaign.guidelines}`.toLowerCase();

  return CATEGORY_KEYWORDS[category].some((keyword) => haystack.includes(keyword.toLowerCase()));
}

export function matchesCampaignSearch(campaign: Campaign, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [campaign.title, campaign.brandName, campaign.guidelines].some((value) =>
    value.toLowerCase().includes(normalizedQuery),
  );
}
