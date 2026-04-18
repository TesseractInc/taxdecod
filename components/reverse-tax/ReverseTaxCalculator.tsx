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
import AdSlot from "@/components/ads/ad-slot";
import AffiliateRecommendationPanel from "@/components/monetization/affiliate-recommendation-panel";

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

function normalizeTargetNet(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.round(value));
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
        "At higher salary levels, pension strategy, salary sacrifice, and tax-efficiency decisions become much more important if you want to reach a take-home goal cleanly.",
      tone: "warning",
    };
  }

  if (targetMonthly >= 3000 && targetMonthly <= 4500) {
    return {
      title: "This is a strong planning range for real-life salary decisions",
      description:
        "Targets in this zone are often tied to rent, saving goals, household budgeting, and job-change planning, which makes reverse salary calculation especially useful.",
      tone: "positive",
    };
  }

  return {
    title: "This result turns a take-home target into a usable salary goal",
    description:
      "The main value here is clarity. Instead of guessing from gross salary alone, you now have a more decision-ready figure to compare against real jobs, offers, and raise expectations.",
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
      title: "Student loan is raising the salary needed",
      description:
        "Because student loan deductions are included in this setup, the gross salary required to hit your target is higher than it would be without that repayment drag.",
      tone: "neutral",
    });
  }

  if (values.pensionPercent > 0) {
    insights.push({
      title: "Pension contributions reduce current take-home",
      description:
        "That is not necessarily negative, but it does mean the gross figure needed to reach your monthly target rises as pension contribution levels increase.",
      tone: "neutral",
    });
  }

  if (resultNetMonthly < 2500) {
    insights.push({
      title: "This target may still feel tight depending on rent and location",
      description:
        "Even when the required salary is achieved, affordability still depends heavily on region, travel, housing cost, and fixed monthly commitments.",
      tone: "warning",
    });
  }

  if (requiredGross >= 55000 && requiredGross < 100000) {
    insights.push({
      title: "Further gross increases may convert less efficiently from here",
      description:
        "Once reverse targets push salary higher, each additional step in desired take-home can demand more gross salary than users often expect.",
      tone: "neutral",
    });
  }

  return insights.slice(0, 2);
}

function getDominantAction(requiredGross: number): NextAction {
  if (requiredGross >= 45000) {
    return {
      title: "Compare this required salary against nearby pay levels",
      description:
        "Once the required gross salary is known, the smartest next step is often to test whether nearby salary jumps materially improve life after deductions.",
      href: "/compare-salary",
    };
  }

  return {
    title: "Inspect this salary in the full calculator",
    description:
      "Now that you know the estimated salary needed, open the main calculator to see the fuller deduction picture and next-step options.",
      href: "/calculator",
    };
  }


function getInterpretationHeadline(targetMonthly: number, requiredGross: number) {
  if (requiredGross >= 100000) {
    return "This target is achievable, but the salary needed is now in a more complex planning range";
  }

  if (requiredGross >= 50000) {
    return "This target is realistic, but it now depends on a noticeably stronger gross salary";
  }

  if (targetMonthly < 2500) {
    return "This target is relatively accessible, but real affordability still depends on monthly cost pressure";
  }

  return "This target creates a practical salary benchmark you can now use in real decisions";
}

