"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ShieldCheck } from "lucide-react";
import CalculatorForm from "./calculator-form";
import ResultPreview from "./result-preview";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import type { CalculatorInput } from "../../types/tax";

type CalculatorCardProps = {
  mode?: "overview" | "full";
  values?: CalculatorInput;
  onValuesChange?: (values: CalculatorInput) => void;
};

const defaultValues: CalculatorInput = {
  salary: 30000,
  payPeriod: "yearly",
  region: "uk",
  pensionPercent: 5,
  studentLoanPlan: "none",
  taxCode: "1257L",
};

export default function CalculatorCard({
  mode = "full",
  values,
  onValuesChange,
}: CalculatorCardProps) {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [internalValues, setInternalValues] =
    useState<CalculatorInput>(defaultValues);

  useEffect(() => {
    if (values) {
      setInternalValues(values);
    }
  }, [values]);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      const value = Number(customEvent.detail);

      if (!Number.isFinite(value) || value < 1000) return;

      const nextValues = {
        ...(values ?? internalValues),
        salary: value,
      };

      if (!values) {
        setInternalValues(nextValues);
      }

      onValuesChange?.(nextValues);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 120);
    };

    window.addEventListener("prefillSalary", handler);

    return () => {
      window.removeEventListener("prefillSalary", handler);
    };
  }, [internalValues, onValuesChange, values]);

  const currentValues = values ?? internalValues;

  const result = useMemo(() => {
    return calculateTakeHome(currentValues);
  }, [currentValues]);

  const isOverview = mode === "overview";

  return (
    <section className={isOverview ? "pb-0" : "pb-10"}>
      <div className={isOverview ? "max-w-none" : "mx-auto max-w-7xl px-4 sm:px-6"}>
        <div className="overflow-hidden rounded-[34px] border app-card-strong shadow-[0_28px_100px_-44px_rgba(15,23,42,0.24)]">
          <div className="grid gap-0 lg:grid-cols-[0.94fr_1.06fr]">
            <div
              className="border-b p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] app-accent">
                    Salary input
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight app-title sm:text-3xl">
                    Enter a salary and get the answer immediately
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 app-copy sm:text-[15px]">
                    Start with gross pay. Adjust region, pension, and student
                    loan only when they matter.
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                    color: "var(--muted)",
                  }}
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Updated for UK PAYE-style logic
                </div>
              </div>

              <div className="mt-5">
                <CalculatorForm
                  values={currentValues}
                  onChange={(nextValues) => {
                    if (!values) {
                      setInternalValues(nextValues);
                    }
                    onValuesChange?.(nextValues);
                  }}
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    resultRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    })
                  }
                  className="app-button-primary"
                >
                  Calculate take-home pay
                </button>

                <Link href="/calculator" className="app-button-secondary">
                  Open full calculator
                </Link>
              </div>
            </div>

            <div ref={resultRef} className="p-5 sm:p-6 lg:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] app-accent">
                    Instant result
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight app-title sm:text-3xl">
                    See what actually reaches you
                  </h2>
                </div>

                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                    color: "var(--muted)",
                  }}
                >
                  Live calculation
                  <ArrowDownRight className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="mt-5">
                <ResultPreview result={result} values={currentValues} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}