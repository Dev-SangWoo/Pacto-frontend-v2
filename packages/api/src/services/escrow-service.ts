import type { EscrowLedger } from "@pacto/types";

import { adaptEscrowLedger } from "../adapters/escrow-adapter";
import type { EscrowLedgerResponse } from "../adapters/escrow-adapter";
import { apiRequest, unwrapListResponse } from "../client/http-client";

export type GetEscrowsParams = {
  page?: number;
  size?: number;
  status?: "CANCELED" | "LOCKED" | "RELEASED";
};

export async function getMyEscrows(
  params: GetEscrowsParams = {},
  token?: string,
): Promise<EscrowLedger[]> {
  const response = await apiRequest("/api/v1/escrows", { query: params, token });
  return unwrapListResponse<EscrowLedgerResponse>(response).map(adaptEscrowLedger);
}

export async function getCampaignEscrows(
  campaignId: number,
  token?: string,
): Promise<EscrowLedger[]> {
  const response = await apiRequest(`/api/v1/advertiser/campaigns/${campaignId}/escrows`, {
    token,
  });

  return unwrapListResponse<EscrowLedgerResponse>(response).map(adaptEscrowLedger);
}
