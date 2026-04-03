"use client";

import { useMemo, useState } from "react";
import { Gift, Percent, ShieldMinus, Wallet } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

type BonusSimulatorProps = {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
};

export default function BonusSimulator({
  values,
  currentResult,
}: BonusSimulatorProps) {
  const [extraGrossAmount, setExtraGrossAmount] = useState(2000);

  const bonusInput: CalculatorInput = {
    ...values,
    salary:
      values.payPeriod === "monthly"
        ? values.salary + extraGrossAmount / 12
        : values.salary + extraGrossAmount,
  };

  const bonusResult = useMemo(
    () => calculateTakeHome(bonusInput),
    [bonusInput]
  );

  const extraNetAnnual = bonusResult.netAnnual - currentResult.netAnnual;
  const extraNetMonthly = bonusResult.netMonthly - currentResult.netMonthly;
  const extraDeductions =
    bonusResult.totalDeductionsAnnual - currentResult.totalDeductionsAnnual;

  const keepRate =
    extraGrossAmount > 0 ? (extraNetAnnual / extraGrossAmount) * 100 : 0;

  const cards = [
    {
      label: "Extra gross",
      value: formatCurrency(extraGrossAmount),
      icon: Gift,
      tone: "app-title",
    },
    {
      label: "Extra take-home",
      value: formatCurrency(extraNetAnnual),
      icon: Wallet,
      tone: "money-positive",
    },
    {
      label: "Extra deductions",
      value: formatCurrency(extraDeductions),
      icon: ShieldMinus,
      tone: "money-negative",
    },
    {
      label: "You keep",
      value: `${keepRate.toFixed(1)}%`,
      icon: Percent,
      tone: "app-title",
    },
  ];

  return (
    <section className="app-card p-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium app-accent">Bonus / overtime</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          See how much extra pay you actually keep
        </h3>
        <p className="mt-3 text-sm leading-7 app-copy">
          Extra earnings rarely feel as large as they sound. This shows the real
          amount that stays with you after deductions.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="app-soft p-5">
          <label className="mb-2 block text-sm font-medium app-title">
            Extra gross amount
          </label>

          <input
            type="number"
            value={extraGrossAmount}
            onChange={(e) => setExtraGrossAmount(Number(e.target.value) || 0)}
            className="app-input"
            placeholder="e.g. 2000"
          />

          <div className="mt-5 grid gap-3">
            {[500, 1000, 2000, 5000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setExtraGrossAmount(amount)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  extraGrossAmount === amount ? "tab-active" : "tab-inactive"
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
            <p className="text-sm app-subtle">Extra monthly take-home</p>
            <p className="mt-3 text-2xl font-semibold app-title">
              {formatCurrency(extraNetMonthly)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}