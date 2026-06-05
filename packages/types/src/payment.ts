export type PaymentStatus = "READY" | "PAID" | "FAILED" | "CANCELLED";

export type Payment = {
  id: number;
  userId?: number;
  merchantUid: string;
  impUid?: string | null;
  amount: number;
  status: PaymentStatus;
  createdAt?: string;
  paidAt?: string;
};
