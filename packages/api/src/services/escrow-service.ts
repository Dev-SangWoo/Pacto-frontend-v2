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

export async function getMyEscrows(params: GetEscrowsParams = {}): Promise<EscrowLedger[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/escrows", { query: params });

      return unwrapListResponse<EscrowLedgerResponse>(response).map(adaptEscrowLedger);
    },
    () =>
      mockEscrows.map((escrow) =>
        adaptEscrowLedger({
          escrowId: escrow.id,
          campaignId: escrow.campaignId,
          campaignTitle: escrow.campaignTitle,
          bloggerName: escrow.bloggerName,
          amount: escrow.amount,
          status:
            escrow.status === "locked"
              ? "LOCKED"
              : escrow.status === "paid"
                ? "RELEASED"
                : "CANCELED",
          createdAt: escrow.createdAt,
        }),
      ),
  );
}

async function withMockFallback<T>(request: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (isMockFallbackDisabled()) {
      throw error;
    }

    return fallback();
  }
}
