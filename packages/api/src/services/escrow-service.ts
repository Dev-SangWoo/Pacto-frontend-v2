import type { EscrowLedger } from "@pacto/types";

import { adaptEscrowLedger } from "../adapters/escrow-adapter";
import { mockEscrows } from "../mocks/data";

export async function getMyEscrows(): Promise<EscrowLedger[]> {
  return mockEscrows.map((escrow) =>
    adaptEscrowLedger({
      escrowId: escrow.id,
      campaignId: escrow.campaignId,
      amount: escrow.amount,
      status:
        escrow.status === "locked" ? "LOCKED" : escrow.status === "paid" ? "RELEASED" : "CANCELED",
      createdAt: escrow.createdAt,
    }),
  );
}
