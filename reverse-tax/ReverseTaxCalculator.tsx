"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgePoundSterling,
  CircleDollarSign,
  GraduationCap,
  PiggyBank,
  Scale,
  Target,
  Wallet2,
} from "lucide-react";
import CalculatorForm from "@/components/calculator/calculator-form";
import ResultPreview from "@/components/calculator/result-preview";
import ResultsExperience from "@/components/results/results-experience";
import PdfReportStrip from "@/components/shared/pdf-report-strip";
import { calculateTakeHome } from "@/lib/tax/calculators/take-home";
import { formatCurrency } from "@/lib/tax/utils/currency";
import type { CalculatorInput } from "@/types/tax";

type ReverseInput = {
  targetNet: number;
  payPeriod: "yearly" | "monthly";
};

type Insight = {
  title: string;
  description: string;
  tone?: "neutral" | "positive" | "warning";
};

type NextAction = {
  title: string;
  description: string;
  href: string;
};

const initialValues: CalculatorInput = {
  salary: 40000,
  payPeriod: "yearly",
  region: "uk",
  pensionPercent: 5,
  studentLoanPlan: "plan2",
  taxCode: "1257L",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPrimaryInsight(
  targetMonthly: number,
  requiredGross: number,
  values: CalculatorInput
): Insight {
  if (
    values.region === "scotland" &&
    requiredGross >= 42000 &&
    requiredGross <= 45500
  ) {
    return {
      title: "This target sits close to an important Scottish threshold",
      description:
        "A relatively small increase in desired take-home around this range can require a bigger-than-expected jump in gross salary because more income starts facing heavier tax treatment.",
      tone: "warning",
    };
  }

  if (
    values.region !== "scotland" &&
    requiredGross >= 48000 &&
    requiredGross <= 52500
  ) {
    return {
      title: "This target is close to the 40% tax threshold",
      description:
        "As your required salary moves toward the higher-rate band, each extra step in monthly take-home can demand a stronger gross increase than users usually expect.",
      tone: "warning",
    };
  }

  if (requiredGross >= 100000) {
    return {
      title: "This target is entering a more complex salary zone",
      description:
        "At higher salary levels, salary sacrifice, pension strategy, and tax-efficiency planning become much more important if you want to reach a take-home goal cleanly.",
      tone: "warning",
    };
  }

  if (targetMonthly >= 3000 && targetMonthly <= 4500) {
    return {
      title: "This is a strong planning range for real-life salary decisions",
      description:
        "Targets in this zone are usually tied to rent, savings, household budgeting, and job-change planning, which makes reverse calculation much more useful than headline salary thinking.",
      tone: "positive",
    };
  }

  return {
    title: "This result translates your real income target into a usable salary goal",
    description:
      "The main value here is clarity. Instead of guessing from gross salary, you now have a more decision-ready target to compare against jobs, offers, and raise expectations.",
    tone: "neutral",
  };
}

function getSecondaryInsights(
  requiredGross: number,
  resultNetMonthly: number,
  values: CalculatorInput
): Insight[] {
  const insights: Insight[] = [];

  if (values.studentLoanPlan !== "none") {
    insights.push({
      title: "Student loan is influencing the salary required",
      description:
        "Because student loan deductions are included in this setup, the gross salary needed to hit your target is higher than it would be without that repayment drag.",
      tone: "neutral",
    });
  }

  if (values.pensionPercent > 0) {
    insights.push({
      title: "Pension contributions are lowering current take-home",
      description:
        "That is not necessarily bad, but it does mean the gross figure required to reach your target monthly income rises as pension contribution levels increase.",
      tone: "neutral",
    });
  }

  if (resultNetMonthly < 2500) {
    insights.push({
      title: "This target may still feel tight depending on location and rent",
      description:
        "Even when the reverse salary is achieved, affordability depends heavily on region, rent, travel, and fixed monthly commitments.",
      tone: "warning",
    });
  }

  if (requiredGross >= 55000 && requiredGross < 100000) {
    insights.push({
      title: "Further gross increases may convert less efficiently from here",
      description:
        "Once reverse targets push salary higher, each additional increase in desired take-home can cost more gross salary than users expect.",
      tone: "neutral",
    });
  }

  return insights.slice(0, 2);
}

function getDominantAction(requiredGross: number): NextAction {
  if (requiredGross >= 45000) {
    return {
      title: "Compare this required salary against a nearby salary band",
      description:
        "Once the required gross salary is known, the smartest next step is to test whether nearby salary jumps create meaningfully better monthly outcomes.",
      href: "/compare-salary",
    };
  }

  return {
    title: "Open the full salary calculator for this result",
    description:
      "Now that you know the estimated salary needed, check the full deduction breakdown and result interpretation in the main calculator.",
      href: "/calculator",
    };
  }


const toneStyles = {
  neutral: {
    borderColor: "var(--line)",
    background: "var(--surface-2)",
  },
  positive: {
    borderColor: "color-mix(in srgb, #10b981 22%, var(--line))",
    background: "color-mix(in srgb, #10b981 7%, var(--surface-2))",
  },
  warning: {
    borderColor: "color-mix(in srgb, #f59e0b 24%, var(--line))",
    background: "color-mix(in srgb, #f59e0b 7%, var(--surface-2))",
  },
} as const;

export default function ReverseTaxCalculator() {
  const [values, setValues] = useState<CalculatorInput>(initialValues);

  const [reverseInput, setReverseInput] = useState<ReverseInput>({
    targetNet: 3000,
    payPeriod: "monthly",
  });

  const targetAnnual = useMemo(() => {
    return reverseInput.payPeriod === "monthly"
      ? reverseInput.targetNet * 12
      : reverseInput.targetNet;
  }, [reverseInput]);

  const calculatedGross = useMemo(() => {
    let low = 0;
    let high = 250000;
    let mid = 0;

    for (let i = 0; i < 45; i++) {
      mid = (low + high) / 2;

      const trial = calculateTakeHome({
        ...values,
        salary: mid,
        payPeriod: "yearly",
      });

      if (trial.netAnnual < targetAnnual) {
        low = mid;
      } else {
        high = mid;
      }
    }

    return Math.round(mid);
  }, [targetAnnual, values]);

  const result = useMemo(() => {
    return calculateTakeHome({
      ...values,
      salary: calculatedGross,
      payPeriod: "yearly",
    });
  }, [calculatedGross, values]);

  const effectiveMonthly = result.netMonthly;
  const targetMonthly =
    reverseInput.payPeriod === "monthly"
      ? reverseInput.targetNet
      : reverseInput.targetNet / 12;

  const monthlyGap = effectiveMonthly - targetMonthly;
  const keepRate =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const deductionItems = [
    {
      label: "Income Tax",
      value: result.incomeTaxAnnual,
      icon: CircleDollarSign,
      color: "#0ea5e9",
    },
    {
      label: "National Insurance",
      value: result.nationalInsuranceAnnual,
      icon: BadgePoundSterling,
      color: "#06b6d4",
    },
    {
      label: "Pension",
      value: result.pensionAnnual,
      icon: PiggyBank,
      color: "#10b981",
    },
    {
      label: "Student Loan",
      value: result.studentLoanAnnual,
      icon: GraduationCap,
      color: "#8b5cf6",
    },
  ].filter((item) => item.value > 0);

  const primaryInsight = getPrimaryInsight(
    targetMonthly,
    calculatedGross,
    values
  );

  const secondaryInsights = getSecondaryInsights(
    calculatedGross,
    effectiveMonthly,
    values
  );

  const dominantAction = getDominantAction(calculatedGross);

  const summaryCards = [
    {
      icon: Target,
      label: "Target take-home",
      value:
        reverseInput.payPeriod === "monthly"
          ? `${formatCurrency(reverseInput.targetNet)}/mo`
          : `${formatCurrency(reverseInput.targetNet)}/yr`,
      helper: "What you want to keep",
    },
    {
      icon: Wallet2,
      label: "Required gross salary",
      value: formatCurrency(calculatedGross),
      helper: "Estimated salary needed",
    },
    {
      icon: Scale,
      label: "Estimated actual monthly net",
      value: formatCurrency(effectiveMonthly),
      helper: "Based on this setup",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[34px] border app-card-strong shadow-[0_28px_100px_-44px_rgba(15,23,42,0.24)]">
        <div className="grid gap-0 xl:grid-cols-[0.9fr_1.1fr]">
          <div
            className="border-b p-6 sm:p-7 xl:border-b-0 xl:border-r"
            style={{ borderColor: "var(--line)" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] app-accent">
              Reverse planning input
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight app-title sm:text-3xl">
              Start from the income you actually want to keep
            </h2>

            <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
              Set your target take-home first, then adjust region, pension, and
              student loan settings only where they materially change the result.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium app-copy">
                  Desired take-home
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold app-title">
                    £
                  </span>
                  <input
                    type="number"
                    value={reverseInput.targetNet}
                    onChange={(e) =>
                      setReverseInput({
                        ...reverseInput,
                        targetNet: Number(e.target.value) || 0,
                      })
                    }
                    className="app-input h-[60px] pl-10 text-lg font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium app-copy">
                  Pay period
                </label>
                <select
                  value={reverseInput.payPeriod}
                  onChange={(e) =>
                    setReverseInput({
                      ...reverseInput,
                      payPeriod: e.target.value as "monthly" | "yearly",
                    })
                  }
                  className="app-input mt-2 h-[60px]"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border p-5 app-soft">
              <p className="text-sm font-semibold app-title">Required salary</p>
              <h3 className="mt-3 text-4xl font-bold tracking-tight app-title sm:text-5xl">
                {formatCurrency(calculatedGross)}
              </h3>
              <p className="mt-3 text-sm leading-7 app-copy">
                Estimated gross salary needed to take home{" "}
                <span className="font-semibold app-title">
                  {formatCurrency(reverseInput.targetNet)}
                </span>{" "}
                {reverseInput.payPeriod === "monthly"
                  ? "per month"
                  : "per year"}
                .
              </p>
            </div>

            <div className="mt-6">
              <CalculatorForm values={values} onChange={setValues} />
            </div>
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] app-accent">
                  Planning dashboard
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight app-title sm:text-3xl">
                  Turn a target income into a salary plan
                </h2>
              </div>

              <div
                className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                  color: "var(--muted)",
                }}
              >
                Reverse salary logic
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {summaryCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[22px] border px-4 py-4"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--surface-2)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-[14px]"
                        style={{
                          background: "var(--surface-1)",
                          border: "1px solid var(--line)",
                        }}
                      >
                        <Icon className="h-4 w-4 app-accent" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold app-title">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs app-subtle">
                          {item.helper}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-5 rounded-[24px] border p-5"
              style={toneStyles[primaryInsight.tone ?? "neutral"]}
            >
              <p className="text-sm font-semibold app-title">
                {primaryInsight.title}
              </p>
              <p className="mt-2 text-sm leading-7 app-copy">
                {primaryInsight.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <div
                  className="rounded-full border px-3 py-1.5 text-[11px] font-medium"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-1)",
                    color: "var(--muted)",
                  }}
                >
                  Keep rate: {keepRate.toFixed(0)}%
                </div>

                <div
                  className="rounded-full border px-3 py-1.5 text-[11px] font-medium"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-1)",
                    color: "var(--muted)",
                  }}
                >
                  Monthly gap: {monthlyGap >= 0 ? "+" : "-"}
                  {formatCurrency(Math.abs(monthlyGap))}
                </div>
              </div>
            </div>

            {secondaryInsights.length > 0 ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {secondaryInsights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border p-4"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--surface-2)",
                    }}
                  >
                    <p className="text-sm font-semibold app-title">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 app-copy">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            <div
              className="mt-5 rounded-[24px] border p-5"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold app-title">
                    Next best step
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight app-title">
                    {dominantAction.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    {dominantAction.description}
                  </p>
                </div>

                <Link href={dominantAction.href} className="app-button-primary">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Link
                  href="/compare-salary"
                  className="rounded-[20px] border px-4 py-4 transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-1)",
                  }}
                >
                  <p className="text-sm font-semibold app-title">
                    Compare salaries
                  </p>
                  <p className="mt-2 text-xs leading-6 app-copy">
                    Test whether nearby salary bands improve life enough.
                  </p>
                </Link>

                <Link
                  href="/calculator"
                  className="rounded-[20px] border px-4 py-4 transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-1)",
                  }}
                >
                  <p className="text-sm font-semibold app-title">
                    Open calculator
                  </p>
                  <p className="mt-2 text-xs leading-6 app-copy">
                    Inspect the full one-salary deduction breakdown.
                  </p>
                </Link>

                <Link
                  href="/salary-hub"
                  className="rounded-[20px] border px-4 py-4 transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-1)",
                  }}
                >
                  <p className="text-sm font-semibold app-title">
                    Explore salary hub
                  </p>
                  <p className="mt-2 text-xs leading-6 app-copy">
                    Browse nearby salary pages and related routes.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[34px] border app-card shadow-[0_28px_90px_-40px_rgba(15,23,42,0.20)]">
        <div
          className="border-b p-6 sm:p-7"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="text-sm font-semibold app-title">
            What is creating the drag
          </p>
          <p className="mt-2 text-sm leading-7 app-copy">
            These deductions explain why the gross salary needed is higher than
            the take-home target you started with.
          </p>
        </div>

        <div className="p-6 sm:p-7">
          {deductionItems.length > 0 ? (
            <div className="space-y-4">
              {deductionItems.map((item) => {
                const Icon = item.icon;
                const width =
                  result.grossAnnual > 0
                    ? (item.value / result.grossAnnual) * 100
                    : 0;

                return (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 app-accent" />
                        <span className="text-sm font-medium app-title">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold app-title">
                        {formatCurrency(item.value)}
                      </span>
                    </div>

                    <div
                      className="h-3 overflow-hidden rounded-full"
                      style={{
                        background:
                          "color-mix(in srgb, var(--subtle) 18%, transparent)",
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${clamp(width, 3, 100)}%`,
                          background: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="rounded-[20px] border px-4 py-4 text-sm"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
                color: "var(--muted)",
              }}
            >
              No visible additional deduction pressure is being shown beyond the
              main salary flow.
            </div>
          )}
        </div>
      </section>

      <div className="app-card-strong rounded-[30px] p-6 sm:p-7">
        <ResultPreview result={result} values={values} />
      </div>

      <PdfReportStrip
        title="Download this reverse salary report"
        description="Save the estimated salary needed for your target take-home and use it later for planning, job comparisons, or salary negotiations."
        values={values}
        result={result}
        filename="taxdecod-reverse-salary-report.pdf"
      />

      <ResultsExperience result={result} values={values} view="full" />
    </div>
  );
}