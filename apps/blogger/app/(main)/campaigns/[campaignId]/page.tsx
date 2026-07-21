import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getCampaignDetail } from "@pacto/api";
import { CalendarDays, Coins, FileText, UserRoundCheck, UsersRound } from "lucide-react";
import {
  canApplyToCampaign,
  formatDeadlineDday,
  formatKoreanDate,
  formatPoint,
  getCampaignStatusView,
} from "@pacto/utils";

import { CampaignApplyAction } from "../../../_components/mock-actions";
import { fallbackOnNonAuthError, redirectOnAuthError } from "../../../_lib/auth-error";
import { getBloggerActivity } from "../../../_lib/blogger-activity";
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

  const { applications, missions } = await getBloggerActivity(session.accessToken).catch(
    (error: unknown) => fallbackOnNonAuthError(error, { applications: [], missions: [] }),
  );
  const myApplication = applications.find((application) => application.campaignId === campaign.id);
  const myCampaignMission = missions.find((mission) => mission.campaignId === campaign.id);
  const statusView = getCampaignStatusView(campaign.status);
  const isApplyEnabled = canApplyToCampaign(campaign.status);
  const remainingSlots =
    campaign.remainingSlots ?? Math.max(campaign.recruitCount - campaign.approvedCount, 0);
  const missionGuideItems = parseMissionGuide(campaign.guidelines);

  return (
    <section
      className="screen-stack detail-screen campaign-detail-page"
      aria-labelledby="campaign-detail-title"
    >
      <section className="campaign-detail-hero" aria-label="캠페인 요약">
        <div className="campaign-detail-cover">
          <img src={campaign.thumbnailUrl} alt={`${campaign.title} 대표 이미지`} />
          <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
        </div>
        <div className="campaign-detail-hero-copy">
          <p className="section-label">{campaign.brandName}</p>
          <div className="campaign-detail-heading">
            <h1 id="campaign-detail-title">{campaign.title}</h1>
            <div className="campaign-detail-reward">
              <Coins aria-hidden="true" size={17} strokeWidth={2} />
              <span>
                <small>완료 보상</small>
                <strong>{formatPoint(campaign.rewardPoint)}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="campaign-detail-metrics" aria-label="캠페인 조건">
        <article>
          <UsersRound aria-hidden="true" size={18} strokeWidth={1.9} />
          <span>남은 자리</span>
          <strong>{remainingSlots}명</strong>
        </article>
        <article>
          <UserRoundCheck aria-hidden="true" size={18} strokeWidth={1.9} />
          <span>신청 현황</span>
          <strong>{campaign.applicantCount}명</strong>
        </article>
        <article>
          <CalendarDays aria-hidden="true" size={18} strokeWidth={1.9} />
          <span>모집 마감</span>
          <strong>{formatDeadlineDday(campaign.deadline)}</strong>
          <small>{formatKoreanDate(campaign.deadline)}</small>
        </article>
      </section>

      <section className="section-block mission-guide-panel" aria-labelledby="campaign-guide-title">
        <div className="section-head">
          <div className="detail-section-heading">
            <span aria-hidden="true">
              <FileText size={18} strokeWidth={2} />
            </span>
            <div>
              <p className="section-label">선정 후 진행할 내용</p>
              <h2 id="campaign-guide-title">미션 가이드</h2>
            </div>
          </div>
        </div>
        <div className="mission-guide-list">
          {missionGuideItems.map((item, index) => (
            <article key={`${item.label}-${index}`}>
              <span>{item.label}</span>
              <div className="mission-guide-content">{item.content}</div>
            </article>
          ))}
        </div>
        {(campaign.guidelineImageUrls?.length ?? 0) > 0 ? (
          <div className="campaign-guideline-gallery" aria-label="캠페인 가이드 이미지">
            {(campaign.guidelineImageUrls ?? []).map((imageUrl, index) => (
              <img
                alt={`${campaign.title} 가이드 이미지 ${index + 1}`}
                key={imageUrl}
                loading="lazy"
                src={imageUrl}
              />
            ))}
          </div>
        ) : null}
      </section>

      <div className="fixed-cta">
        <CampaignApplyAction
          applicationStatus={myApplication?.status}
          campaignStatus={campaign.status}
          campaignId={campaign.id}
          enabled={isApplyEnabled}
          missionId={myCampaignMission?.id}
          missionStatus={myCampaignMission?.status}
        />
      </div>
    </section>
  );
}

type MissionGuideItem = {
  content: ReactNode;
  label: string;
};

const missionGuideLabelMap: Record<string, string> = {
  content: "상세 안내",
  hashtag: "필수 해시태그",
  requirement: "콘텐츠 요구사항",
};

