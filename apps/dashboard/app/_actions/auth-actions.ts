"use server";

import { ApiError, getMe, login } from "@pacto/api";
import { redirect } from "next/navigation";

import { clearDashboardSession, setDashboardSession } from "../_lib/session";

export type DashboardLoginState = {
  message?: string;
};

function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  return error instanceof ApiError ? error.message : fallbackMessage;
}

export async function loginAction(
  _previousState: DashboardLoginState,
  formData: FormData,
): Promise<DashboardLoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (email.length === 0 || password.length === 0) {
    return { message: "이메일과 비밀번호를 입력해 주세요." };
  }

  try {
    const result = await login({ email, password, role: "ADVERTISER" });
    console.log("[loginAction] Login Success. Token length:", result.accessToken.length);

    const user = await getMe(result.accessToken);

    console.log("[loginAction] User Data:", user);

    if (user.role !== "ADVERTISER") {
      return { message: "광고주 계정으로 로그인해 주세요." };
    }

    await setDashboardSession({
      accessToken: result.accessToken,
      email: user.email ?? email,
      role: user.role,
      userId: user.id,
    });
  } catch (error) {
    return {
      message: getApiErrorMessage(error, "로그인에 실패했어요. 이메일과 비밀번호를 확인해 주세요."),
    };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await clearDashboardSession();
  redirect("/login");
}
