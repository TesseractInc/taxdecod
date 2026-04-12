"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CalculatorInput, Region, StudentLoanPlan } from "../../types/tax";

type CalculatorFormProps = {
  values: CalculatorInput;
  onChange: (values: CalculatorInput) => void;
};

const quickSalaryPresets = [25000, 30000, 40000, 50000, 70000];

export default function CalculatorForm({
  values,
  onChange,
}: CalculatorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateField = <K extends keyof CalculatorInput>(
    key: K,
    value: CalculatorInput[K],
  ) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  return (
    <div className="space-y-5">
      <div
        className="rounded-[26px] border p-5"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface-1)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
              Input
            </p>
            <h4 className="mt-2 text-2xl font-semibold app-title">
              Enter your salary
            </h4>
            <p className="mt-2 text-sm app-copy">
              Type your amount or choose a common salary.
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
            UK PAYE logic
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-subtle">
            Quick amounts
          </p>

          <div className="mt-3 flex flex-wrap gap-2.5">
            {quickSalaryPresets.map((salary) => {
              const isActive = values.salary === salary;

              return (
                <button
                  key={salary}
                  type="button"
                  onClick={() => updateField("salary", salary)}
                  className="rounded-full border px-4 py-2.5 text-sm font-medium transition"
                  style={{
                    borderColor: isActive
                      ? "color-mix(in srgb, var(--primary) 34%, var(--line))"
                      : "var(--line)",
                    background: isActive
                      ? "color-mix(in srgb, var(--primary) 8%, var(--surface-1))"
                      : "var(--surface-1)",
                    color: isActive ? "var(--primary)" : "var(--text)",
                  }}
                >
                  £{salary.toLocaleString()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-3 block text-sm font-medium app-title">
            Salary amount
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={values.salary}
            onChange={(e) => updateField("salary", Number(e.target.value))}
            className="app-input"
            placeholder={values.payPeriod === "monthly" ? "3000" : "40000"}
          />
          <p className="mt-3 text-xs app-subtle">
            Gross annual pay before deductions.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div
          className="rounded-[24px] border p-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--surface-1)",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[14px]"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
              }}
            >
              <Sparkles className="h-4 w-4 app-accent" />
            </div>
            <label className="text-sm font-medium app-title">Pay period</label>
          </div>

          <select
            value={values.payPeriod}
            onChange={(e) =>
              updateField(
                "payPeriod",
                e.target.value as CalculatorInput["payPeriod"],
              )
            }
            className="app-input"
          >
            <option value="yearly">Yearly salary</option>
            <option value="monthly">Monthly salary</option>
          </select>

          <p className="mt-3 text-xs app-subtle">
            Choose whether the amount is annual or monthly.
          </p>
        </div>

        <div
          className="rounded-[24px] border p-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--surface-1)",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[14px]"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
              }}
            >
              <Landmark className="h-4 w-4 app-accent" />
            </div>
            <label className="text-sm font-medium app-title">Region</label>
          </div>

          <select
            value={values.region}
            onChange={(e) => updateField("region", e.target.value as Region)}
            className="app-input"
          >
            <option value="uk">England, Wales & Northern Ireland</option>
            <option value="scotland">Scotland</option>
          </select>

          <p className="mt-3 text-xs app-subtle">
            Region affects the tax treatment.
          </p>
        </div>

        <div
          className="rounded-[24px] border p-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--surface-1)",
          }}
        >
          <label className="mb-3 block text-sm font-medium app-title">
            Pension contribution (%)
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={values.pensionPercent}
            onChange={(e) =>
              updateField("pensionPercent", Number(e.target.value))
            }
            className="app-input"
            placeholder="5"
          />
          <p className="mt-3 text-xs app-subtle">
            Pension reduces current take-home pay.
          </p>
        </div>

        <div
          className="rounded-[24px] border p-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--surface-1)",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[14px]"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
              }}
            >
              <GraduationCap className="h-4 w-4 app-accent" />
            </div>
            <label className="text-sm font-medium app-title">Student loan</label>
          </div>

          <select
            value={values.studentLoanPlan}
            onChange={(e) =>
              updateField("studentLoanPlan", e.target.value as StudentLoanPlan)
            }
            className="app-input"
          >
            <option value="none">No student loan</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="postgrad">Postgraduate loan</option>
          </select>

          <p className="mt-3 text-xs app-subtle">
            Loan repayments can materially change net pay.
          </p>
        </div>
      </div>

      <div
        className="rounded-[24px] border p-5"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface-1)",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium app-title">Tax code</p>
            <p className="mt-1 text-xs app-subtle">
              Leave the standard code unless your payslip shows a different one.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
              color: "var(--muted)",
            }}
          >
            {showAdvanced ? (
              <>
                Hide
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Show
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>

        <AnimatePresenceWrapper show={showAdvanced}>
          <div className="mt-5 border-t pt-5" style={{ borderColor: "var(--line)" }}>
            <label className="mb-3 block text-sm font-medium app-title">
              Tax code
            </label>
            <input
              type="text"
              value={values.taxCode}
              onChange={(e) => updateField("taxCode", e.target.value)}
              className="app-input"
              placeholder="1257L"
            />
            <p className="mt-3 text-xs app-subtle">
              Standard UK tax code is often 1257L.
            </p>
          </div>
        </AnimatePresenceWrapper>
      </div>
    </div>
  );
}

function AnimatePresenceWrapper({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return show ? <>{children}</> : null;
}