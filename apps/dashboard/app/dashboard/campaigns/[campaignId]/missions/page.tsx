import { notFound } from "next/navigation";

import { getCampaignDetail, getCampaignMissions } from "@pacto/api";

import { getDashboardSession } from "../../../../_lib/session";
import { isOwnedCampaign } from "../../_lib/campaign-ownership";
import { CampaignStepProgress } from "../_components/campaign-step-progress";
import { MissionReviewList } from "./_components/mission-review-list";

type MissionReviewPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function MissionReviewPage({ params }: MissionReviewPageProps) {
  const { campaignId } = await params;
  const session = await getDashboardSession();
  const campaign = await getCampaignDetail(Number(campaignId), session.accessToken);

  if (campaign == null || !(await isOwnedCampaign(campaign, session))) {
    notFound();
  }

  const campaignMissions = await getCampaignMissions(Number(campaignId), session.accessToken);

  return (
    <>
      <header className="campaign-page-header">
        <div className="topbar">
          <div>
            <p className="eyebrow">{campaign.brandName}</p>
            <h1>미션 검수</h1>
          </div>
        </div>
        <CampaignStepProgress activeStep="missions" campaignId={campaign.id} />
      </header>

      <MissionReviewList campaignId={campaign.id} initialMissions={campaignMissions} />
    </>
  );
}

// buildMockMissions removed as it is no longer used
