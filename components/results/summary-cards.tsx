"use client";

import {
  CircleDollarSign,
  PiggyBank,
  ShieldCheck,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

type SummaryCardsProps = {
  result: TakeHomeResult;
};

export default function SummaryCards({ result }: SummaryCardsProps) {
  const totalDeductions =
    result.totalDeductionsAnnual ||
    result.incomeTaxAnnual +
      result.nationalInsuranceAnnual +
      result.pensionAnnual +
      result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const cards = [
    {
      icon: Wallet,
      label: "Gross salary",
      value: formatCurrency(result.grossAnnual),
      tone:
        "border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/70",
      valueClass: "text-slate-900 dark:text-slate-100",
    },
    {
      icon: CircleDollarSign,
      label: "Monthly take-home",
      value: formatCurrency(result.netMonthly),
      tone:
        "border-sky-200 bg-sky-50/80 dark:border-sky-900 dark:bg-sky-950/30",
      valueClass: "text-sky-700 dark:text-sky-300",
    },
    {
      icon: TrendingDown,
      label: "Total deductions",
      value: formatCurrency(totalDeductions),
      tone:
        "border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/30",
      valueClass: "text-rose-700 dark:text-rose-300",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Salary summary
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            The key numbers that define this salary
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            This view brings the headline salary, real take-home pay, and
            overall deduction pressure into one cleaner reading.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-6 xl:grid-cols-[1.08fr_0.92fr] sm:p-7">
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50/80 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Real take-home pay
              </p>
              <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                {formatCurrency(result.netAnnual)}
              </h3>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                {formatCurrency(result.netMonthly)} per month after deductions
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 p-3 shadow-sm dark:bg-slate-950/60">
              <PiggyBank className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] border border-emerald-200 bg-white/85 px-4 py-4 dark:border-emerald-900 dark:bg-slate-950/60">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                You keep
              </p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
                {keepPercent.toFixed(0)}%
              </p>
            </div>

            <div className="rounded-[22px] border border-emerald-200 bg-white/85 px-4 py-4 dark:border-emerald-900 dark:bg-slate-950/60">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Net monthly
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(result.netMonthly)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`rounded-[26px] border p-5 ${item.tone}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className={`mt-3 text-2xl font-semibold tracking-tight ${item.valueClass}`}>
                      {item.value}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/85 p-3 shadow-sm dark:bg-slate-950/60">
                    <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="rounded-[26px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
                <ShieldCheck className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Why this matters
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  The number that shapes real life is take-home pay, not the
                  gross salary headline. This panel makes that distinction
                  clearer immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}