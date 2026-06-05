"use server";

import { preparePayment, verifyPayment } from "@pacto/api";
import { redirect } from "next/navigation";

import { getDashboardSession } from "../_lib/session";

export type PrepareChargeResult = {
  amount?: number;
  merchantUid?: string;
  message?: string;
  ok: boolean;
  paymentId?: number;
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

    // [임시] 백엔드 미구현 상태에서 프론트엔드 결제창 테스트를 위한 Mock 데이터 반환
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ 백엔드 API 호출 실패로 임시 Mock 데이터를 사용합니다.");
      return {
        amount: amount,
        merchantUid: `test_merchant_${Date.now()}`,
        ok: true,
        paymentId: 0,
      };
    }

    return {
      message: "결제 준비에 실패했어요. 계정 권한과 로그인 상태를 확인해 주세요.",
      ok: false,
    };
  }
}

export async function verifyChargeAction(impUid: string, merchantUid: string) {
  const session = await getDashboardSession();

  if (session.accessToken == null) {
    redirect("/login");
  }

  try {
    await verifyPayment({ impUid, merchantUid }, session.accessToken);

    return { ok: true };
  } catch {
    return { message: "결제 검증에 실패했어요. 결제 내역을 확인해 주세요.", ok: false };
  }
}
