import { describe, expect, it } from "vitest";

import { adaptCampaign, mapCampaignStatus } from "./campaign-adapter";
import { adaptEscrowLedger } from "./escrow-adapter";
import { mapMissionStatus } from "./mission-adapter";
import { adaptPointHistory } from "./wallet-adapter";

describe("backend response adapters", () => {
  it("maps backend campaign progress statuses to the frontend progress state", () => {
    expect(mapCampaignStatus("IN_PROGRESS")).toBe("in_progress");
    expect(mapCampaignStatus("FULL")).toBe("in_progress");
  });

  it("unwraps a note-only campaign guideline object as display text", () => {
    expect(
      adaptCampaign({
        guidelines: { note: "test" },
        id: 64,
        title: "S3 재검증용 테스트",
      }),
    ).toMatchObject({
      brandName: "Pacto",
      guidelines: "test",
    });
  });

  it("maps a READY mission to the frontend in-progress state", () => {
    expect(mapMissionStatus("READY")).toBe("in_progress");
  });

  it("preserves point history campaign and reference metadata", () => {
    expect(
      adaptPointHistory({
        amount: -10_000,
        campaignId: 12,
        campaignTitle: "여름 캠페인",
        createdAt: "2026-07-13T12:00:00",
        historyId: 31,
        referenceId: 44,
        referenceType: "ESCROW",
        type: "LOCK",
      }),
    ).toMatchObject({
      campaignId: 12,
      campaignTitle: "여름 캠페인",
      referenceType: "ESCROW",
    });
  });

  it("preserves escrow blogger identity fields", () => {
    expect(
      adaptEscrowLedger({
        amount: 10_000,
        bloggerEmail: "blogger@example.com",
        bloggerId: 7,
        bloggerName: "블로거",
        campaignId: 12,
        createdAt: "2026-07-13T12:00:00",
        escrowId: 44,
        status: "LOCKED",
      }),
    ).toMatchObject({
      bloggerEmail: "blogger@example.com",
      bloggerId: 7,
      bloggerName: "블로거",
    });
  });
});
