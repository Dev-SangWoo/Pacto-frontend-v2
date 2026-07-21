import type { EscrowLedger } from "@pacto/types";

import { mapEscrowStatus } from "@pacto/utils";

export type EscrowLedgerResponse = {
  amount: number;
  bloggerEmail?: string;
  bloggerId?: number;
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
  const campaignId = response.campaignId ?? response.campaign_id ?? 0;

  return {
    id: response.escrowId ?? response.escrow_id ?? 0,
    campaignId,
    campaignTitle: response.campaignTitle,
    bloggerId: response.bloggerId,
    bloggerEmail: response.bloggerEmail,
    bloggerName: response.bloggerName,
    amount: response.amount,
    status: mapEscrowStatus(response.status),
    createdAt: response.createdAt ?? response.created_at ?? new Date().toISOString(),
  };
}
