"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgePoundSterling,
  CircleDollarSign,
  GraduationCap,
  Landmark,
  PiggyBank,
  ReceiptText,
  Wallet2,
} from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";

type ResultPreviewProps = {
  result: TakeHomeResult;
  values: CalculatorInput;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

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

function getThresholdInsight(values: CalculatorInput, result: TakeHomeResult): Insight | null {
  const salary = result.grossAnnual;

  if (values.region === "scotland") {
    const scottishHigherRateThreshold = 43662;
    const distance = scottishHigherRateThreshold - salary;

    if (distance >= 0 && distance <= 2500) {
      return {
        title: "You are close to Scotland’s higher-rate band",
        description: `At around ${formatCurrency(
          scottishHigherRateThreshold
        )}, more of each extra pound starts being taxed more heavily. A small raise may feel weaker than expected in take-home terms.`,
        tone: "warning",
      };
    }
  } else {
    const higherRateThreshold = 50270;
    const distance = higherRateThreshold - salary;

    if (distance >= 0 && distance <= 3000) {
      return {
        title: "You are close to the 40% tax threshold",
        description: `Around ${formatCurrency(
          higherRateThreshold
        )}, salary increases can feel less powerful because a bigger share of extra pay is lost to deductions.`,
        tone: "warning",
      };
    }
  }

  return null;
}

function getStudentLoanInsight(values: CalculatorInput, result: TakeHomeResult): Insight | null {
  if (values.studentLoanPlan === "none" || result.studentLoanAnnual <= 0) {
    return null;
  }

  return {
    title: "Student loan is materially affecting take-home pay",
    description: `${formatCurrency(
      result.studentLoanAnnual
    )} per year is being taken through student loan repayments. This is one of the easiest places to misjudge your real monthly income.`,
    tone: "neutral",
  };
}

function getPensionInsight(values: CalculatorInput, result: TakeHomeResult): Insight | null {
  if (values.pensionPercent <= 0 || result.pensionAnnual <= 0) {
    return null;
  }

  if (values.pensionPercent >= 8) {
    return {
      title: "Your pension is reducing take-home now, but building long-term value",
      description: `${formatCurrency(
        result.pensionAnnual
      )} a year is going into pension contributions. Your monthly net pay is lower, but this can improve tax efficiency and future savings.`,
      tone: "positive",
    };
  }

  return {
    title: "Pension is slightly reducing current take-home pay",
    description: `${formatCurrency(
      result.pensionAnnual
    )} per year is going into pension contributions. Even a modest increase here can change net pay and tax efficiency.`,
    tone: "neutral",
  };
}

function getRegionInsight(values: CalculatorInput): Insight | null {
  if (values.region === "scotland") {
    return {
      title: "Scottish tax treatment is applied",
      description:
        "This result is using Scotland-specific tax treatment, which can create noticeably different take-home outcomes from the rest of the UK.",
      tone: "neutral",
    };
  }

  return {
    title: "England, Wales and Northern Ireland treatment is applied",
    description:
      "This result is using the standard UK tax treatment for England, Wales and Northern Ireland.",
    tone: "neutral",
  };
}

function getPrimaryInsight(values: CalculatorInput, result: TakeHomeResult): Insight {
  return (
    getThresholdInsight(values, result) ??
    getStudentLoanInsight(values, result) ??
    getPensionInsight(values, result) ??
    getRegionInsight(values) ?? {
      title: "Your main salary reality is now visible",
      description:
        "The most important shift is seeing net pay instead of gross salary. That is the number that affects your life, affordability, and decisions.",
      tone: "neutral",
    }
  );
}

function getSecondaryInsights(values: CalculatorInput, result: TakeHomeResult): Insight[] {
  const candidates = [
    getThresholdInsight(values, result),
    getStudentLoanInsight(values, result),
    getPensionInsight(values, result),
    getRegionInsight(values),
  ].filter(Boolean) as Insight[];

  const primary = getPrimaryInsight(values, result);

  return candidates.filter((item) => item.title !== primary.title).slice(0, 2);
}

function getDominantNextAction(values: CalculatorInput, result: TakeHomeResult): NextAction {
  const salary = result.grossAnnual;

  if (result.netMonthly < 2500) {
    return {
      title: "Reverse-calculate your target monthly income",
      description:
        "Work backwards from the monthly number you actually want to keep and find the gross salary needed to reach it.",
      href: "/reverse-tax",
    };
  }

  if (
    (values.region !== "scotland" && salary >= 45000 && salary <= 55000) ||
    (values.region === "scotland" && salary >= 40000 && salary <= 47000)
  ) {
    return {
      title: "Compare this salary against a nearby jump",
      description:
        "At this level, comparing against the next salary band is often more useful than just looking at the gross headline.",
      href: "/compare-salary",
    };
  }

  if (values.studentLoanPlan !== "none" || values.pensionPercent > 0) {
    return {
      title: "Compare this result against another salary scenario",
      description:
        "When pension or student loan is involved, a side-by-side comparison usually reveals the real improvement much faster.",
      href: "/compare-salary",
    };
  }

  return {
    title: "Use reverse salary planning next",
    description:
      "If you know the monthly number you actually want, reverse calculation is the fastest way to plan toward it.",
    href: "/reverse-tax",
  };
}

export default function ResultPreview({
  result,
  values,
}: ResultPreviewProps) {
  const totalDeductions = result.totalDeductionsAnnual;
  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;
  const netWeekly = result.netAnnual / 52;

  const deductionItems = [
    {
      label: "Income Tax",
      value: result.incomeTaxAnnual,
      color: "#0ea5e9",
      icon: Landmark,
    },
    {
      label: "National Insurance",
      value: result.nationalInsuranceAnnual,
      color: "#06b6d4",
      icon: BadgePoundSterling,
    },
    {
      label: "Pension",
      value: result.pensionAnnual,
      color: "#10b981",
      icon: PiggyBank,
    },
    {
      label: "Student Loan",
      value: result.studentLoanAnnual,
      color: "#8b5cf6",
      icon: GraduationCap,
    },
  ].filter((item) => item.value > 0);

  const biggestDeduction = [...deductionItems].sort((a, b) => b.value - a.value)[0];

  const summaryCards = [
    {
      icon: CircleDollarSign,
      label: "Net yearly",
      value: formatCurrency(result.netAnnual),
      helper: "After deductions",
    },
    {
      icon: ReceiptText,
      label: "Net monthly",
      value: formatCurrency(result.netMonthly),
      helper: "Typical monthly view",
    },
    {
      icon: Wallet2,
      label: "Net weekly",
      value: formatCurrency(netWeekly),
      helper: "Useful for budgeting",
    },
  ];

  const primaryInsight = getPrimaryInsight(values, result);
  const secondaryInsights = getSecondaryInsights(values, result);
  const dominantAction = getDominantNextAction(values, result);

  const scenarioLabel =
    values.region === "scotland"
      ? "Scotland rules applied"
      : "England, Wales & NI rules";

  const insightToneStyles = {
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

  const primaryTone = primaryInsight.tone ?? "neutral";

  return (
    <div className="space-y-4">
      <div
        className="rounded-[28px] border p-6"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface-1)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium app-accent">Salary outcome</p>
            <h3 className="mt-3 text-5xl font-bold tracking-tight app-title sm:text-6xl">
              {formatCurrency(result.netAnnual)}
            </h3>
            <p className="mt-3 text-base app-copy">
              {formatCurrency(result.netMonthly)} per month after deductions
            </p>
          </div>

          <div
            className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
              color: "var(--muted)",
            }}
          >
            {scenarioLabel}
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
                    <p className="mt-1 truncate text-sm font-semibold app-title">
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
          style={insightToneStyles[primaryTone]}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px]"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--line)",
              }}
            >
              <Wallet2 className="h-4 w-4 app-accent" />
            </div>

            <div>
              <p className="text-sm font-semibold app-title">{primaryInsight.title}</p>
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
                  Keep rate: {keepPercent.toFixed(0)}%
                </div>

                {biggestDeduction ? (
                  <div
                    className="rounded-full border px-3 py-1.5 text-[11px] font-medium"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--surface-1)",
                      color: "var(--muted)",
                    }}
                  >
                    Biggest deduction: {biggestDeduction.label}
                  </div>
                ) : null}
              </div>
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
                <p className="text-sm font-semibold app-title">{item.title}</p>
                <p className="mt-2 text-sm leading-7 app-copy">{item.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className="rounded-[28px] border p-5"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface-1)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold app-title">Deduction breakdown</p>
            <p className="mt-1 text-xs app-subtle">
              What is shaping your net pay most
            </p>
          </div>

          <div
            className="rounded-full border px-3 py-1.5 text-[11px] font-medium"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
              color: "var(--muted)",
            }}
          >
            Decision view
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {deductionItems.length > 0 ? (
            deductionItems.map((item) => {
              const width =
                result.grossAnnual > 0 ? (item.value / result.grossAnnual) * 100 : 0;
              const Icon = item.icon;

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 app-accent" />
                      <span className="text-sm font-medium app-title">{item.label}</span>
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
            })
          ) : (
            <div
              className="rounded-[20px] border px-4 py-4 text-sm"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
                color: "var(--muted)",
              }}
            >
              No visible additional deduction pressure is being shown beyond the main
              net pay flow.
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div
            className="rounded-[22px] border p-4"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
              Gross salary
            </p>
            <p className="mt-2 text-xl font-semibold app-title">
              {formatCurrency(result.grossAnnual)}
            </p>
          </div>

          <div
            className="rounded-[22px] border p-4"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
              Total deductions
            </p>
            <p className="mt-2 text-xl font-semibold app-title">
              {formatCurrency(totalDeductions)}
            </p>
          </div>
        </div>
      </div>

      <div
        className="rounded-[28px] border p-5"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface-1)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold app-title">Next best step</p>
            <h4 className="mt-2 text-xl font-semibold tracking-tight app-title sm:text-2xl">
              {dominantAction.title}
            </h4>
            <p className="mt-3 text-sm leading-7 app-copy">
              {dominantAction.description}
            </p>
          </div>

          <Link href={dominantAction.href} className="app-button-primary">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/compare-salary"
            className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-sm font-semibold app-title">Compare salaries</p>
            <p className="mt-2 text-xs leading-6 app-copy">
              Check whether a nearby salary jump really improves life after tax.
            </p>
          </Link>

          <Link
            href="/reverse-tax"
            className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-sm font-semibold app-title">Reverse from target</p>
            <p className="mt-2 text-xs leading-6 app-copy">
              Start from the monthly number you actually want to keep.
            </p>
          </Link>

          <Link
            href="/salary-hub"
            className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-sm font-semibold app-title">Explore salary pages</p>
            <p className="mt-2 text-xs leading-6 app-copy">
              Browse nearby salary bands, scenarios, and related take-home pages.
            </p>
          </Link>

          <Link
            href="/payslip-explained"
            className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-sm font-semibold app-title">Understand payslips</p>
            <p className="mt-2 text-xs leading-6 app-copy">
              Learn how the deductions on a payslip map to the numbers you see here.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}