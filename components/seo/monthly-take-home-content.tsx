"use client";

import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { TakeHomeResult } from "../../types/tax";
import { getMonthlyTakeHomeContent } from "components/seo/monthly-take-home-programmatic-content";

type Props = {
  targetMonthly: number;
  requiredSalary: number;
  result: TakeHomeResult;
  monthlyGross: number;
  weeklyGross: number;
  weeklyNet: number;
};

function getPracticalHeadline(targetMonthly: number) {
  if (targetMonthly <= 2000) {
    return `${formatCurrency(
      targetMonthly
    )} per month is usually about basic affordability and monthly breathing room`;
  }

  if (targetMonthly <= 2500) {
    return `${formatCurrency(
      targetMonthly
    )} per month is often where users start asking whether salary feels properly workable`;
  }

  if (targetMonthly <= 3000) {
    return `${formatCurrency(
      targetMonthly
    )} per month is often a lifestyle threshold, not just a number`;
  }

  if (targetMonthly <= 3500) {
    return `${formatCurrency(
      targetMonthly
    )} per month is where salary planning becomes more strategic`;
  }

  return `${formatCurrency(
    targetMonthly
  )} per month is a planning target that deserves proper salary comparison`;
}

function getDecisionReading(targetMonthly: number, requiredSalary: number) {
  if (targetMonthly <= 2000) {
    return `To take home around ${formatCurrency(
      targetMonthly
    )} per month, the estimated gross salary needed is ${formatCurrency(
      requiredSalary
    )}. At this level, the real question is usually whether the monthly result covers essentials and whether a nearby salary jump creates noticeably more breathing room.`;
  }

  if (targetMonthly <= 2500) {
    return `To take home around ${formatCurrency(
      targetMonthly
    )} per month, the estimated gross salary needed is ${formatCurrency(
      requiredSalary
    )}. This is often the point where monthly take-home starts to matter more than gross salary labels.`;
  }

  if (targetMonthly <= 3000) {
    return `To take home around ${formatCurrency(
      targetMonthly
    )} per month, the estimated gross salary needed is ${formatCurrency(
      requiredSalary
    )}. This is a common real-life target because users often anchor budgeting, rent, and saving decisions around this monthly level.`;
  }

  return `To take home around ${formatCurrency(
    targetMonthly
  )} per month, the estimated gross salary needed is ${formatCurrency(
    requiredSalary
  )}. At this level, the next useful question is usually whether the next monthly step up is worth the extra gross salary required to reach it.`;
}

export default function MonthlyTakeHomeContent({
  targetMonthly,
  requiredSalary,
  result,
  monthlyGross,
  weeklyGross,
  weeklyNet,
}: Props) {
  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0
      ? (result.netAnnual / result.grossAnnual) * 100
      : 0;

  const contentPack = getMonthlyTakeHomeContent({
    targetMonthly,
    requiredSalary,
    annualNet: result.netAnnual,
  });

  const lowerTarget = Math.max(targetMonthly - 500, 1000);
  const higherTarget = targetMonthly + 500;
  const lowerSalary = Math.max(requiredSalary - 5000, 15000);
  const higherSalary = requiredSalary + 5000;

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Monthly target reading
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              {getPracticalHeadline(targetMonthly)}
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
              {contentPack.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-[1.05fr_0.95fr] sm:p-8">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Required salary route
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {formatCurrency(requiredSalary)}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              That is the estimated gross salary needed to take home about{" "}
              {formatCurrency(targetMonthly)} per month under the default UK setup.
            </p>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Practical reading
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {getDecisionReading(targetMonthly, requiredSalary)}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Monthly gross pay
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(monthlyGross)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Weekly gross pay
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(weeklyGross)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Weekly take-home
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(weeklyNet)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Annual take-home
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.netAnnual)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Deduction and efficiency view
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Total deductions
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(totalDeductions)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Keep rate
                </span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {keepPercent.toFixed(0)}%
                </span>
              </div>

              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Monthly target
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(targetMonthly)}
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Why this target matters
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {contentPack.practicalMeaning}
              </p>
            </div>

            <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Decision prompt
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {contentPack.decisionPrompt}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            What this target means
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {formatCurrency(targetMonthly)} per month only becomes useful when the salary behind it is clear
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
            <p>{contentPack.practicalMeaning}</p>
            <p>{contentPack.thresholdNote}</p>
            <p>{contentPack.decisionPrompt}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {contentPack.qualitySignals.map((item) => (
              <div
                key={item}
                className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Best next routes
          </p>

          <div className="mt-5 grid gap-3">
            <Link
              href="/reverse-tax"
              className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
            >
              Open the full reverse salary calculator
            </Link>

            <Link
              href={`/compare/${requiredSalary}-vs-${higherSalary}-after-tax`}
              className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
            >
              Compare this salary against a higher route
            </Link>

            <Link
              href={`/${requiredSalary}-after-tax-uk`}
              className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
            >
              Inspect the required salary in full
            </Link>

            <Link
              href="/guides/how-much-salary-to-take-home-3000"
              className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
            >
              Read the take-home planning guide
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Nearby monthly targets and salary routes
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href={`/monthly-take-home/${lowerTarget}`}
            className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
          >
            Take home {formatCurrency(lowerTarget)} a month
          </Link>

          <Link
            href={`/monthly-take-home/${higherTarget}`}
            className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
          >
            Take home {formatCurrency(higherTarget)} a month
          </Link>

          <Link
            href={`/${lowerSalary}-after-tax-uk`}
            className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
          >
            See {formatCurrency(lowerSalary)} after tax
          </Link>

          <Link
            href={`/${higherSalary}-after-tax-uk`}
            className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
          >
            See {formatCurrency(higherSalary)} after tax
          </Link>
        </div>
      </section>
    </div>
  );
}