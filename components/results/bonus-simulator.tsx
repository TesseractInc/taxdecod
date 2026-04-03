"use client";

import { useMemo, useState } from "react";
import { Gift, Percent, ShieldMinus, Wallet } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function BonusSimulator({
  values,
  currentResult,
}: {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
}) {
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
  const extraDeductions =
    bonusResult.totalDeductionsAnnual - currentResult.totalDeductionsAnnual;

  const keepRate =
    extraGrossAmount > 0 ? (extraNetAnnual / extraGrossAmount) * 100 : 0;

  return (
    <section className="relative app-card p-7 overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)",
        }}
      />

      <div className="relative max-w-2xl">
        <p className="text-sm font-medium app-accent">Bonus / overtime</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          How much of your bonus do you actually keep?
        </h3>
        <p className="mt-3 text-sm leading-7 app-copy">
          Bonuses feel big — but deductions take a significant share.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        {/* INPUT */}
        <div className="rounded-[26px] border p-5">
          <label className="mb-2 block text-sm font-medium app-title">
            Bonus amount
          </label>

          <input
            type="number"
            value={extraGrossAmount}
            onChange={(e) => setExtraGrossAmount(Number(e.target.value) || 0)}
            className="app-input focus:scale-[1.01]"
          />

          <div className="mt-5 grid gap-3">
            {[500, 1000, 2000, 5000].map((amount) => (
              <button
                key={amount}
                onClick={() => setExtraGrossAmount(amount)}
                className={`rounded-xl border px-4 py-3 text-sm transition ${
                  extraGrossAmount === amount ? "tab-active" : "tab-inactive"
                }`}
              >
                Try {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </div>

        {/* RESULT */}
        <div className="space-y-4">
          <div className="rounded-[26px] border p-5">
            <p className="text-sm app-subtle">You actually keep</p>
            <p className="mt-3 text-3xl font-bold money-positive">
              {formatCurrency(extraNetAnnual)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="app-soft p-5">
              <p className="text-sm app-subtle">Lost to deductions</p>
              <p className="mt-2 text-xl font-semibold money-negative">
                {formatCurrency(extraDeductions)}
              </p>
            </div>

            <div className="app-soft p-5">
              <p className="text-sm app-subtle">Keep rate</p>
              <p className="mt-2 text-xl font-semibold app-title">
                {keepRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}