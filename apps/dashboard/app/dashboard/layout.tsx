import { canAccessDashboard, getDashboardMenus } from "@pacto/utils";

const mockRole = "AGENCY_ADMIN";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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
