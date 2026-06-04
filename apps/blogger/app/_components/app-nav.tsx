"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, House, Target, UserCircle, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navItems: Array<{
  href: string;
  icon: LucideIcon;
  label: string;
}> = [
  { href: "/campaigns", icon: House, label: "홈" },
  { href: "/missions", icon: Target, label: "미션" },
  { href: "/wallet", icon: WalletCards, label: "지갑" },
  { href: "/profile", icon: UserCircle, label: "내 정보" },
];

export function TopActions() {
  return (
    <div className="top-actions">
      <button className="icon-button" type="button" aria-label="알림 열기">
        <Bell aria-hidden="true" size={21} strokeWidth={2.25} />
      </button>
      <Link className="icon-button profile" href="/profile" aria-label="내 정보">
        <UserCircle aria-hidden="true" size={23} strokeWidth={2.25} />
      </Link>
    </div>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="블로거 메뉴">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={isActive ? "active" : undefined}
            href={item.href}
            key={item.href}
          >
            <Icon aria-hidden="true" size={21} strokeWidth={2.25} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
