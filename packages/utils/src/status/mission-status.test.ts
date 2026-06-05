import { describe, expect, it } from "vitest";

import {
  canSubmitMission,
  getMissionStatusView,
  isApplicationMission,
  missionProgressSteps,
} from "./mission-status";

describe("mission status policy", () => {
  it("in_progress 미션은 제출 가능한 상태로 판단한다", () => {
    expect(canSubmitMission("in_progress")).toBe(true);
  });

  it("submitted 미션은 제출 완료 상태로 표시한다", () => {
    expect(getMissionStatusView("submitted")).toEqual({ label: "제출 완료", tone: "grey" });
  });

  it("applied 미션은 신청 완료 상태로 표시한다", () => {
    expect(getMissionStatusView("applied")).toEqual({ label: "신청 완료", tone: "grey" });
  });

  it("approved 미션은 정산 완료 상태로 표시한다", () => {
    expect(getMissionStatusView("approved")).toEqual({ label: "정산 완료", tone: "green" });
  });

  it("신청 단계에서 사용하는 상태를 공통 정책으로 제공한다", () => {
    expect(isApplicationMission("applied")).toBe(true);
    expect(isApplicationMission("in_progress")).toBe(false);
  });

  it("미션 단계 프로그레스 순서를 반환한다", () => {
    expect(missionProgressSteps.map((step) => step.label)).toEqual([
      "신청",
      "승인",
      "반려",
      "제출",
      "정산",
    ]);
  });

  it("승인 단계에는 승인받고 수행 중인 미션 상태를 포함한다", () => {
    const waitingStep = missionProgressSteps.find((step) => step.key === "waiting");

    expect(waitingStep?.statuses).toEqual(["not_started", "in_progress"]);
  });

  it("반려 단계에는 신청 반려와 미션 반려 상태를 포함한다", () => {
    const decisionStep = missionProgressSteps.find((step) => step.key === "decision");

    expect(decisionStep?.statuses).toEqual(["application_rejected", "rejected"]);
  });
});
