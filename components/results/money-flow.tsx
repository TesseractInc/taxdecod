"use client";

import { motion } from "framer-motion";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function MoneyFlow({ result }: { result: TakeHomeResult }) {
  const segments = [
    { label: "Income Tax", value: result.incomeTaxAnnual, color: "bg-sky-500" },
    { label: "NI", value: result.nationalInsuranceAnnual, color: "bg-cyan-500" },
    { label: "Pension", value: result.pensionAnnual, color: "bg-emerald-500" },
    { label: "Student Loan", value: result.studentLoanAnnual, color: "bg-rose-500" },
  ].filter((s) => s.value > 0);

  return (
    <div className="rounded-[32px] border p-6 bg-white dark:bg-slate-950 shadow-sm">
      <h3 className="text-xl font-semibold app-title">
        Where your money goes
      </h3>

      <p className="mt-2 text-sm app-copy">
        A layered breakdown of deductions shaping your take-home pay.
      </p>

      <div className="mt-6 space-y-4">
        {segments.map((segment, i) => {
          const percent =
            result.grossAnnual > 0
              ? (segment.value / result.grossAnnual) * 100
              : 0;

          return (
            <div key={segment.label}>
              <div className="flex justify-between text-sm">
                <span>{segment.label}</span>
                <span>{formatCurrency(segment.value)}</span>
              </div>

              <div className="mt-2 h-4 rounded-full bg-slate-200 dark:bg-slate-800">
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
      </div>
    </div>
  );
}