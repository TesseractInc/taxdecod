"use client";

import { useState } from "react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { Copy, Link2, Share2 } from "lucide-react";
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

  const summary = `My TaxDecod result:
Salary: ${formatCurrency(result.grossAnnual)}
Estimated take-home: ${formatCurrency(result.netAnnual)} per year
Estimated monthly take-home: ${formatCurrency(result.netMonthly)}
Tax: ${formatCurrency(result.incomeTaxAnnual)}
National Insurance: ${formatCurrency(result.nationalInsuranceAnnual)}
Pension: ${formatCurrency(result.pensionAnnual)}
Student Loan: ${formatCurrency(result.studentLoanAnnual)}
Tax Code: ${values.taxCode || "—"}`;

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
    <section className="app-card p-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Share result</p>
        <h2 className="mt-2 text-2xl font-semibold app-title">
          Share or download your salary result
        </h2>
        <p className="mt-3 text-sm leading-7 app-copy">
          Copy a compact result summary, share the page directly, or download a
          polished PDF report.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="app-soft p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium app-accent">TaxDecod snapshot</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                {formatCurrency(result.netAnnual)} net per year
              </h3>
            </div>
            <div className="app-chip px-3 py-2 text-xs font-medium">
              Shareable
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Gross salary", formatCurrency(result.grossAnnual)],
              ["Net monthly", formatCurrency(result.netMonthly)],
              ["Deductions", formatCurrency(result.totalDeductionsAnnual)],
              ["Tax code", values.taxCode || "—"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950">
                <p className="text-sm app-subtle">{label}</p>
                <p className="mt-1 text-lg font-semibold app-title">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="app-soft p-5">
          <p className="text-sm font-medium app-accent">Actions</p>

          <div className="mt-4 grid gap-3">
            <DownloadReportButton values={values} result={result} />

            <button
              type="button"
              onClick={handleCopySummary}
              className="flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
                color: "var(--text)",
              }}
            >
              <Copy className="h-4 w-4" />
              {copied === "summary" ? "Copied summary" : "Copy result summary"}
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
                color: "var(--text)",
              }}
            >
              <Link2 className="h-4 w-4" />
              {copied === "link" ? "Copied page link" : "Copy page link"}
            </button>

            {typeof window !== "undefined" && "share" in navigator ? (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium hover-lift"
                style={{
                  borderColor: "color-mix(in srgb, var(--primary) 20%, var(--line))",
                  background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                  color: "var(--primary)",
                }}
              >
                <Share2 className="h-4 w-4" />
                Share result
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}