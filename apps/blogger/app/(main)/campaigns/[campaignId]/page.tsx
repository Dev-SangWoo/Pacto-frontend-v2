import { notFound, redirect } from "next/navigation";

import { getCampaignDetail, getMyApplicationByCampaign } from "@pacto/api";
import {
  canApplyToCampaign,
  formatDeadlineDday,
  formatKoreanDate,
  formatPoint,
  getCampaignStatusView,
} from "@pacto/utils";

import { CampaignApplyAction } from "../../../_components/mock-actions";
import { redirectOnAuthError } from "../../../_lib/auth-error";
import { getBloggerSession } from "../../../_lib/session";

type CampaignDetailPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { campaignId } = await params;
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const campaign = await getCampaignDetail(Number(campaignId), session.accessToken).catch(
    redirectOnAuthError,
  );

  if (campaign == null) {
    notFound();
  }

  const myApplication = await getMyApplicationByCampaign(campaign.id, session.accessToken).catch(
    redirectOnAuthError,
  );
  const statusView = getCampaignStatusView(campaign.status);
  const isApplyEnabled = canApplyToCampaign(campaign.status);
  const remainingSlots =
    campaign.remainingSlots ?? Math.max(campaign.recruitCount - campaign.approvedCount, 0);
  const missionGuideItems = parseMissionGuide(campaign.guidelines);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="campaign-detail-title">
      <section className="campaign-detail-hero">
        <img src={campaign.thumbnailUrl} alt={`${campaign.title} 대표 이미지`} />
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
        <div className="campaign-detail-hero-copy">
          <div className="campaign-detail-heading">
            <p className="section-label">{campaign.brandName}</p>
            <h1 id="campaign-detail-title">{campaign.title}</h1>
            <span>{formatPoint(campaign.rewardPoint)}</span>
          </div>
        </div>
      </section>

      <section className="ticket-facts detail-facts" aria-label="캠페인 조건">
        <div>
          <dt>남은 모집</dt>
          <dd>{remainingSlots}명</dd>
        </div>
        <div>
          <dt>지원자</dt>
          <dd>{campaign.applicantCount}명</dd>
        </div>
        <div>
          <dt>마감</dt>
          <dd>
            {formatKoreanDate(campaign.deadline)}
            <em>{formatDeadlineDday(campaign.deadline)}</em>
          </dd>
        </div>
      </section>

      <section className="section-block mission-guide-panel" aria-labelledby="campaign-guide-title">
        <div className="section-head">
          <div>
            <h2 id="campaign-guide-title">미션 조건</h2>
          </div>
        </div>
        <div className="mission-guide-list">
          {missionGuideItems.map((item) => (
            <article key={`${item.label}-${item.value}`}>
              <span>{item.label}</span>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="fixed-cta">
        <CampaignApplyAction
          applicationStatus={myApplication?.status}
          campaignId={campaign.id}
          enabled={isApplyEnabled}
        />
      </div>
    </section>
  );
}

type MissionGuideItem = {
  label: string;
  value: string;
};

const missionGuideLabelMap: Record<string, string> = {
  content: "상세 안내",
  hashtag: "필수 해시태그",
  requirement: "콘텐츠 요구사항",
};

function parseMissionGuide(guidelines: string): MissionGuideItem[] {
  const trimmedGuidelines = guidelines.trim();

  if (trimmedGuidelines.length === 0) {
    return [{ label: "상세 안내", value: "캠페인 가이드를 확인해 주세요." }];
  }

  const parsedGuidelines = parseJsonObject(trimmedGuidelines);

  if (parsedGuidelines != null) {
    return Object.entries(parsedGuidelines)
      .map(([key, value]) => ({
        label: missionGuideLabelMap[key] ?? formatGuideLabel(key),
        value: formatGuideValue(value),
      }))
      .filter((item) => item.value.length > 0);
  }

  return trimmedGuidelines
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({
      label: index === 0 ? "상세 안내" : `안내 ${index + 1}`,
      value: line,
    }));
}

function parseJsonObject(value: string): Record<string, unknown> | undefined {
  if (!value.startsWith("{") || !value.endsWith("}")) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(value);
    return isRecord(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function formatGuideLabel(key: string) {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

function formatGuideValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(formatGuideValue).filter(Boolean).join(", ");
  }

  if (isRecord(value)) {
    return Object.entries(value)
      .map(([key, nestedValue]) => `${formatGuideLabel(key)}: ${formatGuideValue(nestedValue)}`)
      .join("\n");
  }

  return String(value ?? "").trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
