"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function DeductionChart({ result }: { result: TakeHomeResult }) {
  const data = [
    { name: "Take-home pay", value: result.netAnnual, tone: "Take-home" },
    { name: "Income Tax", value: result.incomeTaxAnnual, tone: "Tax" },
    {
      name: "National Insurance",
      value: result.nationalInsuranceAnnual,
      tone: "NI",
    },
    { name: "Pension", value: result.pensionAnnual, tone: "Pension" },
    { name: "Student Loan", value: result.studentLoanAnnual, tone: "Loan" },
  ].filter((d) => d.value > 0);

  const total = result.grossAnnual;
  const keepPercent = total > 0 ? (result.netAnnual / total) * 100 : 0;

  const COLORS = ["#10b981", "#0ea5e9", "#38bdf8", "#8b5cf6", "#f43f5e"];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Deduction composition
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            See what reaches you and what gets removed
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            This visual makes the balance between take-home pay and deduction
            pressure easier to understand at a glance.
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-center sm:p-7">
        <div className="relative h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={82}
                outerRadius={118}
                paddingAngle={3}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid rgba(148,163,184,0.18)",
                  background: "rgba(255,255,255,0.98)",
                  boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="rounded-full border border-slate-200 bg-white/90 px-7 py-6 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                You keep
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                {keepPercent.toFixed(0)}%
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                of gross salary
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {total > 0
                        ? `${((item.value / total) * 100).toFixed(0)}% of gross salary`
                        : "0% of gross salary"}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(item.value)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}