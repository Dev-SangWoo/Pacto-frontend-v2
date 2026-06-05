import { redirect } from "next/navigation";

import { LoginForm } from "../_components/login-form";
import { getDashboardSession } from "../_lib/session";

export default async function LoginPage() {
  const session = await getDashboardSession();

  if (session.accessToken != null) {
    redirect("/dashboard");
  }

  return (
    <main className="dashboard-login-shell">
      <section className="dashboard-login-panel" aria-labelledby="login-title">
        <div className="dashboard-login-copy">
          <p>PACTO</p>
          <h1 id="login-title">대시보드 로그인</h1>
          <span>캠페인 운영, 미션 검수, 정산 흐름을 한 곳에서 관리해요.</span>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
