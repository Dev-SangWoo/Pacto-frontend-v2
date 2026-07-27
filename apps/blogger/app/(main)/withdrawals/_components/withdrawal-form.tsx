"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { formatPoint } from "@pacto/utils";

import { requestWithdrawalAction } from "../../../_actions/blogger-actions";
import { FlowCompletion } from "../../../_components/flow-completion";
import { KOREAN_BANKS } from "../../../_lib/banks";

type WithdrawalFormProps = {
  availableBalance: number;
};

export function WithdrawalForm({ availableBalance }: WithdrawalFormProps) {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [completedWithdrawal, setCompletedWithdrawal] = useState<{
    amount: number;
    bankName: string;
  }>();
  const queryClient = useQueryClient();
  const numericAmount = amount === "" ? 0 : Number(amount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (numericAmount <= 0 || numericAmount > availableBalance) {
      alert("출금 가능 금액 내에서 입력해 주세요.");
      return;
    }

    if (!bankName || !accountNumber) {
      alert("계좌 정보를 모두 입력해 주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await requestWithdrawalAction({
        accountNumber,
        amount: numericAmount,
        bankName,
      });

      if (!result.ok) {
        alert(result.message ?? "출금 신청 중 오류가 발생했습니다.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["blogger", "wallet"] });
      setCompletedWithdrawal({ amount: numericAmount, bankName });
    } catch {
      alert("출금 신청 중 오류가 발생했습니다. 잔액을 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  function handleAmountChange(value: string) {
    if (value === "") {
      setAmount("");
      return;
    }

    const nextAmount = Number(value);

    if (!Number.isFinite(nextAmount) || nextAmount < 0) {
      return;
    }

    setAmount(String(Math.min(Math.floor(nextAmount), availableBalance)));
  }

  if (completedWithdrawal != null) {
    return (
      <FlowCompletion
        actions={
          <>
            <Link className="primary-button full-width" href="/wallet">
              지갑에서 확인하기
            </Link>
            <Link className="text-link-button" href="/campaigns">
              캠페인으로 돌아가기
            </Link>
          </>
        }
        description="신청 내역을 확인한 뒤 등록한 계좌로 출금을 진행할게요."
        detail={
          <dl className="flow-completion-summary">
            <div>
              <dt>신청 금액</dt>
              <dd>{formatPoint(completedWithdrawal.amount)}</dd>
            </div>
            <div>
              <dt>받을 은행</dt>
              <dd>{completedWithdrawal.bankName}</dd>
            </div>
          </dl>
        }
        eyebrow="출금 신청 완료"
        title="신청이 완료되었습니다!"
      />
    );
  }

  return (
    <form className="withdrawal-form" onSubmit={handleSubmit}>
      <section className="withdrawal-form-section" aria-labelledby="withdrawal-amount-title">
        <div className="withdrawal-form-heading">
          <span aria-hidden="true">1</span>
          <div>
            <h2 id="withdrawal-amount-title">출금 금액</h2>
            <p>보유 잔액 안에서 신청할 금액을 입력해 주세요.</p>
          </div>
        </div>

        <label className="withdrawal-field-label" htmlFor="withdrawal-amount">
          신청 금액
        </label>
        <div className="withdrawal-amount-input">
          <input
            id="withdrawal-amount"
            type="number"
            min={1}
            max={availableBalance}
            step={1}
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            onKeyDown={(e) => {
              if (["-", "+", "e", "E"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            placeholder="금액을 입력하세요"
            required
          />
          <span aria-hidden="true">P</span>
          <button
            type="button"
            onClick={() => setAmount(availableBalance > 0 ? String(availableBalance) : "")}
            disabled={availableBalance === 0}
          >
            전액
          </button>
        </div>
        <p className="withdrawal-field-helper">
          최대 {formatPoint(availableBalance)}까지 가능해요.
        </p>
      </section>

      <section className="withdrawal-form-section" aria-labelledby="withdrawal-account-title">
        <div className="withdrawal-form-heading">
          <span aria-hidden="true">2</span>
          <div>
            <h2 id="withdrawal-account-title">받을 계좌</h2>
            <p>본인 명의 계좌 정보를 정확히 입력해 주세요.</p>
          </div>
        </div>

        <div className="withdrawal-form-grid">
          <label className="withdrawal-field">
            <span>은행</span>
            <select value={bankName} onChange={(e) => setBankName(e.target.value)} required>
              <option value="">은행을 선택해 주세요</option>
              {KOREAN_BANKS.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </label>

          <label className="withdrawal-field">
            <span>계좌번호</span>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              placeholder="숫자만 입력해 주세요"
              required
            />
          </label>
        </div>
      </section>

      <div className="withdrawal-submit-bar">
        <div>
          <span>신청 금액</span>
          <strong>{numericAmount > 0 ? formatPoint(numericAmount) : "0P"}</strong>
        </div>
        <button
          type="submit"
          className="primary-button withdrawal-button"
          disabled={
            isLoading ||
            numericAmount <= 0 ||
            numericAmount > availableBalance ||
            availableBalance === 0
          }
        >
          {isLoading ? "신청 중..." : "출금 신청하기"}
        </button>
      </div>
    </form>
  );
}
