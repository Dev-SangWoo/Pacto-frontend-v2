import type { Campaign, EscrowLedger, Mission, Wallet } from "@pacto/types";

export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    advertiserId: 101,
    brandName: "성수 브런치 카페",
    title: "성수동 브런치 카페 체험단",
    thumbnailUrl: "/campaigns/seongsu-brunch-cafe.png",
    rewardPoint: 50000,
    recruitCount: 12,
    approvedCount: 7,
    applicantCount: 18,
    guidelines: "방문 후 7일 이내 블로그 리뷰를 작성해 주세요.",
    deadline: "2026-06-30T23:59:59",
    status: "open",
  },
  {
    id: 2,
    advertiserId: 102,
    brandName: "홍대 네일 스튜디오",
    title: "홍대 네일샵 신규 오픈 리뷰",
    thumbnailUrl: "/campaigns/hongdae-nail-studio.png",
    rewardPoint: 40000,
    recruitCount: 8,
    approvedCount: 8,
    applicantCount: 21,
    guidelines: "시술 사진 3장 이상과 가격 정보를 포함해 주세요.",
    deadline: "2026-06-20T23:59:59",
    status: "full",
  },
  {
    id: 3,
    advertiserId: 103,
    brandName: "잠실 피트니스 라운지",
    title: "프리미엄 PT 체험 리뷰",
    thumbnailUrl: "/campaigns/jamsil-fitness-lounge.png",
    rewardPoint: 70000,
    recruitCount: 6,
    approvedCount: 2,
    applicantCount: 9,
    guidelines: "체험 과정과 시설 사진을 포함해 1,500자 이상 작성해 주세요.",
    deadline: "2026-07-05T23:59:59",
    status: "open",
  },
];

export const mockMissions: Mission[] = [
  {
    id: 1,
    campaignId: 1,
    bloggerId: 201,
    campaignTitle: "성수동 브런치 카페 체험단",
    brandName: "성수 브런치 카페",
    thumbnailUrl: "/campaigns/seongsu-brunch-cafe.png",
    rewardPoint: 50000,
    dueDate: "2026-07-07T23:59:59",
    status: "in_progress",
  },
  {
    id: 2,
    campaignId: 2,
    bloggerId: 201,
    campaignTitle: "홍대 네일샵 신규 오픈 리뷰",
    brandName: "홍대 네일 스튜디오",
    thumbnailUrl: "/campaigns/hongdae-nail-studio.png",
    rewardPoint: 40000,
    dueDate: "2026-06-27T23:59:59",
    submittedUrl: "https://blog.example.com/review/2",
    status: "submitted",
  },
  {
    id: 3,
    campaignId: 3,
    bloggerId: 201,
    campaignTitle: "프리미엄 PT 체험 리뷰",
    brandName: "잠실 피트니스 라운지",
    thumbnailUrl: "/campaigns/jamsil-fitness-lounge.png",
    rewardPoint: 70000,
    dueDate: "2026-07-12T23:59:59",
    status: "applied",
  },
];

export const mockWallet: Wallet = {
  id: 1,
  availableBalance: 50000,
  lockedBalance: 10000,
  totalEarned: 140000,
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
