import type { Wallet } from "@pacto/types";

import { adaptWallet } from "../adapters/wallet-adapter";
import { mockWallet } from "../mocks/data";

export async function getMyWallet(): Promise<Wallet> {
  return adaptWallet({
    walletId: mockWallet.id,
    balance: mockWallet.availableBalance,
    lockedBalance: mockWallet.lockedBalance,
    totalEarned: mockWallet.totalEarned,
    updatedAt: mockWallet.updatedAt,
  });
}
