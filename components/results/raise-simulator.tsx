"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  ChevronRight,
  Info,
  LineChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

const raisePresets = [1000, 3000, 5000, 10000, 15000];

function clampRaise(value: number) {
  if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
  return Math.min(Math.max(0, value), 100000);
}

export default function RaiseSimulator({
  values,
  currentResult,
}: {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
}) {
  const [raiseAmount, setRaiseAmount] = useState(5000);

  const safeRaiseAmount = clampRaise(raiseAmount);

  const currentGrossAnnual =
    values.payPeriod === "monthly" ? values.salary * 12 : values.salary;
  const newSalary = currentGrossAnnual + safeRaiseAmount;

  const newInput: CalculatorInput = {
    ...values,
    salary: values.payPeriod === "monthly" ? newSalary / 12 : newSalary,
  };

  const raisedResult = useMemo(() => calculateTakeHome(newInput), [newInput]);

  const extraNetAnnual = Math.max(
    0,
    raisedResult.netAnnual - currentResult.netAnnual,
  );
  const extraNetMonthly = Math.max(
    0,
    raisedResult.netMonthly - currentResult.netMonthly,
  );
  const extraTaxAnnual = Math.max(
    0,
    (raisedResult.totalDeductionsAnnual || 0) -
      (currentResult.totalDeductionsAnnual || 0),
  );

  const keepPercent =
    safeRaiseAmount > 0 ? (extraNetAnnual / safeRaiseAmount) * 100 : 0;
  const taxPercent =
    safeRaiseAmount > 0 ? (extraTaxAnnual / safeRaiseAmount) * 100 : 0;

  const netGainWidth =
    safeRaiseAmount > 0
      ? Math.min((extraNetAnnual / safeRaiseAmount) * 100, 100)
      : 0;
  const deductionsWidth =
    safeRaiseAmount > 0
      ? Math.min((extraTaxAnnual / safeRaiseAmount) * 100, 100)
      : 0;

  const recommendation =
    keepPercent >= 72
      ? "This jump is relatively efficient. A strong share of the raise reaches your take-home pay."
      : keepPercent >= 58
        ? "This raise still moves your monthly reality well, but deductions absorb a meaningful part of it."
        : "This raise improves net pay, but a large slice is lost to deductions. Compare nearby salary levels before deciding.";

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="relative border-b border-slate-200 px-5 py-6 dark:border-slate-800 sm:px-6 sm:py-7 lg:px-7">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,165,233,0.08), rgba(14,165,233,0))",
          }}
        />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300">
              <LineChart className="h-3.5 w-3.5" />
              Salary progression simulator
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              See what a salary jump really changes after tax
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              TaxDecod turns a possible raise into take-home reality, so users
              can see the real gain, the deduction drag, and the smarter next
              move.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[420px] lg:min-w-[420px]">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Current net
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
                {formatCurrency(currentResult.netMonthly)}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                monthly take-home now
              </p>
            </div>

            <div className="rounded-[22px] border border-emerald-200 bg-emerald-50/80 px-4 py-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                New net
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald-700 dark:text-emerald-300 sm:text-xl">
                {formatCurrency(raisedResult.netMonthly)}
              </p>
              <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-300/80">
                monthly after the raise
              </p>
            </div>

            <div className="rounded-[22px] border border-violet-200 bg-violet-50/80 px-4 py-4 dark:border-violet-900/60 dark:bg-violet-950/20">
              <p className="text-[11px] uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                Monthly gain
              </p>
              <p className="mt-2 text-lg font-semibold text-violet-700 dark:text-violet-300 sm:text-xl">
                {formatCurrency(extraNetMonthly)}
              </p>
              <p className="mt-1 text-xs text-violet-700/80 dark:text-violet-300/80">
                what actually lands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6 lg:p-7">
        <div className="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-950">
              <TrendingUp className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Test a salary increase
              </p>
              <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                Adjust the yearly raise amount to compare gross movement against
                real take-home change.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Raise amount
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                yearly increase
              </span>
            </div>

            <div className="relative mt-3">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                £
              </span>
              <input
                type="number"
                inputMode="numeric"
                value={safeRaiseAmount}
                onChange={(e) =>
                  setRaiseAmount(clampRaise(Number(e.target.value) || 0))
                }
                className="app-input h-[64px] rounded-[20px] pl-12 text-2xl font-semibold sm:h-[72px] sm:rounded-[22px]"
              />
            </div>

            <input
              type="range"
              min={0}
              max={30000}
              step={500}
              value={safeRaiseAmount}
              onChange={(e) => setRaiseAmount(clampRaise(Number(e.target.value)))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-sky-500 dark:bg-slate-800"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {raisePresets.map((preset) => {
                const active = safeRaiseAmount === preset;

                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRaiseAmount(preset)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                      active
                        ? "border-sky-500 bg-sky-500 text-white shadow-[0_10px_24px_rgba(14,165,233,0.22)]"
                        : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:text-sky-300"
                    }`}
                  >
                    +{formatCurrency(preset)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Current gross salary
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(currentGrossAnnual)}
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                New gross salary
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(newSalary)}
              </p>
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 text-sky-600 dark:text-sky-400" />
              <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
                Based on current UK tax rules used by this calculator. This is
                an estimate for decision-making, not an HMRC decision or payroll
                instruction.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/80 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Progression outcome
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 sm:text-5xl">
                {formatCurrency(extraNetAnnual)}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                extra take-home per year from a {formatCurrency(safeRaiseAmount)}{" "}
                raise
              </p>
            </div>

            <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right dark:border-slate-800 dark:bg-slate-900 sm:block">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                You keep
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {keepPercent.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] border border-emerald-200 bg-emerald-50/80 px-4 py-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                Extra per month
              </p>
              <p className="mt-2 text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                {formatCurrency(extraNetMonthly)}
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                You keep
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {keepPercent.toFixed(0)}%
              </p>
            </div>

            <div className="rounded-[22px] border border-rose-200 bg-rose-50/80 px-4 py-4 dark:border-rose-900/60 dark:bg-rose-950/20">
              <p className="text-[11px] uppercase tracking-[0.14em] text-rose-700 dark:text-rose-300">
                Extra deductions
              </p>
              <p className="mt-2 text-xl font-semibold text-rose-700 dark:text-rose-300">
                {formatCurrency(extraTaxAnnual)}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70 sm:px-5 sm:py-5">
            <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              <span>Raise split</span>
              <span>{formatCurrency(safeRaiseAmount)}</span>
            </div>

            <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="flex h-full w-full overflow-hidden rounded-full">
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${Math.max(
                      netGainWidth,
                      safeRaiseAmount > 0 ? 6 : 0,
                    )}%`,
                  }}
                />
                <div
                  className="h-full bg-rose-500"
                  style={{
                    width: `${Math.max(
                      deductionsWidth,
                      safeRaiseAmount > 0 ? 6 : 0,
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                  Reaches take-home
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(extraNetAnnual)}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {keepPercent.toFixed(0)}% of the raise
                </p>
              </div>

              <div className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.12em] text-rose-700 dark:text-rose-300">
                  Lost to deductions
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(extraTaxAnnual)}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {taxPercent.toFixed(0)}% of the raise
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-sky-200 bg-sky-50/70 px-4 py-4 dark:border-sky-900/50 dark:bg-sky-950/20 sm:px-5 sm:py-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white/90 p-2.5 shadow-sm dark:bg-slate-950/70">
                <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Smart read
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {recommendation}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-sky-600 dark:text-sky-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Best next action
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    Use this result to compare nearby salary levels or reverse
                    engineer the take-home number you actually want.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/compare-salary"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-sky-800 dark:hover:text-sky-300"
                >
                  Compare salary
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/reverse-tax"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-sky-800 dark:hover:text-sky-300"
                >
                  Reverse calculator
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-violet-200 bg-violet-50/80 px-4 py-4 dark:border-violet-900/60 dark:bg-violet-950/20">
              <div className="flex items-start gap-3">
                <Bookmark className="mt-0.5 h-4 w-4 text-violet-700 dark:text-violet-300" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Save this scenario later
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    This progression block is now ready for the upcoming login +
                    saved scenarios system without changing the current flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}