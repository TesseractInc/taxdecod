"use client";

import { useMemo, useState } from "react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function SalarySacrificeCalculator({
  values,
  currentResult,
}: {
  values: CalculatorInput;
  currentResult: TakeHomeResult;
}) {
  const [sacrificeAnnual, setSacrificeAnnual] = useState(2000);

  const sacrificedInput = useMemo<CalculatorInput>(() => {
    const annualSalary =
      values.payPeriod === "monthly" ? values.salary * 12 : values.salary;

    const reducedAnnual = Math.max(0, annualSalary - sacrificeAnnual);

    return {
      ...values,
      salary: values.payPeriod === "monthly" ? reducedAnnual / 12 : reducedAnnual,
    };
  }, [values, sacrificeAnnual]);

  const sacrificedResult = useMemo(
    () => calculateTakeHome(sacrificedInput),
    [sacrificedInput]
  );

  const taxSaved =
    currentResult.totalDeductionsAnnual - sacrificedResult.totalDeductionsAnnual;
  const netPayDrop = currentResult.netAnnual - sacrificedResult.netAnnual;
  const efficiency =
    sacrificeAnnual > 0 ? (taxSaved / sacrificeAnnual) * 100 : 0;

  return (
    <section className="app-card p-6 sm:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Salary sacrifice</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          See the real cost of sacrificing salary
        </h3>
        <p className="mt-3 text-sm leading-7 app-copy">
          Useful for pension-heavy planning, cycle-to-work style arrangements,
          and understanding how much headline pay you give up versus how much
          take-home you actually lose.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="app-soft p-5">
          <label className="mb-2 block text-sm font-medium app-title">
            Annual salary sacrifice amount
          </label>
          <input
            type="number"
            value={sacrificeAnnual}
            onChange={(e) => setSacrificeAnnual(Number(e.target.value) || 0)}
            className="app-input"
          />

          <div className="mt-4 grid gap-2">
            {[1000, 2000, 5000, 8000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSacrificeAnnual(amount)}
                className="rounded-xl border px-4 py-3 text-sm transition"
                style={{
                  borderColor:
                    sacrificeAnnual === amount
                      ? "color-mix(in srgb, var(--primary) 28%, var(--line))"
                      : "var(--line)",
                  background:
                    sacrificeAnnual === amount
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="app-soft p-5">
              <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                Tax saved
              </p>
              <p className="mt-3 text-xl font-semibold money-positive">
                {formatCurrency(taxSaved)}
              </p>
            </div>

            <div className="app-soft p-5">
              <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                Net pay drop
              </p>
              <p className="mt-3 text-xl font-semibold money-negative">
                {formatCurrency(netPayDrop)}
              </p>
            </div>

            <div className="app-soft p-5">
              <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                Efficiency
              </p>
              <p className="mt-3 text-xl font-semibold app-title">
                {efficiency.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="app-card-strong rounded-[26px] p-6">
            <p className="text-sm app-subtle">New estimated gross salary</p>
            <p className="mt-2 text-3xl font-bold app-title">
              {formatCurrency(sacrificedResult.grossAnnual)}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="app-soft p-4">
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Current net annual
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  {formatCurrency(currentResult.netAnnual)}
                </p>
              </div>

              <div className="app-soft p-4">
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Sacrifice net annual
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  {formatCurrency(sacrificedResult.netAnnual)}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-8 app-copy">
              Sacrificing {formatCurrency(sacrificeAnnual)} does not usually
              reduce your real take-home by the same amount, because some of the
              lost headline pay is offset by lower tax and deduction pressure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}