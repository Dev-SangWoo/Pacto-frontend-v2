"use server";

import {
  ApiError,
  getMe,
  login,
  signup,
  unregisterPushSubscription,
  updateMyProfile,
} from "@pacto/api";
import { redirect } from "next/navigation";

import { clearBloggerSession, getBloggerSession, setBloggerSession } from "../_lib/session";

type AuthActionResult = {
  message?: string;
  ok: boolean;
};

function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  return error instanceof ApiError ? error.message : fallbackMessage;
}

async function saveAuthenticatedSession(accessToken: string, email: string, refreshToken?: string) {
  const user = await getMe(accessToken);

  await setBloggerSession({
    accessToken,
    bloggerId: user.id,
    email: user.email || email,
    refreshToken,
  });
}

export async function loginAction(email: string, password: string): Promise<AuthActionResult> {
  try {
    const result = await login({ email, password, role: "BLOGGER" });

    await saveAuthenticatedSession(result.accessToken, email, result.refreshToken);

    return { ok: true };
  } catch (error) {
    return {
      message: getApiErrorMessage(error, "로그인에 실패했어요. 이메일과 비밀번호를 확인해 주세요."),
      ok: false,
    };
  }
}

export async function signupAction(
  email: string,
  password: string,
  name: string,
): Promise<AuthActionResult> {
  if (name.trim().length === 0) {
    return { message: "이름을 입력해 주세요.", ok: false };
  }

  try {
    await signup({ email, name: name.trim(), password, role: "BLOGGER" });
    const loginResult = await login({ email, password, role: "BLOGGER" });
    const accessToken = loginResult.accessToken;

    if (accessToken.length === 0) {
      return {
        message: "회원가입은 완료됐지만 로그인하지 못했어요. 로그인 화면에서 다시 시도해 주세요.",
        ok: false,
      };
    }

    await updateMyProfile(
      {
        bloggerProfile: {
          name: name.trim(),
        },
      },
      accessToken,
    );
    await saveAuthenticatedSession(accessToken, email, loginResult.refreshToken);

    return { ok: true };
  } catch (error) {
    return {
      message: getApiErrorMessage(error, "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요."),
      ok: false,
    };
  }
}

export async function logoutAction() {
  await clearBloggerSession();
  redirect("/login");
}

export async function logoutWithPushAction(registrationId?: string) {
  const session = await getBloggerSession();

  if (registrationId != null && session.accessToken != null) {
    await unregisterPushSubscription(registrationId, session.accessToken).catch(() => undefined);
  }

  await clearBloggerSession();
  redirect("/login");
}
