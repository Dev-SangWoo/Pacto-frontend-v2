import Link from "next/link";

import { getCampaigns } from "@pacto/api";
import { formatKoreanDate, formatPoint, getCampaignStatusView } from "@pacto/utils";

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <section className="screen-stack" aria-labelledby="campaigns-title">
      <div className="page-heading">
        <p className="section-label">참여 가능 캠페인</p>
        <h1 id="campaigns-title">조건이 맞는 캠페인을 골라보세요</h1>
        <p>보상, 모집 상태, 마감일을 확인하고 바로 지원할 수 있어요.</p>
      </div>

      <section className="summary-strip" aria-label="캠페인 요약">
        <div>
          <span>모집 중</span>
          <strong>{campaigns.filter((campaign) => campaign.status === "open").length}건</strong>
        </div>
        <div>
          <span>예상 보상</span>
          <strong>
            {formatPoint(campaigns.reduce((sum, campaign) => sum + campaign.rewardPoint, 0))}
          </strong>
        </div>
      </section>

      <section className="list-stack" aria-label="캠페인 목록">
        {campaigns.map((campaign) => {
          const statusView = getCampaignStatusView(campaign.status);

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
