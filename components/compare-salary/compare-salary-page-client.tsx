"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Save } from "lucide-react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Container from "@/components/ui/container";
import TaxYearTrustBar from "@/components/shared/tax-year-trust-bar";
import SeoPageHero from "@/components/seo/seo-page-hero";
import SeoRealityCard from "@/components/seo/seo-reality-card";
import SeoCtaCluster from "@/components/seo/seo-cta-cluster";
import EmailCapturePanel from "@/components/shared/email-capture-panel";
import SavedScenariosPanel from "@/components/shared/saved-scenarios-panel";
import { useSupabaseAuth } from "@/components/auth/supabase-auth-provider";
import { calculateTakeHome } from "@/lib/tax/calculators/take-home";
import { formatCurrency } from "@/lib/tax/utils/currency";
import { TRUST_COPY, getStandardUkEmployeeInput } from "@/lib/tax/config";
import {
  createScenarioId,
  getLastScenario,
  saveLastScenario,
  saveScenario,
  type SavedScenario,
} from "@/lib/tax/storage/saved-scenarios";

type CompareState = {
  salaryA: number;
  salaryB: number;
};

const quickPairs = [
  [30000, 35000],
  [40000, 50000],
  [50000, 60000],
  [60000, 70000],
];

export default function CompareSalaryPageClient() {
  const { user, email } = useSupabaseAuth();
  const userScope = user?.id || email || "guest";

  const [salaryA, setSalaryA] = useState(40000);
  const [salaryB, setSalaryB] = useState(50000);
  const [saveNotice, setSaveNotice] = useState("");

  useEffect(() => {
    const saved = getLastScenario<CompareState>("compare", userScope);
    if (saved?.salaryA && saved?.salaryB) {
      setSalaryA(saved.salaryA);
      setSalaryB(saved.salaryB);
    }
  }, [userScope]);

  useEffect(() => {
    saveLastScenario(
      "compare",
      {
        salaryA,
        salaryB,
      },
      userScope
    );
  }, [salaryA, salaryB, userScope]);

  const inputA = useMemo(
    () =>
      getStandardUkEmployeeInput({
        salary: salaryA,
        payPeriod: "yearly",
        studentLoanPlan: "plan2",
      }),
    [salaryA]
  );

  const inputB = useMemo(
    () =>
      getStandardUkEmployeeInput({
        salary: salaryB,
        payPeriod: "yearly",
        studentLoanPlan: "plan2",
      }),
    [salaryB]
  );

  const resultA = useMemo(() => calculateTakeHome(inputA), [inputA]);
  const resultB = useMemo(() => calculateTakeHome(inputB), [inputB]);

  const grossDifference = salaryB - salaryA;
  const netDiff = resultB.netAnnual - resultA.netAnnual;
  const monthlyDiff = resultB.netMonthly - resultA.netMonthly;
  const taxOnIncrease = grossDifference - netDiff;

  const keepPercent =
    grossDifference > 0 ? (netDiff / grossDifference) * 100 : 0;

  const taxLossPercent =
    grossDifference > 0 ? (taxOnIncrease / grossDifference) * 100 : 0;

  function handleSaveScenario() {
    const scenario: SavedScenario = {
      id: createScenarioId("compare"),
      type: "compare",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      title: `£${salaryA.toLocaleString("en-GB")} vs £${salaryB.toLocaleString(
        "en-GB"
      )}`,
      subtitle: `${formatCurrency(monthlyDiff)}/month difference · ${keepPercent.toFixed(
        0
      )}% kept`,
      payload: {
        salaryA,
        salaryB,
      },
    };

    saveScenario(scenario, userScope);
    setSaveNotice("Saved to your recent comparison scenarios.");
    window.setTimeout(() => setSaveNotice(""), 2200);
  }

  function handleLoadScenario(scenario: SavedScenario) {
    const payload = scenario.payload as Partial<CompareState>;
    if (payload.salaryA && payload.salaryB) {
      setSalaryA(payload.salaryA);
      setSalaryB(payload.salaryB);
    }
  }

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Salary decision tool"
            title="Compare two salaries properly"
            description="This page is built for the moment when one salary looks better on paper but you need to know whether it really improves life after tax."
            highlightValue={
              monthlyDiff >= 0
                ? `+${formatCurrency(Math.abs(monthlyDiff))}`
                : `-${formatCurrency(Math.abs(monthlyDiff))}`
            }
            highlightSubtext="estimated monthly take-home difference"
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.comparisonPage.description}
              points={[...TRUST_COPY.comparisonPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Comparison reality">
              A bigger gross salary is not the same as a better monthly outcome.
              What matters is how much of the increase actually survives tax,
              National Insurance, pension, and student loan deductions.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Open the full calculator",
                  description:
                    "Check a single salary in more depth before you compare it with another.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a target income",
                  description:
                    "Find the gross salary needed to hit the monthly figure you actually want.",
                },
                {
                  href: "/salary-hub",
                  title: "Explore salary pages",
                  description:
                    "Browse nearby salary levels and take-home routes for more context.",
                },
              ]}
            />
          </div>

          <section className="mt-14 overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.30)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    Salary comparison console
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                    Test the salary jump before you believe it
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                    Use the pair inputs below to see the real annual and monthly
                    take-home change, not just the gross increase.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickPairs.map(([a, b]) => (
                    <button
                      key={`${a}-${b}`}
                      type="button"
                      onClick={() => {
                        setSalaryA(a);
                        setSalaryB(b);
                      }}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950 dark:hover:text-sky-300"
                    >
                      £{a.toLocaleString("en-GB")} vs £{b.toLocaleString("en-GB")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2 sm:p-8">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Salary A
                </p>
                <div className="relative mt-4">
                  <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                    £
                  </span>
                  <input
                    type="number"
                    value={salaryA}
                    onChange={(e) => setSalaryA(Number(e.target.value) || 0)}
                    className="app-input h-[72px] rounded-[22px] pl-12 text-2xl font-semibold"
                  />
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
                  Starting salary, current offer, or current role.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Salary B
                </p>
                <div className="relative mt-4">
                  <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500 dark:text-slate-400">
                    £
                  </span>
                  <input
                    type="number"
                    value={salaryB}
                    onChange={(e) => setSalaryB(Number(e.target.value) || 0)}
                    className="app-input h-[72px] rounded-[22px] pl-12 text-2xl font-semibold"
                  />
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
                  New salary, target role, or raise scenario.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-8">
              <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
                <button
                  type="button"
                  onClick={handleSaveScenario}
                  className="app-button-secondary justify-center sm:justify-start"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save comparison
                </button>

                {saveNotice ? (
                  <div
                    className="rounded-[18px] border px-4 py-3 text-sm"
                    style={{
                      borderColor: "color-mix(in srgb, #10b981 22%, var(--line))",
                      background:
                        "color-mix(in srgb, #10b981 8%, var(--surface-2))",
                      color: "var(--text)",
                    }}
                  >
                    {saveNotice}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.30)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Net difference
              </p>
              <h2
                className={`mt-2 text-4xl font-bold tracking-tight sm:text-5xl ${
                  netDiff >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {netDiff >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(netDiff))}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                {monthlyDiff >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(monthlyDiff))} per month difference
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-4 sm:p-8">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Gross difference
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(Math.abs(grossDifference))}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  You actually keep
                </p>
                <p className="mt-3 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {grossDifference > 0 ? `${keepPercent.toFixed(0)}%` : "—"}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Lost to deductions
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {grossDifference > 0 ? formatCurrency(taxOnIncrease) : "—"}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Tax drag
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {grossDifference > 0 ? `${taxLossPercent.toFixed(0)}%` : "—"}
                </p>
              </div>
            </div>
          </section>

          <div className="mt-10">
            <SavedScenariosPanel
              type="compare"
              title="Recent comparison scenarios"
              emptyTitle="No comparison scenarios saved yet"
              emptyDescription="Save a salary comparison route and it will appear here for fast return access."
              onLoad={handleLoadScenario}
            />
          </div>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            <Link
              href="/reverse-tax"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Reverse from take-home
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Start from the monthly amount you want and work backwards.
              </p>
            </Link>

            <Link
              href="/calculator"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Open the main calculator
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Get a full guided reading for one salary in more detail.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Explore salary pages
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Browse nearby salary bands and related take-home pages.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <EmailCapturePanel
              title="Send this salary comparison to your email"
              description="Save a job-offer or raise comparison so you can come back to it later with clearer context."
              buttonLabel="Send comparison report"
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}