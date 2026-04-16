"use client";

import { useState } from "react";

export default function PaternityPayCalculator() {
  const [weeklyPay, setWeeklyPay] = useState(500);

  const weeklyStatutory = Math.min(weeklyPay * 0.9, 184.03);
  const total = weeklyStatutory * 2;

  return (
    <div className="app-card-strong p-6 space-y-6">
      <div>
        <label className="app-copy text-sm font-medium">
          Weekly earnings (£)
        </label>
        <input
          type="number"
          value={weeklyPay}
          onChange={(e) => setWeeklyPay(Number(e.target.value))}
          className="app-input mt-2"
        />
      </div>

      <div className="text-xl font-bold app-title">
        Total Paternity Pay (2 weeks): £{total.toFixed(2)}
      </div>
    </div>
  );
}