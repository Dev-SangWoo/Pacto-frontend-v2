import type { Payment } from "@pacto/types";

export type PaymentResponse = {
  amount: number;
  createdAt?: string;
  impUid?: string | null;
  merchantUid: string;
  paidAt?: string;
  paymentId: number;
  status: Payment["status"];
  userId?: number;
};

export function adaptPayment(response: PaymentResponse): Payment {
  return {
    id: response.paymentId,
    userId: response.userId,
    merchantUid: response.merchantUid,
    impUid: response.impUid,
    amount: response.amount,
    status: response.status,
    createdAt: response.createdAt,
    paidAt: response.paidAt,
  };
}
