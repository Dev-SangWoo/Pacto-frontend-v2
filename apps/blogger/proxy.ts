import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "pacto_access_token";
const REFRESH_TOKEN_COOKIE = "pacto_refresh_token";
const REFRESH_BEFORE_EXPIRY_SECONDS = 60;
const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (refreshToken == null || (accessToken != null && !shouldRefresh(accessToken))) {
    return NextResponse.next();
  }

  const apiBaseUrl = getApiBaseUrl();
  if (apiBaseUrl == null) {
    return NextResponse.next();
  }

  try {
    const refreshResponse = await fetch(`${apiBaseUrl}/api/v1/auth/refresh`, {
      cache: "no-store",
      headers: { Cookie: `refreshToken=${refreshToken}` },
      method: "POST",
    });
    const payload = (await refreshResponse.json()) as { data?: { accessToken?: string } };
    const nextAccessToken = payload.data?.accessToken;
    const nextRefreshToken = getResponseCookie(refreshResponse, "refreshToken");

    if (!refreshResponse.ok || nextAccessToken == null || nextRefreshToken == null) {
      return clearAuthentication(request);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
      "cookie",
      replaceCookies(request.headers.get("cookie"), {
        [ACCESS_TOKEN_COOKIE]: nextAccessToken,
        [REFRESH_TOKEN_COOKIE]: nextRefreshToken,
      }),
    );
    const response = NextResponse.next({ request: { headers: requestHeaders } });

    setAuthenticationCookies(response, request, nextAccessToken, nextRefreshToken);
    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|icons/).*)"],
};

function getApiBaseUrl(): string | undefined {
  const value = process.env.PACTO_API_BASE_URL ?? process.env.NEXT_PUBLIC_PACTO_API_BASE_URL;
  return value?.replace(/\/$/, "");
}

function shouldRefresh(token: string): boolean {
  const payload = token.split(".")[1];
  if (payload == null) return false;

  try {
    const base64Payload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = base64Payload.padEnd(Math.ceil(base64Payload.length / 4) * 4, "=");
    const claims = JSON.parse(atob(paddedPayload)) as {
      exp?: number;
    };
    return (
      claims.exp != null && claims.exp * 1000 <= Date.now() + REFRESH_BEFORE_EXPIRY_SECONDS * 1000
    );
  } catch {
    return false;
  }
}

function getResponseCookie(response: Response, name: string): string | undefined {
  const value = response.headers.get("set-cookie");
  return value?.match(new RegExp(`(?:^|,\\s*)${name}=([^;]*)`))?.[1];
}

function replaceCookies(cookieHeader: string | null, replacements: Record<string, string>): string {
  const cookies = new Map<string, string>();
  cookieHeader?.split(";").forEach((part) => {
    const [name, ...value] = part.trim().split("=");
    if (name != null && value.length > 0) cookies.set(name, value.join("="));
  });
  Object.entries(replacements).forEach(([name, value]) => cookies.set(name, value));
  return Array.from(cookies, ([name, value]) => `${name}=${value}`).join("; ");
}

function setAuthenticationCookies(
  response: NextResponse,
  request: NextRequest,
  accessToken: string,
  refreshToken: string,
) {
  const common = {
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
    secure: request.nextUrl.protocol === "https:",
  };
  response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    ...common,
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...common,
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });
}

function clearAuthentication(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  [ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, "pacto_blogger_id", "pacto_email"].forEach((name) =>
    response.cookies.set(name, "", {
      maxAge: 0,
      path: "/",
      secure: request.nextUrl.protocol === "https:",
    }),
  );
  return response;
}
