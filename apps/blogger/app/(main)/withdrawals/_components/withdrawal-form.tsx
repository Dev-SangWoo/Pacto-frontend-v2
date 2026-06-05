"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestWithdraw } from "@pacto/api";
import { formatPoint } from "@pacto/utils";

type WithdrawalFormProps = {
  accessToken?: string;
  availableBalance: number;
};

export function WithdrawalForm({ accessToken, availableBalance }: WithdrawalFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount <= 0 || amount > availableBalance) {
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
          amount,
          bankName,
          accountNumber,
        },
        accessToken,
      );

      alert("출금 신청이 완료되었습니다.");
      router.push("/wallet");
      router.refresh();
    } catch (error) {
      console.error("출금 실패:", error);
      alert("출금 신청 중 오류가 발생했습니다. 잔액을 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="section-block" onSubmit={handleSubmit}>
      <div className="section-head">
        <div>
          <p className="section-label">신청 정보</p>
          <h2>출금 신청서</h2>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem" }}>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#666",
            }}
          >
            출금할 금액 (최대 {formatPoint(availableBalance)})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="금액을 입력하세요"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #ddd",
            }}
            required
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#666",
            }}
          >
            은행명
          </label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="예: 국민은행"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #ddd",
            }}
            required
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#666",
            }}
          >
            계좌번호
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="'-' 없이 입력"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #ddd",
            }}
            required
          />
        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={isLoading || availableBalance === 0}
          style={{ marginTop: "1rem" }}
        >
          {isLoading ? "신청 중..." : "출금 신청하기"}
        </button>
      </div>
    </form>
  );
}
