"use client";

import {
  CircleDollarSign,
  PiggyBank,
  ReceiptText,
  Wallet2,
} from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";

type ResultPreviewProps = {
  result: TakeHomeResult;
  values: CalculatorInput;
};

function formatCurrency(value: number) {
  return `£${Math.round(value).toLocaleString()}`;
}

export default function ResultPreview({
  result,
  values,
}: ResultPreviewProps) {
  const totalDeductions = result.totalDeductionsAnnual;
  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const deductionItems = [
    { label: "Income Tax", value: result.incomeTaxAnnual, color: "#0ea5e9" },
    {
      label: "National Insurance",
      value: result.nationalInsuranceAnnual,
      color: "#06b6d4",
    },
    { label: "Pension", value: result.pensionAnnual, color: "#10b981" },
    { label: "Student Loan", value: result.studentLoanAnnual, color: "#8b5cf6" },
  ].filter((item) => item.value > 0);

  const biggestDeduction = [...deductionItems].sort((a, b) => b.value - a.value)[0];

  const summaryCards = [
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
      : "England, Wales & NI rules";

  return (
    <div className="space-y-4">
      <div
        className="rounded-[28px] border p-6"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface-1)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium app-accent">Live result</p>
            <h3 className="mt-3 text-5xl font-bold tracking-tight app-title sm:text-6xl">
              {formatCurrency(result.netAnnual)}
            </h3>
            <p className="mt-3 text-base app-copy">
              {formatCurrency(result.netMonthly)} per month after deductions
            </p>
          </div>

          <div
            className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
              color: "var(--muted)",
            }}
          >
            {scenarioLabel}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {summaryCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-[22px] border px-4 py-4"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[14px]"
                    style={{
                      background: "var(--surface-1)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <Icon className="h-4 w-4 app-accent" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                      {item.label}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold app-title">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-5 rounded-[24px] border p-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--surface-2)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px]"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--line)",
              }}
            >
              <Wallet2 className="h-4 w-4 app-accent" />
            </div>

            <div>
              <p className="text-sm font-semibold app-title">Salary reality</p>
              <p className="mt-2 text-sm leading-7 app-copy">
                You keep{" "}
                <strong className="app-title">{keepPercent.toFixed(0)}%</strong>{" "}
                of your gross salary.{" "}
                {biggestDeduction ? (
                  <>
                    The biggest deduction is{" "}
                    <strong className="app-title">{biggestDeduction.label}</strong>{" "}
                    at{" "}
                    <strong className="app-title">
                      {formatCurrency(biggestDeduction.value)}
                    </strong>
                    .
                  </>
                ) : (
                  <>There are no additional major deduction pressures visible.</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="rounded-[28px] border p-5"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface-1)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold app-title">Deduction breakdown</p>
            <p className="mt-1 text-xs app-subtle">
              Which deductions shape your take-home most
            </p>
          </div>

          <div
            className="rounded-full border px-3 py-1.5 text-[11px] font-medium"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
              color: "var(--muted)",
            }}
          >
            Live interpretation
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {deductionItems.length > 0 ? (
            deductionItems.map((item) => {
              const width =
                result.grossAnnual > 0 ? (item.value / result.grossAnnual) * 100 : 0;

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium app-title">{item.label}</span>
                    <span className="text-sm font-semibold app-title">
                      {formatCurrency(item.value)}
                    </span>
                  </div>

                  <div
                    className="h-3 overflow-hidden rounded-full"
                    style={{ background: "color-mix(in srgb, var(--subtle) 18%, transparent)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.max(width, 3)}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="rounded-[20px] border px-4 py-4 text-sm"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
                color: "var(--muted)",
              }}
            >
              No visible additional deduction pressure is being shown beyond the
              main net pay flow.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}