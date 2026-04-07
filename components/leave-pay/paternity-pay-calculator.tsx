"use client";

import { useMemo, useState } from "react";
import { Baby, CalendarDays, Wallet2 } from "lucide-react";

const SPP_WEEKLY_CAP = 194.32;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PaternityPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState(650);
  const [weeksTaken, setWeeksTaken] = useState(2);

  const result = useMemo(() => {
    const weeklyPay = Math.min(SPP_WEEKLY_CAP, averageWeeklyEarnings * 0.9);
    const total = weeklyPay * weeksTaken;

    return {
      weeklyPay,
      total,
    };
  }, [averageWeeklyEarnings, weeksTaken]);

  return (
    <section className="app-card-strong rounded-[32px] p-6 sm:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Statutory Paternity Pay</p>
        <h2 className="mt-2 text-3xl font-semibold app-title">
          Paternity pay calculator
        </h2>
        <p className="mt-3 text-sm leading-8 app-copy">
          Estimate SPP based on average weekly earnings and the number of weeks
          taken. The statutory weekly rate is the cap or 90% of average weekly
          earnings, whichever is lower.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="app-soft p-5">
          <label className="mb-2 block text-sm font-medium app-title">
            Average weekly earnings
          </label>
          <input
            type="number"
            value={averageWeeklyEarnings}
            onChange={(e) => setAverageWeeklyEarnings(Number(e.target.value) || 0)}
            className="app-input"
          />

          <label className="mb-2 mt-5 block text-sm font-medium app-title">
            Weeks taken
          </label>
          <select
            value={weeksTaken}
            onChange={(e) => setWeeksTaken(Number(e.target.value) || 1)}
            className="app-input"
          >
            <option value={1}>1 week</option>
            <option value={2}>2 weeks</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <Baby className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Weekly pay
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {formatCurrency(result.weeklyPay)}
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Weeks selected
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {weeksTaken}
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <Wallet2 className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Total SPP
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold money-positive">
                {formatCurrency(result.total)}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--line)] bg-[var(--card-soft)] px-5 py-5 text-sm leading-8 app-copy">
            This is the statutory baseline. Employer paternity packages can be
            more generous, so the actual amount can be higher than this estimate.
          </div>
        </div>
      </div>
    </section>
  );
}