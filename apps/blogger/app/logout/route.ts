import { NextResponse } from "next/server";

import { clearBloggerSession } from "../_lib/session";

export async function GET(request: Request) {
  await clearBloggerSession();

  const url = new URL(request.url);
  const reason = url.searchParams.get("reason");
  const loginUrl = new URL("/login", url.origin);

  if (reason != null) {
    loginUrl.searchParams.set("reason", reason);
  }

  return NextResponse.redirect(loginUrl);
}
