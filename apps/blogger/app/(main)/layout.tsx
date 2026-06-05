import { BottomNav, TopActions } from "../_components/app-nav";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="mobile-shell">
      <header className="app-top">
        <div>
          <p className="top-eyebrow">Pacto Creator</p>
          <strong>참가할 캠페인을 쉽게 고르는 앱</strong>
        </div>
        <TopActions />
      </header>
      <div className="screen-content">{children}</div>
      <BottomNav />
    </main>
  );
}
