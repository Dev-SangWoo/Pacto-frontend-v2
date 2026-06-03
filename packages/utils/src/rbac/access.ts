import type { UserRole } from "@pacto/types";

const dashboardAllowedRoles: UserRole[] = ["AGENCY_ADMIN", "AGENCY_OPERATOR", "ADVERTISER", "PACTO_ADMIN"];

export function canAccessDashboard(role: UserRole): boolean {
  return dashboardAllowedRoles.includes(role);
}