function getInterpretationBody(
  targetMonthly: number,
  requiredGross: number,
  values: CalculatorInput
) {
  const regionLabel = values.region === "scotland" ? "Scotland" : "the UK";

  if (requiredGross >= 100000) {
    return `To keep around ${formatCurrency(
      targetMonthly
    )} per month under the current ${regionLabel} setup, the estimated gross salary needed is now high enough that planning quality matters more. This is the range where pension structure, salary sacrifice, and tax-efficiency decisions start becoming much more relevant.`;
  }

  if (requiredGross >= 50000) {
    return `To keep around ${formatCurrency(
      targetMonthly
    )} per month under the current ${regionLabel} setup, the estimated gross salary needed is already beyond the range many users casually assume. This is exactly why reverse salary planning is useful: it replaces salary guessing with a clearer target.`;
  }

  return `To keep around ${formatCurrency(
    targetMonthly
  )} per month under the current ${regionLabel} setup, the estimated gross salary needed is now clearer and more usable. The result does not remove real-life variation, but it gives you a much better salary benchmark than working from gross assumptions alone.`;
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
    if (targetAnnual <= 0) return 0;

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

  const interpretationHeadline = getInterpretationHeadline(
    targetMonthly,
    calculatedGross
  );

  const interpretationBody = getInterpretationBody(
    targetMonthly,
    calculatedGross,
    values
  );

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
              Target income input
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight app-title sm:text-3xl">
              Start from the amount you actually want to keep
            </h2>

            <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
              Set the monthly or yearly take-home target first. Then adjust
              region, pension, and student loan only where they materially
              affect the result.
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
                    min={0}
                    step={100}
                    value={reverseInput.targetNet}
                    onChange={(e) =>
                      setReverseInput({
                        ...reverseInput,
                        targetNet: normalizeTargetNet(Number(e.target.value)),
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
              <p className="text-sm font-semibold app-title">
                Estimated salary needed
              </p>
              <h3 className="mt-3 text-4xl font-bold tracking-tight app-title sm:text-5xl">
                {formatCurrency(calculatedGross)}
              </h3>
              <p className="mt-3 text-sm leading-7 app-copy">
                This is the estimated gross salary required to take home{" "}
                <span className="font-semibold app-title">
                  {formatCurrency(reverseInput.targetNet)}
                </span>{" "}
                {reverseInput.payPeriod === "monthly" ? "per month" : "per year"}{" "}
                under the current setup.
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
                  Planning view
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight app-title sm:text-3xl">
                  Turn a target income into a realistic salary route
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
                        <p className="mt-1 text-xs app-subtle">{item.helper}</p>
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

            <div
              className="mt-5 rounded-[24px] border p-5"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-sm font-semibold app-title">
                {interpretationHeadline}
              </p>
              <p className="mt-3 text-sm leading-7 app-copy">
                {interpretationBody}
              </p>
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
                    Best next step
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight app-title">
                    {dominantAction.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    {dominantAction.description}
                  </p>
                </div>

                <Link href={dominantAction.href} className="app-button-primary">
                  Continue with this next step
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
                    Compare nearby salaries
                  </p>
                  <p className="mt-2 text-xs leading-6 app-copy">
                    Use this when you want to see whether nearby pay levels
                    change life enough after deductions.
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
                    Inspect the full salary route
                  </p>
                  <p className="mt-2 text-xs leading-6 app-copy">
                    Use the main calculator when you want the broader one-salary
                    deduction picture.
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
                    Browse salary bands
                  </p>
                  <p className="mt-2 text-xs leading-6 app-copy">
                    Use the hub when you want more context around neighbouring
                    salary levels.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <AdSlot label="Advertisement" />
      </div>

      <section className="overflow-hidden rounded-[34px] border app-card shadow-[0_28px_90px_-40px_rgba(15,23,42,0.20)]">
        <div
          className="border-b p-6 sm:p-7"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="text-sm font-semibold app-title">
            What is creating the deduction pressure
          </p>
          <p className="mt-2 text-sm leading-7 app-copy">
            These deductions explain why the gross salary required is higher
            than the take-home target you started with.
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
        description="Keep the estimated salary needed for your target take-home so you can use it later for planning, job comparisons, or salary discussions."
        values={values}
        result={result}
        filename="taxdecod-reverse-salary-report.pdf"
      />

      <div className="mt-8">
        <AdSlot label="Advertisement" />
      </div>

      <div className="mt-8">
        <AffiliateRecommendationPanel
          eyebrow="Useful salary follow-up"
          title="Once the target income is clear, stay inside the right TaxDecod route"
          description="This is designed for users who have already clarified the salary needed and now want to compare scenarios, inspect one salary more closely, or check a real payslip pattern."
          items={[
            {
              title: "Compare this target against another salary route",
              description:
                "Best when you want to test whether a raise, role change, or nearby salary actually moves monthly life enough.",
              href: "/compare-salary",
              badge: "Compare",
            },
            {
              title: "Inspect one salary in the main calculator",
              description:
                "Useful when the next step is a fuller reading of tax, National Insurance, pension, and student loan deductions for one route.",
              href: "/calculator",
              badge: "Calculator",
            },
            {
              title: "Check whether a real payslip is on track",
              description:
                "Best when the target is being matched against actual PAYE, pension, or year-to-date deductions on a payslip.",
              href: "/payslip-checker",
              badge: "Payslip",
            },
          ]}
        />
      </div>

      <ResultsExperience result={result} values={values} view="full" />
    </div>
  );
}