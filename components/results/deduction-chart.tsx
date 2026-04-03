"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

type DeductionChartProps = {
  result: TakeHomeResult;
};

export default function DeductionChart({ result }: DeductionChartProps) {
  const data = [
    { name: "Net Pay", value: result.netAnnual },
    { name: "Income Tax", value: result.incomeTaxAnnual },
    { name: "National Insurance", value: result.nationalInsuranceAnnual },
    { name: "Pension", value: result.pensionAnnual },
    { name: "Student Loan", value: result.studentLoanAnnual },
  ].filter((item) => item.value > 0);

  const COLORS = ["#0ea5e9", "#38bdf8", "#10b981", "#f59e0b", "#f43f5e"];

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Visual breakdown
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Where your salary goes
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          A quick visual split of what you keep and what gets deducted.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}