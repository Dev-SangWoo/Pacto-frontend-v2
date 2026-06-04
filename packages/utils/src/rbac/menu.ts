import type { UserRole } from "@pacto/types";

export type DashboardMenuItem = {
  href: string;
  label: string;
};

const agencyMenus: DashboardMenuItem[] = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/dashboard/campaigns", label: "캠페인" },
  { href: "/dashboard/reports", label: "리포트" },
  { href: "/dashboard/settings", label: "설정" },
];

const advertiserMenus: DashboardMenuItem[] = [
  { href: "/dashboard/payments", label: "결제" },
  { href: "/dashboard/reports", label: "리포트" },
];

const adminMenus: DashboardMenuItem[] = [
  { href: "/dashboard", label: "전체 캠페인" },
  { href: "/dashboard/payments", label: "결제" },
  { href: "/dashboard/reports", label: "리포트" },
  { href: "/dashboard/settings", label: "설정" },
];

export function getDashboardMenus(role: UserRole): DashboardMenuItem[] {
  switch (role) {
    case "AGENCY_ADMIN":
      return agencyMenus;
    case "AGENCY_OPERATOR":
      return agencyMenus.filter((menu) => menu.href !== "/dashboard/settings");
    case "ADVERTISER":
      return advertiserMenus;
    case "PACTO_ADMIN":
      return adminMenus;
    case "BLOGGER":
      return [];
  }
}
