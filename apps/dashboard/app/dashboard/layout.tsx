import { redirect } from "next/navigation";
import { BarChart3, CreditCard, FileText, Megaphone, Settings, UserCircle } from "lucide-react";

import { logoutAction } from "../_actions/auth-actions";
import { getDashboardSession } from "../_lib/session";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/dashboard", icon: BarChart3, label: "\ub300\uc2dc\ubcf4\ub4dc" },
  { href: "/dashboard/campaigns", icon: Megaphone, label: "\ucea0\ud398\uc778" },
  { href: "/dashboard/payments", icon: CreditCard, label: "\uacb0\uc81c" },
  { href: "/dashboard/reports", icon: FileText, label: "\ub9ac\ud3ec\ud2b8" },
  { href: "/dashboard/settings", icon: Settings, label: "\uc124\uc815" },
];

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  if (session.role !== "ADVERTISER") {
    redirect("/forbidden");
  }

  return (
    <main className="dashboard-shell">
      <aside className="sidebar" aria-label="Dashboard menu">
        <a className="brand-block" href="/dashboard" aria-label="Pacto 대시보드 홈으로 이동">
          <img src="/brand/logo-bg-rm-cropped.png" alt="Pacto" />
          <p>광고 캠페인 운영을 한눈에 관리하세요</p>
        </a>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <a href={item.href} key={item.href}>
                <Icon aria-hidden="true" size={18} strokeWidth={2.1} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="sidebar-session">
          <a className="sidebar-account-link" href="/dashboard/settings">
            <span className="sidebar-account-icon" aria-hidden="true">
              <UserCircle size={20} strokeWidth={2.2} />
            </span>
            <span>
              <strong>계정 정보</strong>
              <em>{session.email ?? "로그인 계정"}</em>
            </span>
          </a>
          <form action={logoutAction}>
            <button type="submit">{"\ub85c\uadf8\uc544\uc6c3"}</button>
          </form>
        </div>
      </aside>
      <section className="workspace">{children}</section>
    </main>
  );
}
