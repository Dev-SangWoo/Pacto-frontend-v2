import { notFound } from "next/navigation";

import { getCampaignDetail } from "@pacto/api";
import type { Applicant } from "@pacto/types";

import { getDashboardSession } from "../../../../_lib/session";
import { CampaignStepProgress } from "../_components/campaign-step-progress";
import { ApplicantList } from "./_components/applicant-list";

type ApplicantsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
  const { campaignId } = await params;
  const session = await getDashboardSession();
  const campaign = await getCampaignDetail(Number(campaignId), session.accessToken);

  if (campaign == null) {
    notFound();
  }

  const initialApplicants = buildMockApplicants(campaign.id);

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

function buildMockApplicants(campaignId: number): Applicant[] {
  return [
    {
      id: campaignId * 100 + 1,
      name: "감성리뷰어 하루",
      blogUrl: "https://blog.naver.com/haru_review",
      status: "pending",
      fitScore: "높음",
      appliedAt: "2026-06-05T10:30:00",
    },
    {
      id: campaignId * 100 + 2,
      name: "맛집기록 민",
      blogUrl: "https://blog.naver.com/min_table",
      status: "pending",
      fitScore: "보통",
      appliedAt: "2026-06-04T16:20:00",
    },
    {
      id: campaignId * 100 + 3,
      name: "라이프로그 수아",
      blogUrl: "https://blog.naver.com/sua_log",
      status: "approved",
      fitScore: "높음",
      appliedAt: "2026-06-03T12:10:00",
    },
  ];
}
