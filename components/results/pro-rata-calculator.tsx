"use client";

import { useMemo, useState } from "react";
import { Clock3, CalendarRange, PieChart } from "lucide-react";
import { formatCurrency } from "../../lib/tax/utils/currency";

type ProRataCalculatorProps = {
  fullTimeSalary?: number;
};

export default function ProRataCalculator({
  fullTimeSalary = 40000,
}: ProRataCalculatorProps) {
  const [annualSalary, setAnnualSalary] = useState(fullTimeSalary);
  const [daysWorked, setDaysWorked] = useState(3);
  const [fullTimeDays, setFullTimeDays] = useState(5);
  const [monthsWorked, setMonthsWorked] = useState(12);

  const result = useMemo(() => {
    const workloadRatio =
      fullTimeDays > 0 ? Math.min(daysWorked / fullTimeDays, 1) : 0;
    const monthRatio = Math.min(Math.max(monthsWorked, 0), 12) / 12;
    const proRataAnnual = annualSalary * workloadRatio * monthRatio;

    return {
      workloadRatio,
      monthRatio,
      proRataAnnual,
      monthly: proRataAnnual / 12,
    };
  }, [annualSalary, daysWorked, fullTimeDays, monthsWorked]);

  return (
    <section className="app-card p-6 sm:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Pro-rata calculator</p>
        <h3 className="mt-2 text-2xl font-semibold app-title">
          Estimate part-time or partial-year salary
        </h3>
        <p className="mt-3 text-sm leading-7 app-copy">
          Useful for part-time work, reduced days, contract starts mid-year, or
          roles that do not cover the full 12 months.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="app-soft p-5">
            <label className="mb-2 block text-sm font-medium app-title">
              Full-time annual salary
            </label>
            <input
              type="number"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value) || 0)}
              className="app-input"
            />
          </div>

          <div className="app-soft p-5">
            <label className="mb-2 block text-sm font-medium app-title">
              Days worked per week
            </label>
            <input
              type="number"
              value={daysWorked}
              onChange={(e) => setDaysWorked(Number(e.target.value) || 0)}
              className="app-input"
            />
          </div>

          <div className="app-soft p-5">
            <label className="mb-2 block text-sm font-medium app-title">
              Full-time week
            </label>
            <input
              type="number"
              value={fullTimeDays}
              onChange={(e) => setFullTimeDays(Number(e.target.value) || 0)}
              className="app-input"
            />
          </div>

          <div className="app-soft p-5">
            <label className="mb-2 block text-sm font-medium app-title">
              Months worked this year
            </label>
            <input
              type="number"
              value={monthsWorked}
              onChange={(e) => setMonthsWorked(Number(e.target.value) || 0)}
              className="app-input"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="app-card-strong rounded-[28px] p-6">
            <p className="text-sm app-subtle">Estimated pro-rata salary</p>
            <h4 className="mt-2 text-4xl font-bold app-title">
              {formatCurrency(result.proRataAnnual)}
            </h4>
            <p className="mt-2 text-sm app-copy">
              About {formatCurrency(result.monthly)} per calendar month
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Workload
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {(result.workloadRatio * 100).toFixed(0)}%
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Year coverage
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {(result.monthRatio * 100).toFixed(0)}%
              </p>
            </div>

            <div className="app-soft p-5">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 app-accent" />
                <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                  Combined
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold app-title">
                {((result.workloadRatio * result.monthRatio) * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--line)] bg-[var(--card-soft)] px-5 py-5">
            <p className="text-sm leading-8 app-copy">
              This pro-rata estimate is useful before you even open the full tax
              calculator. Once you know the part-time or partial-year gross
              figure, run it through TaxDecod to see the actual take-home result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}