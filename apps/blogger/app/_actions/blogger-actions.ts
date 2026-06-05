"use server";

import { revalidatePath } from "next/cache";

import { acceptMission, submitMission } from "@pacto/api";

import { getBloggerSession } from "../_lib/session";

type ActionResult = {
  message?: string;
  ok: boolean;
};

export async function acceptCampaignAction(campaignId: number): Promise<ActionResult> {
  try {
    const session = await getBloggerSession();

    await acceptMission(campaignId, session.accessToken);
    revalidatePath("/missions");

    return { ok: true };
  } catch {
    return { message: "지원 요청에 실패했어요. 모집 인원이 마감됐을 수 있어요.", ok: false };
  }
}

export async function submitMissionAction(
  missionId: number,
  submittedUrl: string,
): Promise<ActionResult> {
  try {
    const session = await getBloggerSession();

    await submitMission(missionId, { submittedUrl }, session.accessToken);
    revalidatePath("/missions");
    revalidatePath(`/missions/${missionId}`);

    return { ok: true };
  } catch {
    return { message: "리뷰 URL 제출에 실패했어요. 잠시 후 다시 시도해 주세요.", ok: false };
  }
}
