"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRightLeft,
  BadgePoundSterling,
  Download,
  Mail,
  ReceiptText,
  Repeat,
  ShieldCheck,
} from "lucide-react";
import {
  estimateTaxRefund,
  type IncomeSource,
  type RefundEstimatorMode,
} from "@/lib/tax/refund-estimator";
import { formatCurrency } from "@/lib/tax/utils/currency";
import type { Region } from "@/types/tax";

type RefundEstimatorForm = {
  grossIncome: number;
  taxPaid: number;
  mode: RefundEstimatorMode;
  payPeriodsCompleted: number;
  region: Region;
  taxCode: string;
  pensionPercent: number;
  incomeSource: IncomeSource;
};

const initialValues: RefundEstimatorForm = {
  grossIncome: 40000,
  taxPaid: 4300,
  mode: "full-year",
  payPeriodsCompleted: 12,
  region: "uk",
  taxCode: "1257L",
  pensionPercent: 5,
  incomeSource: "employment",
};

const quickPresets = [25000, 30000, 40000, 50000, 70000];

export default function TaxRefundEstimator() {
  const [values, setValues] = useState<RefundEstimatorForm>(initialValues);

  const result = useMemo(() => estimateTaxRefund(values), [values]);

  const updateField = <K extends keyof RefundEstimatorForm>(
    key: K,
    value: RefundEstimatorForm[K]
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const outcomeTone =
    result.status === "refund"
      ? {
          panel:
            "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30",
          badge:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
          value: "text-emerald-700 dark:text-emerald-300",
        }
      : result.status === "underpayment"
      ? {
          panel:
            "border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/30",
          badge:
            "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
          value: "text-rose-700 dark:text-rose-300",
        }
      : {
          panel:
            "border-sky-200 bg-sky-50/80 dark:border-sky-900 dark:bg-sky-950/30",
          badge:
            "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
          value: "text-sky-700 dark:text-sky-300",
        };

  const absoluteDifference = Math.abs(result.difference);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_100px_-42px_rgba(15,23,42,0.34)] dark:border-slate-800 dark:bg-slate-950">
        <div className="relative overflow-hidden border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8 sm:py-8">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(14,165,233,0.10), transparent 34%), radial-gradient(circle at bottom right, rgba(16,185,129,0.08), transparent 28%)",
            }}
          />

          <div className="relative grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                PAYE refund / underpayment check
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                Check if your Income Tax looks too high or too low
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                This estimator compares the Income Tax you have already paid with
                the estimated Income Tax due based on your salary, tax code, and
                current TaxDecod assumptions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Best input
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  P60 or tax paid to date
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Focus
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Income Tax only
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[0.98fr_1.02fr]">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 xl:border-b-0 xl:border-r xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Step 1
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Enter your tax and salary details
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Use your completed-year figures or your payslip tax-paid-to-date
                figures for a rough current-year check.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-[30px] border border-slate-200 bg-white shadow-[0_28px_90px_-42px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-950">
                <div className="relative p-6 sm:p-7">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => updateField("mode", "full-year")}
                      className={`rounded-[22px] border px-4 py-4 text-left transition ${
                        values.mode === "full-year"
                          ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300"
                          : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                      }`}
                    >
                      <p className="text-sm font-semibold">Full tax year</p>
                      <p className="mt-2 text-xs leading-6 opacity-80">
                        Best when you know the full salary and total tax paid.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateField("mode", "year-to-date")}
                      className={`rounded-[22px] border px-4 py-4 text-left transition ${
                        values.mode === "year-to-date"
                          ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300"
                          : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                      }`}
                    >
                      <p className="text-sm font-semibold">Year to date</p>
                      <p className="mt-2 text-xs leading-6 opacity-80">
                        Rougher PAYE check using tax paid so far this year.
                      </p>
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {quickPresets.map((salary) => (
                      <button
                        key={salary}
                        type="button"
                        onClick={() => updateField("grossIncome", salary)}
                        className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                          values.grossIncome === salary
                            ? "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                            : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                        }`}
                      >
                        £{salary.toLocaleString("en-GB")}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                        Gross income
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                          £
                        </span>
                        <input
                          type="number"
                          value={values.grossIncome}
                          onChange={(e) =>
                            updateField("grossIncome", Number(e.target.value) || 0)
                          }
                          className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                        Income Tax already paid
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                          £
                        </span>
                        <input
                          type="number"
                          value={values.taxPaid}
                          onChange={(e) =>
                            updateField("taxPaid", Number(e.target.value) || 0)
                          }
                          className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
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
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
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
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                        Income source
                      </label>
                      <select
                        value={values.incomeSource}
                        onChange={(e) =>
                          updateField(
                            "incomeSource",
                            e.target.value as IncomeSource
                          )
                        }
                        className="app-input h-[56px]"
                      >
                        <option value="employment">PAYE employment</option>
                        <option value="paye-pension">PAYE pension</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                        Pension contribution (%)
                      </label>
                      <input
                        type="number"
                        value={values.pensionPercent}
                        onChange={(e) =>
                          updateField(
                            "pensionPercent",
                            Number(e.target.value) || 0
                          )
                        }
                        className="app-input h-[56px]"
                        placeholder="5"
                      />
                    </div>
                  </div>

                  {values.mode === "year-to-date" ? (
                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
                        Pay periods completed
                      </label>
                      <select
                        value={values.payPeriodsCompleted}
                        onChange={(e) =>
                          updateField(
                            "payPeriodsCompleted",
                            Number(e.target.value) || 1
                          )
                        }
                        className="app-input h-[56px]"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                          <option key={m} value={m}>
                            {m} month{m === 1 ? "" : "s"}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 px-6 py-6 dark:bg-slate-900/40 xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Step 2
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Read the refund / underpayment signal
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                This compares your paid Income Tax against the estimated Income Tax
                due for the selected reference period.
              </p>
            </div>

            <div className={`rounded-[32px] border p-6 shadow-sm ${outcomeTone.panel}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                  <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    Refund reading
                  </p>

                  <h3 className={`mt-3 text-5xl font-bold tracking-tight sm:text-6xl ${outcomeTone.value}`}>
                    {result.status === "balanced"
                      ? "£0"
                      : formatCurrency(absoluteDifference)}
                  </h3>

                  <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                    {result.status === "refund"
                      ? "possible refund signal"
                      : result.status === "underpayment"
                      ? "possible underpayment signal"
                      : "looks roughly balanced"}
                  </p>
                </div>

                <div className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-medium ${outcomeTone.badge}`}>
                  {result.status === "refund" ? (
                    <>
                      <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                      Possible overpayment
                    </>
                  ) : result.status === "underpayment" ? (
                    <>
                      <AlertTriangle className="mr-2 h-3.5 w-3.5" />
                      Possible underpayment
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                      Close to expected
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/70 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {result.headline}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {result.supportingText}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Expected tax ({result.referenceLabel})
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(result.expectedIncomeTaxReference)}
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Tax already paid
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(result.paidTaxReference)}
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Estimated annual tax due
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(result.expectedIncomeTaxAnnual)}
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Confidence
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {result.confidenceLabel}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm leading-8 text-slate-600 dark:text-slate-400">
                  This is an estimator, not an HMRC decision. It is most useful as
                  a first check before a user looks at their P60, payslip tax paid,
                  P800 letter, or HMRC account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Open calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Check your full take-home pay and deduction mix.
          </p>
        </Link>

        <Link
          href="/compare-salary"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare salaries
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            See whether another salary changes your monthly outcome.
          </p>
        </Link>

        <Link
          href="/reverse-tax"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Reverse from take-home
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Work backwards from the monthly income you want to keep.
          </p>
        </Link>

        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-950">
              <ReceiptText className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Best inputs
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
            <li>P60 total tax paid</li>
            <li>Payslip year-to-date tax paid</li>
            <li>Correct tax code</li>
            <li>Expected full-year gross income</li>
          </ul>
        </div>
      </section>
    </div>
  );
}