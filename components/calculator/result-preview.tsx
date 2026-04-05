import {
  ArrowRightLeft,
  CircleDollarSign,
  PiggyBank,
  ReceiptText,
  TrendingDown,
  Wallet2,
} from "lucide-react";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { TakeHomeResult, CalculatorInput } from "../../types/tax";

type ResultPreviewProps = {
  result: TakeHomeResult;
  values: CalculatorInput;
};

export default function ResultPreview({
  result,
  values,
}: ResultPreviewProps) {
  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const deductionPercent = 100 - keepPercent;

  const bars = [
    {
      label: "Income Tax",
      value: result.incomeTaxAnnual,
      color: "bg-sky-500",
      text: "text-sky-700 dark:text-sky-300",
    },
    {
      label: "National Insurance",
      value: result.nationalInsuranceAnnual,
      color: "bg-cyan-500",
      text: "text-cyan-700 dark:text-cyan-300",
    },
    {
      label: "Pension",
      value: result.pensionAnnual,
      color: "bg-emerald-500",
      text: "text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Student Loan",
      value: result.studentLoanAnnual,
      color: "bg-rose-500",
      text: "text-rose-700 dark:text-rose-300",
    },
  ].filter((item) => item.value > 0);

  const biggestDeduction = [...bars].sort((a, b) => b.value - a.value)[0];

  const insightCards = [
    {
      icon: CircleDollarSign,
      label: "Take-home per year",
      value: formatCurrency(result.netAnnual),
    },
    {
      icon: ReceiptText,
      label: "Take-home per month",
      value: formatCurrency(result.netMonthly),
    },
    {
      icon: PiggyBank,
      label: "Total deductions",
      value: formatCurrency(totalDeductions),
    },
  ];

  const scenarioLabel =
    values.region === "scotland"
      ? "Scotland rules applied"
      : "England, Wales, NI rules";

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_-36px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(14,165,233,0.10), transparent 30%), radial-gradient(circle at bottom left, rgba(16,185,129,0.08), transparent 28%)",
          }}
        />

        <div className="relative flex flex-col gap-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Your real answer
              </p>

              <h3 className="mt-3 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
                {formatCurrency(result.netAnnual)}
              </h3>

              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                {formatCurrency(result.netMonthly)} per month after deductions
              </p>
            </div>

            <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-right dark:border-emerald-900 dark:bg-emerald-950/40">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                You keep
              </p>
              <p className="mt-1 text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                {keepPercent.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/90 px-5 py-5 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-slate-900 p-2 text-white dark:bg-slate-100 dark:text-slate-900">
                <Wallet2 className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Salary reality
                </p>
                <p className="mt-2 text-sm leading-8 text-slate-600 dark:text-slate-400">
                  For your salary, you keep{" "}
                  <strong className="text-slate-900 dark:text-slate-100">
                    {keepPercent.toFixed(0)}%
                  </strong>{" "}
                  and lose{" "}
                  <strong className="text-slate-900 dark:text-slate-100">
                    {formatCurrency(totalDeductions)}
                  </strong>{" "}
                  each year to deductions.
                  {biggestDeduction ? (
                    <>
                      {" "}
                      Your biggest pressure point is{" "}
                      <strong className="text-slate-900 dark:text-slate-100">
                        {biggestDeduction.label}
                      </strong>
                      .
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {insightCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-slate-200 bg-white/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
                      <Icon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Salary split
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  A visual of what reaches you versus what leaves as deductions
                </p>
              </div>

              <div className="rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                {scenarioLabel}
              </div>
            </div>

            <div className="mt-5 h-6 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="flex h-full w-full">
                <div
                  className="h-full bg-emerald-500 transition-all duration-700"
                  style={{ width: `${keepPercent}%` }}
                />
                <div
                  className="h-full bg-sky-500/85 transition-all duration-700"
                  style={{ width: `${Math.max(deductionPercent, 0)}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Take-home kept</span>
              <span>Deductions lost</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Deduction pressure
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Which deductions are shaping your result most right now
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <ArrowRightLeft className="h-3.5 w-3.5" />
            Live preview
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {bars.length > 0 ? (
            bars.map((item) => {
              const width =
                result.grossAnnual > 0 ? (item.value / result.grossAnnual) * 100 : 0;

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className={`text-sm font-medium ${item.text}`}>
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(item.value)}
                    </span>
                  </div>

                  <div className="h-3.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-700`}
                      style={{ width: `${Math.max(width, 3)}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              No visible additional deduction pressure is being shown beyond your
              standard net pay flow.
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Gross salary
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(result.grossAnnual)}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-rose-500" />
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Estimated total deducted
              </p>
            </div>

            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(totalDeductions)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}