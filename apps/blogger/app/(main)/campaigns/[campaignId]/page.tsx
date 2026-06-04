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

  return (
    <section className="screen-stack detail-screen" aria-labelledby="campaign-detail-title">
      <div className="page-heading">
        <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
        <p className="section-label">{campaign.brandName}</p>
        <h1 id="campaign-detail-title">{campaign.title}</h1>
      </div>

      <div className="campaign-detail-media">
        <img src={campaign.thumbnailUrl} alt={`${campaign.title} 대표 이미지`} />
      </div>

      <section className="reward-panel" aria-label="캠페인 보상">
        <span>승인 후 지갑에 반영될 금액</span>
        <strong>{formatPoint(campaign.rewardPoint)}</strong>
        <p>
          미션을 제출하면 검수 후 정산 가능 금액으로 이동해요. 지급 조건은 아래 가이드에서 먼저
          확인할 수 있어요.
        </p>
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

      <section
        className="content-section checklist-section"
        aria-labelledby="apply-checklist-title"
      >
        <h2 id="apply-checklist-title">지원하기 전에 확인해요</h2>
        <ul>
          <li>마감일까지 방문과 리뷰 작성을 할 수 있어요.</li>
          <li>가이드에 맞게 제출하면 검수와 정산이 빨라져요.</li>
          <li>승인 인원이 차면 모집이 자동으로 끝나요.</li>
        </ul>
      </section>

      <div className="fixed-cta">
        <CampaignApplyAction campaignId={campaign.id} enabled={isApplyEnabled} />
      </div>
    </section>
  );
}
