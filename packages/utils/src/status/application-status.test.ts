import { describe, expect, it } from "vitest";

import { getApplicationStatusView, isPendingApplication } from "./application-status";

describe("application status policy", () => {
  it("PENDING application is displayed as waiting for approval", () => {
    expect(getApplicationStatusView("PENDING")).toEqual({
      label: "승인 대기",
      tone: "amber",
    });
  });

  it("only PENDING is treated as a pending application", () => {
    expect(isPendingApplication("PENDING")).toBe(true);
    expect(isPendingApplication("ACCEPTED")).toBe(false);
  });
});
