import { ArrowRightLeft, CircleDollarSign, PiggyBank, ReceiptText } from "lucide-react";
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
  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const deductionPercent = 100 - keepPercent;

  const bars = [
    {
      label: "Income Tax",
      value: result.incomeTaxAnnual,
      color: "bg-sky-500",
    },
    {
      label: "National Insurance",
      value: result.nationalInsuranceAnnual,
      color: "bg-cyan-500",
    },
    {
      label: "Pension",
      value: result.pensionAnnual,
      color: "bg-emerald-500",
    },
    {
      label: "Student Loan",
      value: result.studentLoanAnnual,
      color: "bg-rose-500",
    },
  ].filter((item) => item.value > 0);

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
      value: formatCurrency(
        result.incomeTaxAnnual +
          result.nationalInsuranceAnnual +
          result.pensionAnnual +
          result.studentLoanAnnual
      ),
    },
  ];

  const scenarioLabel =
    values.region === "scotland" ? "Scotland rules applied" : "England, Wales, NI rules";

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Estimated take-home pay
            </p>
            <h3 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {formatCurrency(result.netAnnual)}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {formatCurrency(result.netMonthly)} per month after deductions
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-right dark:bg-emerald-950/40">
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              You keep
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {keepPercent.toFixed(0)}%
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {insightCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 dark:bg-slate-950">
                    <Icon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
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

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Salary split
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                A quick visual of what you keep versus what gets deducted
              </p>
            </div>

            <div className="rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-300">
              {scenarioLabel}
            </div>
          </div>

          <div className="mt-5 h-5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="flex h-full w-full">
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${keepPercent}%` }}
              />
              <div
                className="h-full bg-sky-500/80 transition-all duration-700"
                style={{ width: `${Math.max(deductionPercent, 0)}%` }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Kept as take-home pay</span>
            <span>Deductions</span>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Deduction breakdown
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              This shows which deductions are shaping your real pay most.
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
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(item.value)}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
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
              No active deductions beyond the standard net pay flow are being shown here.
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Gross salary
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(result.grossAnnual)}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Estimated total deducted
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(
                result.incomeTaxAnnual +
                  result.nationalInsuranceAnnual +
                  result.pensionAnnual +
                  result.studentLoanAnnual
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}