"use server";

import { getMe, login } from "@pacto/api";
import { redirect } from "next/navigation";

import { clearDashboardSession, setDashboardSession } from "../_lib/session";

export type DashboardLoginState = {
  message?: string;
};

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
    const result = await login({ email, password });
    const user = await getMe(result.accessToken).catch(() => undefined);

    await setDashboardSession({
      accessToken: result.accessToken,
      email: user?.email ?? email,
      userId: user?.id,
    });
  } catch {
    return { message: "로그인에 실패했어요. 이메일과 비밀번호를 확인해 주세요." };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await clearDashboardSession();
  redirect("/login");
}
