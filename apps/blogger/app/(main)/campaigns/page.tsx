import { getCampaigns } from "@pacto/api";
import { redirect } from "next/navigation";

import { CampaignExplorer } from "../../_components/campaign-explorer";
import { getBloggerSession } from "../../_lib/session";

export default async function CampaignsPage() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const campaignResult = await getCampaigns({ page: 0, size: 100, sort: "campaignId,desc" }).then(
    (campaigns) => ({ campaigns, errorMessage: undefined }),
    (error: unknown) => ({
      campaigns: [],
      errorMessage: getCampaignLoadErrorMessage(error),
    }),
  );

  return (
    <CampaignExplorer
      campaigns={campaignResult.campaigns}
      loadErrorMessage={campaignResult.errorMessage}
    />
  );
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
