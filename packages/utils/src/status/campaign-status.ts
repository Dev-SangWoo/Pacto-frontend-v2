import type { CampaignStatus } from "@pacto/types";

type CampaignStatusView = {
  label: string;
  tone: "blue" | "green" | "grey" | "red";
};

const campaignStatusViewMap: Record<CampaignStatus, CampaignStatusView> = {
  draft: { label: "임시 저장", tone: "grey" },
  open: { label: "모집 중", tone: "blue" },
  full: { label: "모집 완료", tone: "grey" },
  closed: { label: "마감", tone: "grey" },
  completed: { label: "완료", tone: "green" },
  cancelled: { label: "취소", tone: "red" },
};

export function getCampaignStatusView(status: CampaignStatus): CampaignStatusView {
  return campaignStatusViewMap[status];
}

export function canApplyToCampaign(status: CampaignStatus): boolean {
  return status === "open";
}
