"use client";

import { ReceiptText } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { getPayslipExplanationItems } from "../../lib/tax/explanations/payslip-items";

type PayslipExplanationProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
};

export default function PayslipExplanation({
  values,
  result,
}: PayslipExplanationProps) {
  const items = getPayslipExplanationItems(values, result);

  return (
    <section
      id="payslip-explanation"
      className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-sky-50 p-3 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
            <ReceiptText className="h-5 w-5" />
          </div>

          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Payslip explanation
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Read your payslip in plain English
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              This section turns common payslip lines into short explanations
              that are easier to scan, understand, and remember.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 lg:grid-cols-2 sm:p-7">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {item.value}
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {item.meaning}
            </p>

            <div className="mt-4 rounded-[20px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  Why it matters:
                </span>{" "}
                {item.whyItMatters}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}