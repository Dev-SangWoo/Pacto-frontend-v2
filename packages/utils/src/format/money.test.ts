import { describe, expect, it } from "vitest";

import { formatPoint, formatWon } from "./money";

describe("money format", () => {
  it("포인트 금액에 천 단위 구분자를 적용한다", () => {
    expect(formatPoint(50000)).toBe("50,000P");
  });

  it("원화 금액에 천 단위 구분자를 적용한다", () => {
    expect(formatWon(12400000)).toBe("12,400,000원");
  });
});
