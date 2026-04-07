import Link from "next/link";
import {
  ArrowRightLeft,
  CircleDollarSign,
  Download,
  PiggyBank,
  ReceiptText,
  Wallet2,
} from "lucide-react";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { TakeHomeResult, CalculatorInput } from "../../types/tax";
import DownloadReportButton from "../results/download-report-button";

type ResultPreviewProps = {
  result: TakeHomeResult;
  values: CalculatorInput;
};

export default function ResultPreview({
  result,
  values,
}: ResultPreviewProps) {
  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const deductionPercent = 100 - keepPercent;

  const bars = [
    {
      label: "Income Tax",
      value: result.incomeTaxAnnual,
      color: "bg-sky-500",
      text: "text-sky-600 dark:text-sky-400",
    },
    {
      label: "National Insurance",
      value: result.nationalInsuranceAnnual,
      color: "bg-cyan-500",
      text: "text-cyan-600 dark:text-cyan-400",
    },
    {
      label: "Pension",
      value: result.pensionAnnual,
      color: "bg-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Student Loan",
      value: result.studentLoanAnnual,
      color: "bg-rose-500",
      text: "text-rose-600 dark:text-rose-400",
    },
  ].filter((item) => item.value > 0);

  const biggestDeduction = [...bars].sort((a, b) => b.value - a.value)[0];

  const insightCards = [
    {
      icon: CircleDollarSign,
      label: "Take-home per year",
      value: formatCurrency(result.netAnnual),
    },
    {
      icon: ReceiptText,
      label: "Take-home per month",
      value: formatCurrency(result.netMonthly),
    },
    {
      icon: PiggyBank,
      label: "Total deductions",
      value: formatCurrency(totalDeductions),
    },
  ];

  const scenarioLabel =
    values.region === "scotland"
      ? "Scotland rules applied"
      : "England, Wales, NI rules";

  return (
    <div className="space-y-6">
      <div className="app-card-strong overflow-hidden rounded-[30px] p-6 sm:p-7">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(14,165,233,0.10), transparent 30%), radial-gradient(circle at bottom left, rgba(16,185,129,0.08), transparent 28%)",
          }}
        />

        <div className="relative flex flex-col gap-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold app-accent">Your real answer</p>

              <h3 className="mt-3 text-5xl font-bold tracking-tight app-title sm:text-6xl">
                {formatCurrency(result.netAnnual)}
              </h3>

              <p className="mt-3 text-base app-copy">
                {formatCurrency(result.netMonthly)} per month after deductions
              </p>
            </div>

            <div
              className="rounded-[22px] border px-4 py-4 text-right"
              style={{
                borderColor: "color-mix(in srgb, var(--emerald) 34%, var(--line))",
                background:
                  "color-mix(in srgb, var(--emerald) 10%, var(--card-soft))",
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] money-positive">
                You keep
              </p>
              <p className="mt-1 text-3xl font-bold money-positive">
                {keepPercent.toFixed(0)}%
              </p>
            </div>
          </div>

          <div
            className="rounded-[24px] border px-5 py-5"
            style={{
              borderColor: "var(--line)",
              background: "var(--card-soft)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl app-chip p-2">
                <Wallet2 className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold app-title">Salary reality</p>
                <p className="mt-2 text-sm leading-8 app-copy">
                  For your salary, you keep{" "}
                  <strong className="app-title">
                    {keepPercent.toFixed(0)}%
                  </strong>{" "}
                  and lose{" "}
                  <strong className="app-title">
                    {formatCurrency(totalDeductions)}
                  </strong>{" "}
                  each year to deductions.
                  {biggestDeduction ? (
                    <>
                      {" "}
                      Your biggest pressure point is{" "}
                      <strong className="app-title">
                        {biggestDeduction.label}
                      </strong>
                      .
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {insightCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[22px] border px-4 py-4"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl app-soft p-2">
                      <Icon className="h-4 w-4 app-accent" />
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold app-title">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <DownloadReportButton values={values} result={result} />

            <Link
              href="#share-result"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border px-5 text-sm font-semibold hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card)",
                color: "var(--text)",
              }}
            >
              <Download className="h-4 w-4 app-accent" />
              More report options
            </Link>
          </div>

          <div
            className="rounded-[24px] border p-5"
            style={{
              borderColor: "var(--line)",
              background: "var(--card-soft)",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold app-title">Salary split</p>
                <p className="mt-1 text-xs app-subtle">
                  A visual of what reaches you versus what leaves as deductions
                </p>
              </div>

              <div
                className="rounded-full px-3 py-2 text-xs font-medium"
                style={{
                  background: "var(--card)",
                  color: "var(--text)",
                  border: "1px solid var(--line)",
                }}
              >
                {scenarioLabel}
              </div>
            </div>

            <div className="mt-5 h-6 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="flex h-full w-full">
                <div
                  className="h-full bg-emerald-500 transition-all duration-700"
                  style={{ width: `${keepPercent}%` }}
                />
                <div
                  className="h-full bg-sky-500/85 transition-all duration-700"
                  style={{ width: `${Math.max(deductionPercent, 0)}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs app-subtle">
              <span>Take-home kept</span>
              <span>Deductions lost</span>
            </div>
          </div>

          <div className="app-card rounded-[28px] p-6 shadow-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold app-title">
                  Deduction pressure
                </p>
                <p className="mt-1 text-xs app-subtle">
                  Which deductions are shaping your result most right now
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full app-soft px-3 py-2 text-xs font-medium app-title">
                <ArrowRightLeft className="h-3.5 w-3.5 app-accent" />
                Live preview
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {bars.length > 0 ? (
                bars.map((item) => {
                  const width =
                    result.grossAnnual > 0
                      ? (item.value / result.grossAnnual) * 100
                      : 0;

                  return (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className={`text-sm font-medium ${item.text}`}>
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold app-title">
                          {formatCurrency(item.value)}
                        </span>
                      </div>

                      <div className="h-3.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all duration-700`}
                          style={{ width: `${Math.max(width, 3)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm app-copy">
                  No major deductions are being applied here yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}