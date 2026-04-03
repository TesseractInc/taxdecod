"use client";

import { useMemo, useState } from "react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function RaiseSimulator({
  values,
  currentResult,
}: {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
}) {
  const [raiseAmount, setRaiseAmount] = useState(5000);

  const newSalary =
    values.payPeriod === "monthly"
      ? values.salary * 12 + raiseAmount
      : values.salary + raiseAmount;

  const newInput: CalculatorInput = {
    ...values,
    salary: values.payPeriod === "monthly" ? newSalary / 12 : newSalary,
  };

  const raisedResult = useMemo(() => calculateTakeHome(newInput), [newInput]);

  const extraNetAnnual = raisedResult.netAnnual - currentResult.netAnnual;
  const extraTaxAnnual =
    raisedResult.totalDeductionsAnnual - currentResult.totalDeductionsAnnual;

  return (
    <section className="app-card p-7">
      <div className="max-w-2xl">
        <p className="text-sm font-medium app-accent">Raise simulator</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          A raise doesn’t increase your pay equally
        </h3>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[26px] border p-5">
          <input
            type="number"
            value={raiseAmount}
            onChange={(e) => setRaiseAmount(Number(e.target.value) || 0)}
            className="app-input"
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-[26px] border p-5">
            <p className="text-sm app-subtle">Extra take-home</p>
            <p className="mt-2 text-2xl font-bold money-positive">
              {formatCurrency(extraNetAnnual)}
            </p>
          </div>

          <div className="app-soft p-5">
            <p className="text-sm app-subtle">Extra deductions triggered</p>
            <p className="mt-2 text-xl font-semibold money-negative">
              {formatCurrency(extraTaxAnnual)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}