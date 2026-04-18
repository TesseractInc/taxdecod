"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Scale,
  Wallet2,
  ArrowRightLeft,
  ShieldCheck,
} from "lucide-react";
import { formatCurrency } from "@/lib/tax/utils/currency";
import ToolInsightPanel from "@/components/shared/tool-insight-panel";
import { getStudentLoanInsights } from "@/lib/tax/insights";

type Plan = "plan1" | "plan2" | "plan4" | "plan5" | "postgrad";

const thresholds: Record<Plan, number> = {
  plan1: 22015,
  plan2: 27295,
  plan4: 27660,
  plan5: 25000,
  postgrad: 21000,
};

const rates: Record<Plan, number> = {
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

function getInterpretationHeadline(
  salary: number,
  repayment: number,
  monthly: number
) {
  if (repayment <= 0) {
    return "At this salary, student loan repayment is not currently creating a visible drag";
  }

  if (monthly < 75) {
    return "Student loan is reducing take-home, but the monthly drag is still fairly contained";
  }

  if (monthly < 150) {
    return "Student loan is now becoming a noticeable monthly deduction";
  }

  return "Student loan is now large enough to materially change how this salary feels month to month";
}

function getInterpretationBody(
  plan: Plan,
  salary: number,
  repayment: number,
  monthly: number
) {
  if (repayment <= 0) {
    return `On ${labels[plan]}, a salary of £${salary.toLocaleString(
      "en-GB"
    )} is currently at or below the repayment threshold, so no student loan deduction is being shown here.`;
  }

  if (monthly < 75) {
    return `On ${labels[plan]}, a salary of £${salary.toLocaleString(
      "en-GB"
    )} is high enough to trigger repayment, but the monthly drag is still relatively modest. It is real, but it may not yet dominate the way the salary feels.`;
  }

  if (monthly < 150) {
    return `On ${labels[plan]}, a salary of £${salary.toLocaleString(
      "en-GB"
    )} creates a noticeable repayment pattern. This is the point where many users start to feel that gross salary looks better than the actual monthly result.`;
  }

  return `On ${labels[plan]}, a salary of £${salary.toLocaleString(
    "en-GB"
  )} creates a strong repayment drag. This is the kind of setup where comparing salaries only at gross level becomes especially misleading.`;
}

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
  const salaryWithoutLoan = salary;
  const annualTakeHomeDrag = repayment;
  const monthlyTakeHomeDrag = monthly;

  const insights = getStudentLoanInsights({
    salary,
    repayment,
    threshold: thresholds[plan],
    planLabel: labels[plan],
  });

  const interpretationHeadline = getInterpretationHeadline(
    salary,
    repayment,
    monthly
  );
  const interpretationBody = getInterpretationBody(
    plan,
    salary,
    repayment,
    monthly
  );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.30)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <p className="text-sm font-medium app-accent">Plan-based deduction view</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                See how student loan repayment changes what salary really leaves you with
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 app-copy sm:text-base">
                This tool isolates the repayment drag so you can see how the selected
                student loan plan changes annual and monthly outcomes.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border app-card p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] app-subtle">
                  Best use
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  Student-loan drag check
                </p>
              </div>

              <div className="rounded-[24px] border app-card p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] app-subtle">
                  Best follow-up
                </p>
                <p className="mt-2 text-lg font-semibold app-title">
                  Compare salaries properly
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 xl:border-b-0 xl:border-r xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 1</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                Enter your salary and loan plan
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                This works best when you know which student loan plan applies to you.
              </p>
            </div>

            <div className="rounded-[30px] border app-card p-6 sm:p-7">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Salary (£)
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value) || 0)}
                      className="app-input h-[64px] rounded-[22px] pl-12 text-2xl font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium app-title">
                    Loan plan
                  </label>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value as Plan)}
                    className="app-input h-[56px]"
                  >
                    <option value="plan1">Plan 1</option>
                    <option value="plan2">Plan 2</option>
                    <option value="plan4">Plan 4 (Scotland)</option>
                    <option value="plan5">Plan 5</option>
                    <option value="postgrad">Postgraduate</option>
                  </select>
                </div>
              </div>

              <div
                className="mt-5 rounded-[22px] border px-4 py-4"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-semibold app-title">
                  Why plan choice matters
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  The repayment threshold and rate depend on the selected plan.
                  That means the same gross salary can feel materially different
                  depending on which student loan setup applies.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 px-6 py-6 dark:bg-slate-900/40 xl:px-8 xl:py-8">
            <div className="mb-6">
              <p className="text-sm font-medium app-subtle">Step 2</p>
              <h3 className="mt-1 text-xl font-semibold app-title">
                Read the repayment drag clearly
              </h3>
              <p className="mt-2 text-sm leading-7 app-copy">
                This is designed to show what student loan is doing to the salary route,
                not to replace a full take-home calculation.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-[30px] border app-card p-6">
                <p className="text-sm font-medium app-accent">Interpretation</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight app-title sm:text-3xl">
                  {interpretationHeadline}
                </h3>
                <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
                  {interpretationBody}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <GraduationCap className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Yearly repayment</p>
                  <p className="mt-2 text-xl font-semibold app-title">
                    {formatCurrency(repayment)}
                  </p>
                </div>

                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <Wallet2 className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Monthly deduction</p>
                  <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(monthly)}
                  </p>
                </div>

                <div className="rounded-[24px] border app-card px-5 py-5">
                  <div className="inline-flex rounded-[14px] app-soft p-2">
                    <Scale className="h-4 w-4 app-accent" />
                  </div>
                  <p className="mt-4 text-sm app-subtle">Repayment threshold</p>
                  <p className="mt-2 text-xl font-semibold app-title">
                    {formatCurrency(thresholds[plan])}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border app-card px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                    Salary being tested
                  </p>
                  <p className="mt-2 text-lg font-semibold app-title">
                    {formatCurrency(salaryWithoutLoan)}
                  </p>
                </div>

                <div className="rounded-[24px] border app-card px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                    Annual take-home drag
                  </p>
                  <p className="mt-2 text-lg font-semibold app-title">
                    {formatCurrency(annualTakeHomeDrag)}
                  </p>
                </div>
              </div>

              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-semibold app-title">
                  What this means in practice
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Student loan is not just a technical deduction. It changes how a
                  raise feels, how monthly budgeting works, and whether two salaries
                  are actually far apart in real life.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full app-chip px-3 py-1.5 text-[11px] font-medium">
                    <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                    Plan-based interpretation
                  </span>
                  <span className="inline-flex items-center rounded-full app-chip px-3 py-1.5 text-[11px] font-medium">
                    <ArrowRightLeft className="mr-1.5 h-3.5 w-3.5" />
                    Useful before comparing salaries
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolInsightPanel insights={insights} />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/compare-salary"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare salary routes
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Best when you want to see whether a raise still feels strong after repayment drag.
          </p>
        </Link>

        <Link
          href="/calculator"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Open full calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Move into the broader take-home picture with tax, pension, and salary context.
          </p>
        </Link>

        <Link
          href="/guides/how-student-loan-affects-salary-uk"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Read the student loan guide
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Understand why student loan can make the same salary feel weaker in real life.
          </p>
        </Link>
      </section>
    </div>
  );
}