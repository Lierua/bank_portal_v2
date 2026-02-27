"use client";

import { useState, useEffect } from "react";

/* =========================
   Types
========================= */

type Props = {
  onChange?: (range: { from: string; to: string }) => void;
  className?: string;
};

/* =========================
   Helpers
========================= */

const formatDateInput = (date: Date) => date.toISOString().split("T")[0];

/* =========================
   Component
========================= */

export default function DateRangePicker({ onChange, className = "" }: Props) {
  const today = new Date();
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);

  const [fromDate, setFromDate] = useState(formatDateInput(twoWeeksAgo));

  const [toDate, setToDate] = useState(formatDateInput(today));

  /* Notify parent when range changes */
  useEffect(() => {
    onChange?.({ from: fromDate, to: toDate });
  }, [fromDate, toDate, onChange]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* FROM */}
      <input
        type="date"
        value={fromDate}
        max={toDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="border border-(--black)/20 rounded px-3 py-1"
      />

      <span className="text-(--black)/50">—</span>

      {/* TO */}
      <input
        type="date"
        value={toDate}
        min={fromDate}
        max={formatDateInput(today)}
        onChange={(e) => setToDate(e.target.value)}
        className="border border-(--black)/20 rounded px-3 py-1"
      />
    </div>
  );
}
