"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, Save, ShieldCheck } from "lucide-react";
import CalculatorForm from "./calculator-form";
import ResultPreview from "./result-preview";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import type { CalculatorInput } from "../../types/tax";
import SavedScenariosPanel from "../shared/saved-scenarios-panel";
import { useSupabaseAuth } from "../auth/supabase-auth-provider";
import {
  createScenarioId,
  getLastScenario,
  saveLastScenario,
  saveScenario,
  type SavedScenario,
} from "../../lib/tax/storage/saved-scenarios";
import { formatCurrency } from "../../lib/tax/utils/currency";

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
  const { user, email } = useSupabaseAuth();
  const userScope = user?.id || email || "guest";

  const [internalValues, setInternalValues] =
    useState<CalculatorInput>(defaultValues);
  const [saveNotice, setSaveNotice] = useState("");

  useEffect(() => {
    if (values) {
      setInternalValues(values);
    }
  }, [values]);

  useEffect(() => {
    if (values) return;

    const saved = getLastScenario<CalculatorInput>("calculator", userScope);
    if (saved?.salary) {
      setInternalValues({
        ...defaultValues,
        ...saved,
      });
    }
  }, [userScope, values]);

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
      }, 100);
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

  useEffect(() => {
    saveLastScenario(
      "calculator",
      currentValues as unknown as Record<string, unknown>,
      userScope
    );
  }, [currentValues, userScope]);

  const isOverview = mode === "overview";

  function handleSaveScenario() {
    const scenario: SavedScenario = {
      id: createScenarioId("calculator"),
      type: "calculator",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      title: `£${currentValues.salary.toLocaleString("en-GB")} salary route`,
      subtitle: `${formatCurrency(
        result.netMonthly
      )}/month · ${currentValues.region === "scotland" ? "Scotland" : "UK"} · ${
        currentValues.studentLoanPlan === "none"
          ? "No student loan"
          : `Student loan: ${currentValues.studentLoanPlan}`
      }`,
      payload: currentValues as unknown as Record<string, unknown>,
    };

    saveScenario(scenario, userScope);
    setSaveNotice("Saved to your recent salary scenarios.");
    window.setTimeout(() => setSaveNotice(""), 2200);
  }

  function handleLoadScenario(scenario: SavedScenario) {
    const payload = scenario.payload as Partial<CalculatorInput>;
    const nextValues: CalculatorInput = {
      ...defaultValues,
      ...payload,
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
    }, 100);
  }

  return (
    <section className={isOverview ? "pb-0" : "pb-10"}>
      <div className={isOverview ? "max-w-none" : "mx-auto max-w-7xl px-4 sm:px-6"}>
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[34px] border app-card-strong shadow-[0_28px_100px_-44px_rgba(15,23,42,0.24)]">
            <div className="grid gap-0 lg:grid-cols-[0.94fr_1.06fr]">
              <div
                className="border-b p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-2xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] app-accent">
                      Salary input
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight app-title sm:text-3xl">
                      Enter a salary and get the answer immediately
                    </h2>
                    <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
                      Start with gross pay. Only adjust region, pension, or student
                      loan when they materially change the result.
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
                    Estimate-based salary guidance
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

                <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                  <button
                    type="button"
                    onClick={() =>
                      resultRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      })
                    }
                    className="app-button-primary w-full sm:w-auto"
                  >
                    Calculate take-home pay
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveScenario}
                    className="app-button-secondary justify-center sm:justify-start"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save scenario
                  </button>

                  <Link
                    href="/calculator"
                    className="app-button-secondary justify-center sm:justify-start"
                  >
                    Open full calculator
                  </Link>
                </div>

                {saveNotice ? (
                  <div
                    className="mt-4 rounded-[18px] border px-4 py-3 text-sm"
                    style={{
                      borderColor: "color-mix(in srgb, #10b981 22%, var(--line))",
                      background:
                        "color-mix(in srgb, #10b981 8%, var(--surface-2))",
                      color: "var(--text)",
                    }}
                  >
                    {saveNotice}
                  </div>
                ) : null}

                <div
                  className="mt-5 rounded-[22px] border px-4 py-4"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <p className="text-sm font-semibold app-title">
                    What this tool is for
                  </p>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Use this to understand what actually reaches you after tax and
                    deductions. Then move into comparison, reverse planning, or
                    payslip interpretation if needed.
                  </p>
                </div>
              </div>

              <div ref={resultRef} className="p-5 sm:p-6 lg:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-2xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] app-accent">
                      Instant result
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight app-title sm:text-3xl">
                      See what actually reaches you
                    </h2>
                    <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
                      This result is designed for salary understanding and next-step
                      decision making, not just raw number display.
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

          <SavedScenariosPanel
            type="calculator"
            title="Recent calculator scenarios"
            emptyTitle="No calculator scenarios saved yet"
            emptyDescription="Save a calculator route and it will appear here for fast return access."
            onLoad={handleLoadScenario}
          />
        </div>
      </div>
    </section>
  );
}