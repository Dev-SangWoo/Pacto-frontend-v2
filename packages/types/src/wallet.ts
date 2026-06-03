export type Wallet = {
  id: number;
  availableBalance: number;
  lockedBalance: number;
  totalEarned: number;
  updatedAt: string;
};

export type WithdrawalStatus = "requested" | "completed" | "failed";

export type Withdrawal = {
  id: number;
  requestedAmount: number;
  remainingBalance: number;
  status: WithdrawalStatus;
};
