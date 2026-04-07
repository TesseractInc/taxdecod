"use client";

import { useMemo, useState } from "react";
import { CalendarRange, HeartPulse, Wallet2 } from "lucide-react";

const SSP_WEEKLY_CAP = 123.25;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function SickPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState(500);
  const [weeksOff, setWeeksOff] = useState(4);

  const result = useMemo(() => {
    const weeklyPay = Math.min(SSP_WEEKLY_CAP, averageWeeklyEarnings * 0.8);
    const total = weeklyPay * weeksOff;

    return {
      weeklyPay,
      total,
      monthlyEquivalent: total / (weeksOff / 4 || 1),
    };
  }, [averageWeeklyEarnings, weeksOff]);

  return (
    <section className="app-card-strong rounded-[32px] p-6 sm:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Statutory Sick Pay</p>
        <h2 className="mt-2 text-3xl font-semibold app-title">
          Sick pay calculator
        </h2>
        <p className="mt-3 text-sm leading-8 app-copy">
          Estimate SSP using the current weekly structure from 6 April 2026:
          80% of average weekly earnings or the statutory weekly cap,
          whichever is lower.
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
            Weeks off sick
          </label>
          <input
            type="number"
            value={weeksOff}
            onChange={(e) => setWeeksOff(Number(e.target.value) || 0)}
            className="app-input"
          />
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Weekly SSP
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {formatCurrency(result.weeklyPay)}
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Weeks selected
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {weeksOff}
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <Wallet2 className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Total SSP
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold money-positive">
                {formatCurrency(result.total)}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--line)] bg-[var(--card-soft)] px-5 py-5 text-sm leading-8 app-copy">
            This is the statutory minimum only. Some employers offer occupational
            sick pay that is higher than SSP, so this estimate should be treated
            as the baseline rather than the full workplace policy.
          </div>
        </div>
      </div>
    </section>
  );
}