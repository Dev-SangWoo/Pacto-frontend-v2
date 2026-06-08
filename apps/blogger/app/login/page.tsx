import { redirect } from "next/navigation";

import { LoginEntry } from "../_components/login-entry";
import { getBloggerSession } from "../_lib/session";

export default async function BloggerLoginPage() {
  const session = await getBloggerSession();

  if (session.accessToken != null) {
    redirect("/campaigns");
  }

  return (
    <main className="auth-shell">
      <LoginEntry />
    </main>
  );
}
