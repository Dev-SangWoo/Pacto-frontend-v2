"use client";

import { useMemo, useState, useTransition } from "react";

import { checkChargeStatusAction, prepareChargeAction } from "../../../_actions/payment-actions";

type ChargePanelProps = {
  buyerEmail?: string;
  buyerUserId?: number;
};

type PortOneResponse = {
  code?: string;
  message?: string;
  paymentId?: string;
  transactionId?: string;
};

declare global {
  interface Window {
    PortOne?: {
      requestPayment: (params: Record<string, unknown>) => Promise<PortOneResponse>;
    };
  }
}

const chargeOptions = [50000, 100000, 300000];
const portOneStoreId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
const portOneChannelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

export function ChargePanel({ buyerEmail, buyerUserId }: ChargePanelProps) {
  const [amount, setAmount] = useState(100000);
  const [message, setMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const formattedAmount = useMemo(() => amount.toLocaleString("ko-KR"), [amount]);

  const startCharge = () => {
    setMessage(undefined);

    console.log("PortOne Config Check:", {
      storeId: portOneStoreId,
      channelKey: portOneChannelKey,
      envKeys: Object.keys(process.env).filter((key) => key.startsWith("NEXT_PUBLIC_PORTONE")),
    });

    if (
      portOneStoreId == null ||
      portOneStoreId.length === 0 ||
      portOneChannelKey == null ||
      portOneChannelKey.length === 0
    ) {
      setMessage("포트원 STORE_ID와 CHANNEL_KEY를 설정하면 결제창을 열 수 있어요.");
      return;
    }

    startTransition(async () => {
      const prepared = await prepareChargeAction(amount);

      if (!prepared.ok || prepared.merchantUid == null || prepared.amount == null) {
        setMessage(prepared.message ?? "결제 준비에 실패했어요.");
        return;
      }

      try {
        await loadPortOneScript();
      } catch {
        setMessage("포트원 SDK를 불러오지 못했어요. 네트워크 상태를 확인해 주세요.");
        return;
      }

      if (window.PortOne == null) {
        setMessage("포트원 SDK가 준비되지 않았어요.");
        return;
      }

      try {
        const response = await window.PortOne.requestPayment({
          channelKey: portOneChannelKey,
          currency: "CURRENCY_KRW",
          customer: {
            email: getPortOneCustomerEmail(buyerEmail, buyerUserId),
            fullName: getPortOneCustomerName(buyerUserId),
          },
          orderName: "Pacto 지갑 충전",
          payMethod: "CARD", // 만약 토스페이 전용 채널이라면 "EASY_PAY"로 변경이 필요할 수 있습니다.
          paymentId: prepared.merchantUid,
          storeId: portOneStoreId,
          totalAmount: prepared.amount,
        });

        if (response.code != null) {
          setMessage(response.message ?? "결제가 취소되었어요.");
          return;
        }

        if (response.paymentId == null) {
          setMessage("결제 결과 확인에 실패했어요.");
          return;
        }

        if (prepared.paymentId == null) {
          setMessage("결제 요청 번호를 확인하지 못했어요. 결제 내역을 확인해 주세요.");
          return;
        }

        setMessage("결제 완료를 확인하는 중이에요.");
        const settled = await waitForChargeSettlement(prepared.paymentId);

        setMessage(settled.ok ? "충전 결제가 완료됐어요." : settled.message);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "결제 중 오류가 발생했어요.");
      }
    });
  };

  return (
    <section className="panel charge-panel" aria-labelledby="charge-title">
      <div className="panel-heading">
        <div>
          <h2 id="charge-title">지갑 충전</h2>
          <p>캠페인 예치와 정산에 사용할 포인트를 충전합니다.</p>
        </div>
      </div>
      <div className="charge-body">
        <div className="charge-options" aria-label="충전 금액 선택">
          {chargeOptions.map((option) => (
            <button
              className={amount === option ? "active" : undefined}
              key={option}
              onClick={() => setAmount(option)}
              type="button"
            >
              {option.toLocaleString("ko-KR")}원
            </button>
          ))}
        </div>
        <label className="charge-input">
          <span>직접 입력</span>
          <input
            min="1000"
            onChange={(event) => setAmount(Number(event.target.value))}
            step="1000"
            type="number"
            value={amount}
          />
        </label>
        <button
          className="primary-button wide"
          disabled={isPending}
          onClick={startCharge}
          type="button"
        >
          {isPending ? "결제 준비 중..." : `${formattedAmount}원 충전하기`}
        </button>
        {message != null ? (
          <p className="form-error" role="status">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function loadPortOneScript() {
  const scriptUrl = "https://cdn.portone.io/v2/browser-sdk.js";

  return new Promise<void>((resolve, reject) => {
    if (window.PortOne != null) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${scriptUrl}"]`);

    if (existingScript != null) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("portone load failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = scriptUrl;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("portone load failed")), {
      once: true,
    });
    document.body.appendChild(script);
  });
}

function getPortOneCustomerEmail(email?: string, userId?: number) {
  if (email != null && email.trim().length > 0) {
    return email.trim();
  }

  return userId != null ? `user-${userId}@pacto.local` : "unknown-user@pacto.local";
}

function getPortOneCustomerName(userId?: number) {
  return userId != null ? `Pacto User #${userId}` : "Pacto User";
}

async function waitForChargeSettlement(paymentId: number) {
  const maxAttempts = 8;
  const intervalMs = 1500;
  let latestResult = await checkChargeStatusAction(paymentId);

  for (let attempt = 1; attempt < maxAttempts && latestResult.status === "READY"; attempt += 1) {
    await delay(intervalMs);
    latestResult = await checkChargeStatusAction(paymentId);
  }

  return latestResult;
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
