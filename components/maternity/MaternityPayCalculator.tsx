"use client";

import { useState } from "react";

export default function MaternityPayCalculator() {
  const [weeklyPay, setWeeklyPay] = useState(500);

  const first6Weeks = weeklyPay * 0.9 * 6;
  const statutoryWeekly = Math.min(weeklyPay * 0.9, 184.03); // approx UK SMP cap
  const remainingWeeks = statutoryWeekly * 33;

  const total = first6Weeks + remainingWeeks;

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

      <div className="space-y-2">
        <p className="app-title font-semibold">
          First 6 weeks (90%): £{first6Weeks.toFixed(2)}
        </p>
        <p className="app-title font-semibold">
          Remaining 33 weeks: £{remainingWeeks.toFixed(2)}
        </p>
      </div>

      <div className="text-xl font-bold app-title">
        Total Estimated Pay: £{total.toFixed(2)}
      </div>
    </div>
  );
}