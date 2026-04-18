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

function getPrimaryAction(
  salaryA: number,
  salaryB: number,
  netMonthlyDifference: number
) {
  if (netMonthlyDifference < 200) {
    return {
      label: "Reverse from the monthly income you actually want",
      href: "/reverse-tax",
    };
  }

  if (salaryB >= 50000) {
    return {
      label: `Open the full breakdown for £${salaryB.toLocaleString("en-GB")}`,
      href: `/${salaryB}-after-tax-uk`,
    };
  }

  return {
    label: "Compare another nearby salary jump",
    href: "/compare-salary",
  };
}

function getAdjacentLinks(salaryA: number, salaryB: number) {
  const nearbyPairs = [
    [salaryA, salaryB + 5000],
    [salaryA + 5000, salaryB],
    [salaryA, salaryB + 10000],
    [salaryA + 10000, salaryB + 10000],
  ]
    .filter(([a, b]) => a < b)
    .slice(0, 4);

  return nearbyPairs.map(([a, b]) => ({
    label: `Compare £${a.toLocaleString("en-GB")} vs £${b.toLocaleString("en-GB")}`,
    href: `/compare/${a}-vs-${b}-after-tax`,
  }));
}

function getUnderstandingLinks(salaryA: number, salaryB: number) {
  return [
    {
      label: `See £${salaryA.toLocaleString("en-GB")} after tax`,
      href: `/${salaryA}-after-tax-uk`,
    },
    {
      label: `See £${salaryB.toLocaleString("en-GB")} after tax`,
      href: `/${salaryB}-after-tax-uk`,
    },
    {
      label: "Use the interactive salary comparison tool",
      href: "/compare-salary",
    },
  ];
}

function getRetentionAction() {
  return {
    label: "Save this salary comparison route and continue later",
    href: "/compare-salary",
  };
}

function getDifferenceTone(netMonthlyDifference: number) {
  if (netMonthlyDifference >= 400) return "strong";
  if (netMonthlyDifference >= 220) return "moderate";
  return "weak";
}

function getDecisionHeadline(
  salaryA: number,
  salaryB: number,
  netMonthlyDifference: number,
  keepPercent: number
) {
  const grossJump = salaryB - salaryA;

  if (netMonthlyDifference < 180) {
    return "This is a real gross jump, but the monthly gain is still relatively contained";
  }

  if (grossJump === 5000 && netMonthlyDifference < 260) {
    return "This is the kind of raise that often looks bigger on paper than it feels in monthly life";
  }

  if (keepPercent < 58) {
    return "A meaningful share of this salary jump is being absorbed by deductions";
  }

  if (salaryA === 50000 && salaryB === 60000) {
    return "This jump is meaningful, but it should be judged by retained value rather than headline prestige";
  }

  return "This salary jump is strong enough to create a more visible monthly difference";
}

function getDecisionBody(
  salaryA: number,
  salaryB: number,
  netMonthlyDifference: number,
  grossDifference: number,
  keepPercent: number,
  taxDrag: number
) {
  if (salaryA === 30000 && salaryB === 35000) {
    return `Moving from £30,000 to £35,000 looks like a clean £5,000 pay rise, but the more useful question is what survives into monthly take-home. At roughly ${formatCurrency(
      netMonthlyDifference
    )} more per month, this is usually a helpful improvement rather than a life-changing one, so role quality and progression still matter a lot.`;
  }

  if (salaryA === 40000 && salaryB === 50000) {
    return `Moving from £40,000 to £50,000 is a psychologically strong jump because the gross increase is large and the higher figure feels materially different. But even here, around ${formatCurrency(
      taxDrag
    )} of the gross increase is absorbed by deductions, so the real monthly gain of about ${formatCurrency(
      netMonthlyDifference
    )} matters more than the headline number.`;
  }

  if (salaryA === 50000 && salaryB === 60000) {
    return `Moving from £50,000 to £60,000 is exactly the type of comparison where users need to think in retained value rather than gross status. The salary is clearly stronger, but only about ${keepPercent.toFixed(
      0
    )}% of the gross jump is actually being kept, which is why this comparison deserves a more deliberate reading than the headline suggests.`;
  }

  if (netMonthlyDifference < 180) {
    return `Moving from £${salaryA.toLocaleString("en-GB")} to £${salaryB.toLocaleString(
      "en-GB"
    )} increases gross salary by ${formatCurrency(
      grossDifference
    )}, but the estimated monthly gain is only about ${formatCurrency(
      netMonthlyDifference
    )}. This is usually the kind of jump that should be judged carefully against workload, commute, stress, and future progression.`;
  }

  if (keepPercent < 58) {
    return `Moving from £${salaryA.toLocaleString("en-GB")} to £${salaryB.toLocaleString(
      "en-GB"
    )} creates a real improvement, but a large share of the gain is lost to deductions. The smarter reading here is not “the higher salary wins automatically,” but “is the retained value strong enough to justify the change?”`;
  }

  return `Moving from £${salaryA.toLocaleString("en-GB")} to £${salaryB.toLocaleString(
    "en-GB"
  )} creates an estimated monthly gain of about ${formatCurrency(
    netMonthlyDifference
  )}. That is meaningful enough to matter, but it still deserves to be judged by retained monthly value rather than gross salary alone.`;
}

