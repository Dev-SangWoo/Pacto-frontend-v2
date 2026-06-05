import { canAccessDashboard, getDashboardMenus } from "@pacto/utils";
import { redirect } from "next/navigation";

import { logoutAction } from "../_actions/auth-actions";
import { getDashboardSession } from "../_lib/session";

const mockRole = "AGENCY_ADMIN";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  const canAccess = canAccessDashboard(mockRole);
  const navItems = getDashboardMenus(mockRole);

  return (
    <main className="dashboard-shell">
      <aside className="sidebar" aria-label="대시보드 메뉴">
        <div className="brand-block">
          <p>Pacto</p>
          <strong>Dashboard</strong>
        </div>
        <nav>
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-session">
          <span>{session.email ?? "로그인 계정"}</span>
          <form action={logoutAction}>
            <button type="submit">로그아웃</button>
          </form>
        </div>
      </aside>
      <section className="workspace">
        {canAccess ? (
          children
        ) : (
          <section className="panel empty-panel">
            <h1>접근 권한이 없습니다.</h1>
            <p>현재 계정으로는 이 화면을 볼 수 없습니다.</p>
          </section>
        )}
      </section>
    </main>
  );
}
