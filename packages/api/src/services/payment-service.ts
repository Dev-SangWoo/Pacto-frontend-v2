import type { Payment } from "@pacto/types";

import { adaptPayment } from "../adapters/payment-adapter";
import type { PaymentResponse } from "../adapters/payment-adapter";
import { apiRequest, unwrapCommonResponse, unwrapListResponse } from "../client/http-client";
import type { CommonResponse } from "../client/http-client";

export type PreparePaymentPayload = {
  amount: number;
};

export type GetMyPaymentsParams = {
  page?: number;
  size?: number;
};

export async function getMyPayments(
  params: GetMyPaymentsParams = {},
  token?: string,
): Promise<Payment[]> {
  const response = await apiRequest("/api/v1/payments", { query: params, token });

  return unwrapListResponse<PaymentResponse>(response).map(adaptPayment);
}

export async function preparePayment(
  payload: PreparePaymentPayload,
  token?: string,
): Promise<Payment> {
  const response = await apiRequest<CommonResponse<PaymentResponse> | PaymentResponse>(
    "/api/v1/payments",
    {
      body: payload,
      method: "POST",
      token,
    },
  );

  return adaptPayment(unwrapCommonResponse<PaymentResponse>(response));
}

export async function getPayment(paymentId: number, token?: string): Promise<Payment> {
  const response = await apiRequest<CommonResponse<PaymentResponse> | PaymentResponse>(
    `/api/v1/payments/${paymentId}`,
    {
      token,
    },
  );

  return adaptPayment(unwrapCommonResponse<PaymentResponse>(response));
}
