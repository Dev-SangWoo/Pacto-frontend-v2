import type { ApplicationStatusResponse } from "@pacto/types";

type ApplicationStatusView = {
  label: string;
  tone: "amber" | "blue" | "green" | "grey" | "red";
};

const applicationStatusViewMap: Record<ApplicationStatusResponse, ApplicationStatusView> = {
  PENDING: { label: "승인 대기", tone: "amber" },
  ACCEPTED: { label: "승인 완료", tone: "green" },
  REJECTED: { label: "신청 반려", tone: "red" },
  CANCELLED: { label: "신청 취소", tone: "red" },
};

export function getApplicationStatusView(status: ApplicationStatusResponse): ApplicationStatusView {
  return applicationStatusViewMap[status];
}

export function isPendingApplication(status: ApplicationStatusResponse): boolean {
  return status === "PENDING";
}