function getPracticalReading(
  salaryA: number,
  salaryB: number,
  netMonthlyDifference: number,
  differenceTone: string
) {
  if (salaryA === 30000 && salaryB === 35000) {
    return "In practical terms, this comparison is usually about whether a modest but useful improvement is enough to justify the move, not whether the second salary simply sounds better.";
  }

  if (salaryA === 40000 && salaryB === 50000) {
    return "In practical terms, this is often where users feel the jump more clearly, but it still needs to be judged against role quality, stress, and how much the next monthly result actually changes life.";
  }

  if (salaryA === 50000 && salaryB === 60000) {
    return "In practical terms, this kind of jump often looks impressive, but the real question is whether the stronger monthly result is worth the extra tax drag and whatever comes with the higher-paying role.";
  }

  if (differenceTone === "strong") {
    return "In practical terms, this comparison looks meaningfully stronger, but it should still be judged alongside workload, commute, benefits, and role quality.";
  }

  if (differenceTone === "moderate") {
    return "In practical terms, this comparison is useful, but not so strong that the gross number should decide the outcome by itself.";
  }

  return "In practical terms, this comparison looks relatively modest once deductions are applied, so the move should usually be judged with extra care.";
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
  const strongerSalary = salaryB;
  const weakerSalary = salaryA;

  const primaryAction = getPrimaryAction(
    salaryA,
    salaryB,
    netMonthlyDifference
  );
  const adjacentLinks = getAdjacentLinks(salaryA, salaryB);
  const understandingLinks = getUnderstandingLinks(salaryA, salaryB);
  const retentionAction = getRetentionAction();

  const differenceTone = getDifferenceTone(netMonthlyDifference);
  const decisionHeadline = getDecisionHeadline(
    salaryA,
    salaryB,
    netMonthlyDifference,
    keepPercent
  );
  const decisionBody = getDecisionBody(
    salaryA,
    salaryB,
    netMonthlyDifference,
    grossDifference,
    keepPercent,
    taxDrag
  );
  const practicalReading = getPracticalReading(
    salaryA,
    salaryB,
    netMonthlyDifference,
    differenceTone
  );

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Comparison outcome
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            What the jump from £{weakerSalary.toLocaleString("en-GB")} to £
            {strongerSalary.toLocaleString("en-GB")} really changes
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
            The important number is not the gross jump alone. It is the real
            monthly and annual increase that survives tax and deductions.
          </p>
        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-[1.02fr_0.98fr] sm:p-8">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Real gain after deductions
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {formatCurrency(netMonthlyDifference)}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              estimated extra per month
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Annual net difference
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(netAnnualDifference)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Gross difference
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(grossDifference)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  You actually keep
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {keepPercent.toFixed(0)}%
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Lost to deductions
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {taxDragPercent.toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Decision reading
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {decisionHeadline}
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Practical interpretation
            </p>

            <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
              <p>{decisionBody}</p>

              <p>{practicalReading}</p>

              <p>
                In practical terms, this comparison should usually be judged
                against workload, commute, role quality, benefits, and future
                progression — not gross pay alone.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                href={`/${salaryA}-after-tax-uk`}
                className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
              >
                View £{salaryA.toLocaleString("en-GB")} after tax
              </Link>

              <Link
                href={`/${salaryB}-after-tax-uk`}
                className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
              >
                View £{salaryB.toLocaleString("en-GB")} after tax
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Move deeper from this comparison"
        description="The best next step is to compare a nearby salary jump, inspect one salary in full detail, or reverse-plan the monthly income you actually want."
        primaryAction={primaryAction}
        adjacentLinks={adjacentLinks}
        understandingLinks={understandingLinks}
        retentionAction={retentionAction}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/compare-salary"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare another salary pair
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Use the interactive comparison tool for a more flexible salary jump test.
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
            Work backwards from the monthly amount you actually want to keep.
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
            Browse nearby salaries, hourly routes, monthly targets, and benchmark pages.
          </p>
        </Link>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Underlying salary readings
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              £{salaryA.toLocaleString("en-GB")} salary
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(resultA.netMonthly)}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              estimated monthly take-home
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              £{salaryB.toLocaleString("en-GB")} salary
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(resultB.netMonthly)}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              estimated monthly take-home
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}