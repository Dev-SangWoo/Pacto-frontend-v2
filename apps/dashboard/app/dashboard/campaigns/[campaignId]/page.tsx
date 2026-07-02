import { notFound } from "next/navigation";

import {
  getApplicants,
  getCampaignDetail,
  getCampaignEscrows,
  getCampaignMissions,
} from "@pacto/api";
import {
  formatDeadlineDday,
  formatKoreanDate,
  formatPoint,
  getCampaignStatusView,
} from "@pacto/utils";

import { getDashboardSession } from "../../../_lib/session";
import { CampaignTransitionActions } from "../_components/campaign-transition-actions";
import { isOwnedCampaign } from "../_lib/campaign-ownership";
import { CampaignStepProgress } from "./_components/campaign-step-progress";

type CampaignDetailPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function DashboardCampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { campaignId } = await params;
  const session = await getDashboardSession();
  const campaign = await getCampaignDetail(Number(campaignId), session.accessToken);

  if (campaign == null || !(await isOwnedCampaign(campaign, session))) {
    notFound();
  }

  const [missions, escrows, applicants] = await Promise.all([
    getCampaignMissions(campaign.id, session.accessToken).catch(() => []),
    getCampaignEscrows(campaign.id, session.accessToken).catch(() => []),
    getApplicants(campaign.id, session.accessToken).catch(() => []),
  ]);
  const campaignMissions = missions;
  const submittedMissionCount = campaignMissions.filter(
    (mission) => mission.status === "submitted",
  ).length;
  const approvedMissionCount = campaignMissions.filter(
    (mission) => mission.status === "approved",
  ).length;
  const campaignEscrows = escrows;
  const settlementReadyAmount = approvedMissionCount * campaign.rewardPoint;
  const statusView = getCampaignStatusView(campaign.status);
  const totalSlots = campaign.totalSlots ?? campaign.recruitCount;
  const applicantCount = applicants.length > 0 ? applicants.length : campaign.applicantCount;
  const approvedSlotsFromApplicants = applicants.filter(
    (applicant) => applicant.status === "ACCEPTED",
  ).length;
  const pendingApplicantCountFromApplicants = applicants.filter(
    (applicant) => applicant.status === "PENDING",
  ).length;
  const approvedSlots =
    applicants.length > 0 ? approvedSlotsFromApplicants : campaign.approvedCount;
  const remainingSlots = campaign.remainingSlots ?? Math.max(totalSlots - approvedSlots, 0);
  const pendingApplicantCount =
    applicants.length > 0
      ? pendingApplicantCountFromApplicants
      : Math.max(campaign.applicantCount - approvedSlots, 0);
  const recruitProgress = getPercentage(approvedSlots, totalSlots);

  const actionCards = [
    {
      emoji: "🙋",
      label: "지원자 승인 대기",
      value: `${pendingApplicantCount}명`,
      description: "새 신청자를 확인하고 승인 여부를 결정합니다.",
      href: `/dashboard/campaigns/${campaign.id}/applicants`,
      tone: pendingApplicantCount > 0 ? "blue" : "grey",
    },
    {
      emoji: "📝",
      label: "미션 검수 대기",
      value: `${submittedMissionCount}건`,
      description: "블로거가 제출한 URL을 확인합니다.",
      href: `/dashboard/campaigns/${campaign.id}/missions`,
      tone: submittedMissionCount > 0 ? "blue" : "grey",
    },
    {
      emoji: "💰",
      label: "정산 가능 금액",
      value: formatPoint(settlementReadyAmount),
      description: "최종 승인된 제출물 기준 정산 예정액입니다.",
      href: `/dashboard/campaigns/${campaign.id}/settlements`,
      tone: settlementReadyAmount > 0 ? "green" : "grey",
    },
  ];

  const operationSteps = [
    {
      label: "모집",
      description: "캠페인 노출과 신청 현황을 확인합니다.",
      value: `${recruitProgress}%`,
      meta: `${approvedSlots}/${totalSlots}명 승인`,
      href: `/dashboard/campaigns/${campaign.id}`,
    },
    {
      label: "지원자",
      description: "캠페인 신청자를 승인하거나 반려합니다.",
      value: `${applicantCount}명`,
      meta: `${pendingApplicantCount}명 대기`,
      href: `/dashboard/campaigns/${campaign.id}/applicants`,
    },
    {
      label: "미션 검수",
      description: "승인된 참여자가 제출한 URL을 확인합니다.",
      value: `${submittedMissionCount}건 대기`,
      meta: `${campaignMissions.length}건 제출`,
      href: `/dashboard/campaigns/${campaign.id}/missions`,
    },
    {
      label: "정산",
      description: "최종 승인된 제출물을 정산 처리합니다.",
      value: formatPoint(settlementReadyAmount),
      meta: `${campaignEscrows.length}건 에스크로`,
      href: `/dashboard/campaigns/${campaign.id}/settlements`,
    },
  ];

  return (
    <>
      <header className="campaign-page-header">
        <div className="topbar campaign-detail-hero">
          <div>
            <p className="eyebrow">{campaign.brandName}</p>
            <h1>{campaign.title}</h1>
            <p className="topbar-copy">
              모집, 검수, 정산까지 이 캠페인의 다음 작업을 한 화면에서 확인합니다.
            </p>
          </div>
          <div className="dashboard-header-actions">
            <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
            <CampaignTransitionActions
              campaignId={campaign.id}
              redirectTo={`/dashboard/campaigns/${campaign.id}`}
              selectedCount={approvedSlots}
              status={campaign.status}
            />
          </div>
        </div>
        <CampaignStepProgress activeStep="overview" campaignId={campaign.id} />
      </header>

      <section className="campaign-action-grid" aria-label="현재 필요한 작업">
        {actionCards.map((card) => (
          <a className={`campaign-action-card ${card.tone}`} href={card.href} key={card.label}>
            <span>
              <span className="info-card-emoji" aria-hidden="true">
                {card.emoji}
              </span>
              {card.label}
            </span>
            <strong>{card.value}</strong>
            <p>{card.description}</p>
          </a>
        ))}
      </section>

      <section className="campaign-detail-kpi-grid" aria-label="캠페인 핵심 지표">
        <article className="summary-card">
          <p>
            <span className="info-card-emoji" aria-hidden="true">
              🎁
            </span>
            보상
          </p>
          <strong>{formatPoint(campaign.rewardPoint)}</strong>
          <span>참여자 1명 기준</span>
        </article>
        <article className="summary-card">
          <p>
            <span className="info-card-emoji" aria-hidden="true">
              📈
            </span>
            모집률
          </p>
          <strong>{recruitProgress}%</strong>
          <span>승인된 인원 · 남은 {remainingSlots}명</span>
        </article>
        <article className="summary-card">
          <p>
            <span className="info-card-emoji" aria-hidden="true">
              🙋
            </span>
            지원자
          </p>
          <strong>{applicantCount}명</strong>
          <span>
            승인 {approvedSlots}명 · 대기 {pendingApplicantCount}명
          </span>
        </article>
        <article className="summary-card">
          <p>
            <span className="info-card-emoji" aria-hidden="true">
              📅
            </span>
            마감일
          </p>
          <strong>{formatKoreanDate(campaign.deadline)}</strong>
          <span>{formatDeadlineDday(campaign.deadline)}</span>
          <span>모집 종료 기준</span>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>운영 파이프라인</h2>
              <p>모집부터 정산까지 현재 캠페인이 어느 단계에 있는지 확인합니다.</p>
            </div>
          </div>
          <div className="campaign-pipeline">
            {operationSteps.map((step, index) => (
              <a href={step.href} key={step.label}>
                <span className="campaign-pipeline-index">{index + 1}</span>
                <div>
                  <strong>{step.label}</strong>
                  <p>{step.description}</p>
                  <small>{step.meta}</small>
                </div>
                <em>{step.value}</em>
              </a>
            ))}
          </div>
        </article>
        <aside className="panel">
          <div className="panel-heading compact">
            <h2>미션 가이드</h2>
          </div>
          <div className="panel-body">
            <p>{campaign.guidelines}</p>
          </div>
          <div className="compact-list campaign-meta-list">
            <div>
              <span>제출 미션</span>
              <strong>{campaignMissions.length}건</strong>
            </div>
            <div>
              <span>승인 완료</span>
              <strong>{approvedMissionCount}건</strong>
            </div>
            <div>
              <span>에스크로</span>
              <strong>{campaignEscrows.length}건</strong>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function getPercentage(value: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((value / total) * 100));
}
