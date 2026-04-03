"use client";

import { Wallet, PiggyBank, Landmark, TrendingUp } from "lucide-react";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

type SummaryCardsProps = {
  result: TakeHomeResult;
};

export default function SummaryCards({ result }: SummaryCardsProps) {
  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* MAIN CARD (DOMINANT) */}
      <div className="lg:col-span-2 rounded-[32px] border p-6 bg-white dark:bg-slate-950 shadow-sm">
        <p className="text-sm text-sky-600">Your real income</p>

        <h2 className="mt-3 text-4xl font-bold app-title">
          {formatCurrency(result.netAnnual)}
        </h2>

        <p className="mt-2 text-sm app-copy">
          {formatCurrency(result.netMonthly)} per month after deductions
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-xs app-subtle">You keep</p>
            <p className="text-xl font-bold text-emerald-500">
              {keepPercent.toFixed(0)}%
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-xs app-subtle">Lost to deductions</p>
            <p className="text-xl font-bold text-rose-500">
              {formatCurrency(totalDeductions)}
            </p>
          </div>
        </div>
      </div>

      {/* SIDE CARDS */}
      <div className="space-y-4">
        <div className="app-card p-4">
          <div className="flex justify-between">
            <p className="text-sm app-subtle">Gross salary</p>
            <Wallet className="h-4 w-4 text-sky-500" />
          </div>
          <p className="mt-2 text-lg font-semibold app-title">
            {formatCurrency(result.grossAnnual)}
          </p>
        </div>

        <div className="app-card p-4">
          <div className="flex justify-between">
            <p className="text-sm app-subtle">Net monthly</p>
            <PiggyBank className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-lg font-semibold app-title">
            {formatCurrency(result.netMonthly)}
          </p>
        </div>
      </div>
    </div>
  );
}