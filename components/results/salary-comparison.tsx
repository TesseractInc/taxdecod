"use client";

import { useMemo, useState } from "react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function SalaryComparison({
  values,
  currentResult,
}: {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
}) {
  const [comparisonSalary, setComparisonSalary] = useState(
    values.payPeriod === "monthly" ? 4000 : 45000
  );

  const comparisonInput: CalculatorInput = {
    ...values,
    salary: comparisonSalary,
  };

  const comparisonResult = useMemo(
    () => calculateTakeHome(comparisonInput),
    [comparisonInput]
  );

  const netDiff = comparisonResult.netAnnual - currentResult.netAnnual;

  return (
    <section className="app-card p-7">
      <div className="max-w-2xl">
        <p className="text-sm font-medium app-accent">Comparison</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          Compare two salaries instantly
        </h3>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[26px] border p-5">
          <input
            type="number"
            value={comparisonSalary}
            onChange={(e) => setComparisonSalary(Number(e.target.value) || 0)}
            className="app-input"
          />
        </div>

        <div className="rounded-[26px] border p-5">
          <p className="text-sm app-subtle">Net difference</p>
          <p
            className={`mt-2 text-2xl font-bold ${
              netDiff >= 0 ? "money-positive" : "money-negative"
            }`}
          >
            {netDiff >= 0 ? "+" : "-"}
            {formatCurrency(Math.abs(netDiff))}
          </p>
        </div>
      </div>
    </section>
  );
}