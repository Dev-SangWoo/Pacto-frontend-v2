export type CampaignStatus =
  | "draft"
  | "open"
  | "full"
  | "closed"
  | "completed"
  | "cancelled";

export type Campaign = {
  id: number;
  advertiserId: number;
  title: string;
  thumbnailUrl?: string;
  rewardPoint: number;
  guidelines: string;
  deadline: string;
  status: CampaignStatus;
};
