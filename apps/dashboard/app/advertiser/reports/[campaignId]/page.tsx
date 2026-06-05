import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";

type AdvertiserReportPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function AdvertiserReportPage({ params }: AdvertiserReportPageProps) {
  const { campaignId } = await params;
  const campaign = await getCampaignDetail(Number(campaignId));

  if (campaign == null) {
    notFound();
  }

  const progress = Math.round((campaign.approvedCount / campaign.recruitCount) * 100);

  return (
    <main className="advertiser-shell">
      <section className="advertiser-card" aria-labelledby="report-title">
        <p className="eyebrow">Campaign report</p>
        <h1 id="report-title">{campaign.title}</h1>
        <p>광고주는 모집과 수행 결과만 간단하게 확인합니다.</p>

        <div className="pay-amount">
          <span>진행률</span>
          <strong>{progress}%</strong>
        </div>

        <div className="info-list compact-list">
          <div>
            <span>승인 블로거</span>
            <strong>
              {campaign.approvedCount}/{campaign.recruitCount}명
            </strong>
          </div>
          <div>
            <span>지원자</span>
            <strong>{campaign.applicantCount}명</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
