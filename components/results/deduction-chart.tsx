"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function DeductionChart({ result }: { result: TakeHomeResult }) {
  const data = [
    { name: "Take Home", value: result.netAnnual },
    { name: "Tax", value: result.incomeTaxAnnual },
    { name: "NI", value: result.nationalInsuranceAnnual },
    { name: "Pension", value: result.pensionAnnual },
    { name: "Loan", value: result.studentLoanAnnual },
  ].filter((d) => d.value > 0);

  const total = result.grossAnnual;

  const COLORS = [
    "#10b981",
    "#0ea5e9",
    "#38bdf8",
    "#f59e0b",
    "#f43f5e",
  ];

  const keepPercent =
    total > 0 ? (result.netAnnual / total) * 100 : 0;

  return (
    <div className="rounded-[32px] border p-6 bg-white dark:bg-slate-950 shadow-sm">
      <h3 className="text-xl font-semibold app-title">
        Salary composition
      </h3>

      <div className="relative w-full h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs app-subtle">You keep</p>
          <p className="text-3xl font-bold text-emerald-500">
            {keepPercent.toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex justify-between text-sm">
            <span>{d.name}</span>
            <span>{formatCurrency(d.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}