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

  const bonusInput = useMemo<CalculatorInput>(() => {
    return {
      ...values,
      salary:
        values.payPeriod === "monthly"
          ? values.salary + extraGrossAmount / 12
          : values.salary + extraGrossAmount,
    };
  }, [values, extraGrossAmount]);

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
    <section className="app-card p-6 sm:p-7 overflow-hidden">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Bonus / overtime</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          How much of your bonus do you actually keep?
        </h3>
        <p className="mt-3 text-sm leading-7 app-copy">
          A bonus feels big in gross terms, but the amount that actually reaches
          you can be much smaller after tax and other deductions.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[26px] border border-[var(--line)] bg-[var(--card-soft)] p-5">
          <label className="mb-2 block text-sm font-medium app-title">
            Bonus amount
          </label>

          <input
            type="number"
            value={extraGrossAmount}
            onChange={(e) => setExtraGrossAmount(Number(e.target.value) || 0)}
            className="app-input"
          />

          <div className="mt-5 grid gap-3">
            {[500, 1000, 2000, 5000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setExtraGrossAmount(amount)}
                className="rounded-xl border px-4 py-3 text-sm transition"
                style={{
                  borderColor:
                    extraGrossAmount === amount
                      ? "color-mix(in srgb, var(--primary) 28%, var(--line))"
                      : "var(--line)",
                  background:
                    extraGrossAmount === amount
                      ? "color-mix(in srgb, var(--primary) 10%, var(--card-soft))"
                      : "var(--card)",
                }}
              >
                Try {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="app-card-strong rounded-[26px] p-6">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 app-accent" />
              <p className="text-sm font-medium app-title">Real bonus outcome</p>
            </div>

            <p className="mt-4 text-3xl font-bold money-positive">
              {formatCurrency(extraNetAnnual)}
            </p>
            <p className="mt-2 text-sm app-copy">
              estimated extra take-home from this bonus
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <ShieldMinus className="h-4 w-4 text-rose-500" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Lost to deductions
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold money-negative">
                {formatCurrency(extraDeductions)}
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Keep rate
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {keepRate.toFixed(1)}%
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-emerald-500" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  New monthly net
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {formatCurrency(bonusResult.netMonthly)}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--line)] bg-[var(--card-soft)] px-5 py-5">
            <p className="text-sm leading-8 app-copy">
              Bonus pay is one of the biggest moments where users feel confused
              by their payslip. This tool makes that “where did it go?” moment
              much easier to understand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}