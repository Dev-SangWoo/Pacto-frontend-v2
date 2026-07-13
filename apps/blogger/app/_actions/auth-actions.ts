"use server";

import { ApiError, getMe, login, signup } from "@pacto/api";
import { redirect } from "next/navigation";

import { clearBloggerSession, setBloggerSession } from "../_lib/session";

type AuthActionResult = {
  message?: string;
  ok: boolean;
};

const TEST_EMAIL = "testtest@gmail.com";
const TEST_PASSWORD = "1234";
const TEST_PREVIEW_PASSWORD = "12345678";
const TEST_ACCESS_TOKEN = "local-preview-token";
const TEST_BLOGGER_ID = 1;

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
  if (email === TEST_EMAIL && (password === TEST_PASSWORD || password === TEST_PREVIEW_PASSWORD)) {
    await setBloggerSession({
      accessToken: TEST_ACCESS_TOKEN,
      bloggerId: TEST_BLOGGER_ID,
      email,
    });

    return { ok: true };
  }

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
