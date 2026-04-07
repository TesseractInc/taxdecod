"use client";

import { useMemo, useState } from "react";
import { CalendarClock, ArrowLeftRight } from "lucide-react";
import { CalculatorInput } from "../../types/tax";
import { calculateTakeHomeByYear, SupportedTaxYear } from "../../lib/tax/calculators/take-home-by-year";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function TaxYearComparison({
  values,
}: {
  values: CalculatorInput;
}) {
  const [yearA, setYearA] = useState<SupportedTaxYear>("2024/25");
  const [yearB, setYearB] = useState<SupportedTaxYear>("2025/26");

  const resultA = useMemo(() => calculateTakeHomeByYear(values, yearA), [values, yearA]);
  const resultB = useMemo(() => calculateTakeHomeByYear(values, yearB), [values, yearB]);

  const netDiff = resultB.netAnnual - resultA.netAnnual;
  const monthlyDiff = resultB.netMonthly - resultA.netMonthly;

  return (
    <section className="app-card p-6 sm:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Compare tax years</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          Check how the same salary behaves across UK tax years
        </h3>
        <p className="mt-3 text-sm leading-7 app-copy">
          This helps users see whether changes in thresholds or repayment bands
          slightly change their final take-home result.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-4">
          <div className="app-soft p-5">
            <label className="mb-2 block text-sm font-medium app-title">
              First tax year
            </label>
            <select
              value={yearA}
              onChange={(e) => setYearA(e.target.value as SupportedTaxYear)}
              className="app-input"
            >
              <option value="2024/25">2024/25</option>
              <option value="2025/26">2025/26</option>
            </select>
          </div>

          <div className="app-soft p-5">
            <label className="mb-2 block text-sm font-medium app-title">
              Second tax year
            </label>
            <select
              value={yearB}
              onChange={(e) => setYearB(e.target.value as SupportedTaxYear)}
              className="app-input"
            >
              <option value="2024/25">2024/25</option>
              <option value="2025/26">2025/26</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 app-accent" />
                <p className="text-sm font-medium app-title">{yearA}</p>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] app-subtle">
                Net annual
              </p>
              <p className="mt-2 text-xl font-semibold app-title">
                {formatCurrency(resultA.netAnnual)}
              </p>
              <p className="mt-3 text-xs app-subtle">
                Net monthly {formatCurrency(resultA.netMonthly)}
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 app-accent" />
                <p className="text-sm font-medium app-title">{yearB}</p>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] app-subtle">
                Net annual
              </p>
              <p className="mt-2 text-xl font-semibold app-title">
                {formatCurrency(resultB.netAnnual)}
              </p>
              <p className="mt-3 text-xs app-subtle">
                Net monthly {formatCurrency(resultB.netMonthly)}
              </p>
            </div>
          </div>

          <div className="app-card-strong rounded-[26px] p-6">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4 app-accent" />
              <p className="text-sm font-medium app-title">Difference</p>
            </div>

            <p
              className={`mt-4 text-3xl font-bold ${
                netDiff >= 0 ? "money-positive" : "money-negative"
              }`}
            >
              {netDiff >= 0 ? "+" : "-"}
              {formatCurrency(Math.abs(netDiff))}
            </p>

            <p className="mt-2 text-sm app-copy">
              {monthlyDiff >= 0 ? "+" : "-"}
              {formatCurrency(Math.abs(monthlyDiff))} per month between the two
              selected years.
            </p>

            <p className="mt-5 text-sm leading-8 app-copy">
              This is a comparison aid, not a historic payroll statement. It is
              best used to show whether tax-year rule differences materially
              change the take-home outcome for the same salary setup.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}