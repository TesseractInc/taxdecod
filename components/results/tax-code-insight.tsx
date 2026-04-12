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
          panel:
            "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30",
        }
      : {
          badge:
            "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
          icon: <ShieldAlert className="h-5 w-5" />,
          iconBox:
            "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
          panel:
            "border-amber-200 bg-amber-50/80 dark:border-amber-900 dark:bg-amber-950/30",
        };

  return (
    <section
      id="tax-code-insight"
      className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="flex items-start gap-4">
          <div className={`rounded-2xl p-3 ${tone.iconBox}`}>{tone.icon}</div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Tax code insight
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}
              >
                {insight.status === "normal" ? "Looks normal" : "Worth checking"}
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              {insight.title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Tax code entered:{" "}
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {values.taxCode || "—"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-6 xl:grid-cols-[1.02fr_0.98fr] sm:p-7">
        <div className={`rounded-[28px] border p-6 ${tone.panel}`}>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Quick reading
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-400">
            {insight.summary}
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            More detail
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-400">
            {insight.details}
          </p>
        </div>
      </div>
    </section>
  );
}