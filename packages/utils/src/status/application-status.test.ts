import { describe, expect, it } from "vitest";

import { getApplicationStatusView, isPendingApplication } from "./application-status";

describe("application status policy", () => {
  it("PENDING application is displayed as applied", () => {
    expect(getApplicationStatusView("PENDING")).toEqual({
      label: "\uc2e0\uccad \uc644\ub8cc",
      tone: "grey",
    });
  });

  it("only PENDING is treated as a pending application", () => {
    expect(isPendingApplication("PENDING")).toBe(true);
    expect(isPendingApplication("ACCEPTED")).toBe(false);
  });
});
