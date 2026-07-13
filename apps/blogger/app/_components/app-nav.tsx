"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Bell, House, Target, UserCircle, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navItems: Array<{
  href: string;
  icon: LucideIcon;
  label: string;
  notify?: boolean;
}> = [
  { href: "/campaigns", icon: House, label: "홈" },
  { href: "/missions", icon: Target, label: "미션", notify: true },
  { href: "/wallet", icon: WalletCards, label: "지갑" },
  { href: "/profile", icon: UserCircle, label: "내 정보" },
];

const rootPaths = new Set(navItems.map((item) => item.href));

export function AppHeaderStart() {
  const pathname = usePathname();
  const router = useRouter();
  const parentHref = getParentHref(pathname);
  const isRootPath = rootPaths.has(pathname);

  if (!isRootPath) {
    return (
      <button
        aria-label="이전 화면으로 이동"
        className="app-back-button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
            return;
          }

          router.push(parentHref);
        }}
        type="button"
      >
        <ArrowLeft aria-hidden="true" size={24} strokeWidth={2.25} />
      </button>
    );
  }

  return (
    <Link className="app-brand" href="/campaigns" aria-label="Pacto 홈">
      <span className="app-brand-mark" aria-hidden="true">
        <img src="/brand/logo-bg-rm-cropped.webp" alt="" />
      </span>
    </Link>
  );
}

type TopActionsProps = {
  notificationCount?: number;
};

export function TopActions({ notificationCount = 0 }: TopActionsProps) {
  const hasNotifications = notificationCount > 0;

  return (
    <div className="top-actions">
      <Link
        className="icon-button notification-button"
        href="/notifications"
        aria-label="알림 열기"
      >
        <Bell aria-hidden="true" size={21} strokeWidth={2.25} />
        {hasNotifications ? (
          <span aria-label={`${notificationCount}개의 새 알림`}>
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        ) : null}
      </Link>
      <Link className="icon-button profile" href="/profile" aria-label="내 정보">
        <UserCircle aria-hidden="true" size={23} strokeWidth={2.25} />
      </Link>
    </div>
  );
}

function getParentHref(pathname: string) {
  if (pathname.startsWith("/campaigns/")) {
    return "/campaigns";
  }

  if (pathname.startsWith("/missions/")) {
    return "/missions";
  }

  if (pathname.startsWith("/withdrawals")) {
    return "/wallet";
  }

  if (pathname.startsWith("/notifications")) {
    return "/campaigns";
  }

  return "/campaigns";
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
            <span className="bottom-nav-icon">
              <Icon aria-hidden="true" size={21} strokeWidth={2.25} />
              {item.notify ? <span className="nav-dot" aria-hidden="true" /> : null}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
