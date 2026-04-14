"use client";

import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";

type LinkItem = {
  label: string;
  href: string;
};

type SalaryVariantContentProps = {
  salary: number;
  input: CalculatorInput;
  result: TakeHomeResult;
  variant:
    | "monthly"
    | "student-loan"
    | "scotland";
  title: string;
  intro: string;
};

function getVariantLabel(variant: SalaryVariantContentProps["variant"]) {
  if (variant === "monthly") return "Monthly view";
  if (variant === "student-loan") return "Student loan variant";
  return "Scotland variant";
}

function getVariantPrimaryAction(
  salary: number,
  variant: SalaryVariantContentProps["variant"]
): LinkItem {
  if (variant === "student-loan") {
    return {
      label: "Compare this salary with and without student loan impact",
      href: "/compare-salary",
    };
  }

  if (variant === "scotland") {
    return {
      label: `Compare the Scotland view against the main UK reading for £${salary.toLocaleString(
        "en-GB"
      )}`,
      href: `/${salary}-after-tax-uk`,
    };
  }

  return {
    label: "Use the full salary calculator for deeper deduction analysis",
    href: "/calculator",
  };
}

function getVariantAdjacentLinks(
  salary: number,
  variant: SalaryVariantContentProps["variant"]
): LinkItem[] {
  const baseLinks: LinkItem[] = [
    {
      label: `£${Math.max(18000, salary - 5000).toLocaleString(
        "en-GB"
      )} after tax in the UK`,
      href: `/${Math.max(18000, salary - 5000)}-after-tax-uk`,
    },
    {
      label: `£${(salary + 5000).toLocaleString(
        "en-GB"
      )} after tax in the UK`,
      href: `/${salary + 5000}-after-tax-uk`,
    },
  ];

  if (variant !== "monthly") {
    baseLinks.push({
      label: `£${salary.toLocaleString("en-GB")} after tax monthly`,
      href: `/${salary}-after-tax-monthly`,
    });
  }

  if (variant !== "scotland") {
    baseLinks.push({
      label: `£${salary.toLocaleString("en-GB")} after tax in Scotland`,
      href: `/${salary}-after-tax-scotland`,
    });
  }

  if (variant !== "student-loan") {
    baseLinks.push({
      label: `£${salary.toLocaleString(
        "en-GB"
      )} after tax with student loan`,
      href: `/${salary}-after-tax-with-student-loan`,
    });
  }

  return baseLinks.slice(0, 4);
}

function getVariantUnderstandingLinks(
  salary: number,
  variant: SalaryVariantContentProps["variant"]
): LinkItem[] {
  const links: LinkItem[] = [
    {
      label: `See the main £${salary.toLocaleString("en-GB")} after-tax page`,
      href: `/${salary}-after-tax-uk`,
    },
    {
      label: "Compare salary outcomes interactively",
      href: "/compare-salary",
    },
    {
      label: "Reverse from a monthly target",
      href: "/reverse-tax",
    },
  ];

  if (variant === "student-loan") {
    links[2] = {
      label: "Understand payslip deductions",
      href: "/payslip-explained",
    };
  }

  return links;
}

function getVariantRetentionAction(
  salary: number,
  variant: SalaryVariantContentProps["variant"]
): LinkItem {
  if (variant === "monthly") {
    return {
      label: `Save or revisit the £${salary.toLocaleString(
        "en-GB"
      )} monthly salary route`,
      href: "/calculator",
    };
  }

  if (variant === "student-loan") {
    return {
      label: "Save this salary route and compare deduction impact later",
      href: "/compare-salary",
    };
  }

  return {
    label: "Explore more Scotland and UK salary routes",
    href: "/salary-hub",
  };
}

export default function SalaryVariantContent({
  salary,
  input,
  result,
  variant,
  title,
  intro,
}: SalaryVariantContentProps) {
  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const primaryAction = getVariantPrimaryAction(salary, variant);
  const adjacentLinks = getVariantAdjacentLinks(salary, variant);
  const understandingLinks = getVariantUnderstandingLinks(salary, variant);
  const retentionAction = getVariantRetentionAction(salary, variant);

  const regionLabel =
    input.region === "scotland"
      ? "Scotland rules"
      : "England, Wales & Northern Ireland rules";

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                {getVariantLabel(variant)}
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                {title}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                {intro}
              </p>
            </div>

            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              {regionLabel}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-[1.02fr_0.98fr] sm:p-8">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Variant salary outcome
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {formatCurrency(result.netMonthly)}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              estimated monthly take-home
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Net yearly pay
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.netAnnual)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Gross salary
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.grossAnnual)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Total deductions
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(totalDeductions)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Keep rate
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {keepPercent.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Variant reading
            </p>

            <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
              <p>
                A salary of <strong>£{salary.toLocaleString("en-GB")}</strong>{" "}
                under this variant produces about{" "}
                <strong>{formatCurrency(result.netMonthly)}</strong> a month
                after deductions.
              </p>

              <p>
                Around <strong>{formatCurrency(totalDeductions)}</strong> a year
                is lost to tax and deductions before the money becomes usable
                take-home pay.
              </p>

              <p>
                This variant matters because users often need to understand how
                the same salary changes under a different framing — monthly,
                Scotland-specific, or student-loan affected.
              </p>

              <p>
                The next smart move is usually to compare this reading with the
                main salary page, a nearby salary band, or a reverse monthly
                target.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                href={`/${salary}-after-tax-uk`}
                className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
              >
                View the main after-tax salary page
              </Link>

              <Link
                href="/compare-salary"
                className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
              >
                Compare salary outcomes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Move deeper from this variant page"
        description="Use nearby salary routes, comparison tools, or reverse planning to understand whether this salary meaningfully changes under different conditions."
        primaryAction={primaryAction}
        adjacentLinks={adjacentLinks}
        understandingLinks={understandingLinks}
        retentionAction={retentionAction}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href={`/${salary}-after-tax-uk`}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            View the main salary route
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Return to the standard after-tax page for this salary.
          </p>
        </Link>

        <Link
          href="/compare-salary"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare salary outcomes
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Test whether another salary band changes monthly life enough.
          </p>
        </Link>

        <Link
          href="/reverse-tax"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Reverse from a target income
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Start from the monthly amount you actually want to keep.
          </p>
        </Link>
      </section>
    </div>
  );
}