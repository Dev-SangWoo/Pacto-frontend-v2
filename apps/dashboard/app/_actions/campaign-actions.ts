"use server";

import {
  approveApplicant,
  approveMission,
  createCampaign,
  rejectApplicant,
  rejectMission,
} from "@pacto/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getDashboardSession } from "../_lib/session";

export type CampaignCreateState = {
  message?: string;
};

export async function approveApplicantAction(campaignId: number, applicantId: number) {
  const session = await getDashboardSession();

  try {
    await approveApplicant(campaignId, applicantId, session.accessToken);
    revalidatePath(`/dashboard/campaigns/${campaignId}/applicants`);
    return { ok: true };
  } catch {
    return { message: "지원자 승인에 실패했어요.", ok: false };
  }
}

export async function rejectApplicantAction(campaignId: number, applicantId: number) {
  const session = await getDashboardSession();

  try {
    await rejectApplicant(campaignId, applicantId, session.accessToken);
    revalidatePath(`/dashboard/campaigns/${campaignId}/applicants`);
    return { ok: true };
  } catch {
    return { message: "지원자 반려에 실패했어요.", ok: false };
  }
}

export async function approveMissionAction(campaignId: number, missionId: number) {
  const session = await getDashboardSession();

  try {
    await approveMission(missionId, session.accessToken);
    revalidatePath(`/dashboard/campaigns/${campaignId}/missions`);
    return { ok: true };
  } catch {
    return { message: "미션 승인에 실패했어요.", ok: false };
  }
}

export async function rejectMissionAction(campaignId: number, missionId: number) {
  const session = await getDashboardSession();

  try {
    await rejectMission(missionId, session.accessToken);
    revalidatePath(`/dashboard/campaigns/${campaignId}/missions`);
    return { ok: true };
  } catch {
    return { message: "미션 반려에 실패했어요.", ok: false };
  }
}

export async function createCampaignAction(
  _previousState: CampaignCreateState,
  formData: FormData,
): Promise<CampaignCreateState> {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const rewardPoint = Number(formData.get("rewardPoint"));
  const totalSlots = Number(formData.get("totalSlots"));
  const deadline = String(formData.get("deadline") ?? "").trim();
  const thumbnailUrl = String(formData.get("thumbnailUrl") ?? "").trim();
  const guidelineItems = parseGuidelines(String(formData.get("guidelines") ?? ""));

  if (title.length === 0 || guidelineItems.length === 0 || deadline.length === 0) {
    return { message: "캠페인명, 마감일, 미션 가이드를 입력해 주세요." };
  }

  if (!Number.isFinite(rewardPoint) || rewardPoint < 0) {
    return { message: "보상 포인트는 0 이상의 숫자로 입력해 주세요." };
  }

  if (!Number.isInteger(totalSlots) || totalSlots <= 0) {
    return { message: "모집 인원은 1명 이상으로 입력해 주세요." };
  }

  const deadlineDate = new Date(deadline);

  if (Number.isNaN(deadlineDate.getTime())) {
    return { message: "마감일을 올바르게 입력해 주세요." };
  }

  try {
    await createCampaign(
      {
        deadline: toLocalDateTime(deadlineDate),
        guidelines: { items: guidelineItems },
        rewardPoint,
        thumbnailUrl: thumbnailUrl.length > 0 ? thumbnailUrl : undefined,
        title,
        totalSlots,
      },
      session.accessToken,
    );
  } catch (error) {
    return { message: getCreateCampaignErrorMessage(error) };
  }

  redirect("/dashboard/campaigns");
}

function parseGuidelines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function toLocalDateTime(date: Date) {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 19);
}

function getCreateCampaignErrorMessage(error: unknown) {
  if (isApiErrorLike(error) && error.message.length > 0) {
    return error.message;
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return "캠페인 등록에 실패했어요. 입력값과 로그인 상태를 확인해 주세요.";
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
