import type { MissionStatus } from "@pacto/types";

type MissionStatusView = {
  label: string;
  tone: "blue" | "green" | "grey" | "red";
};

export type MissionProgressStep = {
  key: "progress" | "submission" | "settlement" | "rejection" | "cancellation";
  label: string;
  statuses: MissionStatus[];
};

export const missionProgressSteps: MissionProgressStep[] = [
  {
    key: "progress",
    label: "\uc9c4\ud589",
    statuses: ["in_progress"],
  },
  {
    key: "submission",
    label: "\uc81c\ucd9c",
    statuses: ["submitted"],
  },
  {
    key: "settlement",
    label: "\uc815\uc0b0",
    statuses: ["approved"],
  },
  {
    key: "rejection",
    label: "\ubc18\ub824",
    statuses: ["rejected"],
  },
  {
    key: "cancellation",
    label: "\ucde8\uc18c",
    statuses: ["cancelled"],
  },
];

const missionStatusViewMap: Record<MissionStatus, MissionStatusView> = {
  in_progress: { label: "리뷰 작성 중", tone: "blue" },
  submitted: { label: "검수 대기", tone: "grey" },
  approved: { label: "\uc815\uc0b0 \uc644\ub8cc", tone: "green" },
  rejected: { label: "\ubbf8\uc158 \ubc18\ub824", tone: "red" },
  cancelled: { label: "\ubbf8\uc158 \ucde8\uc18c", tone: "red" },
};

export function getMissionStatusView(status: MissionStatus): MissionStatusView {
  return missionStatusViewMap[status];
}

export function canSubmitMission(status: MissionStatus): boolean {
  return status === "in_progress";
}
