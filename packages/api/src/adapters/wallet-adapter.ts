import type { Wallet, Withdrawal } from "@pacto/types";

export type WalletResponse = {
  walletId: number;
  balance: number;
  lockedBalance: number;
  totalEarned: number;
  updatedAt: string;
};

export type WithdrawalResponse = {
  withdrawalId: number;
  requestedAmount: number;
  remainingBalance: number;
  status: "PENDING" | "COMPLETED" | "REJECTED";
};

export function adaptWallet(response: WalletResponse): Wallet {
  return {
    id: response.walletId,
    availableBalance: response.balance,
    lockedBalance: response.lockedBalance,
    totalEarned: response.totalEarned,
    updatedAt: response.updatedAt,
  };
}

export function adaptWithdrawal(response: WithdrawalResponse): Withdrawal {
  return {
    id: response.withdrawalId,
    requestedAmount: response.requestedAmount,
    remainingBalance: response.remainingBalance,
    status:
      response.status === "PENDING" ? "requested" : response.status === "COMPLETED" ? "completed" : "failed",
  };
}
