export type MissionStatus =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

export type Mission = {
  id: number;
  campaignId: number;
  bloggerId: number;
  submittedUrl?: string;
  reason?: string;
  status: MissionStatus;
};
