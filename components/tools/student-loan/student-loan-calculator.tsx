"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GraduationCap, Wallet2 } from "lucide-react";
import { formatCurrency } from "lib/tax/utils/currency";
import ToolInsightPanel from "components/shared/tool-insight-panel";
import { getStudentLoanInsights } from "lib/tax/insights";

type Plan = "plan1" | "plan2" | "plan4" | "plan5" | "postgrad";

const thresholds = {
  plan1: 22015,
  plan2: 27295,
  plan4: 27660,
  plan5: 25000,
  postgrad: 21000,
};

const rates = {
  plan1: 0.09,
  plan2: 0.09,
  plan4: 0.09,
  plan5: 0.09,
  postgrad: 0.06,
};

const labels: Record<Plan, string> = {
  plan1: "Plan 1",
  plan2: "Plan 2",
  plan4: "Plan 4",
  plan5: "Plan 5",
  postgrad: "Postgraduate",
};

export default function StudentLoanCalculator() {
  const [salary, setSalary] = useState(30000);
  const [plan, setPlan] = useState<Plan>("plan2");

  const repayment = useMemo(() => {
    const threshold = thresholds[plan];
    const rate = rates[plan];

    if (salary <= threshold) return 0;
    return (salary - threshold) * rate;
  }, [salary, plan]);

  const monthly = repayment / 12;

  const insights = getStudentLoanInsights({
    salary,
    repayment,
    threshold: thresholds[plan],
    planLabel: labels[plan],
  });

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Salary (£)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Loan plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as Plan)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="plan1">Plan 1</option>
              <option value="plan2">Plan 2</option>
              <option value="plan4">Plan 4 (Scotland)</option>
              <option value="plan5">Plan 5</option>
              <option value="postgrad">Postgraduate</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <GraduationCap className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Yearly repayment
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(repayment)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Wallet2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Monthly deduction
            </p>
            <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(monthly)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <GraduationCap className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Repayment threshold
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(thresholds[plan])}
            </p>
          </div>
        </div>
      </section>

      <ToolInsightPanel insights={insights} />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/compare-salary"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare salary routes
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            See how student loan affects whether a pay rise really improves take-home.
          </p>
        </Link>

        <Link
          href="/calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Open full calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Move back into the full salary deduction flow.
          </p>
        </Link>

        <Link
          href="/payslip-explained"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Understand deduction context
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Useful when the real question is how student loan appears inside payslip logic.
          </p>
        </Link>
      </section>
    </div>
  );
}