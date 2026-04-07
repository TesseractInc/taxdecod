"use client";

import { useMemo, useState } from "react";
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
    value: CalculatorInput[K]
  ) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  const salaryPlaceholder = useMemo(() => {
    return values.payPeriod === "monthly" ? "3000" : "40000";
  }, [values.payPeriod]);

  const assumptionLabel = useMemo(() => {
    const regionLabel =
      values.region === "scotland" ? "Scotland" : "England, Wales, NI";

    const loanLabel =
      values.studentLoanPlan === "none"
        ? "No student loan"
        : values.studentLoanPlan === "postgrad"
          ? "Postgraduate loan"
          : values.studentLoanPlan.toUpperCase();

    return `${regionLabel} • ${loanLabel} • ${values.pensionPercent}% pension`;
  }, [values.region, values.studentLoanPlan, values.pensionPercent]);

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Start here
            </p>
            <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Enter your headline pay
            </h4>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Enter your gross {values.payPeriod === "monthly" ? "monthly" : "annual"} salary before tax.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickSalaryPresets.map((salary) => (
              <button
                key={salary}
                type="button"
                onClick={() => updateField("salary", salary)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                  values.salary === salary
                    ? "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:text-sky-300"
                }`}
              >
                £{salary.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Salary
          </label>

          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[14px] border border-slate-200 bg-white text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              £
            </div>

            <input
              type="number"
              inputMode="numeric"
              value={Number.isFinite(values.salary) ? values.salary : ""}
              onChange={(e) =>
                updateField("salary", Number(e.target.value || 0))
              }
              className="app-input pl-[4.35rem] pr-4 text-lg font-semibold tracking-[-0.02em]"
              placeholder={salaryPlaceholder}
            />
          </div>

          <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
            Use gross {values.payPeriod === "monthly" ? "monthly" : "annual"} salary, not your take-home pay.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="app-chip px-4 py-2 text-xs font-semibold">
          Updated for UK 2025/26 assumptions
        </div>
        <div className="app-soft px-4 py-2 text-xs app-subtle">
          {assumptionLabel}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/70">
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Pay period
          </label>
          <select
            value={values.payPeriod}
            onChange={(e) =>
              updateField(
                "payPeriod",
                e.target.value as CalculatorInput["payPeriod"]
              )
            }
            className="app-input"
          >
            <option value="yearly">Yearly salary</option>
            <option value="monthly">Monthly salary</option>
          </select>
          <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
            Choose whether your input is annual or monthly.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/70">
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Region
          </label>
          <select
            value={values.region}
            onChange={(e) => updateField("region", e.target.value as Region)}
            className="app-input"
          >
            <option value="uk">England, Wales, NI</option>
            <option value="scotland">Scotland</option>
          </select>
          <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
            Region changes tax band treatment and final deductions.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/70">
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Pension contribution (%)
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={Number.isFinite(values.pensionPercent) ? values.pensionPercent : ""}
            onChange={(e) =>
              updateField("pensionPercent", Number(e.target.value || 0))
            }
            className="app-input"
            placeholder="5"
          />
          <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
            Pension lowers immediate take-home but supports longer-term savings.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/70">
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Student loan
          </label>
          <select
            value={values.studentLoanPlan}
            onChange={(e) =>
              updateField(
                "studentLoanPlan",
                e.target.value as StudentLoanPlan
              )
            }
            className="app-input"
          >
            <option value="none">No student loan</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="postgrad">Postgraduate</option>
          </select>
          <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
            Loan repayments can materially change monthly take-home pay.
          </p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Advanced settings
            </p>
            <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
              Only open this if your payslip or employer setup differs from the standard assumptions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:text-sky-300"
          >
            {showAdvanced ? "Hide advanced" : "Show advanced"}
          </button>
        </div>

        {showAdvanced ? (
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
              Tax code
            </label>
            <input
              type="text"
              value={values.taxCode}
              onChange={(e) => updateField("taxCode", e.target.value)}
              className="app-input"
              placeholder="1257L"
            />
            <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
              Most standard UK employee payslips use 1257L unless your employer or HMRC has applied something different.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}