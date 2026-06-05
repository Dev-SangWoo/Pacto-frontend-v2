import type { SettlementStatus } from "@pacto/types";

export type EscrowStatusResponse = "LOCKED" | "RELEASED" | "CANCELED";

type SettlementStatusView = {
  label: string;
  tone: "blue" | "green" | "grey" | "red";
};

const settlementStatusViewMap: Record<SettlementStatus, SettlementStatusView> = {
  locked: { label: "잠김", tone: "blue" },
  paid: { label: "입금 완료", tone: "green" },
  cancelled: { label: "취소", tone: "red" },
};

export function mapEscrowStatus(status: EscrowStatusResponse): SettlementStatus {
  switch (status) {
    case "LOCKED":
      return "locked";
    case "RELEASED":
      return "paid";
    case "CANCELED":
      return "cancelled";
  }
}

export function getSettlementStatusView(status: SettlementStatus): SettlementStatusView {
  return settlementStatusViewMap[status];
}
