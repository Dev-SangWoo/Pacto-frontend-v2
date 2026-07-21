"use server";

import { ApiError, getMe, login, signup, unregisterPushSubscription } from "@pacto/api";
import { redirect } from "next/navigation";

import { clearBloggerSession, getBloggerSession, setBloggerSession } from "../_lib/session";

type AuthActionResult = {
  message?: string;
  ok: boolean;
};

function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  return error instanceof ApiError ? error.message : fallbackMessage;
}

async function saveAuthenticatedSession(accessToken: string, email: string) {
  const user = await getMe(accessToken);

  await setBloggerSession({
    accessToken,
    bloggerId: user.id,
    email: user.email || email,
  });
}

export async function loginAction(email: string, password: string): Promise<AuthActionResult> {
  try {
    const result = await login({ email, password, role: "BLOGGER" });

    await saveAuthenticatedSession(result.accessToken, email);

    return { ok: true };
  } catch (error) {
    return {
      message: getApiErrorMessage(error, "로그인에 실패했어요. 이메일과 비밀번호를 확인해 주세요."),
      ok: false,
    };
  }
}

export async function signupAction(email: string, password: string): Promise<AuthActionResult> {
  try {
    const result = await signup({ email, password, role: "BLOGGER" });

    if (result.accessToken.length > 0) {
      await saveAuthenticatedSession(result.accessToken, email);
    }

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
