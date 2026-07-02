"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ApiError, applyToCampaign, submitMission } from "@pacto/api";

import { getBloggerSession } from "../_lib/session";

type ActionResult = {
  message?: string;
  ok: boolean;
};

export async function acceptCampaignAction(campaignId: number): Promise<ActionResult> {
  try {
    const session = await getBloggerSession();

    if (session.accessToken == null) {
      redirect("/login");
    }

    await applyToCampaign({ campaignId }, session.accessToken);
    revalidatePath(`/campaigns/${campaignId}`);
    revalidatePath("/missions");

    return { ok: true };
  } catch (error) {
    redirectIfAuthError(error);

    return { message: getAcceptCampaignErrorMessage(error), ok: false };
  }
}

export async function submitMissionAction(
  missionId: number,
  submittedUrl: string,
): Promise<ActionResult> {
  try {
    const session = await getBloggerSession();

    if (session.accessToken == null) {
      redirect("/login");
    }

    await submitMission(missionId, { submittedUrl }, session.accessToken);
    revalidatePath("/missions");
    revalidatePath(`/missions/${missionId}`);

    return { ok: true };
  } catch (error) {
    redirectIfAuthError(error);

    return {
      message: "리뷰 URL 등록에 실패했어요. 미션이 아직 진행 중인지 확인한 뒤 다시 시도해 주세요.",
      ok: false,
    };
  }
}

function redirectIfAuthError(error: unknown) {
  if (error instanceof ApiError && (error.statusCode === 401 || error.statusCode === 403)) {
    redirect("/logout?reason=session-expired");
  }
}

function getAcceptCampaignErrorMessage(error: unknown) {
  if (isApiErrorLike(error)) {
    if (error.statusCode === 409) {
      return "신청에 실패했어요. 모집 인원이 마감되었거나 이미 신청한 캠페인입니다.";
    }

    if (error.message.length > 0) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return "신청에 실패했어요. 잠시 후 다시 시도해 주세요.";
}

function isApiErrorLike(error: unknown): error is { message: string; statusCode: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "statusCode" in error &&
    typeof (error as { message?: unknown }).message === "string" &&
    typeof (error as { statusCode?: unknown }).statusCode === "number"
  );
}
