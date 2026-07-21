"use server";

import {
  approveApplicant,
  approveMission,
  cancelCampaign,
  closeCampaign,
  createCampaign,
  getCampaignDetail,
  getMe,
  getMyWallet,
  proceedCampaign,
  rejectApplicant,
  rejectMission,
  uploadCampaignGuidelineImages,
  uploadCampaignThumbnail,
} from "@pacto/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getDashboardSession } from "../_lib/session";

export type CampaignCreateState = {
  createdCampaignId?: number;
  message?: string;
};

export type CampaignTransitionState = {
  message?: string;
};

type CampaignTransitionAction = "cancel" | "close" | "proceed";

export async function transitionCampaignAction(
  campaignId: number,
  _previousState: CampaignTransitionState,
  formData: FormData,
): Promise<CampaignTransitionState> {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const action = String(formData.get("action") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? `/dashboard/campaigns/${campaignId}`);

  if (!isCampaignTransitionAction(action)) {
    return { message: "지원하지 않는 캠페인 액션이에요." };
  }

  const ownershipError = await getCampaignOwnershipError(campaignId, session.accessToken);

  if (ownershipError != null) {
    return { message: ownershipError };
  }

  try {
    if (action === "close") {
      await closeCampaign(campaignId, session.accessToken);
    } else if (action === "proceed") {
      await proceedCampaign(campaignId, session.accessToken);
    } else {
      await cancelCampaign(campaignId, session.accessToken);
    }
  } catch (error) {
    return { message: getCampaignTransitionErrorMessage(action, error) };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/campaigns");
  revalidatePath(`/dashboard/campaigns/${campaignId}`);
  revalidatePath(`/dashboard/campaigns/${campaignId}/applicants`);
  revalidatePath(`/dashboard/campaigns/${campaignId}/missions`);
  revalidatePath(`/dashboard/campaigns/${campaignId}/settlements`);
  redirect(redirectTo);
}

export async function approveApplicantAction(campaignId: number, applicantId: number) {
  const session = await getDashboardSession();

  try {
    await approveApplicant(campaignId, applicantId, session.accessToken);
    revalidatePath(`/dashboard/campaigns/${campaignId}/applicants`);
    revalidatePath(`/dashboard/campaigns/${campaignId}/missions`);
    revalidatePath(`/dashboard/campaigns/${campaignId}/settlements`);
    revalidatePath("/dashboard/payments");
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
    revalidatePath(`/dashboard/campaigns/${campaignId}/settlements`);
    revalidatePath("/dashboard/payments");
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
    revalidatePath(`/dashboard/campaigns/${campaignId}/settlements`);
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
  const thumbnail = readImageFile(formData.get("thumbnail"));
  const guidelineImages = formData
    .getAll("guidelineImages")
    .map(readImageFile)
    .filter((file): file is File => file != null);
  const guidelines = parseGuidelinesJson(String(formData.get("guidelines") ?? ""));

  if (title.length === 0 || guidelines == null || deadline.length === 0) {
    return { message: "캠페인명, 마감일, 미션 가이드를 입력해 주세요." };
  }

  if (!Number.isFinite(rewardPoint) || rewardPoint < 0) {
    return { message: "보상 포인트는 0 이상의 숫자로 입력해 주세요." };
  }

  if (!Number.isInteger(totalSlots) || totalSlots <= 0) {
    return { message: "모집 인원은 1명 이상으로 입력해 주세요." };
  }

  const imageValidationMessage = validateCampaignImages(thumbnail, guidelineImages);

  if (imageValidationMessage != null) {
    return { message: imageValidationMessage };
  }

  const deadlineDate = new Date(deadline);

  if (Number.isNaN(deadlineDate.getTime())) {
    return { message: "마감일을 올바르게 입력해 주세요." };
  }

  const lockedBudget = rewardPoint * totalSlots;

  try {
    const wallet = await getMyWallet(session.accessToken);

    if (wallet.availableBalance < lockedBudget) {
      return {
        message: `잔액이 부족해요. 캠페인 생성에는 ${lockedBudget.toLocaleString("ko-KR")}P가 필요하고, 현재 사용 가능 잔액은 ${wallet.availableBalance.toLocaleString("ko-KR")}P예요.`,
      };
    }
  } catch {
    return { message: "지갑 잔액을 확인하지 못했어요. 로그인 상태를 다시 확인해 주세요." };
  }

  let campaignId: number;

  try {
    const campaign = await createCampaign(
      {
        deadline: toLocalDateTime(deadlineDate),
        guidelines,
        rewardPoint,
        title,
        totalSlots,
      },
      session.accessToken,
    );
    campaignId = campaign.id;
  } catch (error) {
    return { message: getCreateCampaignErrorMessage(error) };
  }

  try {
    if (thumbnail != null) {
      await uploadCampaignThumbnail(campaignId, thumbnail, session.accessToken);
    }
    await uploadCampaignGuidelineImages(campaignId, guidelineImages, session.accessToken);
  } catch (error) {
    revalidatePath("/dashboard/campaigns");
    return {
      createdCampaignId: campaignId,
      message: `캠페인 #${campaignId}은 등록됐지만 이미지 업로드에 실패했어요. 캠페인 상세에서 확인해 주세요. ${getCreateCampaignErrorMessage(error)}`,
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/campaigns");
  redirect("/dashboard/campaigns");
}

function parseGuidelines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function parseGuidelinesJson(value: string): unknown | null {
  if (value.trim().length === 0) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;

    if (isTiptapGuidelines(parsed) && parsed.content.content.length > 0) {
      return parsed;
    }

    if (Array.isArray(parsed)) {
      const items = parsed.filter((item): item is string => typeof item === "string");
      return items.length > 0 ? { items } : null;
    }
  } catch {
    const items = parseGuidelines(value);
    return items.length > 0 ? { items } : null;
  }

  return null;
}

function isTiptapGuidelines(value: unknown): value is {
  content: { content: unknown[]; type: "doc" };
  editor: "tiptap";
  version: 1;
} {
  return (
    typeof value === "object" &&
    value !== null &&
    "editor" in value &&
    "version" in value &&
    "content" in value &&
    (value as { editor?: unknown }).editor === "tiptap" &&
    (value as { version?: unknown }).version === 1 &&
    typeof (value as { content?: unknown }).content === "object" &&
    (value as { content?: { content?: unknown } }).content != null &&
    Array.isArray((value as { content: { content?: unknown } }).content.content)
  );
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

function getCampaignTransitionErrorMessage(action: CampaignTransitionAction, error: unknown) {
  if (isApiErrorLike(error) && error.message.length > 0) {
    if ((action === "cancel" || action === "proceed") && error.message.includes("잔액")) {
      return "환불할 잠금 예산이 부족해서 처리하지 못했어요. 캠페인 예산 잠금 내역과 광고주 지갑의 잠금잔액을 확인해 주세요.";
    }

    return error.message;
  }

  const actionLabelMap: Record<CampaignTransitionAction, string> = {
    cancel: "취소",
    close: "모집 마감",
    proceed: "진행 전환",
  };

  return `캠페인 ${actionLabelMap[action]} 처리에 실패했어요. 상태와 권한을 확인해 주세요.`;
}

async function getCampaignOwnershipError(campaignId: number, token: string) {
  const [user, campaign] = await Promise.all([
    getMe(token).catch(() => undefined),
    getCampaignDetail(campaignId, token).catch(() => undefined),
  ]);

  if (user == null) {
    return "로그인 정보를 확인하지 못했어요. 다시 로그인해 주세요.";
  }

  if (user.role !== "ADVERTISER") {
    return "광고주 계정으로만 캠페인 상태를 변경할 수 있어요.";
  }

  if (campaign == null) {
    return "캠페인을 찾지 못했어요.";
  }

  if (campaign.advertiserId !== user.id) {
    return "현재 로그인 계정 소유 캠페인이 아니어서 처리할 수 없어요. 다시 로그인해 주세요.";
  }

  return undefined;
}

function isCampaignTransitionAction(value: string): value is CampaignTransitionAction {
  return value === "cancel" || value === "close" || value === "proceed";
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

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/gif", "image/jpeg", "image/png", "image/webp"]);

function readImageFile(value: FormDataEntryValue | null): File | undefined {
  return value instanceof File && value.size > 0 ? value : undefined;
}

function validateCampaignImages(thumbnail: File | undefined, guidelineImages: File[]) {
  if (guidelineImages.length > 5) {
    return "가이드 이미지는 최대 5장까지 업로드할 수 있어요.";
  }

  const files = thumbnail == null ? guidelineImages : [thumbnail, ...guidelineImages];
  const oversizedFile = files.find((file) => file.size > MAX_IMAGE_SIZE);

  if (oversizedFile != null) {
    return `${oversizedFile.name} 파일이 10MB를 초과해요.`;
  }

  const unsupportedFile = files.find((file) => !ALLOWED_IMAGE_TYPES.has(file.type));

  if (unsupportedFile != null) {
    return `${unsupportedFile.name} 파일 형식은 지원하지 않아요. JPG, PNG, WEBP, GIF만 사용할 수 있어요.`;
  }

  return undefined;
}