function parseMissionGuide(guidelines: string): MissionGuideItem[] {
  const trimmedGuidelines = guidelines.trim();

  if (trimmedGuidelines.length === 0) {
    return [{ content: <p>캠페인 가이드를 확인해 주세요.</p>, label: "상세 안내" }];
  }

  const parsedGuidelines = parseJsonObject(trimmedGuidelines);

  if (parsedGuidelines != null) {
    if (isTiptapGuidelines(parsedGuidelines)) {
      return [
        {
          content: <TiptapGuideContent nodes={parsedGuidelines.content.content} />,
          label: "미션 가이드",
        },
      ];
    }

    return Object.entries(parsedGuidelines)
      .map(([key, value]) => ({
        content: <p>{formatGuideValue(value)}</p>,
        label: missionGuideLabelMap[key] ?? formatGuideLabel(key),
      }))
      .filter((item) => getTextContent(item.content).length > 0);
  }

  return trimmedGuidelines
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({
      content: <p>{line}</p>,
      label: index === 0 ? "상세 안내" : `안내 ${index + 1}`,
    }));
}

type TiptapTextNode = {
  marks?: Array<{
    attrs?: Record<string, unknown>;
    type?: string;
  }>;
  text?: string;
  type?: string;
};

type TiptapNode = TiptapTextNode & {
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
};

type TiptapGuidelines = {
  content: {
    content: TiptapNode[];
    type?: string;
  };
  editor: "tiptap";
};

function TiptapGuideContent({ nodes }: { nodes: TiptapNode[] }) {
  if (nodes.length === 0) {
    return <p>캠페인 가이드를 확인해 주세요.</p>;
  }

  return <>{nodes.map(renderTiptapNode)}</>;
}

function renderTiptapNode(node: TiptapNode, index: number): ReactNode {
  if (node.type === "heading") {
    return <h3 key={index}>{renderInlineContent(node.content)}</h3>;
  }

  if (node.type === "paragraph") {
    return <p key={index}>{renderInlineContent(node.content)}</p>;
  }

  if (node.type === "bulletList") {
    return (
      <ul key={index}>
        {(node.content ?? []).map((item, itemIndex) => (
          <li key={itemIndex}>{renderInlineContent(item.content)}</li>
        ))}
      </ul>
    );
  }

  if (node.type === "orderedList") {
    return (
      <ol key={index}>
        {(node.content ?? []).map((item, itemIndex) => (
          <li key={itemIndex}>{renderInlineContent(item.content)}</li>
        ))}
      </ol>
    );
  }

  if (node.type === "blockquote") {
    return <blockquote key={index}>{renderBlockContent(node.content)}</blockquote>;
  }

  if (node.type === "image") {
    const src = typeof node.attrs?.src === "string" ? node.attrs.src : "";
    const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "가이드 이미지";

    return src.length > 0 ? <img alt={alt} key={index} src={src} /> : null;
  }

  return null;
}

function renderInlineContent(nodes?: TiptapNode[]): ReactNode {
  return (nodes ?? []).map((node, index) => {
    if (node.type === "text") {
      return renderTextNode(node, index);
    }

    if (node.type === "hardBreak") {
      return <br key={index} />;
    }

    return <span key={index}>{renderInlineContent(node.content)}</span>;
  });
}

function renderTextNode(node: TiptapNode, index: number): ReactNode {
  const marks = node.marks ?? [];
  const href = marks.find((mark) => mark.type === "link")?.attrs?.href;
  const text = node.text ?? "";
  let content: ReactNode = text;

  if (marks.some((mark) => mark.type === "bold")) {
    content = <strong>{content}</strong>;
  }

  if (marks.some((mark) => mark.type === "italic")) {
    content = <em>{content}</em>;
  }

  if (marks.some((mark) => mark.type === "strike")) {
    content = <s>{content}</s>;
  }

  if (typeof href === "string" && href.length > 0) {
    return (
      <a href={href} key={index} rel="noopener noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return <span key={index}>{content}</span>;
}

function renderBlockContent(nodes?: TiptapNode[]): ReactNode {
  return (nodes ?? []).map((node, index) => {
    if (node.type === "paragraph") {
      return <p key={index}>{renderInlineContent(node.content)}</p>;
    }

    if (node.type === "heading") {
      return <h3 key={index}>{renderInlineContent(node.content)}</h3>;
    }

    return <span key={index}>{renderInlineContent(node.content)}</span>;
  });
}

function isTiptapGuidelines(value: Record<string, unknown>): value is TiptapGuidelines {
  const content = value.content;

  return (
    value.editor === "tiptap" &&
    typeof content === "object" &&
    content !== null &&
    "content" in content &&
    Array.isArray((content as { content?: unknown }).content)
  );
}

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (typeof node === "object" && node !== null && "props" in node) {
    return getTextContent((node as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
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
