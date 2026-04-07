"use client";

import { useEffect, useMemo, useState } from "react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { Copy, Link2, Mail, Save, Share2 } from "lucide-react";
import DownloadReportButton from "./download-report-button";

type ShareResultCardProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
};

type SavedScenario = {
  id: string;
  label: string;
  salary: number;
  netAnnual: number;
  netMonthly: number;
  taxCode: string;
  region: string;
  createdAt: string;
};

const STORAGE_KEY = "taxdecod_saved_scenarios";

export default function ShareResultCard({
  values,
  result,
}: ShareResultCardProps) {
  const [copied, setCopied] = useState<"" | "summary" | "link">("");
  const [savedCount, setSavedCount] = useState(0);
  const [email, setEmail] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as SavedScenario[];
    setSavedCount(existing.length);
  }, []);

  const summary = useMemo(
    () => `My TaxDecod result:
Salary: ${formatCurrency(result.grossAnnual)}
Estimated take-home: ${formatCurrency(result.netAnnual)} per year
Estimated monthly take-home: ${formatCurrency(result.netMonthly)}
Tax: ${formatCurrency(result.incomeTaxAnnual)}
National Insurance: ${formatCurrency(result.nationalInsuranceAnnual)}
Pension: ${formatCurrency(result.pensionAnnual)}
Student Loan: ${formatCurrency(result.studentLoanAnnual)}
Tax Code: ${values.taxCode || "—"}`,
    [result, values]
  );

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

  const handleSaveScenario = () => {
    if (typeof window === "undefined") return;

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as SavedScenario[];

    const nextScenario: SavedScenario = {
      id: `${Date.now()}`,
      label: `${formatCurrency(result.grossAnnual)} salary scenario`,
      salary: result.grossAnnual,
      netAnnual: result.netAnnual,
      netMonthly: result.netMonthly,
      taxCode: values.taxCode || "—",
      region: values.region,
      createdAt: new Date().toISOString(),
    };

    const next = [nextScenario, ...existing].slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSavedCount(next.length);
    setSavedMessage("Saved in this browser");
    setTimeout(() => setSavedMessage(""), 1800);
  };

  const emailHref = `mailto:${encodeURIComponent(
    email || ""
  )}?subject=${encodeURIComponent(
    "My TaxDecod salary result"
  )}&body=${encodeURIComponent(summary + "\n\nPage: " + window.location.href)}`;

  return (
    <section className="app-card p-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Save, share, revisit</p>
        <h2 className="mt-2 text-2xl font-semibold app-title">
          Keep this salary scenario for later
        </h2>
        <p className="mt-3 text-sm leading-7 app-copy">
          Download the PDF, save this scenario locally, copy a clean summary, or
          send the result to your email app for later follow-up.
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
              {savedCount} saved
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Gross salary", formatCurrency(result.grossAnnual)],
              ["Net monthly", formatCurrency(result.netMonthly)],
              ["Deductions", formatCurrency(result.totalDeductionsAnnual)],
              ["Tax code", values.taxCode || "—"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-4"
              >
                <p className="text-sm app-subtle">{label}</p>
                <p className="mt-1 text-lg font-semibold app-title">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-4">
            <p className="text-sm font-medium app-title">Saved scenarios</p>
            <p className="mt-2 text-sm app-copy">
              This feature stores scenarios in the current browser, which is
              enough for a launch-safe “save for later” loop before full account
              sync exists.
            </p>
          </div>
        </div>

        <div className="app-soft p-5">
          <p className="text-sm font-medium app-accent">Actions</p>

          <div className="mt-4 grid gap-3">
            <DownloadReportButton values={values} result={result} />

            <button
              type="button"
              onClick={handleSaveScenario}
              className="flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
                color: "var(--text)",
              }}
            >
              <Save className="h-4 w-4" />
              {savedMessage || "Save scenario in this browser"}
            </button>

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

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
              <label className="mb-2 block text-sm font-medium app-title">
                Email this result
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="app-input"
              />

              <a
                href={email ? emailHref : "#"}
                className="mt-3 flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium hover-lift"
                style={{
                  borderColor: "color-mix(in srgb, var(--primary) 20%, var(--line))",
                  background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                  color: "var(--primary)",
                  pointerEvents: email ? "auto" : "none",
                  opacity: email ? 1 : 0.55,
                }}
              >
                <Mail className="h-4 w-4" />
                Open in email app
              </a>

              <p className="mt-2 text-xs leading-6 app-subtle">
                Launch-safe version: this opens the user’s email app with a
                prefilled result. Later we can connect this to a real delivery
                endpoint.
              </p>
            </div>

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