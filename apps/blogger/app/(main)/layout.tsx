import Link from "next/link";

const navItems = [
  { href: "/campaigns", label: "캠페인" },
  { href: "/missions", label: "미션" },
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
          <p className="top-eyebrow">Pacto Creator</p>
          <strong>캠페인부터 정산까지</strong>
        </div>
        <Link className="top-avatar" href="/profile" aria-label="내 프로필">
          B
        </Link>
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
