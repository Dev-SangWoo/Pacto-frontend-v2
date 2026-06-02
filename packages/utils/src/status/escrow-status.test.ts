import { describe, expect, it } from "vitest";

import { mapEscrowStatus } from "./escrow-status";

describe("mapEscrowStatus", () => {
  it("LOCKED 상태를 locked로 매핑한다", () => {
    expect(mapEscrowStatus("LOCKED")).toBe("locked");
  });

  it("RELEASED 상태를 paid로 매핑한다", () => {
    expect(mapEscrowStatus("RELEASED")).toBe("paid");
  });

  it("CANCELED 상태를 cancelled로 매핑한다", () => {
    expect(mapEscrowStatus("CANCELED")).toBe("cancelled");
  });
});
