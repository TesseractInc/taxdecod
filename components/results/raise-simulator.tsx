"use client";

import { useMemo, useState } from "react";
import { BadgePlus, CircleDollarSign, ShieldMinus, Wallet2 } from "lucide-react";
import { TakeHomeResult, CalculatorInput } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

type RaiseSimulatorProps = {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
};

export default function RaiseSimulator({
  values,
  currentResult,
}: RaiseSimulatorProps) {
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
  const extraNetMonthly = raisedResult.netMonthly - currentResult.netMonthly;
  const extraTaxAnnual =
    raisedResult.totalDeductionsAnnual - currentResult.totalDeductionsAnnual;

  const cards = [
    {
      label: "Current net annual",
      value: formatCurrency(currentResult.netAnnual),
      icon: Wallet2,
      tone: "app-title",
    },
    {
      label: "New net annual",
      value: formatCurrency(raisedResult.netAnnual),
      icon: CircleDollarSign,
      tone: "app-title",
    },
    {
      label: "Extra take-home / year",
      value: formatCurrency(extraNetAnnual),
      icon: BadgePlus,
      tone: "money-positive",
    },
    {
      label: "Extra take-home / month",
      value: formatCurrency(extraNetMonthly),
      icon: Wallet2,
      tone: "money-positive",
    },
  ];

  return (
    <section id="raise-simulator" className="app-card p-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium app-accent">Raise simulator</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          See what a raise really changes
        </h3>
        <p className="mt-3 text-sm leading-7 app-copy">
          A higher salary does not equal the same increase in take-home pay.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="app-soft p-5">
          <label className="mb-2 block text-sm font-medium app-title">
            Raise amount per year
          </label>
          <input
            type="number"
            value={raiseAmount}
            onChange={(e) => setRaiseAmount(Number(e.target.value) || 0)}
            className="app-input"
            placeholder="e.g. 5000"
          />

          <div className="mt-5 grid gap-3">
            {[1000, 2500, 5000, 10000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setRaiseAmount(amount)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  raiseAmount === amount ? "tab-active" : "tab-inactive"
                }`}
              >
                Try {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="app-soft p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm app-subtle">{card.label}</p>
                  <Icon className="h-5 w-5 app-accent" />
                </div>
                <p className={`mt-3 text-2xl font-semibold ${card.tone}`}>
                  {card.value}
                </p>
              </div>
            );
          })}

          <div className="app-soft p-5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-sm app-subtle">Extra deductions triggered</p>
              <ShieldMinus className="h-5 w-5 money-negative" />
            </div>
            <p className="mt-3 text-2xl font-semibold money-negative">
              {formatCurrency(extraTaxAnnual)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}