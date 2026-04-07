"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRightLeft,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  Target,
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
    title: "UK salary focused",
    text: "Built around UK salary, deduction, and take-home questions.",
  },
  {
    icon: BadgeCheck,
    title: "Tax-year aware",
    text: "Designed around current UK 2025/26 assumptions and payroll logic.",
  },
  {
    icon: Sparkles,
    title: "Clarity first",
    text: "Made to explain what reaches you, not just show one raw number.",
  },
];

const journeyLinks = [
  {
    icon: ArrowRightLeft,
    label: "Compare salaries",
    href: "/compare-salary",
  },
  {
    icon: Target,
    label: "Reverse a take-home goal",
    href: "/reverse-tax",
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
      <section className="overflow-hidden rounded-[36px] border border-[var(--line)] bg-[var(--card-strong)] shadow-[var(--shadow-lg)]">
        <div className="relative overflow-hidden border-b border-[var(--line)] px-6 py-7 sm:px-8 sm:py-8">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(14,165,233,0.12), transparent 32%), radial-gradient(circle at top right, rgba(16,185,129,0.08), transparent 26%)",
            }}
          />

          <div className="relative grid gap-7 xl:grid-cols-[1.02fr_0.98fr] xl:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] app-accent">
                Main salary calculator
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                Turn headline pay into salary reality
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-8 app-copy sm:text-base">
                Start with your gross salary and instantly see what actually
                reaches you after Income Tax, National Insurance, pension, and
                student loan deductions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {journeyLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition hover-lift"
                      style={{
                        borderColor: "var(--line)",
                        background: "var(--card)",
                        color: "var(--text)",
                      }}
                    >
                      <Icon className="h-3.5 w-3.5 app-accent" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {trustPoints.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[24px] border px-4 py-4"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--card-soft)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="app-chip flex h-10 w-10 items-center justify-center">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold app-title">
                          {item.title}
                        </p>
                        <p className="mt-2 text-xs leading-6 app-copy">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-[0.97fr_1.03fr]">
          <div className="border-b border-[var(--line)] px-6 py-6 xl:border-b-0 xl:border-r xl:px-8 xl:py-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium app-subtle">Step 1</p>
                <h3 className="mt-1 text-xl font-semibold app-title">
                  Enter your salary details
                </h3>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Use gross pay before deductions. Most users can keep the
                  default assumptions and still get a strong estimate.
                </p>
              </div>
            </div>

            <CalculatorForm values={values} onChange={setValues} />
          </div>

          <div
            className="px-6 py-6 xl:px-8 xl:py-8"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--card-soft) 94%, transparent) 0%, color-mix(in srgb, var(--card) 96%, transparent) 100%)",
            }}
          >
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 2</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                See the answer instantly
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                Your take-home result updates immediately, then you can explore
                what affects it and where to go next.
              </p>
            </div>

            <ResultPreview result={result} values={values} />
          </div>
        </div>
      </section>

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