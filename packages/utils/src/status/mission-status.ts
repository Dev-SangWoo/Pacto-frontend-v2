import type { MissionStatus } from "@pacto/types";

type MissionStatusView = {
  label: string;
  tone: "blue" | "green" | "grey" | "red";
};

export type MissionProgressStep = {
  key: "application" | "waiting" | "decision" | "submission" | "settlement";
  label: string;
  statuses: MissionStatus[];
};

export const missionProgressSteps: MissionProgressStep[] = [
  {
    key: "application",
    label: "신청",
    statuses: ["applied"],
  },
  {
    key: "waiting",
    label: "승인",
    statuses: ["not_started", "in_progress"],
  },
  {
    key: "decision",
    label: "반려",
    statuses: ["application_rejected", "rejected"],
  },
  {
    key: "submission",
    label: "제출",
    statuses: ["submitted"],
  },
  {
    key: "settlement",
    label: "정산",
    statuses: ["approved"],
  },
];

const missionStatusViewMap: Record<MissionStatus, MissionStatusView> = {
  applied: { label: "신청 완료", tone: "grey" },
  application_rejected: { label: "신청 반려", tone: "red" },
  not_started: { label: "승인 완료", tone: "blue" },
  in_progress: { label: "진행 중", tone: "blue" },
  submitted: { label: "제출 완료", tone: "grey" },
  approved: { label: "정산 완료", tone: "green" },
  rejected: { label: "미션 반려", tone: "red" },
};

export function getMissionStatusView(status: MissionStatus): MissionStatusView {
  return missionStatusViewMap[status];
}

export function canSubmitMission(status: MissionStatus): boolean {
  return status === "in_progress";
}

export function isApplicationMission(status: MissionStatus): boolean {
  return status === "applied" || status === "application_rejected";
}
