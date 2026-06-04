import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";
import {
  canApplyToCampaign,
  formatKoreanDate,
  formatPoint,
  getCampaignStatusView,
} from "@pacto/utils";

import { CampaignApplyAction } from "../../../_components/mock-actions";

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
  const remainingSlots = Math.max(campaign.recruitCount - campaign.approvedCount, 0);

  return (
    <section className="screen-stack detail-screen" aria-labelledby="campaign-detail-title">
      <div className="detail-cover">
        <img src={campaign.thumbnailUrl} alt={`${campaign.title} 대표 이미지`} />
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
      </div>

      <section className="detail-summary">
        <p className="section-label">{campaign.brandName}</p>
        <h1 id="campaign-detail-title">{campaign.title}</h1>
        <strong>{formatPoint(campaign.rewardPoint)}</strong>
      </section>

      <section className="ticket-facts detail-facts" aria-label="캠페인 핵심 조건">
        <div>
          <dt>남은 자리</dt>
          <dd>{remainingSlots}명</dd>
        </div>
        <div>
          <dt>지원자</dt>
          <dd>{campaign.applicantCount}명</dd>
        </div>
        <div>
          <dt>마감</dt>
          <dd>{formatKoreanDate(campaign.deadline)}</dd>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <p className="section-label">미션 조건</p>
            <h2>해야 할 일</h2>
          </div>
        </div>
        <p className="body-copy">{campaign.guidelines}</p>
      </section>

      <div className="fixed-cta">
        <CampaignApplyAction campaignId={campaign.id} enabled={isApplyEnabled} />
      </div>
    </section>
  );
}
