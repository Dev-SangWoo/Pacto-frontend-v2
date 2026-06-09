import type { PointHistory, Wallet } from "@pacto/types";

import { adaptPointHistory, adaptWallet, adaptWithdrawal } from "../adapters/wallet-adapter";
import type {
  PointHistoryResponse,
  WalletResponse,
  WithdrawalResponse,
} from "../adapters/wallet-adapter";
import { isMockFallbackDisabled } from "../client/env";
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";
import type { CommonResponse } from "../client/http-client";
import { mockPointHistories, mockWallet } from "../mocks/data";

export type GetPointHistoriesParams = {
  page?: number;
  size?: number;
};

type MockFallbackOptions = {
  mockFallback?: boolean;
};

export type WithdrawPayload = {
  accountNumber: string;
  amount: number;
  bankName: string;
};

export async function getMyWallet(
  token?: string,
  options: MockFallbackOptions = {},
): Promise<Wallet> {
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
    () => mockWallet,
    options,
  );
}

export async function getMyPointHistories(
  params: GetPointHistoriesParams = {},
  token?: string,
  options: MockFallbackOptions = {},
): Promise<PointHistory[]> {
  return withMockFallback(
    async () => {
      const response = await apiRequest("/api/v1/wallets/me/histories", { query: params, token });

      return unwrapListResponse<PointHistoryResponse>(response).map(adaptPointHistory);
    },
    () => mockPointHistories,
    options,
  );
}

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

async function withMockFallback<T>(
  request: () => Promise<T>,
  fallback: () => T | Promise<T>,
  options: MockFallbackOptions = {},
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    const isForced = options.mockFallback === true;
    const isDisabled = options.mockFallback === false || isMockFallbackDisabled();

    // In development, we might want to fallback on 403 even if not explicitly enabled
    // but only if not explicitly disabled.
    if (!isForced && isDisabled) {
      throw error;
    }

    return await fallback();
  }
}
