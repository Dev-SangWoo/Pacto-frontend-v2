import type { MissionStatus } from "@pacto/types";

type MissionStatusView = {
  label: string;
  tone: "blue" | "green" | "grey" | "red";
};

const missionStatusViewMap: Record<MissionStatus, MissionStatusView> = {
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
