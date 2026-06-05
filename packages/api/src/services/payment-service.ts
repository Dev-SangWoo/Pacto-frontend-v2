import type { Payment } from "@pacto/types";

import { adaptPayment } from "../adapters/payment-adapter";
import type { PaymentResponse } from "../adapters/payment-adapter";
import { apiRequest, unwrapCommonResponse } from "../client/http-client";
import type { CommonResponse } from "../client/http-client";

export type PreparePaymentPayload = {
  amount: number;
};

export type VerifyPaymentPayload = {
  impUid: string;
  merchantUid: string;
};

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

export async function verifyPayment(
  payload: VerifyPaymentPayload,
  token?: string,
): Promise<Payment> {
  const response = await apiRequest<CommonResponse<PaymentResponse> | PaymentResponse>(
    "/api/v1/payments/verify",
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
