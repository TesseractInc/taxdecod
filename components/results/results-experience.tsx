"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  Download,
  Mail,
  MapPinned,
  Receipt,
  Repeat,
  Sparkles,
  TrendingUp,
  Wallet2,
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
  ]
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)[0];

  const nextActions = [
    {
      title: "Compare another salary",
      desc: "Check whether a higher salary meaningfully changes your monthly reality.",
      href: "/compare-salary",
      icon: ArrowRightLeft,
    },
    {
      title: "Reverse salary goal",
      desc: "Find the gross salary needed to hit your target take-home pay.",
      href: "/reverse-tax",
      icon: Repeat,
    },
    {
      title: "Open raise simulator",
      desc: "See what an increase of a few thousand actually does after tax.",
      href: "#results-tabs",
      icon: TrendingUp,
      action: () => setActiveTab("tools"),
    },
    {
      title:
        values.region === "scotland"
          ? "Compare with UK rules"
          : "View Scotland scenario",
      desc:
        values.region === "scotland"
          ? "See how standard UK treatment differs from your current setup."
          : "Check how Scotland tax treatment changes this salary.",
      href: "/30000-after-tax-scotland",
      icon: MapPinned,
    },
  ];

  const stickyQuickActions = [
    { label: "Compare", href: "/compare-salary", icon: ArrowRightLeft },
    { label: "Reverse", href: "/reverse-tax", icon: Repeat },
    { label: "Download", href: "#share-result", icon: Download },
    { label: "Email", href: "#share-result", icon: Mail },
  ];

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.30)] dark:border-slate-800 dark:bg-slate-950">
        <div className="relative overflow-hidden border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8 sm:py-8">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(14,165,233,0.10), transparent 34%), radial-gradient(circle at bottom right, rgba(16,185,129,0.08), transparent 28%)",
            }}
          />

          <div className="relative grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Salary meaning
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                What this salary really means for you
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                Your headline salary becomes{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.netAnnual)}
                </span>{" "}
                per year, or{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.netMonthly)}
                </span>{" "}
                per month after deductions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-5 dark:border-emerald-900 dark:bg-emerald-950/30">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                  You keep
                </p>
                <p className="mt-2 text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                  {keepPercent.toFixed(0)}%
                </p>
                <p className="mt-2 text-sm text-emerald-800/80 dark:text-emerald-200/80">
                  of your gross salary
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Biggest pressure
                </p>
                <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {biggestDeduction?.label ?? "No major deduction"}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {biggestDeduction
                    ? formatCurrency(biggestDeduction.value)
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8 sm:py-7">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="rounded-[26px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Quick reality check
              </p>
              <p className="mt-2 text-sm leading-8 text-slate-600 dark:text-slate-400">
                You lose{" "}
                <strong className="text-slate-900 dark:text-slate-100">
                  {formatCurrency(totalDeductions)}
                </strong>{" "}
                each year to tax and deductions.
                {biggestDeduction ? (
                  <>
                    {" "}
                    The largest single drag on this salary is{" "}
                    <strong className="text-slate-900 dark:text-slate-100">
                      {biggestDeduction.label}
                    </strong>
                    .
                  </>
                ) : null}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {nextActions.slice(0, 2).map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-[24px] border border-slate-200 bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/40 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                  >
                    <div className="flex items-start justify-between">
                      <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5" />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {nextActions.slice(2).map((item) => {
              const Icon = item.icon;

              const content = (
                <div className="group rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:bg-slate-950">
                  <div className="flex items-start justify-between">
                    <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5" />
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
                  <button key={item.title} onClick={item.action} type="button">
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

      {showTabBar && (
        <div
          id="results-tabs"
          className="sticky top-20 z-20 space-y-3"
        >
          <div className="rounded-[26px] border border-slate-200 bg-white/92 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/92">
            <div className="flex flex-wrap gap-2">
              {stickyQuickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:text-sky-300"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white/92 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/92">
            <div className="grid gap-3 md:grid-cols-5">
              {visibleTabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                    className={`rounded-[24px] border px-4 py-4 text-left transition ${
                      active
                        ? "border-sky-300 bg-sky-50 shadow-sm dark:border-sky-800 dark:bg-sky-950/30"
                        : "border-slate-200 bg-slate-50 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:bg-slate-950"
                    }`}
                  >
                    <Icon className="mb-2 h-4 w-4 text-sky-600 dark:text-sky-400" />
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {tab.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
              <div className="grid gap-6 xl:grid-cols-2">
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
              <div id="share-result">
                <ShareResultCard values={values} result={result} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}