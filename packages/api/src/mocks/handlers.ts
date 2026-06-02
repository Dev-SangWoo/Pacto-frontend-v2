import { http, HttpResponse } from "msw";

import { mockCampaigns, mockEscrows, mockMissions, mockWallet } from "./data";

const API_BASE_URL = "http://localhost:8080";

export const handlers = [
  http.post(`${API_BASE_URL}/api/v1/auth/login`, async () => {
    return HttpResponse.json({
      success: true,
      message: "로그인 성공",
      data: {
        accessToken: "mock-access-token",
      },
      timestamp: new Date().toISOString(),
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/auth/me`, () => {
    return HttpResponse.json({
      success: true,
      message: "내 정보 조회 성공",
      data: {
        userId: 201,
        email: "blogger@pacto.test",
        role: "BLOGGER",
      },
      timestamp: new Date().toISOString(),
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/campaigns`, () => {
    return HttpResponse.json({
      content: mockCampaigns,
      page: 0,
      size: mockCampaigns.length,
      totalElements: mockCampaigns.length,
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/campaigns/:campaignId`, ({ params }) => {
    const campaignId = Number(params.campaignId);
    const campaign = mockCampaigns.find((item) => item.id === campaignId);

    if (!campaign) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(campaign);
  }),

  http.post(`${API_BASE_URL}/api/v1/campaigns/:campaignId/missions`, ({ params }) => {
    const campaignId = Number(params.campaignId);

    return HttpResponse.json({
      missionId: 100 + campaignId,
      campaignId,
      status: "IN_PROGRESS",
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/missions/me`, () => {
    return HttpResponse.json({
      content: mockMissions,
      totalElements: mockMissions.length,
    });
  }),

  http.patch(`${API_BASE_URL}/api/v1/missions/:missionId/submit`, async ({ params, request }) => {
    const body = (await request.json()) as { submittedUrl?: string };

    return HttpResponse.json({
      missionId: Number(params.missionId),
      submittedUrl: body.submittedUrl,
      status: "SUBMITTED",
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/wallets/me`, () => {
    return HttpResponse.json({
      walletId: mockWallet.id,
      balance: mockWallet.availableBalance,
      lockedBalance: mockWallet.lockedBalance,
      updatedAt: mockWallet.updatedAt,
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/wallets/me/histories`, () => {
    return HttpResponse.json({
      historyId: 1,
      amount: 50000,
      type: "RELEASE",
      referenceId: 1,
      createdAt: "2026-05-26T10:00:00",
    });
  }),

  http.post(`${API_BASE_URL}/api/v1/wallets/withdraw`, async ({ request }) => {
    const body = (await request.json()) as { amount?: number };
    const requestedAmount = body.amount ?? 0;

    return HttpResponse.json(
      {
        withdrawalId: 1,
        requestedAmount,
        remainingBalance: mockWallet.availableBalance - requestedAmount,
        status: "PENDING",
      },
      { status: 201 },
    );
  }),

  http.get(`${API_BASE_URL}/api/v1/escrows`, () => {
    return HttpResponse.json({
      content: mockEscrows.map((escrow) => ({
        escrowId: escrow.id,
        campaignId: escrow.campaignId,
        amount: escrow.amount,
        status:
          escrow.status === "locked"
            ? "LOCKED"
            : escrow.status === "paid"
              ? "RELEASED"
              : "CANCELED",
        createdAt: escrow.createdAt,
      })),
      totalElements: mockEscrows.length,
    });
  }),
];
