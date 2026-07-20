export type SettlementStatus = "locked" | "paid" | "cancelled";

export type EscrowLedger = {
  id: number;
  campaignId: number;
  campaignTitle?: string;
  bloggerId?: number;
  bloggerEmail?: string;
  bloggerName?: string;
  amount: number;
  status: SettlementStatus;
  createdAt: string;
};
