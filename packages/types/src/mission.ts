export type MissionStatus = "in_progress" | "submitted" | "approved" | "rejected" | "cancelled";

export type Mission = {
  id: number;
  campaignId: number;
  bloggerId: number;
  escrowId: number;
  campaignTitle: string;
  brandName: string;
  thumbnailUrl: string;
  rewardPoint: number;
  approvalDueDate?: string;
  dueDate: string;
  settledAt?: string;
  submittedUrl?: string;
  reason?: string;
  status: MissionStatus;
};
