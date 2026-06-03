import type { Campaign } from "@pacto/types";

export type CampaignResponse = Campaign;

export function adaptCampaign(response: CampaignResponse): Campaign {
  return {
    id: response.id,
    advertiserId: response.advertiserId,
    brandName: response.brandName,
    title: response.title,
    thumbnailUrl: response.thumbnailUrl,
    rewardPoint: response.rewardPoint,
    recruitCount: response.recruitCount,
    approvedCount: response.approvedCount,
    applicantCount: response.applicantCount,
    guidelines: response.guidelines,
    deadline: response.deadline,
    status: response.status,
  };
}
