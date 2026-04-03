import { formatCurrency } from "../../lib/tax/utils/currency";
import { TakeHomeResult } from "../../types/tax";

type ResultPreviewProps = {
  result: TakeHomeResult;
};

export default function ResultPreview({ result }: ResultPreviewProps) {
  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const bars = [
    {
      label: "Income Tax",
      value: result.incomeTaxAnnual,
      color: "bg-sky-500",
    },
    {
      label: "NI",
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

  return (
    <div className="app-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Estimated take-home
          </p>
          <h3 className="mt-2 text-4xl font-bold tracking-tight app-title">
            {formatCurrency(result.netAnnual)}
          </h3>
          <p className="mt-2 text-sm app-copy">
            {formatCurrency(result.netMonthly)} per month after deductions
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          You keep {keepPercent.toFixed(0)}%
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="app-copy">Gross salary</span>
          <span className="font-medium app-title">
            {formatCurrency(result.grossAnnual)}
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-sky-500 transition-all duration-700"
            style={{ width: `${keepPercent}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-xs app-subtle">
          <span>Kept in net pay</span>
          <span>{keepPercent.toFixed(1)}%</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {bars.map((item) => {
          const width =
            result.grossAnnual > 0 ? (item.value / result.grossAnnual) * 100 : 0;

          return (
            <div key={item.label} className="app-soft p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm app-copy">{item.label}</span>
                <span className="text-sm font-semibold app-title">
                  {formatCurrency(item.value)}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white dark:bg-slate-950">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-700`}
                  style={{ width: `${Math.max(width, 4)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}