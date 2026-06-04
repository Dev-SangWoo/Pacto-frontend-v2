import { describe, expect, it } from "vitest";

import {
  canSubmitMission,
  getMissionStatusView,
  isApplicationMission,
  missionProgressSteps,
} from "./mission-status";

describe("mission status policy", () => {
  it("in_progress 미션은 제출 가능 상태로 판단한다", () => {
    expect(canSubmitMission("in_progress")).toBe(true);
  });

  it("submitted 미션은 검수 중 상태로 표시한다", () => {
    expect(getMissionStatusView("submitted")).toEqual({ label: "제출 완료", tone: "grey" });
  });

  it("applied 미션은 대행사 승인 대기 상태로 표시한다", () => {
    expect(getMissionStatusView("applied")).toEqual({ label: "대기 중", tone: "grey" });
  });

  it("지원 단계에 사용하는 상태를 공통 정책으로 제공한다", () => {
    expect(isApplicationMission("applied")).toBe(true);
    expect(isApplicationMission("in_progress")).toBe(false);
  });

  it("미션 단계 프로그레스 순서를 반환한다", () => {
    expect(missionProgressSteps.map((step) => step.label)).toEqual([
      "신청",
      "대기",
      "승인/반려",
      "제출 중",
      "정산 완료",
    ]);
  });

  it("신청 단계는 미션 화면 목록에 포함하지 않는다", () => {
    expect(missionProgressSteps[0]?.statuses).toEqual([]);
  });

  it("승인된 미션은 제출 단계로 넘기고 반려된 지원은 승인/반려 단계에 남긴다", () => {
    const decisionStep = missionProgressSteps.find((step) => step.key === "decision");
    const submissionStep = missionProgressSteps.find((step) => step.key === "submission");

    expect(decisionStep?.statuses).toEqual(["application_rejected"]);
    expect(submissionStep?.statuses).toContain("not_started");
  });
});
