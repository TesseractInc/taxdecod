"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BadgePoundSterling,
  SearchCheck,
  ShieldCheck,
  ReceiptText,
} from "lucide-react";
import ToolInsightPanel from "../shared/tool-insight-panel";
import { getTaxCodeInsight } from "../../lib/tax/explanations/tax-code";

function getAllowanceFromCode(code: string) {
  const clean = code.trim().toUpperCase();

  if (!clean) return 0;
  if (clean === "BR" || clean === "D0" || clean === "D1" || clean === "0T") {
    return 0;
  }

  if (clean.startsWith("K")) {
    const numeric = parseInt(clean.replace(/[^\d]/g, ""), 10) || 0;
    return -(numeric * 10);
  }

  const numeric = parseInt(clean.replace(/[^\d]/g, ""), 10) || 0;
  return numeric * 10;
}

function getCodeMeaning(code: string) {
  const clean = code.trim().toUpperCase();

  if (!clean) return "Enter a PAYE tax code to decode it.";

  if (clean === "1257L") {
    return "Usually the standard Personal Allowance code used for many employees.";
  }

  if (clean === "BR") {
    return "Usually means all income from this job is taxed at the basic rate, with no allowance applied here.";
  }

  if (clean === "D0") {
    return "Usually means all income from this job is taxed at the higher rate.";
  }

  if (clean === "D1") {
    return "Usually means all income from this job is taxed at the additional rate.";
  }

  if (clean === "0T") {
    return "Usually means no Personal Allowance is currently being applied to this pay.";
  }

  if (clean.startsWith("K")) {
    return "Usually means deductions are being increased because tax is being collected for adjustments or unpaid tax.";
  }

  if (/^\d{3,4}[A-Z]+$/.test(clean)) {
    return "This looks like a standard PAYE-style code with a numeric allowance component and a letter suffix.";
  }

  return "This looks unusual or adjusted, so it is worth checking against HMRC or your payslip if deductions feel wrong.";
}

function getPracticalReading(code: string, allowance: number) {
  const clean = code.trim().toUpperCase();

  if (!clean) {
    return "Enter the tax code shown on your payslip or tax notice to get a first-check interpretation.";
  }

  if (clean === "1257L") {
    return "This is often the ordinary employee tax code and usually does not point to an immediate problem on its own. If deductions still feel wrong, the payslip pattern matters more than the code name alone.";
  }

  if (clean === "BR" || clean === "D0" || clean === "D1" || clean === "0T") {
    return "This type of code can materially change deductions because it removes or restricts the normal allowance treatment for that pay route. If your take-home feels unusually weak, this is worth checking carefully.";
  }

  if (clean.startsWith("K")) {
    return "A K code is usually a stronger warning sign because it can increase taxable pay for collection purposes. This is the kind of code that deserves a careful payslip and payroll check.";
  }

  if (allowance > 0) {
    return "This code suggests a positive allowance signal is being applied, but the final payroll outcome can still differ because of cumulative PAYE, code timing, irregular pay, and employer payroll handling.";
  }

  return "This code deserves a cautious reading. It may be fine in context, but it should not be ignored if your deductions already feel unusual.";
}

export default function TaxCodeDecoder() {
  const [code, setCode] = useState("1257L");

  const insight = useMemo(() => getTaxCodeInsight(code), [code]);
  const allowance = useMemo(() => getAllowanceFromCode(code), [code]);
  const meaning = useMemo(() => getCodeMeaning(code), [code]);
  const practicalReading = useMemo(
    () => getPracticalReading(code, allowance),
    [code, allowance]
  );

  const insights = useMemo(
    () => [
      {
        title: insight.title,
        description: insight.summary,
        tone:
          insight.status === "alert"
            ? ("warning" as const)
            : insight.status === "warning"
            ? ("warning" as const)
            : ("positive" as const),
      },
      {
        title: "What to do with this result",
        description: insight.details,
        tone: "neutral" as const,
      },
    ],
    [insight]
  );

  const allowanceLabel =
    allowance > 0
      ? `£${allowance.toLocaleString("en-GB")}`
      : allowance < 0
      ? `-${`£${Math.abs(allowance).toLocaleString("en-GB")}`}`
      : "No standard allowance shown";

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Decode your code
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Understand the PAYE code before guessing at the deductions
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              This is a first-check decoder for common UK employee tax codes. It
              helps explain what the code usually signals, not a formal HMRC decision.
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[0.82fr_1.18fr] sm:p-7">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Enter tax code
            </label>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="1257L"
              className="app-input mt-3 h-[60px] text-lg font-semibold uppercase tracking-[0.04em]"
            />

            <div
              className="mt-5 rounded-[20px] border px-4 py-4 text-sm"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
                color: "var(--muted)",
              }}
            >
              Common examples: 1257L, BR, D0, D1, 0T, K497.
            </div>

            <div
              className="mt-4 rounded-[20px] border px-4 py-4"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-sm font-semibold app-title">
                Best way to use this result
              </p>
              <p className="mt-2 text-sm leading-7 app-copy">
                Decode the code first, then move into a payslip check or refund-style
                review if deductions still feel unusual.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-2">
                <BadgePoundSterling className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Allowance signal
                </p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {allowanceLabel}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                A numeric tax code component often points to the rough tax-free
                allowance being applied, but adjustments can change the real payroll outcome.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-2">
                <SearchCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Code meaning
                </p>
              </div>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {meaning}
              </p>
            </div>

            <div className="sm:col-span-2 rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Practical reading
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {practicalReading}
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Important reality
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    A tax code can explain a lot, but the real deduction outcome
                    is also affected by cumulative PAYE, pay frequency, irregular
                    income, pension setup, and payroll timing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolInsightPanel title="Tax code reading" insights={insights} />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/payslip-checker"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
              <ReceiptText className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Check your payslip
            </p>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Useful when you want to test whether deductions to date look broadly normal.
          </p>
        </Link>

        <Link
          href="/tax-refund-calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Check refund or underpayment
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Helpful when the code may have caused too much or too little Income Tax.
          </p>
        </Link>

        <Link
          href="/calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Open full salary calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Go back to the broader salary and deduction picture with one result flow.
          </p>
        </Link>
      </section>
    </div>
  );
}