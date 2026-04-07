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
import ProRataCalculator from "./pro-rata-calculator";
import SalarySacrificeCalculator from "./salary-sacrifice-calculator";
import TaxYearComparison from "./tax-year-comparison";
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
  { id: "tools", label: "Tools", icon: TrendingUp },
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

  const salaryPageHref = `/${Math.max(
    1000,
    Math.round(result.grossAnnual / 1000) * 1000
  )}-after-tax-uk`;

  const nextActions = [
    {
      title: "Compare another salary",
      desc: "Check whether a pay rise actually changes your monthly reality in a meaningful way.",
      href: "/compare-salary",
      icon: ArrowRightLeft,
    },
    {
      title: "Reverse your target take-home",
      desc: "Work backwards from the monthly amount you want to keep after deductions.",
      href: "/reverse-tax",
      icon: Repeat,
    },
    {
      title: "Open salary tools",
      desc: "Use pro-rata, bonus, sacrifice, and comparison tools to test better scenarios.",
      href: "#results-tabs",
      icon: TrendingUp,
      action: () => setActiveTab("tools"),
    },
    {
      title:
        values.region === "scotland"
          ? "Compare with standard UK rules"
          : "Check the Scotland version",
      desc:
        values.region === "scotland"
          ? "See how standard UK tax treatment differs from your current setup."
          : "Compare this salary with Scotland tax treatment and see the difference.",
      href:
        values.region === "scotland"
          ? salaryPageHref
          : `/${Math.max(
              1000,
              Math.round(result.grossAnnual / 1000) * 1000
            )}-after-tax-scotland`,
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
      <div className="overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--card-strong)] shadow-[var(--shadow-md)]">
        <div className="relative overflow-hidden border-b border-[var(--line)] px-6 py-7 sm:px-8 sm:py-8">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(14,165,233,0.10), transparent 34%), radial-gradient(circle at bottom right, rgba(16,185,129,0.08), transparent 28%)",
            }}
          />

          <div className="relative grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] app-accent">
                Salary reality
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                What this salary really means after deductions
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-8 app-copy sm:text-base">
                Your headline pay becomes{" "}
                <span className="font-semibold app-title">
                  {formatCurrency(result.netAnnual)}
                </span>{" "}
                per year, or{" "}
                <span className="font-semibold app-title">
                  {formatCurrency(result.netMonthly)}
                </span>{" "}
                per month after tax, National Insurance, pension, and any
                student loan deductions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "color-mix(in srgb, var(--emerald) 35%, var(--line))",
                  background:
                    "color-mix(in srgb, var(--emerald) 10%, var(--card-soft))",
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] money-positive">
                  You keep
                </p>
                <p className="mt-2 text-3xl font-bold money-positive">
                  {keepPercent.toFixed(0)}%
                </p>
                <p className="mt-2 text-sm app-copy">of your gross salary</p>
              </div>

              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-soft)",
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-subtle">
                  Biggest deduction
                </p>
                <p className="mt-2 text-xl font-bold app-title">
                  {biggestDeduction?.label ?? "No major deduction"}
                </p>
                <p className="mt-2 text-sm app-copy">
                  {biggestDeduction
                    ? formatCurrency(biggestDeduction.value)
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[var(--line)] px-6 py-6 sm:px-8 sm:py-7">
          <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <div
              className="rounded-[26px] border px-5 py-5"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-soft)",
              }}
            >
              <p className="text-sm font-semibold app-title">
                Quick reality check
              </p>
              <p className="mt-2 text-sm leading-8 app-copy">
                You lose{" "}
                <strong className="app-title">
                  {formatCurrency(totalDeductions)}
                </strong>{" "}
                per year to deductions.
                {biggestDeduction ? (
                  <>
                    {" "}
                    The single biggest drag on this salary is{" "}
                    <strong className="app-title">
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
                    className="group rounded-[24px] border px-5 py-5 transition hover-lift"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--card)",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <Icon className="h-5 w-5 app-accent" />
                      <ArrowRight className="h-4 w-4 app-subtle transition group-hover:translate-x-0.5" />
                    </div>

                    <h3 className="mt-4 text-base font-semibold app-title">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 app-copy">
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
                <div
                  className="group rounded-[24px] border px-5 py-5 transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-soft)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-5 w-5 app-accent" />
                    <ArrowRight className="h-4 w-4 app-subtle transition group-hover:translate-x-0.5" />
                  </div>

                  <h4 className="mt-4 text-lg font-semibold app-title">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    {item.desc}
                  </p>
                </div>
              );

              if (item.action) {
                return (
                  <button
                    key={item.title}
                    onClick={item.action}
                    type="button"
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

      {showTabBar && (
        <div id="results-tabs" className="sticky top-20 z-20 space-y-3">
          <div
            className="rounded-[26px] border p-3 backdrop-blur"
            style={{
              borderColor: "var(--line)",
              background:
                "color-mix(in srgb, var(--card-strong) 90%, transparent)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex flex-wrap gap-2">
              {stickyQuickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--card-soft)",
                      color: "var(--text)",
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 app-accent" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-[28px] border p-3 backdrop-blur"
            style={{
              borderColor: "var(--line)",
              background:
                "color-mix(in srgb, var(--card-strong) 90%, transparent)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="grid gap-3 md:grid-cols-5">
              {visibleTabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                    className="rounded-[24px] border px-4 py-4 text-left transition"
                    style={{
                      borderColor: active
                        ? "color-mix(in srgb, var(--primary) 28%, var(--line))"
                        : "var(--line)",
                      background: active
                        ? "color-mix(in srgb, var(--primary) 10%, var(--card-soft))"
                        : "var(--card-soft)",
                    }}
                  >
                    <Icon className="mb-2 h-4 w-4 app-accent" />
                    <p className="text-sm font-semibold app-title">
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
              <SalarySacrificeCalculator values={values} currentResult={result} />
              <TaxYearComparison values={values} />
              <ProRataCalculator fullTimeSalary={result.grossAnnual} />
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