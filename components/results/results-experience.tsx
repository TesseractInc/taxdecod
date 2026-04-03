"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Receipt,
  Sparkles,
  Wallet2,
  TrendingUp,
  Landmark,
  GraduationCap,
  MapPinned,
} from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import SummaryCards from "./summary-cards";
import DeductionChart from "./deduction-chart";
import MoneyFlow from "./money-flow";
import LowerPayInsight from "./lower-pay-insight";
import PayslipExplanation from "./payslip-explanation";
import TaxCodeInsight from "./tax-code-insight";
import RaiseSimulator from "./raise-simulator";
import BonusSimulator from "./bonus-simulator";
import SalaryComparison from "./salary-comparison";
import RealPayCheck from "./real-pay-check";
import ShareResultCard from "./share-result-card";
import SalaryScore from "./salary-score";
import SalaryLeaderboard from "./salary-leaderboard";
import UnderpaidDetector from "./underpaid-detector";
import { formatCurrency } from "../../lib/tax/utils/currency";

type ExperienceView =
  | "full"
  | "overview"
  | "insights"
  | "payslip"
  | "tools"
  | "reality";

type ResultsExperienceProps = {
  result: TakeHomeResult;
  values: CalculatorInput;
  view?: ExperienceView;
};

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "insights", label: "Insights", icon: Sparkles },
  { id: "payslip", label: "Payslip", icon: Receipt },
  { id: "tools", label: "Tools", icon: Sparkles },
  { id: "reality", label: "Reality", icon: Wallet2 },
] as const;

export default function ResultsExperience({
  result,
  values,
  view = "full",
}: ResultsExperienceProps) {
  const visibleTabs = useMemo(() => {
    if (view === "full") return tabs;
    return tabs.filter((tab) => tab.id === view);
  }, [view]);

  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>(visibleTabs[0].id);

  const showTabBar = visibleTabs.length > 1;

  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const biggestDeduction = [
    { label: "Income Tax", value: result.incomeTaxAnnual },
    { label: "National Insurance", value: result.nationalInsuranceAnnual },
    { label: "Pension", value: result.pensionAnnual },
    { label: "Student Loan", value: result.studentLoanAnnual },
  ].sort((a, b) => b.value - a.value)[0];

  const nextActions = [
    {
      title: "Monthly view",
      desc: "See how this feels month to month.",
      href: "#results-tabs",
      icon: Landmark,
      action: () => setActiveTab("overview"),
    },
    {
      title:
        values.studentLoanPlan !== "none"
          ? "Student loan impact"
          : "Try with student loan",
      desc:
        values.studentLoanPlan !== "none"
          ? "Understand how repayments shape your pay."
          : "Test how repayments change take-home.",
      href: "/30000-after-tax-with-student-loan",
      icon: GraduationCap,
    },
    {
      title:
        values.region === "scotland"
          ? "Compare with UK rules"
          : "Scotland comparison",
      desc:
        values.region === "scotland"
          ? "See how standard UK rules differ."
          : "Check salary under Scotland tax rules.",
      href: "/30000-after-tax-scotland",
      icon: MapPinned,
    },
    {
      title: "Raise simulator",
      desc: "See what an increase actually changes.",
      href: "#results-tabs",
      icon: TrendingUp,
      action: () => setActiveTab("tools"),
    },
  ];

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_32%),radial-gradient(circle_at_right,rgba(14,165,233,0.10),transparent_28%)] px-6 py-6 dark:border-slate-800 sm:px-8 sm:py-7">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Salary meaning
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                What this salary really means
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Your headline salary becomes{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.netAnnual)}
                </span>{" "}
                per year, or{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.netMonthly)}
                </span>{" "}
                per month after deductions. You keep about{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {keepPercent.toFixed(0)}%
                </span>{" "}
                of your gross pay.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Net yearly
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(result.netAnnual)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Net monthly
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(result.netMonthly)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Total deducted
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(totalDeductions)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/80">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Instant insight
              </p>

              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-emerald-50 px-4 py-4 dark:bg-emerald-950/30">
                  <p className="text-xs uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                    You keep
                  </p>
                  <p className="mt-2 text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                    {keepPercent.toFixed(0)}%
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Biggest deduction
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {biggestDeduction?.label ?? "No major deduction"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {biggestDeduction?.value
                      ? formatCurrency(biggestDeduction.value)
                      : "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Salary reality
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    You lose{" "}
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(totalDeductions)}
                    </span>{" "}
                    to deductions. That is{" "}
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {(100 - keepPercent).toFixed(0)}%
                    </span>{" "}
                    of your gross pay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                What next?
              </p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Keep moving through the product
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                After seeing your take-home pay, the next question is usually
                more specific. Use these shortcuts to go deeper without losing
                momentum.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {nextActions.map((item) => {
                const Icon = item.icon;

                const content = (
                  <div className="group rounded-[26px] border border-slate-200 bg-slate-50 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:bg-slate-950">
                    <div className="flex items-start justify-between gap-4">
                      <div className="rounded-2xl bg-white p-3 dark:bg-slate-950">
                        <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                    </div>

                    <h4 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                );

                if (item.action) {
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={item.action}
                      className="text-left"
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <Link key={item.title} href={item.href}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showTabBar ? (
        <div
          id="results-tabs"
          className="sticky top-20 z-20 rounded-[28px] border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90"
        >
          <div className="grid gap-3 md:grid-cols-5">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-3xl border px-4 py-4 text-left transition ${
                    active
                      ? "border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-950/30"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`inline-flex rounded-2xl p-2 ${
                        active
                          ? "bg-white text-sky-600 dark:bg-slate-950 dark:text-sky-400"
                          : "bg-white text-slate-500 dark:bg-slate-950 dark:text-slate-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {tab.label}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {tab.id === "overview" && "Score, summary, flow"}
                        {tab.id === "insights" && "Rank and pressure signals"}
                        {tab.id === "payslip" && "Decode deductions"}
                        {tab.id === "tools" && "Raise, bonus, compare"}
                        {tab.id === "reality" && "Real-world pay feeling"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.24 }}
          className="space-y-6"
        >
          {activeTab === "overview" && (
            <>
              <SummaryCards result={result} />
              <SalaryScore result={result} />
              <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                <DeductionChart result={result} />
                <MoneyFlow result={result} />
              </div>
              <LowerPayInsight values={values} result={result} />
            </>
          )}

          {activeTab === "insights" && (
            <>
              <SalaryLeaderboard result={result} />
              <UnderpaidDetector values={values} result={result} />
            </>
          )}

          {activeTab === "payslip" && (
            <>
              <TaxCodeInsight values={values} />
              <PayslipExplanation values={values} result={result} />
            </>
          )}

          {activeTab === "tools" && (
            <>
              <RaiseSimulator values={values} currentResult={result} />
              <BonusSimulator values={values} currentResult={result} />
              <SalaryComparison values={values} currentResult={result} />
            </>
          )}

          {activeTab === "reality" && (
            <>
              <RealPayCheck result={result} />
              <ShareResultCard values={values} result={result} />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}