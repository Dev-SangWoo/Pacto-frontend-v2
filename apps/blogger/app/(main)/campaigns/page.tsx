import { getCampaigns } from "@pacto/api";
import type { Campaign } from "@pacto/types";
import { matchesCampaignSearch } from "@pacto/utils";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

import { CampaignExplorer } from "../../_components/campaign-explorer";
import { getBloggerSession } from "../../_lib/session";

type CampaignsPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function CampaignsPage({ searchParams }: CampaignsPageProps) {
  const params = await searchParams;
  const searchQuery = params?.q?.trim() ?? "";
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const campaignResult = await getCachedRecruitingCampaigns().then(
    (campaigns) => ({
      campaigns: campaigns
        .filter(isCurrentlyApplicableCampaign)
        .filter((campaign) => matchesCampaignSearch(campaign, searchQuery)),
      errorMessage: undefined,
    }),
    (error: unknown) => ({
      campaigns: [],
      errorMessage: getCampaignLoadErrorMessage(error),
    }),
  );

  return (
    <CampaignExplorer
      campaigns={campaignResult.campaigns}
      loadErrorMessage={campaignResult.errorMessage}
      searchQuery={searchQuery}
    />
  );
}

const getCachedRecruitingCampaigns = unstable_cache(
  () =>
    getCampaigns({
      page: 0,
      size: 24,
      sort: "campaignId,desc",
      status: "RECRUITING",
    }),
  ["blogger-recruiting-campaigns-v1"],
  { revalidate: 30, tags: ["blogger-campaigns"] },
);

function isCurrentlyApplicableCampaign(campaign: Campaign) {
  const remainingSlots =
    campaign.remainingSlots ?? Math.max(campaign.recruitCount - campaign.approvedCount, 0);

  return campaign.status === "open" && remainingSlots > 0 && !isPastDeadline(campaign.deadline);
}

function isPastDeadline(value: string) {
  const deadline = new Date(value);

  if (Number.isNaN(deadline.getTime())) {
    return true;
  }

  const today = startOfLocalDay(new Date());
  return startOfLocalDay(deadline).getTime() < today.getTime();
}

function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getCampaignLoadErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return `캠페인을 불러오지 못했어요. ${String((error as { message: string }).message)}`;
  }

  return "캠페인을 불러오지 못했어요. 백엔드 연결 상태를 확인해 주세요.";
}
