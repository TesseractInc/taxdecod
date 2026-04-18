"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock3, Scale, Wallet2, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/tax/utils/currency";
import ToolInsightPanel from "@/components/shared/tool-insight-panel";

function estimateOvertimeTakeHome(
  hourlyRate: number,
  overtimeHours: number,
  multiplier: number,
  baseSalary: number
) {
  const grossOvertime = hourlyRate * overtimeHours * multiplier;
  const keepRate = baseSalary >= 50000 ? 0.56 : 0.68;

  return {
    grossOvertime,
    netOvertime: grossOvertime * keepRate,
    deductions: grossOvertime * (1 - keepRate),
    keepRate,
  };
}

function getHeadline(keepRate: number, overtimeHours: number) {
  if (overtimeHours <= 0) {
    return "Add overtime hours to see what the extra work may really leave you with";
  }
  if (keepRate >= 0.7) {
    return "This overtime should still retain a solid share after deductions";
  }
  if (keepRate >= 0.58) {
    return "This overtime should feel useful, but the deduction drag is noticeable";
  }
  return "This overtime may feel weaker than the extra hours suggest on paper";
}

function getBody(
  grossOvertime: number,
  netOvertime: number,
  keepRate: number,
  overtimeHours: number
) {
  if (overtimeHours <= 0) {
    return "This tool is best for judging whether extra hours are really worth the effort after deductions.";
  }

  if (keepRate >= 0.7) {
    return `An estimated gross overtime amount of ${formatCurrency(
      grossOvertime
    )} still leaves a fairly visible take-home result of around ${formatCurrency(
      netOvertime
    )}.`;
  }

  if (keepRate >= 0.58) {
    return `An estimated gross overtime amount of ${formatCurrency(
      grossOvertime
    )} should still help, but enough is being lost to deductions that the net result can feel smaller than many users expect.`;
  }

  return `An estimated gross overtime amount of ${formatCurrency(
    grossOvertime
  )} may translate into a much weaker take-home result of around ${formatCurrency(
    netOvertime
  )}. This is the kind of case where extra hours deserve a more deliberate decision.`;
}

export default function OvertimeCalculator() {
  const [baseSalary, setBaseSalary] = useState(32000);
  const [hourlyRate, setHourlyRate] = useState(18);
  const [overtimeHours, setOvertimeHours] = useState(10);
  const [multiplier, setMultiplier] = useState(1.5);

  const result = useMemo(
    () =>
      estimateOvertimeTakeHome(
        hourlyRate,
        overtimeHours,
        multiplier,
        baseSalary
      ),
    [hourlyRate, overtimeHours, multiplier, baseSalary]
  );

  const insights = useMemo(
    () => [
      {
        title: getHeadline(result.keepRate, overtimeHours),
        description: getBody(
          result.grossOvertime,
          result.netOvertime,
          result.keepRate,
          overtimeHours
        ),
        tone:
          result.keepRate >= 0.7
            ? ("positive" as const)
            : result.keepRate < 0.58
            ? ("warning" as const)
            : ("neutral" as const),
      },
      {
        title: "What to compare this against",
        description:
          "If the net overtime reward feels weak, compare it against a higher base salary or another income route before assuming more hours is automatically the best option.",
        tone: "neutral" as const,
      },
    ],
    [result, overtimeHours]
  );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.30)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <p className="text-sm font-medium app-accent">Extra-hours impact</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                See what overtime may actually leave you with
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 app-copy sm:text-base">
                This tool estimates whether extra hours are likely to feel worthwhile
                once deductions reduce the gross overtime figure.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border app-card p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] app-subtle">
                  Best use
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  Overtime take-home estimate
                </p>
              </div>

              <div className="rounded-[24px] border app-card p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] app-subtle">
                  Best next step
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  Compare with higher base pay
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[0.94fr_1.06fr]">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 xl:border-b-0 xl:border-r xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 1</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                Enter the overtime setup
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                Use your approximate hourly rate, overtime hours, and multiplier to estimate the extra take-home.
              </p>
            </div>

            <div className="rounded-[30px] border app-card p-6 sm:p-7">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Base salary
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      value={baseSalary}
                      onChange={(e) => setBaseSalary(Number(e.target.value) || 0)}
                      className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Hourly rate
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                      className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Overtime hours
                  </label>
                  <input
                    type="number"
                    value={overtimeHours}
                    onChange={(e) => setOvertimeHours(Number(e.target.value) || 0)}
                    className="app-input h-[56px]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Overtime multiplier
                  </label>
                  <select
                    value={multiplier}
                    onChange={(e) => setMultiplier(Number(e.target.value))}
                    className="app-input h-[56px]"
                  >
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
              </div>

              <div
                className="mt-5 rounded-[22px] border px-4 py-4"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-semibold app-title">
                  Why overtime often disappoints
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  The gross overtime figure can look motivating, but the net result is what determines whether the extra hours really feel worthwhile.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 px-6 py-6 dark:bg-slate-900/40 xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 2</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                Read the extra-hours impact
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                This is designed to show how much the extra work may actually feel like after deductions.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-[30px] border app-card p-6">
                <p className="text-sm font-medium app-accent">Interpretation</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight app-title sm:text-3xl">
                  {getHeadline(result.keepRate, overtimeHours)}
                </h3>
                <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
                  {getBody(
                    result.grossOvertime,
                    result.netOvertime,
                    result.keepRate,
                    overtimeHours
                  )}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <Clock3 className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Gross overtime</p>
                  <p className="mt-2 text-xl font-semibold app-title">
                    {formatCurrency(result.grossOvertime)}
                  </p>
                </div>

                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <Wallet2 className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Estimated net overtime</p>
                  <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(result.netOvertime)}
                  </p>
                </div>

                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <TrendingUp className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Lost to deductions</p>
                  <p className="mt-2 text-xl font-semibold app-title">
                    {formatCurrency(result.deductions)}
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border app-card px-5 py-5">
                <p className="text-sm font-semibold app-title">Keep rate</p>
                <p className="mt-2 text-2xl font-semibold app-title">
                  {(result.keepRate * 100).toFixed(0)}%
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  This is the rough share of overtime estimated to remain after deductions in this setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolInsightPanel title="Overtime reading" insights={insights} />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/compare-salary"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare with higher salary
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Useful when the better question is more hours versus better base pay.
          </p>
        </Link>

        <Link
          href="/calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Open salary calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Return to the broader salary route for full take-home context.
          </p>
        </Link>

        <Link
          href="/bonus-tax-calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare with bonus pay
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Helpful when extra money could come from either route and you want clearer context.
          </p>
        </Link>
      </section>
    </div>
  );
}