import type { EscrowLedger } from "@pacto/types";

import { mapEscrowStatus } from "@pacto/utils";

export type EscrowLedgerResponse = {
  amount: number;
  bloggerName?: string;
  campaignId?: number;
  campaignTitle?: string;
  campaign_id?: number;
  createdAt?: string;
  created_at?: string;
  escrowId?: number;
  escrow_id?: number;
  status: "CANCELED" | "LOCKED" | "RELEASED";
};

export function adaptEscrowLedger(response: EscrowLedgerResponse): EscrowLedger {
  return {
    id: response.escrowId ?? response.escrow_id ?? 0,
    campaignId: response.campaignId ?? response.campaign_id ?? 0,
    campaignTitle: response.campaignTitle,
    bloggerName: response.bloggerName,
    amount: response.amount,
    status: mapEscrowStatus(response.status),
    createdAt: response.createdAt ?? response.created_at ?? new Date().toISOString(),
  };
}
