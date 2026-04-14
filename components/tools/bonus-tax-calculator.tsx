"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Gift, Scale, Wallet2 } from "lucide-react";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { formatCurrency } from "../../lib/tax/utils/currency";
import ToolInsightPanel from "../shared/tool-insight-panel";
import { getBonusInsights } from "../../lib/tax/insights";

export default function BonusTaxCalculator() {
  const [salary, setSalary] = useState(50000);
  const [bonus, setBonus] = useState(5000);

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

  const withBonusResult = useMemo(() => {
    return calculateTakeHome({
      salary: salary + bonus,
      payPeriod: "yearly",
      region: "uk",
      pensionPercent: 0,
      studentLoanPlan: "none",
      taxCode: "1257L",
    });
  }, [salary, bonus]);

  const bonusNet = withBonusResult.netAnnual - baseResult.netAnnual;
  const bonusTaxDrag = bonus - bonusNet;
  const bonusTaxDragPercent = bonus > 0 ? (bonusTaxDrag / bonus) * 100 : 0;

  const insights = getBonusInsights({
    salary,
    bonus,
    bonusNet,
    bonusTaxDragPercent,
  });

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid gap-6 md:grid-cols-2">
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
              Gross bonus (£)
            </label>
            <input
              type="number"
              value={bonus}
              onChange={(e) => setBonus(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Gift className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Gross bonus
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(bonus)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Wallet2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Net bonus
            </p>
            <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(bonusNet)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Scale className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Lost to deductions
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(bonusTaxDrag)}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950">
              <Scale className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Deduction drag
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {bonusTaxDragPercent.toFixed(0)}%
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
            Compare against salary growth
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Compare whether a bonus or a stronger salary band changes life more meaningfully.
          </p>
        </Link>

        <Link
          href="/salary-sacrifice-calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Explore salary sacrifice
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Judge whether redirecting money efficiently changes the outcome more intelligently.
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
            Move back into the main salary flow for broader deduction reading.
          </p>
        </Link>
      </section>
    </div>
  );
}