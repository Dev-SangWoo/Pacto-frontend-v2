import type { SettlementStatus } from "@pacto/types";

export type EscrowStatusResponse = "LOCKED" | "RELEASED" | "CANCELED";

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
