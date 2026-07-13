"use client";

import { useMemo, useState } from "react";

import type { Campaign, CampaignStatus } from "@pacto/types";
import {
  formatDeadlineDday,
  formatKoreanDate,
  formatPoint,
  getCampaignStatusView,
} from "@pacto/utils";

type Tone = "amber" | "blue" | "green" | "grey" | "red";
type CampaignFilter = CampaignStatus | "all";

type DashboardCampaignPanelProps = {
  campaigns: Campaign[];
};

const campaignTabs: Array<{ label: string; value: CampaignFilter }> = [
  { label: "전체", value: "all" },
  { label: "모집 중", value: "open" },
  { label: "모집 마감", value: "closed" },
  { label: "캠페인 진행 중", value: "full" },
  { label: "완료", value: "completed" },
  { label: "취소", value: "cancelled" },
];

export function DashboardCampaignPanel({ campaigns }: DashboardCampaignPanelProps) {
  const [activeFilter, setActiveFilter] = useState<CampaignFilter>("all");
  const filteredCampaigns = useMemo(
    () => campaigns.filter((campaign) => matchesCampaignFilter(campaign, activeFilter)),
    [activeFilter, campaigns],
  );
  const visibleCampaigns = filteredCampaigns.slice(0, 5);

  return (
    <article className="panel dashboard-campaign-panel">
      <div className="panel-heading">
        <div>
          <h2>캠페인 관리</h2>
          <p>최근 캠페인의 모집 현황과 운영 상태입니다.</p>
        </div>
        <a href="/dashboard/campaigns">전체 보기</a>
      </div>
      <div className="dashboard-tab-row" aria-label="캠페인 상태 요약">
        {campaignTabs.map((tab) => (
          <button
            className={tab.value === activeFilter ? "active" : ""}
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            type="button"
          >
            {tab.label} {getCampaignFilterCount(campaigns, tab.value)}
          </button>
        ))}
      </div>
      <div className="dashboard-campaign-list">
        {visibleCampaigns.length > 0 ? (
          visibleCampaigns.map((campaign) => (
            <CampaignListItem campaign={campaign} key={campaign.id} />
          ))
        ) : (
          <section className="empty-panel">
            <h2>
              {campaigns.length > 0 ? "조건에 맞는 캠페인이 없어요" : "표시할 캠페인이 없어요"}
            </h2>
            <p>
              {campaigns.length > 0
                ? "다른 상태 필터를 선택해 주세요."
                : "새 캠페인을 만들면 운영 현황이 이곳에 표시됩니다."}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}

function CampaignListItem({ campaign }: { campaign: Campaign }) {
  const statusView = getCampaignStatusView(campaign.status);
  const totalSlots = campaign.totalSlots || campaign.recruitCount;
  const approvedSlots = campaign.approvedCount;
  const isCancelled = campaign.status === "cancelled";

  return (
    <a className="dashboard-campaign-item" href={`/dashboard/campaigns/${campaign.id}`}>
      <img alt="" src={campaign.thumbnailUrl} />
      <div>
        <strong>{campaign.title}</strong>
        <span>
          {formatKoreanDate(campaign.deadline)} · {formatDeadlineDday(campaign.deadline)} ·{" "}
          {formatPoint(campaign.rewardPoint)}
        </span>
        <ProgressBar
          count={isCancelled ? 0 : approvedSlots}
          tone={statusView.tone}
          total={totalSlots}
        />
      </div>
      <em>{isCancelled ? "모집 종료" : `${approvedSlots}/${totalSlots}`}</em>
      <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
    </a>
  );
}

function ProgressBar({ count, total, tone }: { count: number; total: number; tone: Tone }) {
  return (
    <div className={`dashboard-progress ${tone}`}>
      <span style={{ width: `${formatPercent(count, total)}%` }} />
    </div>
  );
}

function matchesCampaignFilter(campaign: Campaign, filter: CampaignFilter) {
  if (filter === "all") {
    return true;
  }

  return campaign.status === filter;
}

function getCampaignFilterCount(campaigns: Campaign[], filter: CampaignFilter) {
  return campaigns.filter((campaign) => matchesCampaignFilter(campaign, filter)).length;
}

function formatPercent(count: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.round((count / total) * 100);
}
