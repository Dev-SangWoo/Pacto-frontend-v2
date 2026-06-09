import type { EscrowLedger } from "@pacto/types";

import { adaptEscrowLedger } from "../adapters/escrow-adapter";
import type { EscrowLedgerResponse } from "../adapters/escrow-adapter";
import { isMockFallbackDisabled } from "../client/env";
import { apiRequest, unwrapListResponse } from "../client/http-client";
import { mockEscrows } from "../mocks/data";

export type GetEscrowsParams = {
  page?: number;
  size?: number;
  status?: "CANCELED" | "LOCKED" | "RELEASED";
};

type MockFallbackOptions = {
  mockFallback?: boolean;
};

export async function getMyEscrows(
  params: GetEscrowsParams = {},
  token?: string,
  options: MockFallbackOptions = {},
): Promise<EscrowLedger[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/escrows", { query: params, token });
      return unwrapListResponse<EscrowLedgerResponse>(response).map(adaptEscrowLedger);
    },
    () => mockEscrows.map(adaptEscrowLedger),
    options,
  );
}

export async function getCampaignEscrows(
  campaignId: number,
  token?: string,
  options: MockFallbackOptions = {},
): Promise<EscrowLedger[]> {
  return withMockFallback(
    async () => {
      // Use /api/v1/escrows and filter by campaignId on frontend
      const response = await apiRequest("/api/v1/escrows", { token });
      const allEscrows = unwrapListResponse<EscrowLedgerResponse>(response).map(adaptEscrowLedger);

      return allEscrows.filter((escrow) => escrow.campaignId === campaignId);
    },
    () => mockEscrows.map(adaptEscrowLedger).filter((escrow) => escrow.campaignId === campaignId),
    options,
  );
}

async function withMockFallback<T>(
  request: () => Promise<T>,
  fallback: () => T | Promise<T>,
  options: MockFallbackOptions = {},
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    const isForced = options.mockFallback === true;
    const isDisabled = options.mockFallback === false || isMockFallbackDisabled();

    if (!isForced && isDisabled) {
      throw error;
    }

    return await fallback();
  }
}
