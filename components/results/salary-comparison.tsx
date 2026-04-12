"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, TrendingUp } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function SalaryComparison({
  values,
  currentResult,
}: {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
}) {
  const [comparisonSalary, setComparisonSalary] = useState(
    values.payPeriod === "monthly" ? 4000 : 45000
  );

  const comparisonInput: CalculatorInput = {
    ...values,
    salary: comparisonSalary,
  };

  const comparisonResult = useMemo(
    () => calculateTakeHome(comparisonInput),
    [comparisonInput]
  );

  const grossComparisonAnnual =
    values.payPeriod === "monthly" ? comparisonSalary * 12 : comparisonSalary;

  const currentGrossAnnual =
    values.payPeriod === "monthly" ? values.salary * 12 : values.salary;

  const grossDifference = grossComparisonAnnual - currentGrossAnnual;
  const netAnnualDifference = comparisonResult.netAnnual - currentResult.netAnnual;
  const netMonthlyDifference =
    comparisonResult.netMonthly - currentResult.netMonthly;

  const taxDrag =
    grossDifference !== 0
      ? Math.abs(grossDifference) - Math.abs(netAnnualDifference)
      : 0;

  const keepPercent =
    grossDifference !== 0
      ? (Math.abs(netAnnualDifference) / Math.abs(grossDifference)) * 100
      : 0;

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Salary comparison
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Test whether another salary really changes the outcome
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            This comparison is designed to answer the question that matters most:
            what changes in take-home pay, not just what changes in gross salary.
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[0.92fr_1.08fr] sm:p-7">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-950">
              <ArrowRightLeft className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Comparison salary
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Enter another salary to compare against the current reading
              </p>
            </div>
          </div>

          <div className="relative mt-5">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
              £
            </span>
            <input
              type="number"
              value={comparisonSalary}
              onChange={(e) => setComparisonSalary(Number(e.target.value) || 0)}
              className="app-input h-[72px] rounded-[22px] pl-12 text-2xl font-semibold"
            />
          </div>

          <div className="mt-5 grid gap-3">
            <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Comparison monthly take-home
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(comparisonResult.netMonthly)}
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Comparison annual take-home
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(comparisonResult.netAnnual)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Net difference
              </p>
              <h3
                className={`mt-3 text-4xl font-bold tracking-tight sm:text-5xl ${
                  netAnnualDifference >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {netAnnualDifference >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(netAnnualDifference))}
              </h3>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                {netMonthlyDifference >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(netMonthlyDifference))} per month
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
              <TrendingUp className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Gross difference
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {grossDifference >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(grossDifference))}
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                You keep
              </p>
              <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                {grossDifference !== 0 ? `${keepPercent.toFixed(0)}%` : "—"}
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Lost to drag
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {grossDifference !== 0 ? formatCurrency(Math.max(taxDrag, 0)) : "—"}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm leading-8 text-slate-600 dark:text-slate-400">
              {netAnnualDifference > 0 ? (
                <>
                  This comparison adds about{" "}
                  <strong className="text-slate-900 dark:text-slate-100">
                    {formatCurrency(Math.abs(netMonthlyDifference))}
                  </strong>{" "}
                  more per month after deductions.
                </>
              ) : netAnnualDifference < 0 ? (
                <>
                  This comparison reduces take-home pay by about{" "}
                  <strong className="text-slate-900 dark:text-slate-100">
                    {formatCurrency(Math.abs(netMonthlyDifference))}
                  </strong>{" "}
                  per month.
                </>
              ) : (
                <>Both salary scenarios produce roughly the same take-home result.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}