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
        <span>미션 승인 후 지갑에 반영될 금액</span>
        <strong>{formatPoint(campaign.rewardPoint)}</strong>
        <p>
          캠페인 예산은 에스크로 기준으로 관리되며, 미션 검수 완료 후 정산 가능 금액으로 이동해요.
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
        <h2 id="apply-checklist-title">지원 전 확인</h2>
        <ul>
          <li>마감일까지 방문과 리뷰 작성이 가능한지 확인해 주세요.</li>
          <li>가이드에 맞지 않는 제출물은 정산이 지연될 수 있어요.</li>
          <li>선착순 캠페인은 승인 인원이 차면 자동 마감돼요.</li>
        </ul>
      </section>

      <div className="fixed-cta">
        <button className="primary-button" disabled={!isApplyEnabled} type="button">
          {isApplyEnabled ? "캠페인 지원하기" : statusView.label}
        </button>
      </div>
    </section>
  );
}
