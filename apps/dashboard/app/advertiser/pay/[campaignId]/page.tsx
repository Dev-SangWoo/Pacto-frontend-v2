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

  const depositAmount = campaign.rewardPoint * campaign.recruitCount;

  return (
    <main className="advertiser-shell">
      <section className="advertiser-card" aria-labelledby="pay-title">
        <p className="eyebrow">Pacto escrow payment</p>
        <h1 id="pay-title">{campaign.title}</h1>
        <p>{campaign.brandName} 캠페인의 블로거 보상 예산을 에스크로로 예치합니다.</p>

        <div className="pay-amount">
          <span>예치할 금액</span>
          <strong>{formatPoint(depositAmount)}</strong>
        </div>

        <div className="info-list compact-list">
          <div>
            <span>모집 인원</span>
            <strong>{campaign.recruitCount}명</strong>
          </div>
          <div>
            <span>1인 보상</span>
            <strong>{formatPoint(campaign.rewardPoint)}</strong>
          </div>
        </div>

        <button className="primary-button wide" type="button">
          결제 진행하기
        </button>
      </section>
    </main>
  );
}
