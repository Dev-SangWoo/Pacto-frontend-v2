import { describe, expect, it } from "vitest";

import { canAccessDashboard } from "./access";
import { getDashboardMenus } from "./menu";

describe("dashboard rbac policy", () => {
  it("블로거는 대시보드에 접근할 수 없다", () => {
    expect(canAccessDashboard("BLOGGER")).toBe(false);
  });

  it("대행사 운영자는 설정 메뉴를 볼 수 없다", () => {
    expect(
      getDashboardMenus("AGENCY_OPERATOR").some((menu) => menu.href === "/dashboard/settings"),
    ).toBe(false);
  });

  it("캠페인 운영 단계의 하위 메뉴는 전역 메뉴가 아니라 캠페인 상세 안에서 접근한다", () => {
    const hrefs = getDashboardMenus("AGENCY_ADMIN").map((menu) => menu.href);

    expect(hrefs).not.toContain("/dashboard/campaigns/1/applicants");
    expect(hrefs).not.toContain("/dashboard/campaigns/1/missions");
    expect(hrefs).not.toContain("/dashboard/escrow");
  });

  it("대행사 관리자는 결제 메뉴를 볼 수 있다", () => {
    expect(getDashboardMenus("AGENCY_ADMIN")).toContainEqual({
      href: "/dashboard/payments",
      label: "결제",
    });
  });

  it("광고주는 결제와 리포트 중심 메뉴만 본다", () => {
    expect(getDashboardMenus("ADVERTISER")).toEqual([
      { href: "/dashboard/payments", label: "결제" },
      { href: "/dashboard/reports", label: "리포트" },
    ]);
  });
});
