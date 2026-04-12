"use client";

import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";
import {
  getDecisionLinks,
  getRelatedSalaryLinks,
  getVariantLinks,
} from "../../components/seo/internal-links";

type SalaryVariantContentProps = {
  title: string;
  intro: string;
  salary: number;
  result: TakeHomeResult;
  bullets: string[];
};

export default function SalaryVariantContent({
  title,
  intro,
  salary,
  result,
  bullets,
}: SalaryVariantContentProps) {
  const relatedSalaryLinks = getRelatedSalaryLinks(salary);
  const variantLinks = getVariantLinks(salary);
  const decisionLinks = getDecisionLinks(salary);

  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const biggestDeduction = [
    { label: "Income Tax", value: result.incomeTaxAnnual },
    { label: "National Insurance", value: result.nationalInsuranceAnnual },
    { label: "Pension", value: result.pensionAnnual },
    { label: "Student Loan", value: result.studentLoanAnnual },
  ]
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)[0];

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Focused salary scenario
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            {title}
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
            {intro}
          </p>
        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-[1.02fr_0.98fr] sm:p-8">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Quick reality
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {formatCurrency(result.netMonthly)}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              For this salary scenario, the estimated monthly take-home pay is{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(result.netMonthly)}
              </strong>
              , and you keep roughly{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {keepPercent.toFixed(0)}%
              </strong>{" "}
              of gross pay.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Net annual pay
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.netAnnual)}
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
              Deduction pressure
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
                  ? `${biggestDeduction.label} is currently the strongest pressure on this result at ${formatCurrency(
                      biggestDeduction.value
                    )} per year.`
                  : "There is no single standout deduction in this scenario."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Gross annual salary", formatCurrency(result.grossAnnual)],
          ["Estimated net annual pay", formatCurrency(result.netAnnual)],
          ["Estimated net monthly pay", formatCurrency(result.netMonthly)],
          ["You keep", `${keepPercent.toFixed(0)}%`],
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

      <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            What this means
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Use this page to make a better salary decision
          </h2>

          <div className="mt-6 space-y-3">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              >
                {bullet}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Important note
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-400">
              These are estimated results. Your actual payslip may differ based
              on tax code changes, pension structure, salary sacrifice, student
              loan setup, benefits, payroll treatment, overtime, or bonus timing.
            </p>
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-slate-50/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Decision prompt
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-400">
              The best way to use TaxDecod is to move across more than one
              scenario. Check the full salary breakdown, compare another salary,
              or reverse a target monthly income so you can see what actually
              changes.
            </p>
          </section>
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
            See how another salary changes the real monthly outcome after tax.
          </p>
        </Link>

        <Link
          href="/reverse-tax"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Reverse your target income
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Work backwards from the monthly amount you want to keep.
          </p>
        </Link>

        <Link
          href="/salary-hub"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Explore more salary scenarios
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Move into nearby salary pages and related variations from here.
          </p>
        </Link>
      </section>

      <InternalLinkBlock
        title="Compare nearby salaries"
        description="Use these nearby salary pages to see whether a small change in gross pay creates a meaningful take-home difference."
        links={relatedSalaryLinks}
      />

      <InternalLinkBlock
        title="Explore related salary scenarios"
        description="Jump into monthly, student loan, Scotland, calculator, and salary-hub paths."
        links={variantLinks}
      />

      <InternalLinkBlock
        title="Make the next salary decision"
        description="These links help users move from one answer into comparison, reverse planning, and broader salary exploration."
        links={decisionLinks}
      />
    </div>
  );
}