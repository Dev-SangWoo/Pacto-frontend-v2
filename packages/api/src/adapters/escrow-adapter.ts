import type { EscrowLedger } from "@pacto/types";

import { mapEscrowStatus } from "@pacto/utils";

export type EscrowLedgerResponse = {
  escrowId: number;
  campaignId: number;
  amount: number;
  status: "LOCKED" | "RELEASED" | "CANCELED";
  createdAt: string;
};

export function adaptEscrowLedger(response: EscrowLedgerResponse): EscrowLedger {
  return {
    id: response.escrowId,
    campaignId: response.campaignId,
    amount: response.amount,
    status: mapEscrowStatus(response.status),
    createdAt: response.createdAt,
  };
}
