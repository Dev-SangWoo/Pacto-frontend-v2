import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";
import {
  canApplyToCampaign,
  formatKoreanDate,
  formatPoint,
  getCampaignStatusView,
} from "@pacto/utils";

type CampaignDetailPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { campaignId } = await params;
  const campaign = await getCampaignDetail(Number(campaignId));

  if (campaign == null) {
    notFound();
  }

  const statusView = getCampaignStatusView(campaign.status);
  const isApplyEnabled = canApplyToCampaign(campaign.status);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="campaign-detail-title">
      <div className="page-heading">
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
        <p className="section-label">{campaign.brandName}</p>
        <h1 id="campaign-detail-title">{campaign.title}</h1>
      </div>

      <section className="reward-panel" aria-label="캠페인 보상">
        <span>미션 승인 후 받을 보상</span>
        <strong>{formatPoint(campaign.rewardPoint)}</strong>
      </section>

      <section className="info-list" aria-label="캠페인 조건">
        <div>
          <span>모집 인원</span>
          <strong>
            {campaign.approvedCount}/{campaign.recruitCount}명 승인
          </strong>
        </div>
        <div>
          <span>지원자</span>
          <strong>{campaign.applicantCount}명</strong>
        </div>
        <div>
          <span>마감일</span>
          <strong>{formatKoreanDate(campaign.deadline)}</strong>
        </div>
      </section>

      <section className="content-section" aria-labelledby="guideline-title">
        <h2 id="guideline-title">미션 가이드</h2>
        <p>{campaign.guidelines}</p>
      </section>

      <div className="fixed-cta">
        <button className="primary-button" disabled={!isApplyEnabled} type="button">
          {isApplyEnabled ? "캠페인 지원하기" : statusView.label}
        </button>
      </div>
    </section>
  );
}
