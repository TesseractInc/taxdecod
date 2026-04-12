"use client";

import { motion } from "framer-motion";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function MoneyFlow({ result }: { result: TakeHomeResult }) {
  const segments = [
    { label: "Income Tax", value: result.incomeTaxAnnual, color: "bg-sky-500" },
    { label: "National Insurance", value: result.nationalInsuranceAnnual, color: "bg-cyan-500" },
    { label: "Pension", value: result.pensionAnnual, color: "bg-emerald-500" },
    { label: "Student Loan", value: result.studentLoanAnnual, color: "bg-violet-500" },
  ].filter((s) => s.value > 0);

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Money flow
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Where the money is going
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            This flow view shows which deductions are doing the most to shape
            your final take-home pay.
          </p>
        </div>
      </div>

      <div className="space-y-5 p-6 sm:p-7">
        {segments.map((segment, i) => {
          const percent =
            result.grossAnnual > 0
              ? (segment.value / result.grossAnnual) * 100
              : 0;

          return (
            <div key={segment.label} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {segment.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {percent.toFixed(0)}% of gross salary
                  </p>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(segment.value)}
                </p>
              </div>

              <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`h-full rounded-full ${segment.color}`}
                />
              </div>
            </div>
          );
        })}

        <div className="rounded-[24px] border border-slate-200 bg-white px-5 py-5 dark:border-slate-800 dark:bg-slate-950/80">
          <p className="text-sm leading-8 text-slate-600 dark:text-slate-400">
            The highest bars above show the deductions putting the strongest
            pressure on take-home pay. In most employee salary scenarios, income
            tax is the biggest drag, followed by National Insurance.
          </p>
        </div>
      </div>
    </section>
  );
}