import type { MissionStatus } from "@pacto/types";

type MissionStatusView = {
  label: string;
  tone: "amber" | "blue" | "green" | "grey" | "red";
};

export type MissionProgressStep = {
  key: "progress" | "submission" | "settlement" | "rejection" | "cancellation";
  label: string;
  statuses: MissionStatus[];
};

export const missionProgressSteps: MissionProgressStep[] = [
  {
    key: "progress",
    label: "진행",
    statuses: ["in_progress"],
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
  {
    key: "rejection",
    label: "반려",
    statuses: ["rejected"],
  },
  {
    key: "cancellation",
    label: "취소",
    statuses: ["cancelled"],
  },
];

const missionStatusViewMap: Record<MissionStatus, MissionStatusView> = {
  in_progress: { label: "리뷰 작성 중", tone: "blue" },
  submitted: { label: "검수 대기", tone: "amber" },
  approved: { label: "정산 완료", tone: "green" },
  rejected: { label: "미션 반려", tone: "red" },
  cancelled: { label: "미션 취소", tone: "red" },
};

export function getMissionStatusView(status: MissionStatus): MissionStatusView {
  return missionStatusViewMap[status];
}

export function canSubmitMission(status: MissionStatus): boolean {
  return status === "in_progress";
}
