"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import Container from "@/components/ui/container";
import TaxYearTrustBar from "@/components/shared/tax-year-trust-bar";
import PdfReportStrip from "@/components/shared/pdf-report-strip";
import { calculateTakeHome } from "@/lib/tax/calculators/take-home";
import { formatCurrency } from "@/lib/tax/utils/currency";
import { TRUST_COPY, getStandardUkEmployeeInput } from "@/lib/tax/config";

export default function CompareSalaryPage() {
  const [salaryA, setSalaryA] = useState(40000);
  const [salaryB, setSalaryB] = useState(50000);

  const inputA = useMemo(
    () =>
      getStandardUkEmployeeInput({
        salary: salaryA,
        payPeriod: "yearly",
        studentLoanPlan: "plan2",
      }),
    [salaryA]
  );

  const inputB = useMemo(
    () =>
      getStandardUkEmployeeInput({
        salary: salaryB,
        payPeriod: "yearly",
        studentLoanPlan: "plan2",
      }),
    [salaryB]
  );

  const resultA = useMemo(() => calculateTakeHome(inputA), [inputA]);
  const resultB = useMemo(() => calculateTakeHome(inputB), [inputB]);

  const grossDifference = salaryB - salaryA;
  const netDiff = resultB.netAnnual - resultA.netAnnual;
  const monthlyDiff = resultB.netMonthly - resultA.netMonthly;
  const taxOnIncrease = grossDifference - netDiff;

  const percentGain =
    grossDifference > 0 ? (netDiff / grossDifference) * 100 : 0;

  const taxLossPercent =
    grossDifference > 0 ? (taxOnIncrease / grossDifference) * 100 : 0;

  const reportInput =
    salaryB >= salaryA ? inputB : inputA;

  const reportResult =
    salaryB >= salaryA ? resultB : resultA;

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-12 sm:py-14">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
              Salary decision tool
            </p>

            <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
              Compare two salaries
            </h1>

            <p className="mt-4 text-lg leading-8 app-copy">
              See what actually changes after tax, not just the headline number.
              This page helps you judge whether a salary jump is genuinely worth
              it in real monthly terms.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.comparisonPage.description}
              points={[...TRUST_COPY.comparisonPage.points]}
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="app-card p-6">
              <p className="text-sm app-subtle">Salary A</p>
              <input
                type="number"
                value={salaryA}
                onChange={(e) => setSalaryA(Number(e.target.value) || 0)}
                className="app-input mt-3"
              />
              <p className="mt-3 text-xs app-subtle">
                Starting salary or current offer.
              </p>
            </div>

            <div className="app-card p-6">
              <p className="text-sm app-subtle">Salary B</p>
              <input
                type="number"
                value={salaryB}
                onChange={(e) => setSalaryB(Number(e.target.value) || 0)}
                className="app-input mt-3"
              />
              <p className="mt-3 text-xs app-subtle">
                New salary or target offer to compare against.
              </p>
            </div>
          </div>

          <div className="mt-10 app-card-strong rounded-[32px] p-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm app-accent">Net difference</p>
                <h2
                  className={`mt-3 text-4xl font-bold sm:text-5xl ${
                    netDiff >= 0 ? "money-positive" : "money-negative"
                  }`}
                >
                  {netDiff >= 0 ? "+" : "-"}
                  {formatCurrency(Math.abs(netDiff))}
                </h2>
                <p className="mt-2 text-sm app-copy">
                  {monthlyDiff >= 0 ? "+" : "-"}
                  {formatCurrency(Math.abs(monthlyDiff))} per month difference
                </p>
              </div>

              <div className="rounded-2xl app-soft px-4 py-4">
                <p className="text-xs uppercase tracking-[0.16em] app-subtle">
                  Gross difference
                </p>
                <p className="mt-2 text-2xl font-semibold app-title">
                  {formatCurrency(Math.abs(grossDifference))}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="app-soft rounded-2xl p-4">
                <p className="text-xs app-subtle">Extra you actually keep</p>
                <p className="mt-1 font-semibold app-title">
                  {grossDifference > 0 ? `${percentGain.toFixed(0)}%` : "—"}
                </p>
              </div>

              <div className="app-soft rounded-2xl p-4">
                <p className="text-xs app-subtle">Lost to tax</p>
                <p className="mt-1 font-semibold app-title">
                  {grossDifference > 0 ? formatCurrency(taxOnIncrease) : "—"}
                </p>
              </div>

              <div className="app-soft rounded-2xl p-4">
                <p className="text-xs app-subtle">Tax drag on increase</p>
                <p className="mt-1 font-semibold app-title">
                  {grossDifference > 0 ? `${taxLossPercent.toFixed(0)}%` : "—"}
                </p>
              </div>

              <div className="app-soft rounded-2xl p-4">
                <p className="text-xs app-subtle">Real monthly gain</p>
                <p className="mt-1 font-semibold app-title">
                  {monthlyDiff >= 0 ? "+" : "-"}
                  {formatCurrency(Math.abs(monthlyDiff))}
                </p>
              </div>
            </div>

            <div className="mt-8 max-w-3xl rounded-[24px] border border-[var(--line)] bg-[var(--card-soft)] px-5 py-5">
              <p className="text-sm leading-8 app-copy">
                {netDiff > 0 ? (
                  <>
                    Increasing your salary from{" "}
                    <strong className="app-title">
                      £{salaryA.toLocaleString("en-GB")}
                    </strong>{" "}
                    to{" "}
                    <strong className="app-title">
                      £{salaryB.toLocaleString("en-GB")}
                    </strong>{" "}
                    gives you about{" "}
                    <strong className="app-title">
                      {formatCurrency(Math.abs(monthlyDiff))}
                    </strong>{" "}
                    extra per month. That means a noticeable part of the gross
                    increase is absorbed by tax and deductions.
                  </>
                ) : netDiff < 0 ? (
                  <>
                    Moving from{" "}
                    <strong className="app-title">
                      £{salaryA.toLocaleString("en-GB")}
                    </strong>{" "}
                    to{" "}
                    <strong className="app-title">
                      £{salaryB.toLocaleString("en-GB")}
                    </strong>{" "}
                    reduces your take-home pay by about{" "}
                    <strong className="app-title">
                      {formatCurrency(Math.abs(monthlyDiff))}
                    </strong>{" "}
                    per month.
                  </>
                ) : (
                  <>
                    These two salaries produce roughly the same take-home result
                    under the current assumptions.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <PdfReportStrip
              title="Download the stronger-side salary report"
              description="Use the PDF to save the more valuable side of this comparison, then bring it into budgeting or offer decisions."
              values={reportInput}
              result={reportResult}
              filename="taxdecod-compare-salary-report.pdf"
            />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Link href="/reverse-tax" className="app-card p-6">
              <p className="font-semibold app-title">Reverse salary</p>
              <p className="mt-2 text-sm app-copy">
                Find what salary you need to hit your target income.
              </p>
            </Link>

            <Link href="/calculator" className="app-card p-6">
              <p className="font-semibold app-title">Main calculator</p>
              <p className="mt-2 text-sm app-copy">
                Explore full salary breakdown and salary meaning.
              </p>
            </Link>

            <Link href="/salary-hub" className="app-card p-6">
              <p className="font-semibold app-title">Explore salary pages</p>
              <p className="mt-2 text-sm app-copy">
                Browse more salary levels, variants, and take-home pages.
              </p>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}