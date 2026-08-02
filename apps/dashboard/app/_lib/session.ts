import type { UserRole } from "@pacto/types";
import { cookies } from "next/headers";

export type DashboardSession = {
  accessToken?: string;
  email?: string;
  role?: UserRole;
  refreshToken?: string;
  userId?: number;
};

const ACCESS_TOKEN_COOKIE = "pacto_dashboard_access_token";
const EMAIL_COOKIE = "pacto_dashboard_email";
const ROLE_COOKIE = "pacto_dashboard_role";
const USER_ID_COOKIE = "pacto_dashboard_user_id";
const REFRESH_TOKEN_COOKIE = "pacto_dashboard_refresh_token";

export async function getDashboardSession(): Promise<DashboardSession> {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_COOKIE)?.value,
    email: cookieStore.get(EMAIL_COOKIE)?.value,
    role: cookieStore.get(ROLE_COOKIE)?.value as UserRole,
    refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE)?.value,
    userId: parseUserId(cookieStore.get(USER_ID_COOKIE)?.value),
  };
}

export async function setDashboardSession(session: DashboardSession) {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
  };

  if (session.accessToken != null) {
    cookieStore.set(ACCESS_TOKEN_COOKIE, session.accessToken, {
      ...options,
      maxAge: 60 * 60 * 24 * 14,
    });
  }

  if (session.refreshToken != null) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, session.refreshToken, {
      ...options,
      maxAge: 60 * 60 * 24 * 14,
    });
  }

  if (session.email != null) {
    cookieStore.set(EMAIL_COOKIE, session.email, options);
  }

  if (session.role != null) {
    cookieStore.set(ROLE_COOKIE, session.role, options);
  }

  if (session.userId != null) {
    cookieStore.set(USER_ID_COOKIE, String(session.userId), options);
  }
}

export async function clearDashboardSession() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(EMAIL_COOKIE);
  cookieStore.delete(ROLE_COOKIE);
  cookieStore.delete(USER_ID_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

function parseUserId(value?: string): number | undefined {
  const userId = Number(value);

  return Number.isFinite(userId) ? userId : undefined;
}
