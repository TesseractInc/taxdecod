import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

type PageSnapshotProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
};

export default function PageSnapshot({
  values,
  result,
}: PageSnapshotProps) {
  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Reference scenario
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              £{values.salary.toLocaleString("en-GB")} salary example
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              This page uses one realistic example so the content stays focused.
              Users can then move into the full calculator for a more personal
              reading.
            </p>
          </div>

          <div className="rounded-[26px] border border-emerald-200 bg-emerald-50/80 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
              You keep
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-700 dark:text-emerald-300">
              {keepPercent.toFixed(0)}%
            </p>
            <p className="mt-2 text-sm text-emerald-800/80 dark:text-emerald-200/80">
              of this reference salary
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-7">
        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Net annual
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {formatCurrency(result.netAnnual)}
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Net monthly
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {formatCurrency(result.netMonthly)}
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tax code
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {values.taxCode}
          </p>
        </div>
      </div>
    </section>
  );
}