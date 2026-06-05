export type CampaignStatus = "draft" | "open" | "full" | "closed" | "completed" | "cancelled";

export type Campaign = {
  id: number;
  advertiserId: number;
  brandName: string;
  title: string;
  thumbnailUrl?: string;
  rewardPoint: number;
  recruitCount: number;
  approvedCount: number;
  applicantCount: number;
  totalSlots: number;
  remainingSlots: number;
  guidelines: string;
  deadline: string;
  status: CampaignStatus;
};
