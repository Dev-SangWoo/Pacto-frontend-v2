import Link from "next/link";

const navItems = [
  { href: "/campaigns", label: "캠페인" },
  { href: "/missions", label: "내 미션" },
  { href: "/wallet", label: "지갑" },
  { href: "/profile", label: "프로필" },
];

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="mobile-shell">
      <header className="app-top">
        <div>
          <p className="top-eyebrow">Pacto</p>
          <strong>블로거 홈</strong>
        </div>
        <span className="top-avatar" aria-label="로그인 사용자">
          B
        </span>
      </header>
      <div className="screen-content">{children}</div>
      <nav className="bottom-nav" aria-label="블로거 메뉴">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
