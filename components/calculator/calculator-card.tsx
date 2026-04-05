"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  ArrowRightLeft,
  Download,
  Mail,
} from "lucide-react";
import CalculatorForm from "./calculator-form";
import ResultPreview from "./result-preview";
import ResultsExperience from "../results/results-experience";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import type { CalculatorInput } from "../../types/tax";

type CalculatorCardProps = {
  mode?:
    | "compact"
    | "full"
    | "overview"
    | "insights"
    | "payslip"
    | "tools"
    | "reality";
};

const initialValues: CalculatorInput = {
  salary: 40000,
  payPeriod: "yearly",
  region: "uk",
  pensionPercent: 5,
  studentLoanPlan: "plan2",
  taxCode: "1257L",
};

const trustPoints = [
  {
    icon: ShieldCheck,
    label: "UK-focused logic",
    tone:
      "border-sky-200 bg-sky-50/80 text-sky-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300",
  },
  {
    icon: BadgeCheck,
    label: "Clear take-home visibility",
    tone:
      "border-emerald-200 bg-emerald-50/80 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300",
  },
  {
    icon: Sparkles,
    label: "Built for salary decisions",
    tone:
      "border-violet-200 bg-violet-50/80 text-violet-700 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300",
  },
];

const quickActions = [
  {
    icon: ArrowRightLeft,
    label: "Compare salaries",
  },
  {
    icon: Download,
    label: "Download result",
  },
  {
    icon: Mail,
    label: "Send to email",
  },
];

export default function CalculatorCard({
  mode = "full",
}: CalculatorCardProps) {
  const [values, setValues] = useState<CalculatorInput>(initialValues);
  const result = useMemo(() => calculateTakeHome(values), [values]);

  const isCompact = mode === "compact";

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_100px_-42px_rgba(15,23,42,0.38)] dark:border-slate-800 dark:bg-slate-950">
        <div className="relative overflow-hidden border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8 sm:py-8">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(14,165,233,0.10), transparent 34%), radial-gradient(circle at top right, rgba(16,185,129,0.08), transparent 28%)",
            }}
          />

          <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                Main salary calculator
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                Turn headline pay into salary reality
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                Enter your salary once, then see what actually reaches your bank
                account after tax, National Insurance, pension, and student
                loan. This is the main TaxDecod experience.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {quickActions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-300"
                    >
                      <Icon className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[450px]">
              {trustPoints.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={`rounded-[22px] border px-4 py-4 ${item.tone}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/80 p-2 dark:bg-slate-950/50">
                        <Icon className="h-4 w-4" />
                      </div>

                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[0.98fr_1.02fr]">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 xl:border-b-0 xl:border-r xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Step 1
              </p>
              <h4 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Enter your salary details
              </h4>
            </div>

            <CalculatorForm values={values} onChange={setValues} />
          </div>

          <div className="bg-slate-50/80 px-6 py-6 dark:bg-slate-900/40 xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Step 2
              </p>
              <h4 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                See the answer instantly
              </h4>
            </div>

            <ResultPreview result={result} values={values} />
          </div>
        </div>
      </div>

      {!isCompact ? (
        <ResultsExperience
          result={result}
          values={values}
          view={mode === "full" ? "full" : mode}
        />
      ) : null}
    </div>
  );
}