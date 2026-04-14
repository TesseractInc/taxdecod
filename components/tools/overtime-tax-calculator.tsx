"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock3, Wallet2, Zap } from "lucide-react";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";
import ToolInsightPanel from "../shared/tool-insight-panel";
import { getOvertimeInsights } from "../../lib/tax/insights";

export default function OvertimeTaxCalculator() {
  const [salary, setSalary] = useState(35000);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [overtimeHours, setOvertimeHours] = useState(20);

  const overtimeGross = hourlyRate * overtimeHours;

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

  const withOvertimeResult = useMemo(() => {
    return calculateTakeHome({
      salary: salary + overtimeGross,
      payPeriod: "yearly",
      region: "uk",
      pensionPercent: 0,
      studentLoanPlan: "none",
      taxCode: "1257L",
    });
  }, [salary, overtimeGross]);

  const overtimeNet = withOvertimeResult.netAnnual - baseResult.netAnnual;
  const effectiveNetHourly = overtimeHours > 0 ? overtimeNet / overtimeHours : 0;

  const insights = getOvertimeInsights({
    baseSalary: salary,
    overtimeGross,
    overtimeNet,
    hourlyRate,
    overtimeHours,
  });

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Base salary (£)
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
              Overtime hourly rate (£)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Overtime hours
            </label>
            <input
              type="number"
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Clock3 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Gross overtime
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(overtimeGross)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Wallet2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Net overtime value
            </p>
            <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(overtimeNet)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Zap className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Effective net / hour
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(effectiveNetHourly)}
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
              {formatCurrency(withOvertimeResult.netMonthly)}
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
            Compare against better baseline pay
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Check whether a salary increase would outperform extra hours more cleanly.
          </p>
        </Link>

        <Link
          href="/bonus-tax-calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare overtime vs bonus value
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Useful when the choice is between one-off payment and extra hours.
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
            Return to the full salary reading for broader context.
          </p>
        </Link>
      </section>
    </div>
  );
}