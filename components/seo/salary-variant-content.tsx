"use client";

import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";
import {
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
      <section className="rounded-[30px] app-card-strong p-7">
        <p className="text-sm app-accent">Focused salary scenario</p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
          {title}
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-8 app-copy">{intro}</p>

        <div className="mt-6 rounded-[24px] app-soft p-5">
          <p className="text-sm app-subtle">Quick reality</p>
          <p className="mt-3 text-base leading-8 app-copy">
            For this salary scenario, you take home around{" "}
            <strong>{formatCurrency(result.netMonthly)}</strong> per month and
            keep roughly <strong>{keepPercent.toFixed(0)}%</strong> of your
            gross pay.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Gross annual salary", formatCurrency(result.grossAnnual)],
          ["Estimated net annual pay", formatCurrency(result.netAnnual)],
          ["Estimated net monthly pay", formatCurrency(result.netMonthly)],
          ["You keep", `${keepPercent.toFixed(0)}%`],
        ].map(([label, value]) => (
          <div key={label} className="app-card p-5">
            <p className="text-sm app-subtle">{label}</p>
            <p className="mt-3 text-2xl font-semibold app-title">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="app-card p-6">
          <p className="text-sm font-medium app-accent">Deduction pressure</p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            What shapes this result most
          </h2>

          <div className="mt-6 space-y-3">
            {[
              ["Income Tax", result.incomeTaxAnnual],
              ["National Insurance", result.nationalInsuranceAnnual],
              ["Pension", result.pensionAnnual],
              ["Student Loan", result.studentLoanAnnual],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-[20px] app-soft px-4 py-4"
              >
                <span className="text-sm app-copy">{label}</span>
                <span className="text-base font-semibold app-title">
                  {formatCurrency(Number(value))}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[22px] border p-5 app-soft">
            <p className="text-sm app-subtle">Biggest deduction</p>
            <p className="mt-2 text-lg font-semibold app-title">
              {biggestDeduction?.label ?? "No major deduction"}
            </p>
            <p className="mt-2 text-sm leading-7 app-copy">
              {biggestDeduction
                ? `${biggestDeduction.label} is currently the strongest drag on this salary result at ${formatCurrency(
                    biggestDeduction.value
                  )} per year.`
                : "This scenario does not currently show a major standout deduction."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <section className="app-card p-6">
            <p className="text-sm font-medium app-accent">What this means</p>
            <h2 className="mt-2 text-2xl font-semibold app-title">
              Use this page to make a better decision
            </h2>

            <div className="mt-5 space-y-3">
              {bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="rounded-[20px] app-soft px-4 py-4 text-sm leading-7 app-copy"
                >
                  {bullet}
                </div>
              ))}
            </div>
          </section>

          <section className="app-soft rounded-[24px] p-5">
            <p className="text-sm app-subtle">Important note</p>
            <p className="mt-3 text-sm leading-8 app-copy">
              These are estimated results. Your actual payslip can differ due to
              tax code changes, pension structure, salary sacrifice, student
              loan settings, overtime, bonus timing, benefits, or payroll
              treatment.
            </p>
          </section>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link href="/compare-salary" className="app-card p-5 hover-lift">
          <p className="font-semibold app-title">Compare this salary →</p>
          <p className="mt-2 text-sm app-copy">
            See how another salary changes your real take-home pay.
          </p>
        </Link>

        <Link href="/reverse-tax" className="app-card p-5 hover-lift">
          <p className="font-semibold app-title">Reverse your target →</p>
          <p className="mt-2 text-sm app-copy">
            Find what you need to earn to hit your desired monthly number.
          </p>
        </Link>

        <Link href="/salary-hub" className="app-card p-5 hover-lift">
          <p className="font-semibold app-title">Explore more salaries →</p>
          <p className="mt-2 text-sm app-copy">
            Browse nearby salary pages and related scenarios.
          </p>
        </Link>
      </section>

      <InternalLinkBlock
        title="Compare nearby salaries"
        description="Use these nearby salary pages to see whether a small change in gross pay makes a meaningful difference."
        links={relatedSalaryLinks}
      />

      <InternalLinkBlock
        title="Explore related salary scenarios"
        description="Jump into monthly, student loan, Scotland, and other linked salary variations."
        links={variantLinks}
      />

      <section className="rounded-[30px] app-card p-6">
        <p className="text-sm font-medium app-accent">Decision prompt</p>
        <h2 className="mt-2 text-2xl font-semibold app-title">
          Don’t stop at this one page
        </h2>
        <p className="mt-4 text-sm leading-8 app-copy">
          The best way to use TaxDecod is to explore more than one scenario.
          Check the full salary breakdown, compare another salary, or test a
          target monthly income so you can see what really changes.
        </p>
      </section>
    </div>
  );
}