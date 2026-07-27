"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  House,
  RefreshCw,
  Search,
  Target,
  UserCircle,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

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

const rootPaths = new Set(navItems.map((item) => item.href));

type AppHeaderProps = {
  notificationCount?: number;
};

export function AppHeader({ notificationCount = 0 }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentHref = getParentHref(pathname);
  const isRootPath = rootPaths.has(pathname);
  const hasNotifications = notificationCount > 0;
  const isCampaignHome = pathname === "/campaigns";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRefreshing, startRefresh] = useTransition();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="app-top">
      {isRootPath ? (
        <Link className="app-brand" href="/campaigns" aria-label="Pacto 홈">
          <span className="app-brand-mark" aria-hidden="true">
            <img src="/brand/logo-bg-rm-cropped.webp" alt="" />
          </span>
        </Link>
      ) : (
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
      )}
      <div className="top-actions">
        <Link
          className="icon-button notification-button"
          href="/notifications"
          aria-label={hasNotifications ? `${notificationCount}개의 새 알림 열기` : "알림 열기"}
        >
          <Bell aria-hidden="true" size={21} strokeWidth={2.25} />
          {hasNotifications ? (
            <span className="header-notification-dot" aria-hidden="true" />
          ) : null}
        </Link>
        <button
          aria-label={isRefreshing ? "새로고침 중" : "현재 화면 새로고침"}
          className={`icon-button refresh-button ${isRefreshing ? "is-refreshing" : ""}`}
          disabled={isRefreshing}
          onClick={() => {
            startRefresh(async () => {
              await queryClient.invalidateQueries({ queryKey: ["blogger"] });
              router.refresh();
            });
          }}
          type="button"
        >
          <RefreshCw aria-hidden="true" size={21} strokeWidth={2.15} />
        </button>
        {isCampaignHome ? (
          <button
            aria-expanded={isSearchOpen}
            aria-label={isSearchOpen ? "캠페인 검색 닫기" : "캠페인 검색 열기"}
            className="icon-button campaign-search-toggle"
            onClick={() => setIsSearchOpen((open) => !open)}
            type="button"
          >
            <Search aria-hidden="true" size={22} strokeWidth={2} />
          </button>
        ) : null}
        {isCampaignHome && isSearchOpen ? (
          <form action="/campaigns" className="campaign-header-search" method="get">
            <Search aria-hidden="true" size={18} />
            <input
              aria-label="캠페인 검색어"
              defaultValue={searchParams.get("q") ?? ""}
              name="q"
              placeholder="캠페인명, 브랜드, 미션 검색"
              ref={searchInputRef}
              type="search"
            />
            <button type="submit">검색</button>
          </form>
        ) : null}
      </div>
    </header>
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

  if (pathname.startsWith("/profile/")) {
    return "/profile";
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
            prefetch={true}
          >
            <span className="bottom-nav-icon">
              <Icon aria-hidden="true" size={21} strokeWidth={2.25} />
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
