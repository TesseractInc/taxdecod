"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ReceiptText,
  SearchCheck,
  ShieldCheck,
  Wallet2,
} from "lucide-react";
import { formatCurrency } from "@/lib/tax/utils/currency";
import ToolInsightPanel from "@/components/shared/tool-insight-panel";

function estimateExpectedTax(annualSalary: number) {
  const personalAllowance = 12570;
  const basicRateLimit = 50270;

  if (annualSalary <= personalAllowance) return 0;

  const taxable = annualSalary - personalAllowance;
  const basicBand = Math.max(
    0,
    Math.min(taxable, basicRateLimit - personalAllowance)
  );
  const higherBand = Math.max(0, taxable - basicBand);

  return basicBand * 0.2 + higherBand * 0.4;
}

function getHeadline(difference: number) {
  if (difference > 1200) {
    return "There may be a meaningful overpayment signal worth checking properly";
  }
  if (difference > 300) {
    return "There may be a moderate overpayment signal worth reviewing";
  }
  if (difference > 0) {
    return "There may be a small overpayment signal, but the pattern is not conclusive on its own";
  }
  if (difference < -300) {
    return "This pattern does not point to an obvious refund signal from these inputs";
  }
  return "This pattern looks broadly close and does not currently suggest a strong refund signal";
}

function getBody(difference: number) {
  if (difference > 1200) {
    return "This does not confirm that a refund is definitely due, but it is strong enough that the tax code, payslip pattern, and employment history deserve a closer look.";
  }
  if (difference > 300) {
    return "The gap is noticeable enough that a tax-code issue, job change, emergency tax period, or payroll adjustment may be worth reviewing.";
  }
  if (difference > 0) {
    return "There is some sign of potential overpayment, but smaller differences can still be explained by timing, cumulative PAYE, or incomplete context.";
  }
  if (difference < -300) {
    return "This input set does not look like an obvious refund scenario. In some cases it may point more toward normal PAYE variation or even a catch-up pattern instead.";
  }
  return "At this stage the pattern looks reasonably close to expectation. That does not rule out issues, but it does mean there is no strong refund signal from these numbers alone.";
}

export default function TaxRefundCalculator() {
  const [salary, setSalary] = useState(35000);
  const [taxPaid, setTaxPaid] = useState(5200);

  const expectedTax = useMemo(() => estimateExpectedTax(salary), [salary]);
  const difference = useMemo(() => taxPaid - expectedTax, [taxPaid, expectedTax]);
  const possibleRefund = difference > 0 ? difference : 0;

  const insights = useMemo(
    () => [
      {
        title: getHeadline(difference),
        description: getBody(difference),
        tone:
          possibleRefund > 300
            ? ("positive" as const)
            : difference < -300
            ? ("warning" as const)
            : ("neutral" as const),
      },
      {
        title: "Important note",
        description:
          "Refund outcomes can depend on tax code history, job changes, emergency tax, cumulative PAYE, benefits, and HMRC records. This page is a first-check estimate only.",
        tone: "neutral" as const,
      },
    ],
    [difference, possibleRefund]
  );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.30)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <p className="text-sm font-medium app-accent">Overpayment check</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                Check whether paid Income Tax looks high enough to review
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 app-copy sm:text-base">
                This tool compares approximate expected Income Tax with the tax
                already paid and helps show whether there is a refund-style signal.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border app-card p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] app-subtle">
                  Best use
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  First-check overpayment read
                </p>
              </div>

              <div className="rounded-[24px] border app-card p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] app-subtle">
                  Best next step
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  Tax code + payslip check
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[0.94fr_1.06fr]">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 xl:border-b-0 xl:border-r xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 1</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                Enter salary and tax paid
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                Use an annual salary estimate and the Income Tax already paid if
                you want a quick refund-style signal.
              </p>
            </div>

            <div className="rounded-[30px] border app-card p-6 sm:p-7">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Annual salary
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value) || 0)}
                      className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Income Tax paid
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      value={taxPaid}
                      onChange={(e) => setTaxPaid(Number(e.target.value) || 0)}
                      className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div
                className="mt-5 rounded-[22px] border px-4 py-4"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-semibold app-title">
                  What usually causes refund suspicion
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Emergency tax, tax code issues, job changes, leaving work
                  mid-year, or periods where payroll deducted too much too early.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 px-6 py-6 dark:bg-slate-900/40 xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 2</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                Read the refund-style signal
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                This is designed to show whether paid tax looks high enough to justify deeper checking.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-[30px] border app-card p-6">
                <p className="text-sm font-medium app-accent">Interpretation</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight app-title sm:text-3xl">
                  {getHeadline(difference)}
                </h3>
                <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
                  {getBody(difference)}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <ReceiptText className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Expected tax</p>
                  <p className="mt-2 text-xl font-semibold app-title">
                    {formatCurrency(expectedTax)}
                  </p>
                </div>

                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <Wallet2 className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Tax paid</p>
                  <p className="mt-2 text-xl font-semibold app-title">
                    {formatCurrency(taxPaid)}
                  </p>
                </div>

                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <SearchCheck className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Possible refund signal</p>
                  <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(possibleRefund)}
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border app-card px-5 py-5">
                <p className="text-sm font-semibold app-title">Best next move</p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  A refund signal is strongest when it is supported by a tax-code issue,
                  unusual payslip pattern, or mid-year employment change rather than a single number alone.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full app-chip px-3 py-1.5 text-[11px] font-medium">
                    <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                    First-check only
                  </span>
                  <span className="inline-flex items-center rounded-full app-chip px-3 py-1.5 text-[11px] font-medium">
                    <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                    Verify with real records
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolInsightPanel title="Refund reading" insights={insights} />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/tax-code-decoder"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Decode the tax code
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Best when the possible overpayment may be linked to the PAYE code applied.
          </p>
        </Link>

        <Link
          href="/payslip-checker"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Check the payslip pattern
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Useful when you want to inspect year-to-date PAYE and NI instead of relying on one refund estimate.
          </p>
        </Link>

        <Link
          href="/calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Open salary calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Return to the broader salary route for full take-home context.
          </p>
        </Link>
      </section>
    </div>
  );
}