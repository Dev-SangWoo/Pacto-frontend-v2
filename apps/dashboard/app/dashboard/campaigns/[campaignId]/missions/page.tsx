import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";
import type { Campaign, Mission } from "@pacto/types";

import { getDashboardSession } from "../../../../_lib/session";
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

  if (campaign == null) {
    notFound();
  }

  const campaignMissions = buildMockMissions(campaign);

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

function buildMockMissions(campaign: Campaign): Mission[] {
  const thumbnailUrl = campaign.thumbnailUrl ?? "/campaigns/seongsu-brunch-cafe.png";

  return [
    {
      id: campaign.id * 100 + 11,
      campaignId: campaign.id,
      bloggerId: 201,
      campaignTitle: campaign.title,
      brandName: "감성리뷰어 하루",
      thumbnailUrl,
      rewardPoint: campaign.rewardPoint,
      dueDate: "2026-06-12T23:59:59",
      submittedUrl: "https://blog.naver.com/haru_review/223000001",
      status: "submitted",
    },
    {
      id: campaign.id * 100 + 12,
      campaignId: campaign.id,
      bloggerId: 202,
      campaignTitle: campaign.title,
      brandName: "맛집기록 민",
      thumbnailUrl,
      rewardPoint: campaign.rewardPoint,
      dueDate: "2026-06-14T23:59:59",
      status: "in_progress",
    },
    {
      id: campaign.id * 100 + 13,
      campaignId: campaign.id,
      bloggerId: 203,
      campaignTitle: campaign.title,
      brandName: "라이프로그 수아",
      thumbnailUrl,
      rewardPoint: campaign.rewardPoint,
      dueDate: "2026-06-10T23:59:59",
      submittedUrl: "https://blog.naver.com/sua_log/223000002",
      status: "approved",
    },
  ];
}
