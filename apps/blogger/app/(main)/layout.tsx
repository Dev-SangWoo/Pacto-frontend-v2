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
          <strong>캠페인부터 정산까지</strong>
        </div>
        <TopActions />
      </header>
      <div className="screen-content">{children}</div>
      <BottomNav />
    </main>
  );
}
