import type { Mission } from "@pacto/types";

export type MissionResponse = Mission;

export function adaptMission(response: MissionResponse): Mission {
  return {
    id: response.id,
    campaignId: response.campaignId,
    bloggerId: response.bloggerId,
    campaignTitle: response.campaignTitle,
    brandName: response.brandName,
    thumbnailUrl: response.thumbnailUrl,
    rewardPoint: response.rewardPoint,
    dueDate: response.dueDate,
    submittedUrl: response.submittedUrl,
    reason: response.reason,
    status: response.status,
  };
}
