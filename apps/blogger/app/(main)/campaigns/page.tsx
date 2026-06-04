import Link from "next/link";

import { getCampaigns } from "@pacto/api";
import { formatKoreanDate, formatPoint, getCampaignStatusView } from "@pacto/utils";

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();
  const openCampaigns = campaigns.filter((campaign) => campaign.status === "open");
  const totalRewardPoint = campaigns.reduce((sum, campaign) => sum + campaign.rewardPoint, 0);

  return (
    <section className="screen-stack" aria-labelledby="campaigns-title">
      <div className="page-heading">
        <p className="section-label">참여 가능 캠페인</p>
        <h1 id="campaigns-title">예산이 확인된 캠페인만 확인하세요</h1>
        <p>모집 경쟁률, 마감일, 정산 예정 금액을 먼저 비교하고 지원할 수 있어요.</p>
      </div>

      <section className="summary-strip" aria-label="캠페인 요약">
        <div>
          <span>모집 중</span>
          <strong>{openCampaigns.length}건</strong>
        </div>
        <div>
          <span>총 정산 예정</span>
          <strong>{formatPoint(totalRewardPoint)}</strong>
        </div>
      </section>

      <section className="safety-banner" aria-label="안전 참여 안내">
        <div>
          <span>안전 정산</span>
          <strong>대행사 검수 후 지갑으로 이동</strong>
        </div>
        <p>지원 전 가이드와 마감일을 확인하고, 승인된 미션만 정산 대상으로 관리해요.</p>
      </section>

      <div className="filter-row" aria-label="캠페인 필터">
        <button className="filter-chip active" type="button">
          전체
        </button>
        <button className="filter-chip" type="button">
          모집 중
        </button>
        <button className="filter-chip" type="button">
          높은 보상
        </button>
      </div>

      <section className="list-stack" aria-label="캠페인 목록">
        {campaigns.map((campaign) => {
          const statusView = getCampaignStatusView(campaign.status);
          const competitionRate =
            Math.round((campaign.applicantCount / campaign.recruitCount) * 10) / 10;

          return (
            <Link
              className="list-card campaign-row"
              href={`/campaigns/${campaign.id}`}
              key={campaign.id}
            >
              <span className={`status-badge ${statusView.tone}`}>{statusView.label}</span>
              <div>
                <p className="muted-text">{campaign.brandName}</p>
                <h2>{campaign.title}</h2>
              </div>
              <div className="campaign-signal">
                <span>지원 {campaign.applicantCount}명</span>
                <span>경쟁률 {competitionRate}:1</span>
              </div>
              <div className="row-meta">
                <strong>{formatPoint(campaign.rewardPoint)}</strong>
                <span>
                  {campaign.approvedCount}/{campaign.recruitCount}명 ·{" "}
                  {formatKoreanDate(campaign.deadline)} 마감
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </section>
  );
}
