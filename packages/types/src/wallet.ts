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

export type PointHistory = {
  id: number;
  type: PointHistoryType;
  amount: number;
  referenceId: number;
  createdAt: string;
};
