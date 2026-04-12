"use client";

import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";

type ComparisonPageContentProps = {
  salaryA: number;
  salaryB: number;
  resultA: TakeHomeResult;
  resultB: TakeHomeResult;
  grossDifference: number;
  netAnnualDifference: number;
  netMonthlyDifference: number;
  taxDrag: number;
  keepPercent: number;
  taxDragPercent: number;
};

function getNearbyComparisonLinks(salaryA: number, salaryB: number) {
  const candidates = [
    [salaryA, salaryB + 5000],
    [salaryA, salaryB + 10000],
    [salaryA + 5000, salaryB + 5000],
    [salaryA + 10000, salaryB + 10000],
    [salaryA - 5000, salaryB],
  ].filter(([a, b]) => a >= 10000 && b > a);

  const seen = new Set<string>();

  return candidates
    .filter(([a, b]) => {
      const key = `${a}-${b}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(([a, b]) => ({
      label: `Compare £${a.toLocaleString("en-GB")} vs £${b.toLocaleString(
        "en-GB"
      )} after tax`,
      href: `/compare/${a}-vs-${b}-after-tax`,
    }));
}

export default function ComparisonPageContent({
  salaryA,
  salaryB,
  resultA,
  resultB,
  grossDifference,
  netAnnualDifference,
  netMonthlyDifference,
  taxDrag,
  keepPercent,
  taxDragPercent,
}: ComparisonPageContentProps) {
  const nearbyLinks = getNearbyComparisonLinks(salaryA, salaryB);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Salary comparison breakdown
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            £{salaryA.toLocaleString("en-GB")} vs £{salaryB.toLocaleString("en-GB")} after tax
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
            This page compares what really changes when you move from{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              £{salaryA.toLocaleString("en-GB")}
            </strong>{" "}
            to{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              £{salaryB.toLocaleString("en-GB")}
            </strong>{" "}
            in the UK, focusing on actual take-home pay rather than just gross
            salary.
          </p>
        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-[1.02fr_0.98fr] sm:p-8">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Real monthly gain
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 sm:text-5xl">
              {formatCurrency(netMonthlyDifference)}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              That is the estimated extra monthly take-home pay created by moving
              from £{salaryA.toLocaleString("en-GB")} to £{salaryB.toLocaleString("en-GB")}.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Net annual gain
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(netAnnualDifference)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  You actually keep
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {keepPercent.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Comparison summary
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Gross salary increase
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(grossDifference)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Lost to tax drag
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(taxDrag)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Tax drag percentage
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {taxDragPercent.toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                This is why salary comparisons should be judged by real take-home
                change, not just by the bigger gross number in the offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            £{salaryA.toLocaleString("en-GB")} net monthly
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {formatCurrency(resultA.netMonthly)}
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            £{salaryB.toLocaleString("en-GB")} net monthly
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {formatCurrency(resultB.netMonthly)}
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            £{salaryA.toLocaleString("en-GB")} net yearly
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {formatCurrency(resultA.netAnnual)}
          </p>
        </div>

        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            £{salaryB.toLocaleString("en-GB")} net yearly
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {formatCurrency(resultB.netAnnual)}
          </p>
        </div>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Decision insight
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          What the salary jump really gives you
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
          <p>
            Moving from{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              £{salaryA.toLocaleString("en-GB")}
            </strong>{" "}
            to{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              £{salaryB.toLocaleString("en-GB")}
            </strong>{" "}
            adds{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {formatCurrency(grossDifference)}
            </strong>{" "}
            in gross salary, but the real annual gain is only{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {formatCurrency(netAnnualDifference)}
            </strong>
            .
          </p>

          <p>
            In practical terms, that works out to about{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {formatCurrency(netMonthlyDifference)}
            </strong>{" "}
            more per month after deductions.
          </p>

          <p>
            Around{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {formatCurrency(taxDrag)}
            </strong>{" "}
            of the gross increase is absorbed by tax and deductions, which is
            about{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {taxDragPercent.toFixed(0)}%
            </strong>{" "}
            of the increase.
          </p>
        </div>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Common questions
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Is £{salaryB.toLocaleString("en-GB")} really much better than £{salaryA.toLocaleString("en-GB")}?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              It depends on the real take-home difference. On this estimate, the
              jump gives about {formatCurrency(netMonthlyDifference)} more per
              month.
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Why is the real gain smaller than the gross difference?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Because income tax, National Insurance, pension, and other payroll
              deductions reduce how much of the increase you actually keep.
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Why might my result be different?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Your actual result can differ based on tax code, pension setup,
              student loan plan, salary sacrifice, benefits, bonus timing, or
              regional tax differences.
            </p>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Explore related comparison pages"
        description="These nearby comparison pages help users test whether a slightly different salary jump creates a more meaningful take-home change."
        links={nearbyLinks}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/compare-salary"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Interactive comparison tool
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Enter your own salary pair and compare live.
          </p>
        </Link>

        <Link
          href="/reverse-tax"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Reverse calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Find the salary needed to hit a target monthly take-home.
          </p>
        </Link>

        <Link
          href="/salary-hub"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Explore salary hub
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Browse more salary levels and linked take-home pages.
          </p>
        </Link>
      </section>
    </div>
  );
}