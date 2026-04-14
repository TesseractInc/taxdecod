"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PiggyBank, Scale, Wallet2 } from "lucide-react";
import { calculateTakeHome } from "lib/tax/calculators/take-home";
import { formatCurrency } from "lib/tax/utils/currency";
import ToolInsightPanel from "components/shared/tool-insight-panel";
import { getSalarySacrificeInsights } from "lib/tax/insights";

export default function SalarySacrificeCalculator() {
  const [salary, setSalary] = useState(50000);
  const [sacrifice, setSacrifice] = useState(5);

  const baseResult = useMemo(() => {
    return calculateTakeHome({
      salary,
      payPeriod: "yearly",
      region: "uk",
      pensionPercent: 0,
      studentLoanPlan: "none",
      taxCode: "1257L",
    });
  }, [salary]);

  const sacrificeResult = useMemo(() => {
    return calculateTakeHome({
      salary,
      payPeriod: "yearly",
      region: "uk",
      pensionPercent: sacrifice,
      studentLoanPlan: "none",
      taxCode: "1257L",
    });
  }, [salary, sacrifice]);

  const taxSaved = baseResult.incomeTaxAnnual - sacrificeResult.incomeTaxAnnual;
  const monthlyNetChange = sacrificeResult.netMonthly - baseResult.netMonthly;

  const insights = getSalarySacrificeInsights({
    salary,
    sacrificePercent: sacrifice,
    taxSaved,
    monthlyNetChange,
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
              Pension / sacrifice (%)
            </label>
            <input
              type="number"
              value={sacrifice}
              onChange={(e) => setSacrifice(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <PiggyBank className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Tax saved
            </p>
            <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(taxSaved)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Scale className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Monthly net change
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(monthlyNetChange)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Wallet2 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              New monthly take-home
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(sacrificeResult.netMonthly)}
            </p>
          </div>
        </div>
      </section>

      <ToolInsightPanel insights={insights} />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/100k-tax-trap"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Explore the £100k tax trap
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Useful when sacrifice becomes a threshold-management decision as well as a pension one.
          </p>
        </Link>

        <Link
          href="/compare-salary"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare salary outcomes
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Judge whether raw salary growth or tax-efficient structure produces the better outcome.
          </p>
        </Link>

        <Link
          href="/calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Open the main calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Return to the broader salary flow with the main deduction dashboard.
          </p>
        </Link>
      </section>
    </div>
  );
}