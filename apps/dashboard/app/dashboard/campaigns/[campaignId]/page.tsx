import { notFound } from "next/navigation";

import { getCampaignDetail, getMyEscrows, getMyMissions } from "@pacto/api";
import { formatKoreanDate, formatPoint, getCampaignStatusView } from "@pacto/utils";

import { CampaignStepProgress } from "./_components/campaign-step-progress";

type CampaignDetailPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function DashboardCampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { campaignId } = await params;
  const campaign = await getCampaignDetail(Number(campaignId));

  if (campaign == null) {
    notFound();
  }

  const [missions, escrows] = await Promise.all([getMyMissions(), getMyEscrows()]);
  const campaignMissions = missions.filter((mission) => mission.campaignId === campaign.id);
  const submittedMissionCount = campaignMissions.filter(
    (mission) => mission.status === "submitted",
  ).length;
  const approvedMissionCount = campaignMissions.filter(
    (mission) => mission.status === "approved",
  ).length;
  const campaignEscrows = escrows.filter((escrow) => escrow.campaignId === campaign.id);
  const settlementReadyAmount = approvedMissionCount * campaign.rewardPoint;
  const statusView = getCampaignStatusView(campaign.status);

  const operationSteps = [
    {
      label: "지원자",
      description: "캠페인 신청자를 승인하거나 반려합니다.",
      value: `${campaign.applicantCount}명`,
      href: `/dashboard/campaigns/${campaign.id}/applicants`,
    },
    {
      label: "미션 검수",
      description: "승인된 참여자가 제출한 URL을 확인합니다.",
      value: `${submittedMissionCount}건 대기`,
      href: `/dashboard/campaigns/${campaign.id}/missions`,
    },
    {
      label: "정산",
      description: "최종 승인된 제출물을 정산 처리합니다.",
      value: formatPoint(settlementReadyAmount),
      href: `/dashboard/campaigns/${campaign.id}/settlements`,
    },
  ];

  return (
    <>
      <header className="campaign-page-header">
        <div className="topbar">
          <div>
            <p className="eyebrow">{campaign.brandName}</p>
            <h1>{campaign.title}</h1>
          </div>
          <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
        </div>
        <CampaignStepProgress activeStep="overview" campaignId={campaign.id} />
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <p>보상</p>
          <strong>{formatPoint(campaign.rewardPoint)}</strong>
          <span>참여자 1명 기준</span>
        </article>
        <article className="summary-card">
          <p>승인 현황</p>
          <strong>
            {campaign.approvedCount}/{campaign.recruitCount}명
          </strong>
          <span>지원자 {campaign.applicantCount}명</span>
        </article>
        <article className="summary-card">
          <p>마감일</p>
          <strong>{formatKoreanDate(campaign.deadline)}</strong>
          <span>모집 종료 기준</span>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>캠페인 운영 흐름</h2>
              <p>지원자를 승인한 뒤 제출 URL을 검수하고, 최종 승인된 건만 정산합니다.</p>
            </div>
          </div>
          <div className="flow-list">
            {operationSteps.map((step, index) => (
              <a href={step.href} key={step.href}>
                <span className="flow-index">{index + 1}</span>
                <div>
                  <strong>{step.label}</strong>
                  <p>{step.description}</p>
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
