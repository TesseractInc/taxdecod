"use client";

import { CalculatorInput, Region, StudentLoanPlan } from "../../types/tax";

type CalculatorFormProps = {
  values: CalculatorInput;
  onChange: (values: CalculatorInput) => void;
};

export default function CalculatorForm({
  values,
  onChange,
}: CalculatorFormProps) {
  const updateField = <K extends keyof CalculatorInput>(
    key: K,
    value: CalculatorInput[K]
  ) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium app-title">
          Salary
        </label>
        <input
          type="number"
          value={values.salary}
          onChange={(e) => updateField("salary", Number(e.target.value))}
          className="app-input"
          placeholder="e.g. 40000"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium app-title">
            Pay period
          </label>
          <select
            value={values.payPeriod}
            onChange={(e) =>
              updateField("payPeriod", e.target.value as CalculatorInput["payPeriod"])
            }
            className="app-input"
          >
            <option value="yearly">Yearly salary</option>
            <option value="monthly">Monthly salary</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium app-title">
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
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium app-title">
            Pension (%)
          </label>
          <input
            type="number"
            value={values.pensionPercent}
            onChange={(e) => updateField("pensionPercent", Number(e.target.value))}
            className="app-input"
            placeholder="e.g. 5"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium app-title">
            Student loan
          </label>
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
            <option value="postgrad">Postgraduate</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium app-title">
          Tax code
        </label>
        <input
          type="text"
          value={values.taxCode}
          onChange={(e) => updateField("taxCode", e.target.value)}
          className="app-input"
          placeholder="1257L"
        />
      </div>
    </div>
  );
}