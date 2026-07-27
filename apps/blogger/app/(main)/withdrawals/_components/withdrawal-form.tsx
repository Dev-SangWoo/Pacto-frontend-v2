"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, requestWithdraw } from "@pacto/api";
import { formatPoint } from "@pacto/utils";

import { KOREAN_BANKS } from "../../../_lib/banks";

type WithdrawalFormProps = {
  accessToken?: string;
  availableBalance: number;
};

export function WithdrawalForm({ accessToken, availableBalance }: WithdrawalFormProps) {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
      await requestWithdraw(
        {
          amount: numericAmount,
          bankName,
          accountNumber,
        },
        accessToken,
      );

      alert("출금 신청이 완료되었습니다.");
      router.push("/wallet");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 401) {
        router.push("/logout?reason=session-expired");
        return;
      }

      if (error instanceof ApiError && error.statusCode === 403) {
        router.push("/forbidden");
        return;
      }

      console.error("출금 실패:", error);
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
          className="primary-button"
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
