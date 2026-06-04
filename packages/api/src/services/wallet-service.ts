import type { Wallet } from "@pacto/types";

import { adaptWallet } from "../adapters/wallet-adapter";
import type { WalletResponse, WithdrawalResponse } from "../adapters/wallet-adapter";
import { adaptWithdrawal } from "../adapters/wallet-adapter";
import { isMockFallbackDisabled } from "../client/env";
import { apiRequest, unwrapCommonResponse } from "../client/http-client";
import type { CommonResponse } from "../client/http-client";
import { mockWallet } from "../mocks/data";

export async function getMyWallet(token?: string): Promise<Wallet> {
  return withMockFallback(
    async () => {
      const response = await apiRequest<CommonResponse<WalletResponse> | WalletResponse>(
        "/api/v1/wallets/me",
        {
          token,
        },
      );

      return adaptWallet(unwrapCommonResponse<WalletResponse>(response));
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

export async function requestWithdraw(payload: WithdrawPayload, token?: string) {
  const response = await apiRequest<CommonResponse<WithdrawalResponse> | WithdrawalResponse>(
    "/api/v1/wallets/withdraw",
    {
      body: payload,
      method: "POST",
      token,
    },
  );

  return adaptWithdrawal(unwrapCommonResponse<WithdrawalResponse>(response));
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
