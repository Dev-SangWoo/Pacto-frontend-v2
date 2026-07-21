import { cookies } from "next/headers";

export type BloggerSession = {
  accessToken?: string;
  bloggerId: number;
  email?: string;
};

const ACCESS_TOKEN_COOKIE = "pacto_access_token";
const BLOGGER_ID_COOKIE = "pacto_blogger_id";
const EMAIL_COOKIE = "pacto_email";
const DEFAULT_TEST_BLOGGER_ID = 1;
const LEGACY_PREVIEW_TOKEN = "local-preview-token";

export async function getBloggerSession(): Promise<BloggerSession> {
  const cookieStore = await cookies();
  const bloggerId = Number(cookieStore.get(BLOGGER_ID_COOKIE)?.value ?? DEFAULT_TEST_BLOGGER_ID);
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  return {
    accessToken: accessToken === LEGACY_PREVIEW_TOKEN ? undefined : accessToken,
    bloggerId: Number.isFinite(bloggerId) ? bloggerId : DEFAULT_TEST_BLOGGER_ID,
    email: cookieStore.get(EMAIL_COOKIE)?.value,
  };
}

export async function setBloggerSession(session: BloggerSession) {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    path: "/",
    sameSite: "lax" as const,
  };

  cookieStore.set(BLOGGER_ID_COOKIE, String(session.bloggerId), options);

  if (session.email != null) {
    cookieStore.set(EMAIL_COOKIE, session.email, options);
  }

  if (session.accessToken != null) {
    cookieStore.set(ACCESS_TOKEN_COOKIE, session.accessToken, options);
  }
}

export async function clearBloggerSession() {
  const cookieStore = await cookies();
  const options = {
    path: "/",
  };

  cookieStore.delete({ name: ACCESS_TOKEN_COOKIE, ...options });
  cookieStore.delete({ name: BLOGGER_ID_COOKIE, ...options });
  cookieStore.delete({ name: EMAIL_COOKIE, ...options });
}
