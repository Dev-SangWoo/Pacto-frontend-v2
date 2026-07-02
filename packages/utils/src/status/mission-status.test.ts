import { describe, expect, it } from "vitest";

import { canSubmitMission, getMissionStatusView, missionProgressSteps } from "./mission-status";

describe("mission status policy", () => {
  it("in_progress mission can be submitted", () => {
    expect(canSubmitMission("in_progress")).toBe(true);
  });

  it("submitted mission is displayed as submitted", () => {
    expect(getMissionStatusView("submitted")).toEqual({ label: "검수 대기", tone: "grey" });
  });

  it("approved mission is displayed as settled", () => {
    expect(getMissionStatusView("approved")).toEqual({
      label: "\uc815\uc0b0 \uc644\ub8cc",
      tone: "green",
    });
  });

  it("cancelled mission is displayed separately from rejected", () => {
    expect(getMissionStatusView("cancelled")).toEqual({
      label: "\ubbf8\uc158 \ucde8\uc18c",
      tone: "red",
    });
  });

  it("mission progress steps only include mission statuses", () => {
    expect(missionProgressSteps.map((step) => step.statuses).flat()).toEqual([
      "in_progress",
      "submitted",
      "approved",
      "rejected",
      "cancelled",
    ]);
  });
});
