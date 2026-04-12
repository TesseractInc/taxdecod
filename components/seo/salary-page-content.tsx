"use client";

import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";
import {
  getDecisionLinks,
  getRelatedSalaryLinks,
  getSalaryIntentLinks,
  getVariantLinks,
} from "../../components/seo/internal-links";

type Props = {
  salary: number;
  input: CalculatorInput;
  result: TakeHomeResult;
  monthlyGross: number;
  weeklyGross: number;
  weeklyNet: number;
};

export default function SalaryPageContent({
  salary,
  input,
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

  const biggestDeduction = [
    { label: "Income Tax", value: result.incomeTaxAnnual },
    { label: "National Insurance", value: result.nationalInsuranceAnnual },
    { label: "Pension", value: result.pensionAnnual },
    { label: "Student Loan", value: result.studentLoanAnnual },
  ]
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)[0];

  const relatedSalaryLinks = getRelatedSalaryLinks(salary);
  const variantLinks = getVariantLinks(salary);
  const decisionLinks = getDecisionLinks(salary);
  const intentLinks = getSalaryIntentLinks(salary);

  const regionLabel =
    input.region === "scotland"
      ? "Scotland salary rules"
      : "England, Wales & Northern Ireland rules";

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Salary reality
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                What {formatCurrency(salary)} actually turns into after tax
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                A salary of {formatCurrency(salary)} sounds meaningful in
                isolation. But what shapes real life is the take-home pay that
                reaches you after income tax, National Insurance, pension, and
                student loan deductions.
              </p>
            </div>

            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              {regionLabel}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-[1.05fr_0.95fr] sm:p-8">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Your monthly salary reality
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {formatCurrency(result.netMonthly)}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              That is the estimated monthly amount you keep from a gross salary
              of {formatCurrency(salary)} after deductions.
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
                  You keep
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {keepPercent.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Deduction reading
            </p>

            <div className="mt-5 space-y-3">
              {[
                ["Income Tax", result.incomeTaxAnnual],
                ["National Insurance", result.nationalInsuranceAnnual],
                ["Pension", result.pensionAnnual],
                ["Student Loan", result.studentLoanAnnual],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900"
                >
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {label}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(Number(value))}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Biggest deduction
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {biggestDeduction?.label ?? "No major deduction"}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {biggestDeduction
                  ? `${biggestDeduction.label} is the biggest drag on this salary result at ${formatCurrency(
                      biggestDeduction.value
                    )} per year.`
                  : "This page does not currently show one standout deduction."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Gross monthly pay", formatCurrency(monthlyGross)],
          ["Weekly gross pay", formatCurrency(weeklyGross)],
          ["Weekly take-home", formatCurrency(weeklyNet)],
          ["Total deductions", formatCurrency(totalDeductions)],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Important insight
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          A higher salary does not translate 1:1 into a better monthly life
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
          <p>
            At {formatCurrency(salary)}, what matters most is not the gross
            salary on paper but the estimated take-home pay of{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {formatCurrency(result.netMonthly)}
            </strong>{" "}
            per month.
          </p>

          <p>
            That is the number that shapes rent, bills, transport, savings, and
            day-to-day life. It is also why people often overestimate how much a
            raise or offer change will really improve their situation.
          </p>

          <p>
            On this salary, you lose around{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {formatCurrency(totalDeductions)}
            </strong>{" "}
            per year to deductions, which means you keep roughly{" "}
            <strong className="text-slate-900 dark:text-slate-100">
              {keepPercent.toFixed(0)}%
            </strong>{" "}
            of your gross income.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/compare-salary"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare this salary
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            See whether a higher or lower salary creates a meaningful monthly
            difference after deductions.
          </p>
        </Link>

        <Link
          href="/reverse-tax"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Reverse from take-home
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Start from the monthly amount you want to keep and work backwards to
            the salary it needs.
          </p>
        </Link>

        <Link
          href="/salary-hub"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Explore more salary pages
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Move into nearby salary levels, scenario pages, and related take-home
            routes.
          </p>
        </Link>
      </section>

      <InternalLinkBlock
        title="Compare nearby salaries"
        description="These linked salary pages help users see whether a small change in gross pay meaningfully improves take-home pay."
        links={relatedSalaryLinks}
      />

      <InternalLinkBlock
        title="Explore more salary scenarios"
        description="Use these pages to move into monthly, Scotland, student loan, calculator, and salary-hub paths."
        links={variantLinks}
      />

      <InternalLinkBlock
        title="Make the next salary decision"
        description="These paths are useful when the first answer is not enough and you want to compare, reverse, or push into a more practical salary decision."
        links={decisionLinks}
      />

      <InternalLinkBlock
        title="Continue with related salary questions"
        description="These intent-led paths help keep users moving through the platform in a way that feels natural and useful."
        links={intentLinks}
      />
    </div>
  );
}