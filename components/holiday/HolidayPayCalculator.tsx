"use client";

import { useState } from "react";

export default function HolidayPayCalculator() {
  const [weeklyPay, setWeeklyPay] = useState(500);

  const holidayPay = weeklyPay * 5.6;

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
        Estimated Annual Holiday Pay: £{holidayPay.toFixed(2)}
      </div>
    </div>
  );
}