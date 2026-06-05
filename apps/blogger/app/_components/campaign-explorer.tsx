"use client";

import { LayoutGrid, List, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { Campaign } from "@pacto/types";
import { formatKoreanDate, formatPoint, getCampaignStatusView } from "@pacto/utils";

type CampaignExplorerProps = {
  campaigns: Campaign[];
};

type ViewMode = "grid" | "list";

const interestTabs = ["전체", "맛집", "뷰티", "운동", "마감 임박"];

export function CampaignExplorer({ campaigns }: CampaignExplorerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);

  return (
    <section className="screen-stack" aria-labelledby="campaigns-title">
      <section className="campaign-brief">
        <div>
          <p className="section-label">캠페인 찾기</p>
          <h1 id="campaigns-title">캠페인</h1>
        </div>
      </section>

      <div className="interest-tabs" aria-label="관심사 필터">
        {interestTabs.map((tab, index) => (
          <button className={index === 0 ? "active" : undefined} type="button" key={tab}>
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

        <div className={`campaign-feed ${viewMode === "list" ? "list-view" : "grid-view"}`}>
          {campaigns.map((campaign) => (
            <CampaignCard campaign={campaign} key={campaign.id} viewMode={viewMode} />
          ))}
        </div>
      </section>

      {isNoticeVisible ? (
        <div className="campaign-floating-notice" role="status">
          <p>조건과 보상을 비교하고 나에게 맞는 캠페인을 신청해 보세요.</p>
          <button aria-label="안내 닫기" onClick={() => setIsNoticeVisible(false)} type="button">
            <X aria-hidden="true" size={16} />
          </button>
        </div>
      ) : null}
    </section>
  );
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
            <dd>{formatKoreanDate(campaign.deadline)}</dd>
          </div>
        </dl>
        {viewMode === "list" ? <span className="ticket-action">조건 보고 신청하기</span> : null}
      </div>
    </Link>
  );
}
