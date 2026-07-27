import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { getCampaignDetail, getMissionDetail } from "@pacto/api";
import type { MissionStatus } from "@pacto/types";
import { CalendarDays, CircleCheck, Coins, Link2 } from "lucide-react";
import {
  canSubmitMission,
  formatDeadlineDday,
  formatKoreanDate,
  formatPoint,
  getMissionStatusView,
} from "@pacto/utils";

import { MissionSubmitAction } from "../../../_components/mock-actions";
import { ResilientCampaignImage } from "../../../_components/resilient-campaign-image";
import { fallbackOnNonAuthError, redirectOnAuthError } from "../../../_lib/auth-error";
import { getFallbackCampaignThumbnail } from "../../../_lib/campaign-thumbnail";
import { getBloggerSession } from "../../../_lib/session";

type MissionDetailPageProps = {
  params: Promise<{
    missionId: string;
  }>;
};

export default async function MissionDetailPage({ params }: MissionDetailPageProps) {
  const { missionId } = await params;
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const mission = await getMissionDetail(Number(missionId), {}, session.accessToken).catch(
    redirectOnAuthError,
  );

  if (mission == null) {
    notFound();
  }

  const campaign = await getCampaignDetail(mission.campaignId, session.accessToken).catch(
    (error: unknown) => fallbackOnNonAuthError(error, undefined),
  );
  const displayMission =
    campaign == null
      ? mission
      : {
          ...mission,
          brandName: campaign.brandName,
          campaignTitle: campaign.title,
          dueDate: campaign.deadline,
          rewardPoint: campaign.rewardPoint,
          thumbnailUrl: campaign.thumbnailUrl ?? mission.thumbnailUrl,
        };
  const statusView = getMissionStatusView(displayMission.status);
  const isSubmitEnabled =
    canSubmitMission(displayMission.status) && campaign?.status === "in_progress";
  const isWaitingForCampaignStart =
    canSubmitMission(displayMission.status) && campaign?.status !== "in_progress";

  return (
    <section
      className="screen-stack detail-screen mission-detail-page"
      aria-labelledby="mission-detail-title"
    >
      <Link
        className="mission-detail-overview"
        href={`/campaigns/${displayMission.campaignId}`}
        aria-label={`${displayMission.campaignTitle} 캠페인 상세 보기`}
      >
        <ResilientCampaignImage
          alt={`${displayMission.campaignTitle} 대표 이미지`}
          campaignId={displayMission.campaignId}
          fallbackSrc={getFallbackCampaignThumbnail(displayMission.campaignId)}
          src={
            displayMission.thumbnailUrl ?? getFallbackCampaignThumbnail(displayMission.campaignId)
          }
        />
        <div>
          <div className="mission-detail-badges">
            <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
            <span>내 미션</span>
          </div>
          <p className="section-label">{displayMission.brandName}</p>
          <h1 id="mission-detail-title">{displayMission.campaignTitle}</h1>
        </div>
      </Link>

      <section className="mission-detail-metrics" aria-label="미션 수행 정보">
        <article>
          <CalendarDays aria-hidden="true" size={19} strokeWidth={1.9} />
          <div>
            <span>리뷰 등록 마감</span>
            <strong>{formatDeadlineDday(displayMission.dueDate)}</strong>
            <small>{formatKoreanDate(displayMission.dueDate)}</small>
          </div>
        </article>
        <article>
          <Coins aria-hidden="true" size={19} strokeWidth={1.9} />
          <div>
            <span>완료 보상</span>
            <strong>{formatPoint(displayMission.rewardPoint)}</strong>
            <small>승인 후 지갑에 적립</small>
          </div>
        </article>
      </section>

      <section className="mission-journey-panel mission-detail-status" aria-label="미션 현황">
        <div className="mission-detail-status-copy">
          <span aria-hidden="true">
            <CircleCheck size={18} strokeWidth={2} />
          </span>
          <div>
            <p className="section-label">현재 진행 단계</p>
            <h2>{statusView.label}</h2>
            <strong>{getMissionStatusDescription(displayMission.status)}</strong>
          </div>
        </div>
        <MissionDetailStatusFlow status={displayMission.status} />
      </section>

      <section className="section-block mission-review-card">
        <div className="section-head mission-review-heading">
          <div>
            <span aria-hidden="true">
              <Link2 size={18} strokeWidth={2} />
            </span>
            <div>
              <p className="section-label">제출한 콘텐츠</p>
              <h2>리뷰 URL</h2>
            </div>
          </div>
          <span>{displayMission.submittedUrl == null ? "등록 전" : "등록 완료"}</span>
        </div>
        {displayMission.submittedUrl == null ? (
          <p className="body-copy">아직 등록된 리뷰가 없어요.</p>
        ) : (
          <a
            className="mission-review-link"
            href={displayMission.submittedUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{displayMission.submittedUrl}</span>
            <Link2 aria-hidden="true" size={16} strokeWidth={2} />
          </a>
        )}
      </section>

      <div className="fixed-cta">
        {isWaitingForCampaignStart ? (
          <div className="cta-stack">
            <Link className="primary-button weak-button" href="/missions">
              선정 완료 · 미션 시작 대기
            </Link>
            <p>광고주가 캠페인을 시작하면 리뷰 URL을 제출할 수 있어요.</p>
          </div>
        ) : (
          <MissionSubmitAction enabled={isSubmitEnabled} missionId={displayMission.id} />
        )}
      </div>
    </section>
  );
}

function MissionDetailStatusFlow({ status }: { status: MissionStatus }) {
  const activeIndex = getMissionStatusStepIndex(status);
  const steps =
    status === "cancelled" || status === "rejected"
      ? [
          { label: "진행", helper: "미션 시작" },
          { label: status === "cancelled" ? "취소" : "반려", helper: "종료" },
        ]
      : [
          { label: "진행", helper: "리뷰 작성" },
          { label: "제출", helper: "URL 등록" },
          { label: "검수", helper: "광고주 확인" },
          { label: "정산", helper: "보상 지급" },
        ];

  return (
    <ol className="mission-status-flow">
      {steps.map((step, index) => {
        const state =
          index < activeIndex ? "completed" : index === activeIndex ? "active" : "upcoming";

        return (
          <li className={state} key={step.label}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.label}</strong>
              <em>{step.helper}</em>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function getMissionStatusStepIndex(status: MissionStatus) {
  switch (status) {
    case "in_progress":
      return 0;
    case "submitted":
      return 2;
    case "approved":
      return 3;
    case "rejected":
    case "cancelled":
      return 1;
  }
}

function getMissionStatusDescription(status: MissionStatus) {
  switch (status) {
    case "in_progress":
      return "리뷰 URL을 등록하면 광고주 검수 단계로 넘어갑니다.";
    case "submitted":
      return "리뷰 URL 제출이 완료되어 광고주 검수를 기다리고 있어요.";
    case "approved":
      return "미션 검수가 승인되어 보상 정산이 완료된 상태입니다.";
    case "rejected":
      return "제출한 미션이 반려되어 종료된 상태입니다.";
    case "cancelled":
      return "미션이 취소되어 더 이상 진행하지 않는 상태입니다.";
  }
}
