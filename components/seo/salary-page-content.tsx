"use client";

import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";
import {
  getAdjacentScenarioLinks,
  getDecisionLinks,
  getPrimaryNextAction,
  getRelatedSalaryLinks,
  getRetentionLink,
  getSalaryIntentLinks,
  getUnderstandingLinks,
  getVariantLinks,
} from "../../components/seo/internal-links";
import { getProgrammaticSalaryContent } from "./programmatic-salary-content";

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

  const primaryAction = getPrimaryNextAction(salary);
  const adjacentLinks = getAdjacentScenarioLinks(salary);
  const understandingLinks = getUnderstandingLinks(salary);
  const retentionAction = getRetentionLink(salary);

  const regionLabel =
    input.region === "scotland"
      ? "Scotland salary rules"
      : "England, Wales & Northern Ireland rules";

  const insightPack = getProgrammaticSalaryContent({
    salary,
    netMonthly: result.netMonthly,
    netAnnual: result.netAnnual,
    keepPercent,
  });

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
                {insightPack.headline}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                {insightPack.summary}
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
                  Weekly take-home
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(weeklyNet)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Gross monthly pay
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(monthlyGross)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Gross weekly pay
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(weeklyGross)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Deduction pressure
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
                  Biggest deduction
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {biggestDeduction?.label ?? "No major deduction visible"}
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                {insightPack.practicalMeaning}
              </p>
            </div>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Move deeper from this salary result"
        description="This page should not be a dead end. From here, the best route is either to compare, reverse-plan, understand the deductions better, or move into nearby salary scenarios."
        primaryAction={primaryAction}
        adjacentLinks={adjacentLinks}
        understandingLinks={understandingLinks}
        retentionAction={retentionAction}
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            What this salary means
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {formatCurrency(salary)} is only useful when the take-home is understood
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
            <p>{insightPack.practicalMeaning}</p>
            <p>{insightPack.thresholdNote}</p>
            <p>{insightPack.decisionPrompt}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {insightPack.qualitySignals.map((item) => (
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
            Salary variants
          </p>

          <div className="mt-5 grid gap-3">
            {variantLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Compare and decide
          </p>

          <div className="mt-5 grid gap-3">
            {decisionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Related intent paths
          </p>

          <div className="mt-5 grid gap-3">
            {intentLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Nearby salary pages
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {relatedSalaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}