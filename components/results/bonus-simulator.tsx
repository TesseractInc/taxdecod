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

  const currentDeductions =
    currentResult.totalDeductionsAnnual ||
    currentResult.incomeTaxAnnual +
      currentResult.nationalInsuranceAnnual +
      currentResult.pensionAnnual +
      currentResult.studentLoanAnnual;

  const bonusDeductions =
    bonusResult.totalDeductionsAnnual ||
    bonusResult.incomeTaxAnnual +
      bonusResult.nationalInsuranceAnnual +
      bonusResult.pensionAnnual +
      bonusResult.studentLoanAnnual;

  const extraNetAnnual = bonusResult.netAnnual - currentResult.netAnnual;
  const extraNetMonthly = bonusResult.netMonthly - currentResult.netMonthly;
  const extraDeductions = bonusDeductions - currentDeductions;

  const keepRate =
    extraGrossAmount > 0 ? (extraNetAnnual / extraGrossAmount) * 100 : 0;

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Bonus / overtime simulator
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            How much of extra pay do you actually keep?
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Bonuses and overtime feel larger before deductions. This panel shows
            what really lands with you after tax pressure.
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[0.92fr_1.08fr] sm:p-7">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-950">
              <Gift className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Extra gross amount
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Test a bonus, overtime amount, or one-off extra pay
              </p>
            </div>
          </div>

          <div className="relative mt-5">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
              £
            </span>
            <input
              type="number"
              value={extraGrossAmount}
              onChange={(e) => setExtraGrossAmount(Number(e.target.value) || 0)}
              className="app-input h-[72px] rounded-[22px] pl-12 text-2xl font-semibold"
            />
          </div>

          <div className="mt-5 grid gap-3">
            {[500, 1000, 2000, 5000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setExtraGrossAmount(amount)}
                className={`rounded-[20px] border px-4 py-3 text-left text-sm transition ${
                  extraGrossAmount === amount
                    ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:text-sky-300"
                }`}
              >
                Try {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-50/80 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
              <div className="flex items-center justify-between">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  You actually keep
                </p>
                <Wallet className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-emerald-700 dark:text-emerald-300">
                {formatCurrency(extraNetAnnual)}
              </p>
              <p className="mt-2 text-sm text-emerald-800/80 dark:text-emerald-200/80">
                {formatCurrency(extraNetMonthly)} per month
              </p>
            </div>

            <div className="rounded-[24px] border border-rose-200 bg-rose-50/80 p-5 dark:border-rose-900 dark:bg-rose-950/30">
              <div className="flex items-center justify-between">
                <p className="text-sm text-rose-700 dark:text-rose-300">
                  Lost to deductions
                </p>
                <ShieldMinus className="h-4.5 w-4.5 text-rose-600 dark:text-rose-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-rose-700 dark:text-rose-300">
                {formatCurrency(extraDeductions)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Keep rate
              </p>
              <Percent className="h-4.5 w-4.5 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {keepRate.toFixed(1)}%
            </p>
          </div>

          <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm leading-8 text-slate-600 dark:text-slate-400">
              A bonus of{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(extraGrossAmount)}
              </strong>{" "}
              increases take-home pay by about{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(extraNetAnnual)}
              </strong>
              , which means roughly{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {keepRate.toFixed(0)}%
              </strong>{" "}
              of the extra amount reaches you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}