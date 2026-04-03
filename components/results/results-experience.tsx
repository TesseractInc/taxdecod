"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Receipt, Sparkles, Wallet2 } from "lucide-react";
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

type ExperienceView = "full" | "overview" | "insights" | "payslip" | "tools" | "reality";

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

  return (
    <section className="space-y-6">
      {showTabBar ? (
        <div className="sticky top-20 z-20 app-card p-3">
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
                    active ? "tab-active" : "tab-inactive"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="inline-flex rounded-2xl p-2"
                      style={{
                        background: active
                          ? "color-mix(in srgb, var(--primary) 12%, transparent)"
                          : "color-mix(in srgb, var(--card) 94%, transparent)",
                        color: active ? "var(--primary)" : "var(--muted)",
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold app-title">{tab.label}</p>
                      <p className="text-xs app-subtle">
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