export type Wallet = {
  id: number;
  availableBalance: number;
  lockedBalance: number;
  updatedAt: string;
};

export type WithdrawalStatus = "requested" | "completed" | "failed";

export type Withdrawal = {
  id: number;
  requestedAmount: number;
  remainingBalance: number;
  status: WithdrawalStatus;
};

export type PointHistoryType = "CHARGE" | "LOCK" | "RELEASE" | "REFUND" | "WITHDRAW";

export type PointHistoryReferenceType = "CAMPAIGN" | "ESCROW" | "PAYMENT" | "WITHDRAWAL";

export type PointHistory = {
  id: number;
  type: PointHistoryType;
  amount: number;
  campaignId?: number;
  campaignTitle?: string;
  referenceId: number;
  referenceType?: PointHistoryReferenceType;
  createdAt: string;
};
