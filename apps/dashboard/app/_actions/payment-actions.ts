"use server";

import { getPayment, preparePayment } from "@pacto/api";
import type { PaymentStatus } from "@pacto/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getDashboardSession } from "../_lib/session";

export type PrepareChargeResult = {
  amount?: number;
  merchantUid?: string;
  message?: string;
  ok: boolean;
  paymentId?: number;
};

export type ChargeStatusResult = {
  message?: string;
  ok: boolean;
  status?: PaymentStatus;
};

export async function prepareChargeAction(amount: number): Promise<PrepareChargeResult> {
  const session = await getDashboardSession();

  console.log("prepareChargeAction - Session Check:", {
    hasToken: !!session.accessToken,
    amount,
  });

  if (session.accessToken == null) {
    redirect("/login");
  }

  if (!Number.isFinite(amount) || amount < 1000) {
    return { message: "충전 금액은 1,000원 이상 입력해 주세요.", ok: false };
  }

  try {
    const payment = await preparePayment({ amount }, session.accessToken);
    console.log("prepareChargeAction - Success:", payment);

    return {
      amount: payment.amount,
      merchantUid: payment.merchantUid,
      ok: true,
      paymentId: payment.id,
    };
  } catch (error) {
    console.error("prepareChargeAction - Error Details:", error);

    return {
      message: "결제 준비에 실패했어요. 계정 권한과 로그인 상태를 확인해 주세요.",
      ok: false,
    };
  }
}

export async function checkChargeStatusAction(paymentId: number): Promise<ChargeStatusResult> {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    const payment = await getPayment(paymentId, session.accessToken);

    if (payment.status === "PAID") {
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/payments");
      return { ok: true, status: payment.status };
    }

    if (payment.status === "FAILED" || payment.status === "CANCELED") {
      return {
        message: "결제가 완료되지 않았어요. 결제 내역을 확인해 주세요.",
        ok: false,
        status: payment.status,
      };
    }

    return { message: "결제 완료를 확인하는 중이에요.", ok: false, status: payment.status };
  } catch {
    return { message: "결제 상태를 확인하지 못했어요. 잠시 후 다시 확인해 주세요.", ok: false };
  }
}
