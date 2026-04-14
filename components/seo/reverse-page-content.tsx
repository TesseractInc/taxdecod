"use client";

import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";

type ReversePageContentProps = {
  targetMonthlyNet: number;
  targetAnnualNet: number;
  grossAnnual: number;
  input: CalculatorInput;
  result: TakeHomeResult;
  totalDeductions: number;
  keepPercent: number;
};

function getPrimaryAction(grossAnnual: number, targetMonthlyNet: number) {
  if (grossAnnual >= 45000) {
    return {
      label: "Compare this required salary against a nearby salary band",
      href: "/compare-salary",
    };
  }

  if (targetMonthlyNet >= 2500) {
    return {
      label: "Open the full salary calculator for this result",
      href: `/${Math.round(grossAnnual)}-after-tax-uk`,
    };
  }

  return {
    label: "Use the interactive reverse calculator",
    href: "/reverse-tax",
  };
}

function getAdjacentLinks(targetMonthlyNet: number) {
  const nearbyTargets = [
    targetMonthlyNet - 200,
    targetMonthlyNet - 100,
    targetMonthlyNet + 100,
    targetMonthlyNet + 200,
  ].filter((value) => value >= 1000);

  return nearbyTargets.slice(0, 4).map((amount) => ({
    label: `What salary gives £${amount.toLocaleString("en-GB")} take-home per month?`,
    href: `/monthly-take-home/${amount}`,
  }));
}

function getUnderstandingLinks(grossAnnual: number, targetMonthlyNet: number) {
  return [
    {
      label: `See £${Math.round(grossAnnual).toLocaleString("en-GB")} after tax`,
      href: `/${Math.round(grossAnnual)}-after-tax-uk`,
    },
    {
      label: "Use the interactive reverse calculator",
      href: "/reverse-tax",
    },
    {
      label: "Compare salary outcomes",
      href: "/compare-salary",
    },
  ];
}

function getRetentionAction(targetMonthlyNet: number) {
  return {
    label: `Save or revisit the £${targetMonthlyNet.toLocaleString(
      "en-GB"
    )}/month planning route`,
    href: "/reverse-tax",
  };
}

export default function ReversePageContent({
  targetMonthlyNet,
  targetAnnualNet,
  grossAnnual,
  input,
  result,
  totalDeductions,
  keepPercent,
}: ReversePageContentProps) {
  const primaryAction = getPrimaryAction(grossAnnual, targetMonthlyNet);
  const adjacentLinks = getAdjacentLinks(targetMonthlyNet);
  const understandingLinks = getUnderstandingLinks(
    grossAnnual,
    targetMonthlyNet
  );
  const retentionAction = getRetentionAction(targetMonthlyNet);

  const targetTone =
    targetMonthlyNet >= 4000
      ? "higher-target"
      : targetMonthlyNet >= 2500
      ? "mid-target"
      : "entry-target";

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
                Reverse salary outcome
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                What salary you need for £{targetMonthlyNet.toLocaleString("en-GB")} a month
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                Reverse salary planning starts from the amount you actually want to
                keep each month, then works backwards to the gross salary needed
                after tax and deductions.
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
              Required gross salary
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {formatCurrency(grossAnnual)}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              estimated gross salary needed
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Target monthly take-home
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(targetMonthlyNet)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Target annual take-home
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(targetAnnualNet)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Estimated keep rate
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {keepPercent.toFixed(0)}%
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
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Decision reading
            </p>

            <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
              <p>
                To take home about{" "}
                <strong>{formatCurrency(targetMonthlyNet)}</strong> a month, you
                need an estimated gross salary of{" "}
                <strong>{formatCurrency(grossAnnual)}</strong>.
              </p>

              <p>
                That means around <strong>{formatCurrency(totalDeductions)}</strong>{" "}
                is lost each year to tax and deductions before the money becomes
                usable net income.
              </p>

              <p>
                This looks like a{" "}
                <strong>
                  {targetTone === "higher-target"
                    ? "more ambitious monthly target"
                    : targetTone === "mid-target"
                    ? "mid-range planning target"
                    : "foundational monthly target"}
                </strong>{" "}
                in practical salary-planning terms.
              </p>

              <p>
                Reverse planning is strongest when users care more about monthly
                affordability, savings, rent, and daily life than about gross
                salary as a headline number.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                href={`/${Math.round(grossAnnual)}-after-tax-uk`}
                className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
              >
                View the full salary breakdown
              </Link>

              <Link
                href="/compare-salary"
                className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
              >
                Compare this against another salary
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Move deeper from this reverse salary result"
        description="The smartest next step is usually to compare this required salary with nearby salary bands, inspect the salary breakdown in full, or test a slightly different monthly target."
        primaryAction={primaryAction}
        adjacentLinks={adjacentLinks}
        understandingLinks={understandingLinks}
        retentionAction={retentionAction}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/reverse-tax"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Use the interactive reverse calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Change your monthly target and assumptions in a more flexible way.
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
            See whether nearby salary bands make a meaningful monthly difference.
          </p>
        </Link>

        <Link
          href="/salary-hub"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Explore more salary routes
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Browse salary pages, hourly routes, benchmark pages, and monthly targets.
          </p>
        </Link>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Underlying salary result
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Estimated monthly take-home
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(result.netMonthly)}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              under the current reverse-planning assumptions
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Estimated annual take-home
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(result.netAnnual)}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              after tax and deductions
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}