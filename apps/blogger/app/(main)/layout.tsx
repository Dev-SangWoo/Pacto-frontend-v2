import { AppHeaderStart, BottomNav, TopActions } from "../_components/app-nav";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="mobile-shell">
      <header className="app-top">
        <AppHeaderStart />
        <TopActions />
      </header>
      <div className="screen-content">{children}</div>
      <BottomNav />
    </main>
  );
}
