"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRightLeft,
  ReceiptText,
  ShieldCheck,
  Wallet2,
} from "lucide-react";
import { formatCurrency } from "@/lib/tax/utils/currency";
import {
  estimatePayslipYtd,
  type PayslipCheckerInput,
} from "@/lib/tax/payslip-checker";
import type { Region, StudentLoanPlan } from "@/types/tax";

const initialValues: PayslipCheckerInput = {
  grossPayYtd: 20000,
  taxPaidYtd: 2100,
  niPaidYtd: 950,
  monthsCompleted: 6,
  region: "uk",
  taxCode: "1257L",
  pensionPercent: 5,
  studentLoanPlan: "none",
};

const quickGrossPresets = [12000, 18000, 24000, 30000];

export default function PayslipYtdChecker() {
  const [values, setValues] = useState<PayslipCheckerInput>(initialValues);

  const result = useMemo(() => estimatePayslipYtd(values), [values]);

  const updateField = <K extends keyof PayslipCheckerInput>(
    key: K,
    value: PayslipCheckerInput[K]
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getTone = (status: "over" | "under" | "close") => {
    if (status === "over") {
      return {
        panel:
          "border-amber-200 bg-amber-50/80 dark:border-amber-900 dark:bg-amber-950/30",
        badge:
          "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
        value: "text-amber-700 dark:text-amber-300",
        label: "Running high",
      };
    }

    if (status === "under") {
      return {
        panel:
          "border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/30",
        badge:
          "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
        value: "text-rose-700 dark:text-rose-300",
        label: "Running low",
      };
    }

    return {
      panel:
        "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30",
      badge:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
      value: "text-emerald-700 dark:text-emerald-300",
      label: "Close to expected",
    };
  };

  const taxTone = getTone(result.taxStatus);
  const niTone = getTone(result.niStatus);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.30)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <p className="text-sm font-medium app-accent">
                YTD payslip checker
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                Check if your payslip deductions look right so far
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 app-copy sm:text-base">
                This tool uses your gross pay to date and compares your paid tax
                and National Insurance with an estimated year-to-date reading.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border app-card p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] app-subtle">
                  Best use
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  Mid-year payslip check
                </p>
              </div>

              <div className="rounded-[24px] border app-card p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] app-subtle">
                  Best inputs
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  YTD gross, tax, and NI
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[0.98fr_1.02fr]">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 xl:border-b-0 xl:border-r xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 1</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                Enter your year-to-date payslip numbers
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                Use your payslip year-to-date values where possible. This works
                best once you already have a few months of payroll history.
              </p>
            </div>

            <div className="rounded-[30px] border app-card p-6 sm:p-7">
              <div className="flex flex-wrap gap-2">
                {quickGrossPresets.map((gross) => (
                  <button
                    key={gross}
                    type="button"
                    onClick={() => updateField("grossPayYtd", gross)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                      values.grossPayYtd === gross
                        ? "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                        : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                    }`}
                  >
                    £{gross.toLocaleString("en-GB")} gross YTD
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Gross pay to date
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      value={values.grossPayYtd}
                      onChange={(e) =>
                        updateField("grossPayYtd", Number(e.target.value) || 0)
                      }
                      className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Income Tax paid to date
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      value={values.taxPaidYtd}
                      onChange={(e) =>
                        updateField("taxPaidYtd", Number(e.target.value) || 0)
                      }
                      className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    National Insurance paid to date
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      value={values.niPaidYtd}
                      onChange={(e) =>
                        updateField("niPaidYtd", Number(e.target.value) || 0)
                      }
                      className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Months completed this tax year
                  </label>
                  <select
                    value={values.monthsCompleted}
                    onChange={(e) =>
                      updateField("monthsCompleted", Number(e.target.value) || 1)
                    }
                    className="app-input h-[56px]"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month}>
                        {month} month{month === 1 ? "" : "s"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Tax code
                  </label>
                  <input
                    type="text"
                    value={values.taxCode}
                    onChange={(e) => updateField("taxCode", e.target.value)}
                    className="app-input h-[56px]"
                    placeholder="1257L"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Region
                  </label>
                  <select
                    value={values.region}
                    onChange={(e) =>
                      updateField("region", e.target.value as Region)
                    }
                    className="app-input h-[56px]"
                  >
                    <option value="uk">England, Wales & Northern Ireland</option>
                    <option value="scotland">Scotland</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Pension contribution (%)
                  </label>
                  <input
                    type="number"
                    value={values.pensionPercent}
                    onChange={(e) =>
                      updateField("pensionPercent", Number(e.target.value) || 0)
                    }
                    className="app-input h-[56px]"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Student loan plan
                  </label>
                  <select
                    value={values.studentLoanPlan}
                    onChange={(e) =>
                      updateField(
                        "studentLoanPlan",
                        e.target.value as StudentLoanPlan
                      )
                    }
                    className="app-input h-[56px]"
                  >
                    <option value="none">No student loan</option>
                    <option value="plan1">Plan 1</option>
                    <option value="plan2">Plan 2</option>
                    <option value="plan4">Plan 4</option>
                    <option value="postgrad">Postgraduate</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 px-6 py-6 dark:bg-slate-900/40 xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 2</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                Read the year-to-date signal
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                This is a first-check PAYE signal, not a payroll or HMRC ruling.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-[30px] border app-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-xl">
                    <p className="text-sm font-medium app-accent">
                      Headline reading
                    </p>
                    <h3 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                      {result.headline}
                    </h3>
                    <p className="mt-3 text-sm leading-7 app-copy">
                      {result.explanation}
                    </p>
                  </div>

                  <div className="inline-flex items-center rounded-full app-chip px-4 py-2 text-xs font-medium">
                    {result.taxStatus === "close" && result.niStatus === "close" ? (
                      <>
                        <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                        Close to expected
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mr-2 h-3.5 w-3.5" />
                        Worth checking
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={`rounded-[28px] border p-5 ${taxTone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Income Tax check
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Paid vs estimated year-to-date Income Tax
                    </p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${taxTone.badge}`}>
                    {taxTone.label}
                  </span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[20px] border border-white/70 bg-white/85 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      Paid to date
                    </p>
                    <p className="mt-2 text-lg font-semibold app-title">
                      {formatCurrency(values.taxPaidYtd)}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-white/70 bg-white/85 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      Estimated YTD
                    </p>
                    <p className="mt-2 text-lg font-semibold app-title">
                      {formatCurrency(result.expectedYtdTax)}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-white/70 bg-white/85 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      Difference
                    </p>
                    <p className={`mt-2 text-lg font-semibold ${taxTone.value}`}>
                      {result.taxDifference >= 0 ? "+" : "-"}
                      {formatCurrency(Math.abs(result.taxDifference))}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`rounded-[28px] border p-5 ${niTone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      National Insurance check
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Paid vs estimated year-to-date NI
                    </p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${niTone.badge}`}>
                    {niTone.label}
                  </span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[20px] border border-white/70 bg-white/85 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      Paid to date
                    </p>
                    <p className="mt-2 text-lg font-semibold app-title">
                      {formatCurrency(values.niPaidYtd)}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-white/70 bg-white/85 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      Estimated YTD
                    </p>
                    <p className="mt-2 text-lg font-semibold app-title">
                      {formatCurrency(result.expectedYtdNi)}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-white/70 bg-white/85 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      Difference
                    </p>
                    <p className={`mt-2 text-lg font-semibold ${niTone.value}`}>
                      {result.niDifference >= 0 ? "+" : "-"}
                      {formatCurrency(Math.abs(result.niDifference))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border app-card p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border app-soft px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      Annualised salary run-rate
                    </p>
                    <p className="mt-2 text-xl font-semibold app-title">
                      {formatCurrency(result.annualisedGrossSalary)}
                    </p>
                  </div>

                  <div className="rounded-[20px] border app-soft px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      Estimated net pay YTD
                    </p>
                    <p className="mt-2 text-xl font-semibold app-title">
                      {formatCurrency(result.expectedYtdNet)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-[20px] border app-soft px-4 py-4">
                  <p className="text-sm leading-7 app-copy">
                    {result.confidenceNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/payslip-explained"
          className="rounded-[28px] border app-card p-6 transition hover:-translate-y-0.5"
        >
          <p className="text-lg font-semibold app-title">Decode your payslip</p>
          <p className="mt-3 text-sm leading-7 app-copy">
            Understand PAYE, NI, pension, and tax code labels in plain English.
          </p>
        </Link>

        <Link
          href="/calculator"
          className="rounded-[28px] border app-card p-6 transition hover:-translate-y-0.5"
        >
          <p className="text-lg font-semibold app-title">Open calculator</p>
          <p className="mt-3 text-sm leading-7 app-copy">
            Check the full take-home pay picture behind your salary.
          </p>
        </Link>

        <Link
          href="/compare-salary"
          className="rounded-[28px] border app-card p-6 transition hover:-translate-y-0.5"
        >
          <p className="text-lg font-semibold app-title">Compare salaries</p>
          <p className="mt-3 text-sm leading-7 app-copy">
            See whether a higher salary really changes monthly life.
          </p>
        </Link>

        <div className="rounded-[28px] border app-soft p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl app-card p-3">
              <ReceiptText className="h-5 w-5 app-accent" />
            </div>
            <p className="text-lg font-semibold app-title">Best inputs</p>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-7 app-copy">
            <li>Gross pay to date</li>
            <li>Income Tax paid to date</li>
            <li>NI paid to date</li>
            <li>Correct tax code</li>
          </ul>
        </div>
      </section>
    </div>
  );
}