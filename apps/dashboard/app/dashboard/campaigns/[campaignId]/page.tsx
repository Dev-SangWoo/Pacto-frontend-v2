import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";
import { formatKoreanDate, formatPoint, getCampaignStatusView } from "@pacto/utils";

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

  const statusView = getCampaignStatusView(campaign.status);

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">{campaign.brandName}</p>
          <h1>{campaign.title}</h1>
        </div>
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <p>보상</p>
          <strong>{formatPoint(campaign.rewardPoint)}</strong>
          <span>블로거 1인 기준</span>
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
              <h2>미션 가이드</h2>
              <p>블로거에게 노출되는 수행 조건입니다.</p>
            </div>
          </div>
          <div className="panel-body">
            <p>{campaign.guidelines}</p>
          </div>
        </article>
        <aside className="panel">
          <div className="panel-heading compact">
            <h2>운영 액션</h2>
          </div>
          <div className="queue-list">
            <a href={`/dashboard/campaigns/${campaign.id}/applicants`}>
              <span>지원자 관리</span>
              <strong>{campaign.applicantCount}명</strong>
            </a>
            <a href={`/dashboard/campaigns/${campaign.id}/missions`}>
              <span>미션 검수</span>
              <strong>대기</strong>
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
