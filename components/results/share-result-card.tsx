"use client";

import Link from "next/link";

import { useState } from "react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { Copy, Link2, Mail, Share2 } from "lucide-react";
import DownloadReportButton from "./download-report-button";

type ShareResultCardProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
};

export default function ShareResultCard({
  values,
  result,
}: ShareResultCardProps) {
  const [copied, setCopied] = useState<"" | "summary" | "link">("");

  const totalDeductions =
    result.totalDeductionsAnnual ||
    result.incomeTaxAnnual +
      result.nationalInsuranceAnnual +
      result.pensionAnnual +
      result.studentLoanAnnual;

  const summary = `My TaxDecod result:
Gross salary: ${formatCurrency(result.grossAnnual)}
Estimated take-home: ${formatCurrency(result.netAnnual)} per year
Estimated monthly take-home: ${formatCurrency(result.netMonthly)}
Total deductions: ${formatCurrency(totalDeductions)}
Income Tax: ${formatCurrency(result.incomeTaxAnnual)}
National Insurance: ${formatCurrency(result.nationalInsuranceAnnual)}
Pension: ${formatCurrency(result.pensionAnnual)}
Student Loan: ${formatCurrency(result.studentLoanAnnual)}
Tax code: ${values.taxCode || "—"}`;

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied("summary");
    setTimeout(() => setCopied(""), 1800);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied("link");
    setTimeout(() => setCopied(""), 1800);
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title: "My TaxDecod salary result",
        text: summary,
        url: window.location.href,
      });
    } catch {}
  };

  return (
    <section
      id="share-result"
      className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Share and save
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Keep this salary result useful beyond one visit
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Save the reading, share it, or send it elsewhere so you can compare
            salary decisions with more context later.
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[1.02fr_0.98fr] sm:p-7">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                TaxDecod snapshot
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {formatCurrency(result.netAnnual)}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {formatCurrency(result.netMonthly)} per month after deductions
              </p>
            </div>

            <div className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
              Shareable view
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Gross salary", formatCurrency(result.grossAnnual)],
              ["Net monthly", formatCurrency(result.netMonthly)],
              ["Total deductions", formatCurrency(totalDeductions)],
              ["Tax code", values.taxCode || "—"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
              This summary is designed to make salary comparison, offer review,
              or later recall much easier than trying to remember raw payslip
              numbers.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Actions
          </p>

          <div className="mt-5 grid gap-3">
            <DownloadReportButton values={values} result={result} />

            <button
              type="button"
              onClick={handleCopySummary}
              className="flex items-center justify-center gap-2 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950 dark:hover:text-sky-300"
            >
              <Copy className="h-4 w-4" />
              {copied === "summary" ? "Copied summary" : "Copy result summary"}
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950 dark:hover:text-sky-300"
            >
              <Link2 className="h-4 w-4" />
              {copied === "link" ? "Copied page link" : "Copy page link"}
            </button>

            {typeof window !== "undefined" && "share" in navigator ? (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 rounded-[22px] border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700 transition hover:bg-white dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300 dark:hover:bg-slate-950"
              >
                <Share2 className="h-4 w-4" />
                Share result
              </button>
            ) : null}

            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950 dark:hover:text-sky-300"
            >
              <Mail className="h-4 w-4" />
              Send to email
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}