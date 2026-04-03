"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import CalculatorForm from "./calculator-form";
import ResultPreview from "./result-preview";
import ResultsExperience from "../results/results-experience";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import type { CalculatorInput } from "../../types/tax";

type CalculatorCardProps = {
  mode?: "compact" | "full" | "overview" | "insights" | "payslip" | "tools" | "reality";
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
  },
  {
    icon: BadgeCheck,
    label: "Clear take-home visibility",
  },
  {
    icon: Sparkles,
    label: "Built for salary decisions",
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
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.10),transparent_42%),radial-gradient(circle_at_right,rgba(16,185,129,0.08),transparent_30%)] px-6 py-6 dark:border-slate-800 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Main salary calculator
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                See exactly what you take home
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Start with salary, then adjust pension, region, student loan, and
                tax code. TaxDecod turns a headline salary into a clearer salary
                reality.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              {trustPoints.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
                        <Icon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                      </div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 xl:border-b-0 xl:border-r xl:px-8 xl:py-8">
            <CalculatorForm values={values} onChange={setValues} />
          </div>

          <div className="bg-slate-50/70 px-6 py-6 dark:bg-slate-900/40 xl:px-8 xl:py-8">
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