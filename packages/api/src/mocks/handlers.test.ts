import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { server } from "./server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("MSW handlers", () => {
  it("내 지갑 조회 API mock 응답을 반환한다", async () => {
    const response = await fetch("http://localhost:8080/api/v1/wallets/me");
    const data = (await response.json()) as {
      walletId: number;
      balance: number;
      lockedBalance: number;
    };

    expect(response.ok).toBe(true);
    expect(data.walletId).toBe(1);
    expect(data.balance).toBe(50000);
    expect(data.lockedBalance).toBe(10000);
  });
});
