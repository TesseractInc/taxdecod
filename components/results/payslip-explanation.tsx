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
    <section id="payslip-explanation" className="app-card p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-sky-50 p-3 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
          <ReceiptText className="h-5 w-5" />
        </div>

        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Payslip explanation
          </p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            Read your payslip like a normal person
          </h2>
          <p className="mt-3 text-sm leading-7 app-copy">
            Less jargon, less guesswork. This turns common payslip labels into
            short explanations that are easy to scan.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="app-soft p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                {item.label}
              </p>
              <p className="text-sm font-semibold app-title">{item.value}</p>
            </div>

            <p className="mt-4 text-sm leading-7 app-copy">
              {item.meaning}
            </p>

            <div className="mt-4 rounded-xl bg-white px-3 py-3 text-sm app-copy dark:bg-slate-950">
              <span className="font-medium app-title">Why it matters:</span>{" "}
              {item.whyItMatters}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}