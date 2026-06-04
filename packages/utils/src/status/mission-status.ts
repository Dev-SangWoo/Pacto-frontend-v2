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
    statuses: [],
  },
  {
    key: "waiting",
    label: "대기",
    statuses: ["applied"],
  },
  {
    key: "decision",
    label: "승인/반려",
    statuses: ["application_rejected"],
  },
  {
    key: "submission",
    label: "제출 중",
    statuses: ["not_started", "in_progress", "submitted", "rejected"],
  },
  {
    key: "settlement",
    label: "정산 완료",
    statuses: ["approved"],
  },
];

const missionStatusViewMap: Record<MissionStatus, MissionStatusView> = {
  applied: { label: "대기 중", tone: "grey" },
  application_rejected: { label: "지원 반려", tone: "red" },
  not_started: { label: "시작 전", tone: "grey" },
  in_progress: { label: "진행 중", tone: "blue" },
  submitted: { label: "제출 완료", tone: "grey" },
  approved: { label: "승인됨", tone: "green" },
  rejected: { label: "반려됨", tone: "red" },
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
