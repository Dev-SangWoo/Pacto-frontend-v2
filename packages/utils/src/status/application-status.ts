import type { ApplicationStatusResponse } from "@pacto/types";

type ApplicationStatusView = {
  label: string;
  tone: "blue" | "green" | "grey" | "red";
};

const applicationStatusViewMap: Record<ApplicationStatusResponse, ApplicationStatusView> = {
  PENDING: { label: "\uc2e0\uccad \uc644\ub8cc", tone: "grey" },
  ACCEPTED: { label: "\uc2b9\uc778 \uc644\ub8cc", tone: "blue" },
  REJECTED: { label: "\uc2e0\uccad \ubc18\ub824", tone: "red" },
  CANCELLED: { label: "\uc2e0\uccad \ucde8\uc18c", tone: "red" },
};

export function getApplicationStatusView(status: ApplicationStatusResponse): ApplicationStatusView {
  return applicationStatusViewMap[status];
}

export function isPendingApplication(status: ApplicationStatusResponse): boolean {
  return status === "PENDING";
}
