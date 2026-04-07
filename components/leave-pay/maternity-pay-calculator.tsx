"use client";

import { useMemo, useState } from "react";
import { Baby, CalendarRange, Wallet2 } from "lucide-react";

const SMP_WEEKLY_CAP = 194.32;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function MaternityPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState(650);

  const result = useMemo(() => {
    const firstSixWeekly = averageWeeklyEarnings * 0.9;
    const nextThirtyThreeWeekly = Math.min(
      SMP_WEEKLY_CAP,
      averageWeeklyEarnings * 0.9
    );

    const firstSixTotal = firstSixWeekly * 6;
    const nextThirtyThreeTotal = nextThirtyThreeWeekly * 33;
    const total = firstSixTotal + nextThirtyThreeTotal;

    return {
      firstSixWeekly,
      nextThirtyThreeWeekly,
      firstSixTotal,
      nextThirtyThreeTotal,
      total,
      averageMonthlyEquivalent: total / 9,
    };
  }, [averageWeeklyEarnings]);

  return (
    <section className="app-card-strong rounded-[32px] p-6 sm:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Statutory Maternity Pay</p>
        <h2 className="mt-2 text-3xl font-semibold app-title">
          Maternity pay calculator
        </h2>
        <p className="mt-3 text-sm leading-8 app-copy">
          Estimate SMP using average weekly earnings. This calculator uses the
          standard statutory structure: first 6 weeks at 90% of average weekly
          earnings, then the weekly statutory cap or 90% of earnings,
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

          <div className="mt-5 grid gap-3">
            {[450, 650, 850, 1200].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAverageWeeklyEarnings(value)}
                className="rounded-xl border px-4 py-3 text-sm transition"
                style={{
                  borderColor:
                    averageWeeklyEarnings === value
                      ? "color-mix(in srgb, var(--primary) 28%, var(--line))"
                      : "var(--line)",
                  background:
                    averageWeeklyEarnings === value
                      ? "color-mix(in srgb, var(--primary) 10%, var(--card-soft))"
                      : "var(--card)",
                }}
              >
                Try £{value}/week
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <Baby className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Weeks 1–6
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {formatCurrency(result.firstSixWeekly)}
              </p>
              <p className="mt-2 text-xs app-copy">per week</p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Weeks 7–39
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {formatCurrency(result.nextThirtyThreeWeekly)}
              </p>
              <p className="mt-2 text-xs app-copy">per week</p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <Wallet2 className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Total SMP
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold money-positive">
                {formatCurrency(result.total)}
              </p>
              <p className="mt-2 text-xs app-copy">full 39 weeks</p>
            </div>
          </div>

          <div className="app-card rounded-[26px] p-6 shadow-none">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="app-soft p-4">
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  First 6 weeks total
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  {formatCurrency(result.firstSixTotal)}
                </p>
              </div>

              <div className="app-soft p-4">
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Remaining 33 weeks total
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  {formatCurrency(result.nextThirtyThreeTotal)}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[20px] border border-[var(--line)] bg-[var(--card-soft)] px-4 py-4 text-sm leading-8 app-copy">
              This is the statutory baseline only. Some employers offer enhanced
              maternity packages, so actual workplace pay can be higher than the
              amount shown here.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}