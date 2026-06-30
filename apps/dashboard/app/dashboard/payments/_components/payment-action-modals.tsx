"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { ChargePanel } from "./charge-panel";
import { WithdrawPanel } from "./withdraw-panel";

type PaymentActionModalsProps = {
  accessToken?: string;
  availableBalance: number;
  buyerEmail?: string;
  buyerUserId?: number;
};

type OpenModal = "charge" | "withdraw" | null;

export function PaymentActionModals({
  accessToken,
  availableBalance,
  buyerEmail,
  buyerUserId,
}: PaymentActionModalsProps) {
  const [openModal, setOpenModal] = useState<OpenModal>(null);

  return (
    <>
      <div className="payment-header-actions">
        <button className="primary-button" onClick={() => setOpenModal("charge")} type="button">
          충전하기
        </button>
        <button className="secondary-button" onClick={() => setOpenModal("withdraw")} type="button">
          출금 신청
        </button>
      </div>

      {openModal != null ? (
        <div className="payment-modal-backdrop" role="presentation">
          <section
            aria-label={openModal === "charge" ? "지갑 충전" : "출금 신청"}
            className="payment-modal"
            role="dialog"
          >
            <button
              aria-label="닫기"
              className="payment-modal-close"
              onClick={() => setOpenModal(null)}
              type="button"
            >
              <X size={18} strokeWidth={2.2} />
            </button>
            {openModal === "charge" ? (
              <ChargePanel buyerEmail={buyerEmail} buyerUserId={buyerUserId} />
            ) : (
              <WithdrawPanel accessToken={accessToken} availableBalance={availableBalance} />
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
