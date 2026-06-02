export type SettlementStatus = "locked" | "paid" | "cancelled";

export type EscrowLedger = {
  id: number;
  campaignId: number;
  amount: number;
  status: SettlementStatus;
  createdAt: string;
};
