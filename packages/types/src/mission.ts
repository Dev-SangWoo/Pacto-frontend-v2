export type MissionStatus =
  | "applied"
  | "application_rejected"
  | "not_started"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

export type Mission = {
  id: number;
  campaignId: number;
  bloggerId: number;
  campaignTitle: string;
  brandName: string;
  thumbnailUrl: string;
  rewardPoint: number;
  dueDate: string;
  submittedUrl?: string;
  reason?: string;
  status: MissionStatus;
};
