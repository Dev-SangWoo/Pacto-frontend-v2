import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { CalendarDays, FileCheck2, Gift, TrendingUp, UsersRound, WalletCards } from "lucide-react";

import {
  getApplicants,
  getCampaignDetail,
  getCampaignEscrows,
  getCampaignMissions,
} from "@pacto/api";
import type { CampaignStatus } from "@pacto/types";
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
      icon: UsersRound,
      iconTone: "blue",
      label: "지원자 승인 대기",
      value: String(pendingApplicantCount),
      description: "새 신청자를 확인하고 승인 여부를 결정합니다.",
      href: `/dashboard/campaigns/${campaign.id}/applicants`,
      tone: pendingApplicantCount > 0 ? "blue" : "grey",
    },
    {
      icon: FileCheck2,
      iconTone: "yellow",
      label: "미션 검수 대기",
      value: String(submittedMissionCount),
      description: "블로거가 제출한 URL을 확인합니다.",
      href: `/dashboard/campaigns/${campaign.id}/missions`,
      tone: submittedMissionCount > 0 ? "blue" : "grey",
    },
    {
      icon: WalletCards,
      iconTone: "green",
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
      meta: `${approvedSlots}/${totalSlots} 승인`,
      href: `/dashboard/campaigns/${campaign.id}`,
    },
    {
      label: "지원자",
      description: "캠페인 신청자를 승인하거나 반려합니다.",
      value: String(applicantCount),
      meta: `${pendingApplicantCount} 대기`,
      href: `/dashboard/campaigns/${campaign.id}/applicants`,
    },
    {
      label: "미션 검수",
      description: "승인된 참여자가 제출한 URL을 확인합니다.",
      value: `${submittedMissionCount} 대기`,
      meta: `${campaignMissions.length} 제출`,
      href: `/dashboard/campaigns/${campaign.id}/missions`,
    },
    {
      label: "정산",
      description: "최종 승인된 제출물을 정산 처리합니다.",
      value: formatPoint(settlementReadyAmount),
      meta: `${campaignEscrows.length} 에스크로`,
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
          </div>
        </div>
        <CampaignStepProgress activeStep="overview" campaignId={campaign.id} />
      </header>

      <section className="campaign-action-grid" aria-label="현재 필요한 작업">
        {actionCards.map((card) => {
          const Icon = card.icon;

          return (
            <a className={`campaign-action-card ${card.tone}`} href={card.href} key={card.label}>
              <span>
                <span className={`info-card-icon ${card.iconTone}`} aria-hidden="true">
                  <Icon size={22} strokeWidth={2.1} />
                </span>
                {card.label}
              </span>
              <strong>{card.value}</strong>
              <p>{card.description}</p>
            </a>
          );
        })}
      </section>

      <section className="campaign-detail-kpi-grid" aria-label="캠페인 핵심 지표">
        <CampaignKpiCard icon={Gift} iconTone="green" label="보상">
          <strong>{formatPoint(campaign.rewardPoint)}</strong>
          <span>참여자 1명 기준</span>
        </CampaignKpiCard>
        <CampaignKpiCard icon={TrendingUp} iconTone="blue" label="모집률">
          <strong>{recruitProgress}%</strong>
          <span>승인된 인원 · 남은 {remainingSlots}</span>
        </CampaignKpiCard>
        <CampaignKpiCard icon={UsersRound} iconTone="yellow" label="지원자">
          <strong>{applicantCount}</strong>
          <span>
            승인 {approvedSlots} · 대기 {pendingApplicantCount}
          </span>
        </CampaignKpiCard>
        <CampaignKpiCard icon={CalendarDays} iconTone="blue" label="마감일">
          <strong>{formatKoreanDate(campaign.deadline)}</strong>
          <span>{formatDeadlineDday(campaign.deadline)}</span>
          <span>모집 종료 기준</span>
        </CampaignKpiCard>
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
              <strong>{campaignMissions.length}</strong>
            </div>
            <div>
              <span>승인 완료</span>
              <strong>{approvedMissionCount}</strong>
            </div>
            <div>
              <span>에스크로</span>
              <strong>{campaignEscrows.length}</strong>
            </div>
          </div>
        </aside>
      </section>

      <CampaignStateDock
        campaignId={campaign.id}
        redirectTo={`/dashboard/campaigns/${campaign.id}`}
        selectedCount={approvedSlots}
        status={campaign.status}
        statusLabel={statusView.label}
        statusTone={statusView.tone}
      />
    </>
  );
}

function CampaignStateDock({
  campaignId,
  redirectTo,
  selectedCount,
  status,
  statusLabel,
  statusTone,
}: {
  campaignId: number;
  redirectTo: string;
  selectedCount: number;
  status: CampaignStatus;
  statusLabel: string;
  statusTone: "amber" | "blue" | "green" | "grey" | "red";
}) {
  const hasTransitionAction = status === "open" || status === "closed";

  return (
    <aside className="campaign-state-dock" aria-label="캠페인 상태 관리">
      <div className="campaign-state-dock-head">
        <div>
          <span>상태 관리</span>
          <strong>다음 운영 단계로 전환</strong>
        </div>
        <span className={`status-badge ${statusTone}`}>{statusLabel}</span>
      </div>

      <CampaignStatusProcess status={status} />

      <div className="campaign-state-dock-actions">
        {hasTransitionAction ? (
          <CampaignTransitionActions
            campaignId={campaignId}
            redirectTo={redirectTo}
            selectedCount={selectedCount}
            status={status}
            variant="floating"
          />
        ) : (
          <p>현재 상태에서 바로 변경할 수 있는 다음 액션이 없습니다.</p>
        )}
      </div>
    </aside>
  );
}

function CampaignStatusProcess({ status }: { status: CampaignStatus }) {
  const activeIndex = getCampaignStatusProcessIndex(status);
  const isCancelled = status === "cancelled";
  const steps = isCancelled
    ? [
        { label: "모집", helper: "시작" },
        { label: "취소", helper: "종료" },
      ]
    : [
        { label: "모집", helper: "신청 접수" },
        { label: "선정", helper: "지원자 확정" },
        { label: "진행", helper: "미션 수행" },
        { label: "완료", helper: "정산 종료" },
      ];

  return (
    <ol className="campaign-state-process">
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

function getCampaignStatusProcessIndex(status: CampaignStatus) {
  switch (status) {
    case "draft":
    case "open":
      return 0;
    case "closed":
      return 1;
    case "full":
      return 2;
    case "completed":
      return 3;
    case "cancelled":
      return 1;
  }
}

function CampaignKpiCard({
  children,
  icon: Icon,
  iconTone,
  label,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  iconTone: "blue" | "green" | "grey" | "yellow";
  label: string;
}) {
  return (
    <article className="summary-card">
      <p>
        <span className={`info-card-icon ${iconTone}`} aria-hidden="true">
          <Icon size={22} strokeWidth={2.1} />
        </span>
        {label}
      </p>
      {children}
    </article>
  );
}

function getPercentage(value: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((value / total) * 100));
}
