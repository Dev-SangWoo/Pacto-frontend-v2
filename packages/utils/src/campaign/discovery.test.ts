import { describe, expect, it } from "vitest";

import type { Campaign } from "@pacto/types";

import {
  getCampaignDiscoveryBadge,
  getCampaignSummaryText,
  matchesCampaignDiscoveryCategory,
  matchesCampaignSearch,
} from "./discovery";

const campaign: Campaign = {
  id: 1,
  advertiserId: 7,
  brandName: "성수 브런치",
  title: "주말 카페 리뷰 체험단",
  thumbnailUrl: "/campaigns/seongsu-brunch-cafe.webp",
  rewardPoint: 80000,
  recruitCount: 50,
  approvedCount: 12,
  applicantCount: 23,
  totalSlots: 50,
  remainingSlots: 38,
  guidelines:
    "매장 방문 후 사진 10장과 1,500자 이상의 블로그 리뷰를 작성해 주세요.\n필수 키워드를 포함해 주세요.",
  deadline: "2026-07-27T23:59:59",
  status: "open",
};

describe("campaign discovery presentation", () => {
  it("마감까지 7일 이하면 마감 임박 배지를 반환한다", () => {
    expect(getCampaignDiscoveryBadge(campaign, new Date("2026-07-21T00:00:00+09:00"))).toEqual({
      label: "마감 임박",
      tone: "closing",
    });
  });

  it("마감 임박이 아니면 진행중 배지를 반환한다", () => {
    expect(
      getCampaignDiscoveryBadge(
        { ...campaign, deadline: "2026-08-20T23:59:59" },
        new Date("2026-07-21T00:00:00+09:00"),
      ),
    ).toEqual({ label: "진행중", tone: "active" });
  });

  it("가이드 첫 문장을 카드 설명으로 정리한다", () => {
    expect(getCampaignSummaryText(campaign.guidelines)).toBe(
      "매장 방문 후 사진 10장과 1,500자 이상의 블로그 리뷰를 작성해 주세요.",
    );
  });

  it("빈 가이드는 안전한 기본 미션 문구를 반환한다", () => {
    expect(getCampaignSummaryText("  ")).toBe("캠페인 상세에서 수행 미션을 확인해 주세요.");
  });

  it("푸드 키워드로 카테고리를 분류한다", () => {
    expect(matchesCampaignDiscoveryCategory(campaign, "푸드")).toBe(true);
    expect(matchesCampaignDiscoveryCategory(campaign, "뷰티")).toBe(false);
  });

  it("제목, 브랜드, 가이드에서 대소문자 구분 없이 검색한다", () => {
    expect(matchesCampaignSearch(campaign, "브런치")).toBe(true);
    expect(matchesCampaignSearch(campaign, "1,500자")).toBe(true);
    expect(matchesCampaignSearch(campaign, "노트북")).toBe(false);
  });
});
