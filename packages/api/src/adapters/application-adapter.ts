import type { ApplicationResponse, CampaignApplicant } from "@pacto/types";

export function adaptApplication(response: ApplicationResponse): CampaignApplicant {
  const bloggerHandle = response.bloggerEmail?.split("@")[0];

  return {
    applicationId: response.applicationId,
    campaignId: response.campaignId,
    bloggerId: response.bloggerId,
    bloggerEmail: response.bloggerEmail,
    bloggerName: bloggerHandle ?? `블로거 #${response.bloggerId}`,
    status: response.status,
    appliedAt: response.createdAt,
  };
}
