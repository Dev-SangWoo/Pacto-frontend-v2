import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";
import { formatPoint } from "@pacto/utils";

type AdvertiserPayPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function AdvertiserPayPage({ params }: AdvertiserPayPageProps) {
  const { campaignId } = await params;
  const campaign = await getCampaignDetail(Number(campaignId));

  if (campaign == null) {
    notFound();
  }

  const maxBudget = campaign.rewardPoint * campaign.recruitCount;

  return (
    <main className="advertiser-shell">
      <section className="advertiser-card" aria-labelledby="pay-title">
        <p className="eyebrow">Pacto campaign budget</p>
        <h1 id="pay-title">{campaign.title}</h1>
        <p>
          현재 백엔드는 캠페인 생성 시 전체 예산을 바로 잠그지 않습니다. 지원자를 승인할 때 1명분
          보상액이 광고주 지갑에서 에스크로로 잠깁니다.
        </p>

        <div className="pay-amount">
          <span>예상 최대 예산</span>
          <strong>{formatPoint(maxBudget)}</strong>
        </div>

        <div className="info-list compact-list">
          <div>
            <span>모집 인원</span>
            <strong>{campaign.recruitCount}명</strong>
          </div>
          <div>
            <span>1명 보상</span>
            <strong>{formatPoint(campaign.rewardPoint)}</strong>
          </div>
        </div>

        <a className="primary-button wide" href={`/dashboard/campaigns/${campaign.id}/applicants`}>
          지원자 승인으로 이동
        </a>
      </section>
    </main>
  );
}
