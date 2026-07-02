"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { formatKoreanDate, formatPoint } from "@pacto/utils";

import type { WalletLedgerItem } from "./wallet-ledger";

type WalletSummaryProps = {
  availableBalance: number;
  latestSettlement?: WalletLedgerItem;
  lockedBalance: number;
  lockedItems: WalletLedgerItem[];
  updatedAt: string;
};

export function WalletSummary({
  availableBalance,
  latestSettlement,
  lockedBalance,
  lockedItems,
  updatedAt,
}: WalletSummaryProps) {
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);
  const sortedLockedItems = useMemo(
    () =>
      [...lockedItems].sort(
        (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime(),
      ),
    [lockedItems],
  );

  return (
    <section className="wallet-hero" aria-labelledby="wallet-title">
      <div className="wallet-brief">
        <p className="section-label">내 지갑</p>
        <h1 id="wallet-title">출금 가능 잔액</h1>
        <strong>{formatPoint(availableBalance)}</strong>
        <p>{formatKoreanDate(updatedAt)} 기준으로 바로 출금할 수 있는 금액이에요.</p>
      </div>
      <div className="wallet-hero-meta" aria-label="지갑 요약">
        <button type="button" onClick={() => setIsLockedModalOpen(true)}>
          보류 중 <strong>{formatPoint(lockedBalance)}</strong>
          <em>검수 또는 정산 처리 중인 금액</em>
        </button>
        {latestSettlement?.campaignId == null ? (
          <span>
            최근 정산 <strong>{latestSettlement?.headline ?? "아직 없음"}</strong>
            <em>
              {latestSettlement == null
                ? "완료된 정산이 생기면 표시돼요."
                : latestSettlement.detail}
            </em>
          </span>
        ) : (
          <Link href={`/campaigns/${latestSettlement.campaignId}`}>
            최근 정산 <strong>{latestSettlement.headline}</strong>
            <em>{latestSettlement.detail}</em>
          </Link>
        )}
      </div>

      {isLockedModalOpen ? (
        <div
          aria-labelledby="locked-wallet-title"
          aria-modal="true"
          className="wallet-modal-backdrop"
          role="dialog"
        >
          <div className="wallet-modal">
            <div className="wallet-modal-head">
              <div>
                <p className="section-label">보류 중 내역</p>
                <h2 id="locked-wallet-title">{formatPoint(lockedBalance)}</h2>
              </div>
              <button
                aria-label="보류 중 내역 닫기"
                onClick={() => setIsLockedModalOpen(false)}
                type="button"
              >
                닫기
              </button>
            </div>
            <div className="wallet-modal-list">
              {sortedLockedItems.length > 0 ? (
                sortedLockedItems.map((item) => (
                  <article key={item.id}>
                    <div>
                      <strong>{item.headline}</strong>
                      <p>
                        {item.detail} · {formatKoreanDate(item.date)}
                      </p>
                    </div>
                    <strong>{formatPoint(Math.abs(item.amount))}</strong>
                  </article>
                ))
              ) : (
                <div className="empty-ledger">
                  <p>보류 중인 거래 내역이 아직 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
