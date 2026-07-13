import { redirect } from "next/navigation";

import { LoginEntry } from "../_components/login-entry";
import { getBloggerSession } from "../_lib/session";

type BloggerLoginPageProps = {
  searchParams?: Promise<{
    reason?: string;
  }>;
};

export default async function BloggerLoginPage({ searchParams }: BloggerLoginPageProps) {
  const session = await getBloggerSession();
  const params = await searchParams;

  if (session.accessToken != null) {
    redirect("/campaigns");
  }

  return (
    <main className="auth-shell">
      <LoginEntry sessionMessage={getSessionMessage(params?.reason)} />
    </main>
  );
}

function getSessionMessage(reason?: string) {
  if (reason === "session-expired") {
    return "세션이 만료되었어요. 안전하게 로그아웃되었으니 다시 로그인해 주세요.";
  }

  return undefined;
}
