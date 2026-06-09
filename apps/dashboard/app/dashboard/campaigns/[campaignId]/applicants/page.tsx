import { notFound } from "next/navigation";

import { getApplicants, getCampaignDetail } from "@pacto/api";

import { getDashboardSession } from "../../../../_lib/session";
import { CampaignStepProgress } from "../_components/campaign-step-progress";
import { ApplicantList } from "./_components/applicant-list";

type ApplicantsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
  const { campaignId } = await params;
  const session = await getDashboardSession();
  const campaign = await getCampaignDetail(Number(campaignId), session.accessToken);

  if (campaign == null) {
    notFound();
  }

  const initialApplicants = await getApplicants(campaign.id, session.accessToken);

  return (
    <>
      <header className="campaign-page-header">
        <div className="topbar">
          <div>
            <p className="eyebrow">{campaign.title}</p>
            <h1>지원자 관리</h1>
          </div>
        </div>
        <CampaignStepProgress activeStep="applicants" campaignId={campaign.id} />
      </header>

      <ApplicantList campaignId={campaign.id} initialApplicants={initialApplicants} />
    </>
  );
}
