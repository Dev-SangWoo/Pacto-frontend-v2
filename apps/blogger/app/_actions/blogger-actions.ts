"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  ApiError,
  applyToCampaign,
  cancelApplication,
  getCampaignDetail,
  getMe,
  getMyNotifications,
  markNotificationAsRead,
  registerPushSubscription,
  requestWithdraw,
  submitMission,
  uploadProfileImage,
  updateMyProfile,
} from "@pacto/api";

import { getBloggerSession } from "../_lib/session";
import {
  getMissionPageData,
  getWalletPageData,
  type MissionPageData,
  type WalletPageData,
} from "../_lib/blogger-page-data";
import type { Notification } from "@pacto/types";

type ActionResult = {
  message?: string;
  ok: boolean;
};

export type ProfileUpdateState = ActionResult;

export async function updateBloggerProfileAction(
  _previousState: ProfileUpdateState,
  formData: FormData,
): Promise<ProfileUpdateState> {
  try {
    const session = await getBloggerSession();

    if (session.accessToken == null) {
      redirect("/login");
    }

    const profileImage = readImageFile(formData.get("profileImage"));
    const imageValidationMessage = validateProfileImage(profileImage);

    if (imageValidationMessage != null) {
      return { message: imageValidationMessage, ok: false };
    }

    await updateMyProfile(
      {
        bloggerProfile: {
          accountHolder: readText(formData, "accountHolder"),
          accountNumber: readText(formData, "accountNumber"),
          bankName: readText(formData, "bankName"),
          blogUrl: readText(formData, "blogUrl"),
          contact: readText(formData, "contact"),
          name: readText(formData, "name"),
          nickname: readText(formData, "nickname"),
        },
      },
      session.accessToken,
    );

    if (profileImage != null) {
      await uploadProfileImage(profileImage, session.accessToken);
    }

    revalidatePath("/profile");
    revalidatePath("/profile/edit");

    return {
      message:
        profileImage == null ? "프로필 정보를 저장했어요." : "프로필 사진과 정보를 저장했어요.",
      ok: true,
    };
  } catch (error) {
    redirectIfAuthError(error);

    return {
      message: getProfileUpdateErrorMessage(error),
      ok: false,
    };
  }
}

export async function acceptCampaignAction(campaignId: number): Promise<ActionResult> {
  try {
    const session = await getBloggerSession();

    if (session.accessToken == null) {
      redirect("/login");
    }

    await applyToCampaign({ campaignId }, session.accessToken);
    revalidatePath("/campaigns");
    revalidatePath(`/campaigns/${campaignId}`);
    revalidatePath("/missions");

    return { ok: true };
  } catch (error) {
    redirectIfAuthError(error);

    return { message: getAcceptCampaignErrorMessage(error), ok: false };
  }
}

export async function cancelCampaignApplicationAction(
  applicationId: number,
  campaignId: number,
): Promise<ActionResult> {
  try {
    const session = await getBloggerSession();

    if (session.accessToken == null) {
      redirect("/login");
    }

    await cancelApplication(applicationId, session.accessToken);
    revalidatePath("/campaigns");
    revalidatePath(`/campaigns/${campaignId}`);
    revalidatePath("/missions");

    return { ok: true };
  } catch (error) {
    redirectIfAuthError(error);

    return { message: getCancelCampaignApplicationErrorMessage(error), ok: false };
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

export async function readNotificationAction(notificationId: number, targetUrl?: string) {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    await markNotificationAsRead(notificationId, session.accessToken);
    revalidatePath("/notifications");
    revalidatePath("/", "layout");
  } catch (error) {
    redirectIfAuthError(error);
  }

  redirect(getSafeNotificationTarget(targetUrl));
}

export async function getUnreadNotificationsAction(): Promise<Notification[]> {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    return [];
  }

  try {
    const notificationPage = await getMyNotifications(session.accessToken, { size: 100 });
    return notificationPage.content.filter((notification) => !notification.read);
  } catch (error) {
    redirectIfAuthError(error);
    return [];
  }
}

export async function getMissionPageDataAction(): Promise<MissionPageData> {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    return await getMissionPageData(session.accessToken);
  } catch (error) {
    redirectIfAuthError(error);
    throw error;
  }
}

export async function getWalletPageDataAction(): Promise<WalletPageData> {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    return await getWalletPageData(session.accessToken);
  } catch (error) {
    redirectIfAuthError(error);
    throw error;
  }
}

export async function getProfilePageDataAction() {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    return await getMe(session.accessToken);
  } catch (error) {
    redirectIfAuthError(error);
    throw error;
  }
}

export async function requestWithdrawalAction(input: {
  accountNumber: string;
  amount: number;
  bankName: string;
}): Promise<ActionResult> {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    await requestWithdraw(input, session.accessToken);
    revalidatePath("/wallet");
    revalidatePath("/withdrawals");
    return { ok: true };
  } catch (error) {
    redirectIfAuthError(error);
    return { message: "출금 신청에 실패했어요. 잔액과 계좌 정보를 확인해 주세요.", ok: false };
  }
}

export async function getFreshCampaignThumbnailAction(
  campaignId: number,
): Promise<string | undefined> {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    return undefined;
  }

  try {
    const campaign = await getCampaignDetail(campaignId, session.accessToken);
    return campaign?.thumbnailUrl;
  } catch (error) {
    redirectIfAuthError(error);
    return undefined;
  }
}

export async function registerPushTokenAction(registrationId: string): Promise<ActionResult> {
  const session = await getBloggerSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    await registerPushSubscription(registrationId, session.accessToken);
    return { message: "푸시 알림을 설정했어요.", ok: true };
  } catch (error) {
    redirectIfAuthError(error);
    return { message: "푸시 알림을 설정하지 못했어요. 잠시 후 다시 시도해 주세요.", ok: false };
  }
}

function redirectIfAuthError(error: unknown) {
  if (error instanceof ApiError && error.statusCode === 401) {
    redirect("/logout?reason=session-expired");
  }

  if (error instanceof ApiError && error.statusCode === 403) {
    redirect("/forbidden");
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

function getCancelCampaignApplicationErrorMessage(error: unknown) {
  if (isApiErrorLike(error) && error.message.length > 0) {
    return error.message;
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return "지원 취소에 실패했어요. 잠시 후 다시 시도해 주세요.";
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

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

const MAX_PROFILE_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_PROFILE_IMAGE_TYPES = new Set(["image/gif", "image/jpeg", "image/png", "image/webp"]);

function readImageFile(value: FormDataEntryValue | null): File | undefined {
  return value instanceof File && value.size > 0 ? value : undefined;
}

function validateProfileImage(file: File | undefined) {
  if (file == null) {
    return undefined;
  }

  if (file.size > MAX_PROFILE_IMAGE_SIZE) {
    return "프로필 사진은 10MB 이하만 업로드할 수 있어요.";
  }

  if (!ALLOWED_PROFILE_IMAGE_TYPES.has(file.type)) {
    return "프로필 사진은 JPG, PNG, WEBP, GIF 형식만 사용할 수 있어요.";
  }

  return undefined;
}

function getProfileUpdateErrorMessage(error: unknown) {
  if (isApiErrorLike(error) && error.message.length > 0) {
    return error.message;
  }

  return "프로필 정보를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.";
}

function getSafeNotificationTarget(targetUrl?: string) {
  if (targetUrl?.startsWith("/") && !targetUrl.startsWith("//")) {
    return targetUrl;
  }

  return "/notifications";
}
