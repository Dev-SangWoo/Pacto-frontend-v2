import type { Campaign, EscrowLedger, Mission, Wallet } from "@pacto/types";

export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    advertiserId: 101,
    title: "성수동 브런치 카페 체험단",
    thumbnailUrl: "https://example.com/campaigns/cafe.jpg",
    rewardPoint: 50000,
    guidelines: "방문 후 7일 이내 블로그 리뷰를 작성해 주세요.",
    deadline: "2026-06-30T23:59:59",
    status: "open",
  },
  {
    id: 2,
    advertiserId: 102,
    title: "홍대 네일샵 신규 오픈 리뷰",
    thumbnailUrl: "https://example.com/campaigns/nail.jpg",
    rewardPoint: 40000,
    guidelines: "시술 사진 3장 이상과 가격 정보를 포함해 주세요.",
    deadline: "2026-06-20T23:59:59",
    status: "full",
  },
];

export const mockMissions: Mission[] = [
  {
    id: 1,
    campaignId: 1,
    bloggerId: 201,
    status: "in_progress",
  },
  {
    id: 2,
    campaignId: 2,
    bloggerId: 201,
    submittedUrl: "https://blog.example.com/review/2",
    status: "submitted",
  },
];

export const mockWallet: Wallet = {
  id: 1,
  availableBalance: 50000,
  lockedBalance: 10000,
  updatedAt: "2026-05-19T10:00:00",
};

export const mockEscrows: EscrowLedger[] = [
  {
    id: 1,
    campaignId: 1,
    amount: 50000,
    status: "locked",
    createdAt: "2026-05-26T10:00:00",
  },
  {
    id: 2,
    campaignId: 2,
    amount: 40000,
    status: "paid",
    createdAt: "2026-05-27T10:00:00",
  },
];
