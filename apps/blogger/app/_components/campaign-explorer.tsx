"use client";

import { CalendarClock, ChevronRight, Coins, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { Campaign } from "@pacto/types";
import {
  CAMPAIGN_DISCOVERY_CATEGORIES,
  formatDeadlineDday,
  formatPoint,
  getCampaignDiscoveryBadge,
  getCampaignSummaryText,
  matchesCampaignDiscoveryCategory,
} from "@pacto/utils";
import type { CampaignDiscoveryCategory } from "@pacto/utils";

import { getFallbackCampaignThumbnail } from "../_lib/campaign-thumbnail";
import { ResilientCampaignImage } from "./resilient-campaign-image";

type CampaignExplorerProps = {
  campaigns: Campaign[];
  loadErrorMessage?: string;
  searchQuery: string;
};

export function CampaignExplorer({
  campaigns,
  loadErrorMessage,
  searchQuery,
}: CampaignExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<CampaignDiscoveryCategory>("전체");
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.status !== "cancelled" &&
      matchesCampaignDiscoveryCategory(campaign, selectedCategory),
  );

  return (
    <section className="campaign-discovery-screen" aria-labelledby="campaigns-title">
      <section className="campaign-promotion" aria-label="블로거 캠페인 안내">
        <div className="campaign-promotion-copy">
          <p>내 블로그로</p>
          <p>브랜드를 소개하고</p>
          <strong>보상을 받아보세요!</strong>
        </div>
        <img
          alt=""
          aria-hidden="true"
          className="campaign-promotion-image"
          height={992}
          src="/illustrations/woman-social-tablet-hd-transparent-refined.webp"
          width={1586}
        />
      </section>

      <div className="campaign-recommendation-heading">
        <h1 id="campaigns-title">추천 캠페인</h1>
        <Link href="/campaigns">
          전체 보기
          <ChevronRight aria-hidden="true" size={15} />
        </Link>
      </div>

      {searchQuery ? (
        <p className="campaign-search-summary">
          “{searchQuery}” 검색 결과 {campaigns.length}개
        </p>
      ) : null}

      <div className="campaign-category-list" aria-label="캠페인 카테고리">
        {CAMPAIGN_DISCOVERY_CATEGORIES.map((category) => (
          <button
            aria-pressed={selectedCategory === category}
            className={selectedCategory === category ? "selected" : undefined}
            key={category}
            onClick={() => setSelectedCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      {loadErrorMessage != null ? (
        <div className="campaign-discovery-empty" role="alert">
          <strong>캠페인 목록을 불러오지 못했어요</strong>
          <p>{loadErrorMessage}</p>
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="campaign-card-list">
          {filteredCampaigns.map((campaign, index) => (
            <CampaignCard campaign={campaign} isPriority={index < 2} key={campaign.id} />
          ))}
        </div>
      ) : (
        <div className="campaign-discovery-empty">
          <strong>조건에 맞는 캠페인이 없어요</strong>
          <p>검색어나 카테고리를 바꿔 다시 확인해 주세요.</p>
          {searchQuery ? (
            <Link href="/campaigns">전체 캠페인 보기</Link>
          ) : (
            <button onClick={() => setSelectedCategory("전체")} type="button">
              전체 카테고리 보기
            </button>
          )}
        </div>
      )}
    </section>
  );
}

type CampaignCardProps = {
  campaign: Campaign;
  isPriority: boolean;
};

function CampaignCard({ campaign, isPriority }: CampaignCardProps) {
  const badge = getCampaignDiscoveryBadge(campaign);
  const missionCopy = getCampaignSummaryText(campaign.guidelines);
  const fallbackThumbnail = getFallbackCampaignThumbnail(campaign.id);
  const thumbnailUrl = campaign.thumbnailUrl ?? fallbackThumbnail;
  const campaignHref = `/campaigns/${campaign.id}`;

  return (
    <article className="campaign-list-card">
      <div className="campaign-card-summary">
        <div className="campaign-card-image-link">
          <ResilientCampaignImage
            alt={`${campaign.title} 대표 이미지`}
            campaignId={campaign.id}
            decoding="async"
            fallbackSrc={fallbackThumbnail}
            fetchPriority={isPriority ? "high" : "auto"}
            loading={isPriority ? "eager" : "lazy"}
            src={thumbnailUrl}
          />
        </div>
        <div className="campaign-card-content">
          <div className="campaign-card-title-row">
            <span className={`campaign-discovery-badge ${badge.tone}`}>{badge.label}</span>
            <h2>{campaign.title}</h2>
          </div>
          <p className="campaign-card-description">{campaign.brandName || "Pacto"}</p>
          <dl className="campaign-card-metrics">
            <div>
              <dt>
                <Coins aria-hidden="true" size={15} strokeWidth={1.7} />
                보상 금액
              </dt>
              <dd>{formatPoint(campaign.rewardPoint)}</dd>
            </div>
            <div>
              <dt>
                <CalendarClock aria-hidden="true" size={15} strokeWidth={1.7} />
                마감까지
              </dt>
              <dd>{formatDeadlineDday(campaign.deadline)}</dd>
            </div>
            <div>
              <dt>
                <UsersRound aria-hidden="true" size={15} strokeWidth={1.7} />
                신청 현황
              </dt>
              <dd>{campaign.applicantCount}명</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="campaign-mission-panel">
        <p>
          <strong>미션:</strong> {missionCopy}
        </p>
        <Link href={campaignHref}>신청하기</Link>
      </div>
      <Link
        aria-label={`${campaign.title} 캠페인 상세 보기`}
        className="campaign-card-overlay-link"
        href={campaignHref}
      />
    </article>
  );
}
