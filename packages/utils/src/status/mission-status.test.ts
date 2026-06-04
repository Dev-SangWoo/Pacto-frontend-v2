import { describe, expect, it } from "vitest";

import { canSubmitMission, getMissionStatusView } from "./mission-status";

describe("mission status policy", () => {
  it("in_progress 미션은 제출 가능 상태로 판단한다", () => {
    expect(canSubmitMission("in_progress")).toBe(true);
  });

  it("submitted 미션은 검수 중 상태로 표시한다", () => {
    expect(getMissionStatusView("submitted")).toEqual({ label: "제출 완료", tone: "grey" });
  });
});
