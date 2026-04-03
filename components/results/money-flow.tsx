"use client";

import { motion } from "framer-motion";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

type MoneyFlowProps = {
  result: TakeHomeResult;
};

export default function MoneyFlow({ result }: MoneyFlowProps) {
  const segments = [
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
    {
      label: "Net Pay",
      value: result.netAnnual,
      color: "bg-slate-900 dark:bg-slate-100",
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="app-card p-6">
      <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
        Money flow
      </p>
      <h3 className="mt-2 text-2xl font-semibold app-title">
        From gross pay to real pay
      </h3>
      <p className="mt-2 text-sm app-copy">
        This is the clearest visual version of where your money goes.
      </p>

      <div className="mt-6 space-y-4">
        {segments.map((segment, index) => {
          const width =
            result.grossAnnual > 0 ? (segment.value / result.grossAnnual) * 100 : 0;

          return (
            <div key={segment.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="app-copy">{segment.label}</span>
                <span className="font-semibold app-title">
                  {formatCurrency(segment.value)}
                </span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(width, 4)}%` }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
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