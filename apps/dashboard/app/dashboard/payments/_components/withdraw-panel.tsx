"use client";

import { useState } from "react";
import { requestWithdraw } from "@pacto/api";
import { formatPoint } from "@pacto/utils";

type WithdrawPanelProps = {
  accessToken?: string;
  availableBalance: number;
};

export function WithdrawPanel({ accessToken, availableBalance }: WithdrawPanelProps) {
  const [amount, setAmount] = useState<number>(0);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount <= 0 || amount > availableBalance) {
      alert("출금 가능 금액 내에서 입력해 주세요.");
      return;
    }

    if (!bankName || !accountNumber) {
      alert("계좌 정보를 입력해 주세요.");
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
      window.location.reload();
    } catch (error) {
      console.error("출금 실패:", error);
      alert("출금 신청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="panel">
      <div className="panel-heading">
        <div>
          <h2>출금 신청</h2>
          <p>사용 가능한 잔액을 계좌로 인출합니다.</p>
        </div>
      </div>
      <form
        onSubmit={handleWithdraw}
        className="panel-body"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div className="input-group">
          <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            출금 금액
          </label>
          <input
            type="number"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder={`최대 ${formatPoint(availableBalance)}`}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              은행명
            </label>
            <input
              type="text"
              className="input-field"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="예: 신한은행"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              계좌번호
            </label>
            <input
              type="text"
              className="input-field"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="'-' 없이 입력"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="primary-button"
          disabled={isLoading || availableBalance === 0}
          style={{ width: "100%", padding: "0.75rem" }}
        >
          {isLoading ? "처리 중..." : "출금하기"}
        </button>
      </form>
    </article>
  );
}
