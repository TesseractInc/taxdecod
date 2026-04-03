"use client";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { CalculatorInput } from "../../types/tax";
import { getTaxCodeInsight } from "../../lib/tax/explanations/tax-code";

type TaxCodeInsightProps = {
  values: CalculatorInput;
};

export default function TaxCodeInsight({ values }: TaxCodeInsightProps) {
  const insight = getTaxCodeInsight(values.taxCode);

  const tone =
    insight.status === "normal"
      ? {
          badge:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
          icon: <ShieldCheck className="h-5 w-5" />,
          iconBox:
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
        }
      : {
          badge:
            "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
          icon: <ShieldAlert className="h-5 w-5" />,
          iconBox:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
        };

  return (
    <section id="tax-code-insight" className="app-card p-6">
      <div className="flex items-start gap-4">
        <div className={`rounded-2xl p-3 ${tone.iconBox}`}>{tone.icon}</div>

        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Tax code insight
            </p>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}>
              {insight.status === "normal" ? "Looks normal" : "Worth checking"}
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-semibold app-title">
            {insight.title}
          </h2>

          <p className="mt-3 text-sm leading-7 app-copy">
            <span className="font-medium app-title">
              Tax code entered: {values.taxCode || "—"}
            </span>
          </p>

          <p className="mt-4 text-sm leading-7 app-copy">{insight.summary}</p>
          <p className="mt-4 text-sm leading-7 app-copy">{insight.details}</p>
        </div>
      </div>
    </section>
  );
}