"use client";

import { LayoutGrid, List, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { Campaign } from "@pacto/types";
import {
  formatDeadlineDday,
  formatKoreanDate,
  formatPoint,
  getCampaignStatusView,
} from "@pacto/utils";

type CampaignExplorerProps = {
  campaigns: Campaign[];
  loadErrorMessage?: string;
};

type ViewMode = "grid" | "list";
type CampaignCategory = "전체" | "맛집" | "뷰티" | "운동" | "마감 임박";

const interestTabs: CampaignCategory[] = ["전체", "맛집", "뷰티", "운동", "마감 임박"];

export function CampaignExplorer({ campaigns, loadErrorMessage }: CampaignExplorerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory>("전체");
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);
  const filteredCampaigns = campaigns.filter((campaign) =>
    matchesCategory(campaign, selectedCategory),
  );
  const closingSoonCount = campaigns.filter((campaign) =>
    matchesCategory(campaign, "마감 임박"),
  ).length;
  const averageReward =
    campaigns.length === 0
      ? 0
      : Math.round(
          campaigns.reduce((sum, campaign) => sum + campaign.rewardPoint, 0) / campaigns.length,
        );

  return (
    <section className="screen-stack" aria-labelledby="campaigns-title">
      <section className="creator-hero campaign-discovery-hero">
        <div>
          <p className="section-label">캠페인 찾기</p>
          <h1 className="campaign-hero-title" id="campaigns-title">
            이번엔 어떤 캠페인에
            <span>참여할까요?</span>
          </h1>
          <p>보상, 일정, 남은 자리를 보고 가볍게 골라보세요.</p>
        </div>
        <div className="hero-reward-strip" aria-label="캠페인 요약">
          <article>
            <span>모집 중</span>
            <strong>{campaigns.length}개</strong>
          </article>
          <article>
            <span>평균 보상</span>
            <strong>{formatPoint(averageReward)}</strong>
          </article>
          <article>
            <span>마감 임박</span>
            <strong>{closingSoonCount}개</strong>
          </article>
        </div>
      </section>

      <div className="interest-tabs" aria-label="관심사 필터">
        {interestTabs.map((tab) => (
          <button
            className={selectedCategory === tab ? "active" : undefined}
            onClick={() => setSelectedCategory(tab)}
            type="button"
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="section-block" aria-labelledby="recommended-title">
        <div className="section-head campaign-list-head">
          <div>
            <p className="section-label">추천 캠페인</p>
            <h2 id="recommended-title">지금 둘러보기</h2>
          </div>
          <div className="view-toggle" aria-label="캠페인 표시 방식">
            <button
              aria-label="2열 그리드로 보기"
              aria-pressed={viewMode === "grid"}
              className={viewMode === "grid" ? "active" : undefined}
              onClick={() => setViewMode("grid")}
              type="button"
            >
              <LayoutGrid aria-hidden="true" size={17} />
            </button>
            <button
              aria-label="세로 목록으로 보기"
              aria-pressed={viewMode === "list"}
              className={viewMode === "list" ? "active" : undefined}
              onClick={() => setViewMode("list")}
              type="button"
            >
              <List aria-hidden="true" size={17} />
            </button>
          </div>
        </div>

        {loadErrorMessage != null ? (
          <div className="empty-state compact">
            <strong>캠페인 목록을 불러올 수 없어요.</strong>
            <p>{loadErrorMessage}</p>
          </div>
        ) : (
          <div className={`campaign-feed ${viewMode === "list" ? "list-view" : "grid-view"}`}>
            {filteredCampaigns.map((campaign) => (
              <CampaignCard campaign={campaign} key={campaign.id} viewMode={viewMode} />
            ))}
            {filteredCampaigns.length === 0 ? (
              <div className="empty-state compact">
                <p>선택한 카테고리에 맞는 캠페인이 없어요.</p>
              </div>
            ) : null}
          </div>
        )}
      </section>

      {isNoticeVisible ? (
        <div className="campaign-floating-notice" role="status">
          <p>보상이 높은 캠페인보다 일정에 맞게 제출할 수 있는 캠페인을 먼저 고르면 좋아요.</p>
          <button aria-label="안내 닫기" onClick={() => setIsNoticeVisible(false)} type="button">
            <X aria-hidden="true" size={16} />
          </button>
        </div>
      ) : null}
    </section>
  );
}

function matchesCategory(campaign: Campaign, category: CampaignCategory) {
  if (category === "전체") {
    return true;
  }

  if (category === "마감 임박") {
    const deadlineMs = new Date(campaign.deadline).getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    return Number.isFinite(deadlineMs) && deadlineMs - Date.now() <= sevenDaysMs;
  }

  const haystack = `${campaign.title} ${campaign.guidelines}`.toLowerCase();
  const keywords: Record<Exclude<CampaignCategory, "전체" | "마감 임박">, string[]> = {
    맛집: ["맛집", "식당", "카페", "브런치", "디저트", "푸드", "음식"],
    뷰티: ["뷰티", "네일", "헤어", "피부", "화장품", "미용"],
    운동: ["운동", "헬스", "피트니스", "요가", "필라테스", "스포츠"],
  };

  return keywords[category].some((keyword) => haystack.includes(keyword));
}

type CampaignCardProps = {
  campaign: Campaign;
  viewMode: ViewMode;
};

function CampaignCard({ campaign, viewMode }: CampaignCardProps) {
  const statusView = getCampaignStatusView(campaign.status);
  const remainingSlots =
    campaign.remainingSlots ?? Math.max(campaign.recruitCount - campaign.approvedCount, 0);

  return (
    <Link className="campaign-ticket" href={`/campaigns/${campaign.id}`}>
      <div className="ticket-media">
        <img src={campaign.thumbnailUrl} alt={`${campaign.title} 대표 이미지`} loading="lazy" />
      </div>
      <div className="ticket-body">
        <div className="ticket-topline">
          <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
          <strong>{formatPoint(campaign.rewardPoint)}</strong>
        </div>
        <div>
          <p>{campaign.brandName}</p>
          <h3>{campaign.title}</h3>
        </div>
        <dl className="ticket-facts" aria-label="캠페인 조건">
          <div>
            <dt>남은 자리</dt>
            <dd>{remainingSlots}명</dd>
          </div>
          <div>
            <dt>마감</dt>
            <dd>
              {formatKoreanDate(campaign.deadline)}
              <em>{formatDeadlineDday(campaign.deadline)}</em>
            </dd>
          </div>
        </dl>
        {viewMode === "list" ? <span className="ticket-action">조건 보고 신청하기</span> : null}
      </div>
    </Link>
  );
}
