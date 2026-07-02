"use client";

import { useMemo, useState } from "react";

import { formatKoreanDate, formatPoint } from "@pacto/utils";

export type WalletLedgerCategory = "charge" | "locked" | "refund" | "settlement" | "withdrawal";

export type WalletLedgerItem = {
  amount: number;
  campaignId?: number;
  category: WalletLedgerCategory;
  date: string;
  detail: string;
  headline: string;
  id: string;
  tone: "blue" | "green" | "grey" | "red";
  type: "deposit" | "withdrawal" | "locked";
};

type WalletLedgerFilter = "all" | WalletLedgerCategory;

type WalletLedgerProps = {
  items: WalletLedgerItem[];
};

const ledgerFilters: Array<{ key: WalletLedgerFilter; label: string }> = [
  { key: "all", label: "전체" },
  { key: "settlement", label: "정산" },
  { key: "withdrawal", label: "출금" },
  { key: "locked", label: "보류" },
  { key: "refund", label: "환불" },
  { key: "charge", label: "충전" },
];

export function WalletLedger({ items }: WalletLedgerProps) {
  const [selectedFilter, setSelectedFilter] = useState<WalletLedgerFilter>("all");
  const filteredItems = useMemo(
    () =>
      selectedFilter === "all" ? items : items.filter((item) => item.category === selectedFilter),
    [items, selectedFilter],
  );
  const groupedItems = useMemo(() => groupLedgerByDate(filteredItems), [filteredItems]);

  return (
    <>
      <div className="wallet-ledger-filters" aria-label="거래 내역 필터">
        {ledgerFilters.map((filter) => (
          <button
            aria-pressed={selectedFilter === filter.key}
            className={selectedFilter === filter.key ? "active" : undefined}
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="ledger-list wallet-ledger-list">
        {groupedItems.length > 0 ? (
          groupedItems.map((group) => (
            <section className="wallet-ledger-day" key={group.date}>
              <p>{group.date}</p>
              {group.items.map((item) => (
                <article key={item.id}>
                  <div>
                    <span className={`status-dot ${item.tone}`} aria-hidden="true" />
                    <div>
                      <strong>{item.headline}</strong>
                      <p>{item.detail}</p>
                      <small>{getLedgerTypeLabel(item.type)}</small>
                    </div>
                  </div>
                  <strong className={item.amount < 0 ? "negative" : "positive"}>
                    {item.amount < 0 ? "-" : "+"}
                    {formatPoint(Math.abs(item.amount))}
                  </strong>
                </article>
              ))}
            </section>
          ))
        ) : (
          <div className="empty-ledger">
            <p>해당 거래 내역이 아직 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}

function groupLedgerByDate(items: WalletLedgerItem[]) {
  const groups = new Map<string, WalletLedgerItem[]>();

  items.forEach((item) => {
    const date = formatKoreanDate(item.date);
    const groupItems = groups.get(date) ?? [];
    groupItems.push(item);
    groups.set(date, groupItems);
  });

  return Array.from(groups, ([date, groupItems]) => ({
    date,
    items: groupItems,
  }));
}

function getLedgerTypeLabel(type: WalletLedgerItem["type"]) {
  switch (type) {
    case "deposit":
      return "입금";
    case "withdrawal":
      return "출금";
    case "locked":
      return "보류";
  }
}
