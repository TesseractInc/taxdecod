"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Scale, WalletCards } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

type SalaryComparisonProps = {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
};

export default function SalaryComparison({
  values,
  currentResult,
}: SalaryComparisonProps) {
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

  const annualNetDifference =
    comparisonResult.netAnnual - currentResult.netAnnual;
  const monthlyNetDifference =
    comparisonResult.netMonthly - currentResult.netMonthly;
  const annualGrossDifference =
    comparisonResult.grossAnnual - currentResult.grossAnnual;

  return (
    <section className="app-card p-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium app-accent">Salary comparison</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          Compare two salary scenarios
        </h3>
        <p className="mt-3 text-sm leading-7 app-copy">
          Compare the real after-tax difference, not just the headline salary.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="app-soft p-5">
          <label className="mb-2 block text-sm font-medium app-title">
            Comparison salary ({values.payPeriod === "monthly" ? "monthly" : "yearly"})
          </label>

          <input
            type="number"
            value={comparisonSalary}
            onChange={(e) => setComparisonSalary(Number(e.target.value) || 0)}
            className="app-input"
            placeholder="Enter another salary"
          />

          <div className="mt-5 grid gap-3">
            {(values.payPeriod === "monthly"
              ? [2500, 3000, 4000, 5000]
              : [30000, 40000, 50000, 60000]
            ).map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setComparisonSalary(amount)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  comparisonSalary === amount ? "tab-active" : "tab-inactive"
                }`}
              >
                {formatCurrency(amount)}
                {values.payPeriod === "monthly" ? "/mo" : "/yr"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              label: "Current net annual",
              value: formatCurrency(currentResult.netAnnual),
              icon: WalletCards,
              tone: "app-title",
            },
            {
              label: "Compared net annual",
              value: formatCurrency(comparisonResult.netAnnual),
              icon: WalletCards,
              tone: "app-title",
            },
            {
              label: "Gross difference",
              value: `${annualGrossDifference >= 0 ? "+" : "-"}${formatCurrency(
                Math.abs(annualGrossDifference)
              )}`,
              icon: ArrowUpRight,
              tone:
                annualGrossDifference >= 0 ? "money-positive" : "money-negative",
            },
            {
              label: "Net difference",
              value: `${annualNetDifference >= 0 ? "+" : "-"}${formatCurrency(
                Math.abs(annualNetDifference)
              )}`,
              icon: Scale,
              tone:
                annualNetDifference >= 0 ? "money-positive" : "money-negative",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="app-soft p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm app-subtle">{item.label}</p>
                  <Icon className="h-5 w-5 app-accent" />
                </div>
                <p className={`mt-3 text-2xl font-semibold ${item.tone}`}>
                  {item.value}
                </p>
              </div>
            );
          })}

          <div className="app-soft p-5 sm:col-span-2">
            <p className="text-sm app-subtle">Monthly take-home difference</p>
            <p
              className={`mt-3 text-2xl font-semibold ${
                monthlyNetDifference >= 0 ? "money-positive" : "money-negative"
              }`}
            >
              {monthlyNetDifference >= 0 ? "+" : "-"}
              {formatCurrency(Math.abs(monthlyNetDifference))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}