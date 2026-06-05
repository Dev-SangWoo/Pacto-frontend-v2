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
      success: true,
      data: {
        content: mockCampaigns.map((campaign) => ({
          campaign_id: campaign.id,
          advertiser_id: campaign.advertiserId,
          title: campaign.title,
          thumbnail_url: campaign.thumbnailUrl,
          reward_point: campaign.rewardPoint,
          totalSlots: campaign.totalSlots,
          remainingSlots: campaign.remainingSlots,
          status: "RECRUITING",
          deadline: campaign.deadline,
        })),
        page: 0,
        size: mockCampaigns.length,
        total_elements: mockCampaigns.length,
        total_pages: 1,
      },
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/campaigns/:campaignId`, ({ params }) => {
    const campaignId = Number(params.campaignId);
    const campaign = mockCampaigns.find((item) => item.id === campaignId);

    if (!campaign) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      success: true,
      data: {
        campaign_id: campaign.id,
        advertiser_id: campaign.advertiserId,
        title: campaign.title,
        thumbnail_url: campaign.thumbnailUrl,
        reward_point: campaign.rewardPoint,
        totalSlots: campaign.totalSlots,
        remainingSlots: campaign.remainingSlots,
        status: "RECRUITING",
        guidelines: [campaign.guidelines],
        deadline: campaign.deadline,
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/v1/campaigns`, async ({ request }) => {
    const body = (await request.json()) as { totalSlots?: number };

    return HttpResponse.json(
      {
        success: true,
        message: "캠페인 등록 성공",
        data: {
          campaign_id: 999,
          remainingSlots: body.totalSlots ?? 0,
          status: "RECRUITING",
          totalSlots: body.totalSlots ?? 0,
        },
      },
      { status: 201 },
    );
  }),

  http.patch(`${API_BASE_URL}/api/v1/campaigns/:campaignId/status`, async ({ params, request }) => {
    const body = (await request.json()) as { status?: string };

    return HttpResponse.json({
      success: true,
      data: {
        campaign_id: Number(params.campaignId),
        status: body.status ?? "COMPLETED",
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/v1/campaigns/:campaignId/missions`, ({ params }) => {
    const campaignId = Number(params.campaignId);

    return HttpResponse.json({
      success: true,
      data: {
        mission_id: 100 + campaignId,
        escrow_id: 300 + campaignId,
        status: "IN_PROGRESS",
      },
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/missions/me`, () => {
    return HttpResponse.json({
      success: true,
      data: mockMissions.map((mission) => ({
        mission_id: mission.id,
        campaign_id: mission.campaignId,
        submitted_url: mission.submittedUrl ?? null,
        status: mission.status.toUpperCase(),
        created_at: mission.dueDate,
        updated_at: mission.dueDate,
      })),
    });
  }),

  http.patch(`${API_BASE_URL}/api/v1/missions/:missionId/submit`, async ({ params, request }) => {
    const body = (await request.json()) as { submitted_url?: string };

    return HttpResponse.json({
      success: true,
      data: {
        mission_id: Number(params.missionId),
        submitted_url: body.submitted_url,
        status: "SUBMITTED",
      },
    });
  }),

  http.patch(`${API_BASE_URL}/api/v1/missions/:missionId/approve`, ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        mission_id: Number(params.missionId),
        status: "APPROVED",
        escrow_status: "RELEASED",
      },
    });
  }),

  http.patch(`${API_BASE_URL}/api/v1/missions/:missionId/cancel`, ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        mission_id: Number(params.missionId),
        status: "REJECTED",
        escrow_status: "CANCELED",
      },
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
      success: true,
      data: {
        content: [
          {
            historyId: 1,
            amount: 50000,
            type: "RELEASE",
            referenceId: 1,
            createdAt: "2026-05-26T10:00:00",
          },
        ],
        totalPages: 1,
        currentPage: 1,
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/v1/wallets/withdraw`, async ({ request }) => {
    const body = (await request.json()) as { amount?: number };
    const requestedAmount = body.amount ?? 0;

    return HttpResponse.json(
      {
        success: true,
        data: {
          withdrawalId: 1,
          requestedAmount,
          remainingBalance: mockWallet.availableBalance - requestedAmount,
          status: "PENDING",
        },
      },
      { status: 201 },
    );
  }),

  http.get(`${API_BASE_URL}/api/v1/escrows`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        content: mockEscrows.map((escrow) => ({
          escrowId: escrow.id,
          campaignId: escrow.campaignId,
          campaignTitle: escrow.campaignTitle,
          bloggerName: escrow.bloggerName,
          amount: escrow.amount,
          status:
            escrow.status === "locked"
              ? "LOCKED"
              : escrow.status === "paid"
                ? "RELEASED"
                : "CANCELED",
          createdAt: escrow.createdAt,
        })),
        totalPages: 1,
        currentPage: 1,
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/v1/payments`, async ({ request }) => {
    const body = (await request.json()) as { amount?: number };

    return HttpResponse.json({
      success: true,
      data: {
        paymentId: 1,
        userId: 201,
        merchantUid: "payment_mock_1",
        impUid: null,
        amount: body.amount ?? 0,
        status: "READY",
        createdAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }),

  http.post(`${API_BASE_URL}/api/v1/payments/verify`, async ({ request }) => {
    const body = (await request.json()) as { impUid?: string; merchantUid?: string };

    return HttpResponse.json({
      success: true,
      data: {
        paymentId: 1,
        merchantUid: body.merchantUid ?? "payment_mock_1",
        impUid: body.impUid ?? "imp_mock_1",
        amount: 50000,
        status: "PAID",
        paidAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }),

  http.get(`${API_BASE_URL}/api/v1/payments/:paymentId`, ({ params }) => {
    return HttpResponse.json({
      success: true,
      data: {
        paymentId: Number(params.paymentId),
        merchantUid: "payment_mock_1",
        amount: 50000,
        status: "PAID",
        paidAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }),
];
