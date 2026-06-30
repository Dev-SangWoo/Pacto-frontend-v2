import { describe, expect, it } from "vitest";

import { canApplyToCampaign, getCampaignStatusView } from "./campaign-status";

describe("campaign status policy", () => {
  it("open 캠페인은 지원 가능 상태로 판단한다", () => {
    expect(canApplyToCampaign("open")).toBe(true);
  });

  it("full 캠페인은 지원 불가 상태로 판단한다", () => {
    expect(canApplyToCampaign("full")).toBe(false);
  });

  it("상태 배지 문구를 정책 기준으로 반환한다", () => {
    expect(getCampaignStatusView("open")).toEqual({ label: "모집 중", tone: "blue" });
    expect(getCampaignStatusView("full")).toEqual({ label: "캠페인 진행 중", tone: "blue" });
    expect(getCampaignStatusView("closed")).toEqual({ label: "모집 마감", tone: "grey" });
  });
});
