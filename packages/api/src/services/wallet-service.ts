import type { Wallet } from "@pacto/types";

import { adaptWallet } from "../adapters/wallet-adapter";
import type { WalletResponse, WithdrawalResponse } from "../adapters/wallet-adapter";
import { adaptWithdrawal } from "../adapters/wallet-adapter";
import { isMockFallbackDisabled } from "../client/env";
import { apiRequest } from "../client/http-client";
import { mockWallet } from "../mocks/data";

export async function getMyWallet(): Promise<Wallet> {
  return withMockFallback(
    async () => {
      const response = await apiRequest<WalletResponse>("/api/v1/wallets/me");

      return adaptWallet(response);
    },
    () =>
      adaptWallet({
        walletId: mockWallet.id,
        balance: mockWallet.availableBalance,
        lockedBalance: mockWallet.lockedBalance,
        totalEarned: mockWallet.totalEarned,
        updatedAt: mockWallet.updatedAt,
      }),
  );
}

export type WithdrawPayload = {
  accountNumber: string;
  amount: number;
  bankName: string;
};

export async function requestWithdraw(payload: WithdrawPayload) {
  const response = await apiRequest<WithdrawalResponse>("/api/v1/wallets/withdraw", {
    body: payload,
    method: "POST",
  });

  return adaptWithdrawal(response);
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
