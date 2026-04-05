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
  Repeat,
  ArrowRightLeft,
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

  // 🚀 NEW HIGH-IMPACT CTA SYSTEM
  const nextActions = [
    {
      title: "Compare another salary",
      desc: "See if a higher salary actually makes a difference after tax.",
      href: "/compare-salary", // future page
      icon: ArrowRightLeft,
    },
    {
      title: "Reverse salary (goal-based)",
      desc: "Find what you need to earn to hit your ideal take-home.",
      href: "/reverse-tax",
      icon: Repeat,
    },
    {
      title: "Raise simulator",
      desc: "Test how a raise really impacts your monthly income.",
      href: "#results-tabs",
      icon: TrendingUp,
      action: () => setActiveTab("tools"),
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
  ];

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-950">

        {/* HEADER */}
        <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8 sm:py-7">
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
            per month after deductions.
          </p>
        </div>

        {/* 🔥 NEW CTA BLOCK */}
        <div className="px-6 py-6 sm:px-8 sm:py-7 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              What next?
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Explore deeper salary decisions
            </h3>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {nextActions.map((item) => {
              const Icon = item.icon;

              const content = (
                <div className="group rounded-[26px] border border-slate-200 bg-slate-50 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:bg-slate-950">
                  <div className="flex items-start justify-between">
                    <Icon className="h-5 w-5 text-sky-600" />
                    <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5" />
                  </div>

                  <h4 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              );

              if (item.action) {
                return (
                  <button key={item.title} onClick={item.action}>
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

      {/* EXISTING TABS + SYSTEM (UNCHANGED) */}
      {showTabBar && (
        <div
          id="results-tabs"
          className="sticky top-20 z-20 rounded-[28px] border border-slate-200 bg-white/90 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90"
        >
          <div className="grid gap-3 md:grid-cols-5">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-3xl border px-4 py-4 text-left ${
                    active
                      ? "border-sky-300 bg-sky-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4 mb-2" />
                  <p className="text-sm font-semibold">{tab.label}</p>
                </button>
              );
            })}
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
              <ShareResultCard values={values} result={result} />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}