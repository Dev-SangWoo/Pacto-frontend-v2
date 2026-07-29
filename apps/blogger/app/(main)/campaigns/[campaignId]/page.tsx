import { notFound, redirect } from "next/navigation";
import { Fragment, type ReactNode } from "react";

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
import { CampaignLiveRefresh } from "../../../_components/campaign-live-refresh";
import { ResilientCampaignImage } from "../../../_components/resilient-campaign-image";
import { fallbackOnNonAuthError, redirectOnAuthError } from "../../../_lib/auth-error";
import { getBloggerActivity } from "../../../_lib/blogger-activity";
import { getFallbackCampaignThumbnail } from "../../../_lib/campaign-thumbnail";
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
  const myApplication = applications.find(
    (application) =>
      application.campaignId === campaign.id &&
      (application.status === "PENDING" || application.status === "ACCEPTED"),
  );
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
      <CampaignLiveRefresh />
      <section className="campaign-detail-hero" aria-label="캠페인 요약">
        <div className="campaign-detail-cover">
          <ResilientCampaignImage
            alt={`${campaign.title} 대표 이미지`}
            campaignId={campaign.id}
            fallbackSrc={getFallbackCampaignThumbnail(campaign.id)}
            src={campaign.thumbnailUrl ?? getFallbackCampaignThumbnail(campaign.id)}
          />
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
          {missionGuideItems.map((item, index) =>
            item.kind === "markdown" ? (
              <div className="mission-guide-markdown" key={`${item.label}-${index}`}>
                <div className="mission-guide-content">{item.content}</div>
              </div>
            ) : (
              <article key={`${item.label}-${index}`}>
                <span>{item.label}</span>
                <div className="mission-guide-content">{item.content}</div>
              </article>
            ),
          )}
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
          applicationId={myApplication?.applicationId}
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
  kind?: "markdown";
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
          kind: "markdown",
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

  return [
    {
      content: <MarkdownGuideContent markdown={trimmedGuidelines} />,
      kind: "markdown",
      label: "미션 가이드",
    },
  ];
}

type TiptapTextNode = {
  marks?: Array<{
    attrs?: Record<string, unknown>;
    type?: string;
  }>;
  text?: string;
  type?: string;
};

function MarkdownGuideContent({ markdown }: { markdown: string }) {
  return <>{renderMarkdownBlocks(markdown)}</>;
}

function renderMarkdownBlocks(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";

    if (line.trim().length === 0) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading != null) {
      blocks.push(
        <h3
          className={`markdown-heading markdown-heading-${heading[1].length}`}
          key={`heading-${index}`}
        >
          {renderMarkdownInline(heading[2], index)}
        </h3>,
      );
      index += 1;
      continue;
    }

    const image = /^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"[^"]*")?\)$/.exec(line.trim());
    if (image != null && isSafeMarkdownUrl(image[2])) {
      blocks.push(<img alt={image[1]} key={`image-${index}`} src={image[2]} />);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index] ?? "")) {
        quoteLines.push((lines[index] ?? "").replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(
        <blockquote key={`quote-${index}`}>
          {quoteLines.filter(Boolean).map((quoteLine, quoteIndex) => (
            <p key={quoteIndex}>{renderMarkdownInline(quoteLine, index + quoteIndex)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    const listMatch = /^([-*+]|\d+\.)\s+(.+)$/.exec(line);
    if (listMatch != null) {
      const ordered = /\d+\./.test(listMatch[1]);
      const itemPattern = ordered ? /^\d+\.\s+(.+)$/ : /^[-*+]\s+(.+)$/;
      const items: ReactNode[] = [];
      while (index < lines.length) {
        const item = itemPattern.exec(lines[index] ?? "");
        if (item == null) {
          break;
        }
        items.push(<li key={index}>{renderMarkdownInline(item[1], index)}</li>);
        index += 1;
      }
      blocks.push(
        ordered ? <ol key={`list-${index}`}>{items}</ol> : <ul key={`list-${index}`}>{items}</ul>,
      );
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      (lines[index] ?? "").trim().length > 0 &&
      !isMarkdownBlock(lines[index] ?? "")
    ) {
      paragraphLines.push(lines[index] ?? "");
      index += 1;
    }
    blocks.push(
      <p key={`paragraph-${index}`}>{renderMarkdownInline(paragraphLines.join(" "), index)}</p>,
    );
  }

  return blocks;
}

function isMarkdownBlock(line: string) {
  return /^(#{1,3})\s+|^>\s?|^([-*+]|\d+\.)\s+|^!\[[^\]]*\]\([^\s)]+/.test(line);
}

function renderMarkdownInline(value: string, keyPrefix: number): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^\s)]+)\)|(\*\*|__)(.+?)\3|(\*|_)(.+?)\5|`([^`]+)`/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let tokenIndex = 0;

  const appendText = (text: string) => {
    if (text.length > 0) {
      nodes.push(text);
      tokenIndex += 1;
    }
  };

  while ((match = pattern.exec(value)) != null) {
    appendText(value.slice(cursor, match.index));

    if (match[1] != null && match[2] != null && isSafeMarkdownUrl(match[2])) {
      nodes.push(
        <a
          href={match[2]}
          key={`${keyPrefix}-${tokenIndex++}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {renderMarkdownInline(match[1], keyPrefix * 100 + tokenIndex)}
        </a>,
      );
    } else if (match[4] != null) {
      nodes.push(<strong key={`${keyPrefix}-${tokenIndex++}`}>{match[4]}</strong>);
    } else if (match[6] != null) {
      nodes.push(<em key={`${keyPrefix}-${tokenIndex++}`}>{match[6]}</em>);
    } else if (match[7] != null) {
      nodes.push(<code key={`${keyPrefix}-${tokenIndex++}`}>{match[7]}</code>);
    } else {
      appendText(match[0]);
    }

    cursor = pattern.lastIndex;
  }

  appendText(value.slice(cursor));
  return nodes;
}

function isSafeMarkdownUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

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
    const level = typeof node.attrs?.level === "number" ? node.attrs.level : 2;
    return (
      <h3 className={`markdown-heading markdown-heading-${level}`} key={index}>
        {renderInlineContent(node.content)}
      </h3>
    );
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

function getTiptapNodeText(node: TiptapNode): string {
  if (typeof node.text === "string") {
    return node.marks?.some((mark) => mark.type === "italic") ? `_${node.text}_` : node.text;
  }

  if (node.type === "hardBreak") {
    return "\n";
  }

  return (node.content ?? []).map(getTiptapNodeText).join("");
}

function renderInlineContent(nodes?: TiptapNode[]): ReactNode {
  const legacyInlineCode = (nodes ?? []).map(getTiptapNodeText).join("").trim();

  if (legacyInlineCode.includes("`")) {
    return legacyInlineCode
      .split(/(`[^`]+`)/g)
      .filter(Boolean)
      .map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={`legacy-inline-code-${index}`}>{part.slice(1, -1)}</code>
        ) : (
          part
        ),
      );
  }

  return (nodes ?? []).map((node, index) => {
    if (node.type === "text") {
      return renderTextNode(node, index);
    }

    if (node.type === "hardBreak") {
      return <br key={index} />;
    }

    return <Fragment key={index}>{renderInlineContent(node.content)}</Fragment>;
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

  if (marks.some((mark) => mark.type === "code")) {
    content = <code>{content}</code>;
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

  return <Fragment key={index}>{content}</Fragment>;
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
