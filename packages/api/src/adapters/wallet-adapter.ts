import type { PointHistory, Wallet, Withdrawal } from "@pacto/types";

export type WalletResponse = {
  balance: number;
  lockedBalance: number;
  updatedAt: string;
  walletId: number;
};

export type WithdrawalResponse = {
  remainingBalance: number;
  requestedAmount: number;
  status: "COMPLETED" | "PENDING" | "REJECTED";
  withdrawalId?: number;
  withdrawId?: number;
};

export type PointHistoryResponse = {
  amount: number;
  createdAt: string;
  historyId: number;
  referenceId: number;
  type: PointHistory["type"];
};

export function adaptWallet(response: WalletResponse): Wallet {
  return {
    id: response.walletId,
    availableBalance: response.balance,
    lockedBalance: response.lockedBalance,
    updatedAt: response.updatedAt,
  };
}

export function adaptWithdrawal(response: WithdrawalResponse): Withdrawal {
  return {
    id: response.withdrawalId ?? response.withdrawId ?? 0,
    requestedAmount: response.requestedAmount,
    remainingBalance: response.remainingBalance,
    status:
      response.status === "PENDING"
        ? "requested"
        : response.status === "COMPLETED"
          ? "completed"
          : "failed",
  };
}

export function adaptPointHistory(response: PointHistoryResponse): PointHistory {
  return {
    id: response.historyId,
    type: response.type,
    amount: response.amount,
    referenceId: response.referenceId,
    createdAt: response.createdAt,
  };
}
