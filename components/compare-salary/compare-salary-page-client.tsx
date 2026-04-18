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
import AdSlot from "@/components/ads/ad-slot";
import AffiliateRecommendationPanel from "@/components/monetization/affiliate-recommendation-panel";

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

function normalizeSalary(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.round(value));
}

function getDecisionHeadline(
  grossDifference: number,
  monthlyDiff: number,
  keepPercent: number
) {
  if (grossDifference <= 0) {
    return "Use the monthly difference, not the headline salary, as the real signal";
  }

  if (monthlyDiff < 150) {
    return "This is a real gross increase, but the monthly improvement is relatively modest";
  }

  if (monthlyDiff < 300) {
    return "This increase may matter, but it is unlikely to transform monthly life on its own";
  }

  if (keepPercent < 55) {
    return "A meaningful part of the raise is being absorbed by deductions";
  }

  return "This increase is large enough to feel more visible month to month";
}

function getDecisionBody(
  salaryA: number,
  salaryB: number,
  monthlyDiff: number,
  keepPercent: number,
  grossDifference: number
) {
  if (grossDifference <= 0) {
    return `Because the second salary is not higher than the first, the useful interpretation here is not “more pay” but whether the lower or equal route changes your overall deductions or trade-offs in a way that still makes sense.`;
  }

  if (monthlyDiff < 150) {
    return `Moving from £${salaryA.toLocaleString("en-GB")} to £${salaryB.toLocaleString(
      "en-GB"
    )} increases the gross figure clearly, but the estimated monthly gain stays fairly contained. This is where users often realise that a raise can look bigger on paper than it feels in real life.`;
  }

  if (monthlyDiff < 300) {
    return `Moving from £${salaryA.toLocaleString("en-GB")} to £${salaryB.toLocaleString(
      "en-GB"
    )} should still feel better, but not in a dramatic way. If the role change involves more stress, travel, or responsibility, this is the kind of comparison that deserves a calmer decision rather than a headline-driven one.`;
  }

  if (keepPercent < 55) {
    return `This comparison shows a real salary increase, but a significant share of it is being lost to tax, National Insurance, pension, and student loan drag. The raise is not weak, but the retained value is lower than many users initially expect.`;
  }

  return `This jump from £${salaryA.toLocaleString("en-GB")} to £${salaryB.toLocaleString(
    "en-GB"
  )} is strong enough to create a clearer monthly difference after deductions. The higher salary is still not equal to the full headline gain, but the retained improvement is easier to justify in practical terms.`;
}

function getFollowUpPrompts(monthlyDiff: number, grossDifference: number) {
  if (grossDifference <= 0) {
    return [
      {
        title: "Inspect one salary in more detail",
        description:
          "Use the main calculator when the comparison alone is not enough and you need the fuller deduction picture for one salary route.",
        href: "/calculator",
      },
      {
        title: "Work backwards from the monthly figure you want",
        description:
          "Use reverse salary planning if the better question is what monthly amount you actually want to keep.",
        href: "/reverse-tax",
      },
    ];
  }

  if (monthlyDiff < 200) {
    return [
      {
        title: "Check whether the raise is really worth it",
        description:
          "Use reverse planning to test what salary would actually be needed to reach the monthly outcome you want.",
        href: "/reverse-tax",
      },
      {
        title: "Look at nearby salary bands before deciding",
        description:
          "Use salary pages when you want to know whether a slightly higher offer changes the picture more meaningfully.",
        href: "/salary-hub",
      },
    ];
  }

  return [
    {
      title: "Inspect the stronger salary in the full calculator",
      description:
        "Use the main calculator when you want a deeper reading of the better route before making a decision.",
      href: "/calculator",
    },
    {
      title: "Check what monthly target would justify the move",
      description:
        "Use reverse salary planning if you want to translate this comparison into a cleaner target-income decision.",
      href: "/reverse-tax",
    },
  ];
}

export default function CompareSalaryPageClient() {
  const { user, email } = useSupabaseAuth();
  const userScope = user?.id || email || "guest";

  const [salaryA, setSalaryA] = useState(40000);
  const [salaryB, setSalaryB] = useState(50000);
  const [saveNotice, setSaveNotice] = useState("");

  useEffect(() => {
    const saved = getLastScenario<CompareState>("compare", userScope);
    if (saved?.salaryA && saved?.salaryB) {
      setSalaryA(normalizeSalary(saved.salaryA));
      setSalaryB(normalizeSalary(saved.salaryB));
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

  const monthlyDiffLabel = `${monthlyDiff >= 0 ? "+" : "-"}${formatCurrency(
    Math.abs(monthlyDiff)
  )}`;

  const annualDiffLabel = `${netDiff >= 0 ? "+" : "-"}${formatCurrency(
    Math.abs(netDiff)
  )}`;

  const decisionHeadline = getDecisionHeadline(
    grossDifference,
    monthlyDiff,
    keepPercent
  );

  const decisionBody = getDecisionBody(
    salaryA,
    salaryB,
    monthlyDiff,
    keepPercent,
    grossDifference
  );

  const followUpPrompts = getFollowUpPrompts(monthlyDiff, grossDifference);

  function handleSaveScenario() {
    const scenario: SavedScenario = {
      id: createScenarioId("compare"),
      type: "compare",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      title: `£${salaryA.toLocaleString("en-GB")} vs £${salaryB.toLocaleString(
        "en-GB"
      )}`,
      subtitle: `${formatCurrency(
        Math.abs(monthlyDiff)
      )}/month difference · ${
        grossDifference > 0
          ? `${keepPercent.toFixed(0)}% kept`
          : "comparison saved"
      }`,
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
      setSalaryA(normalizeSalary(payload.salaryA));
      setSalaryB(normalizeSalary(payload.salaryB));
    }
  }

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Salary comparison"
            title="Compare two salaries after deductions"
            description="Use this page when the real question is not which salary looks bigger on paper, but which one leaves you materially better off month to month."
            highlightValue={monthlyDiffLabel}
            highlightSubtext="estimated monthly take-home difference"
          />

          <div className="mt-8">
            <AdSlot label="Advertisement" minHeight={90} />
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.comparisonPage.description}
              points={[
                "Updated for the 2026/27 UK tax year",
                ...TRUST_COPY.comparisonPage.points.filter(
                  (point) => !point.includes("2025/26")
                ),
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why this matters">
              A higher gross salary does not always translate into a meaningfully
              better outcome once Income Tax, National Insurance, pension, and
              student loan deductions are applied.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Check one salary in full first",
                  description:
                    "Use the main calculator when you want a deeper reading of one salary before comparing it against another.",
                },
                {
                  href: "/reverse-tax",
                  title: "Work backwards from a target income",
                  description:
                    "Use reverse salary planning when you know the monthly figure you want to keep.",
                },
                {
                  href: "/salary-hub",
                  title: "Browse nearby salary bands",
                  description:
                    "Use the salary hub when you need more context around neighbouring pay levels and routes.",
                },
              ]}
            />
          </div>

          <section className="mt-14 overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.30)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    Comparison input
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                    Test the salary jump before you trust the headline number
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                    Enter the current salary and the alternative salary below to
                    see what actually changes after deductions.
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
                      £{a.toLocaleString("en-GB")} vs £
                      {b.toLocaleString("en-GB")}
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
                    min={0}
                    step={100}
                    value={salaryA}
                    onChange={(e) =>
                      setSalaryA(normalizeSalary(Number(e.target.value)))
                    }
                    className="app-input h-[72px] rounded-[22px] pl-12 text-2xl font-semibold"
                  />
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
                  Current salary, existing role, or first offer.
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
                    min={0}
                    step={100}
                    value={salaryB}
                    onChange={(e) =>
                      setSalaryB(normalizeSalary(Number(e.target.value)))
                    }
                    className="app-input h-[72px] rounded-[22px] pl-12 text-2xl font-semibold"
                  />
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
                  New salary, target role, or competing offer.
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
                  Save this comparison
                </button>

                {saveNotice ? (
                  <div
                    className="rounded-[18px] border px-4 py-3 text-sm"
                    style={{
                      borderColor:
                        "color-mix(in srgb, #10b981 22%, var(--line))",
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

          <div className="mt-8">
            <AdSlot label="Advertisement" />
          </div>

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
                {annualDiffLabel}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                {monthlyDiffLabel} per month difference
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

          <section className="mt-10 rounded-[34px] border border-slate-200 bg-white p-6 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950 sm:p-8">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Decision reading
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              {decisionHeadline}
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-[15px]">
              {decisionBody}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {followUpPrompts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-10">
            <SavedScenariosPanel
              type="compare"
              title="Recent comparison scenarios"
              emptyTitle="No comparison scenarios saved yet"
              emptyDescription="Save a comparison here when you want to return to the same decision later."
              onLoad={handleLoadScenario}
            />
          </div>

          <div className="mt-8">
            <AffiliateRecommendationPanel
              eyebrow="Useful next move"
              title="Once the salary gap is clear, stay inside the right TaxDecod route"
              description="This is where most users move into raise planning, target take-home checks, or payslip verification."
              items={[
                {
                  title: "Work backwards from the monthly amount you want to keep",
                  description:
                    "Best when this comparison shows the current gap clearly and you now want to target a specific take-home result.",
                  href: "/reverse-tax",
                  badge: "Planning",
                },
                {
                  title: "Inspect one salary in more detail",
                  description:
                    "Useful when one side of the comparison needs a fuller reading with tax, National Insurance, pension, and student loan context.",
                  href: "/calculator",
                  badge: "Calculator",
                },
                {
                  title: "Check whether a real payslip supports the pattern",
                  description:
                    "Best when the next step is validating deductions against an actual payslip rather than comparing salary headlines only.",
                  href: "/payslip-checker",
                  badge: "Payslip",
                },
              ]}
            />
          </div>

          <div className="mt-8">
            <AdSlot label="Advertisement" />
          </div>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            <Link
              href="/reverse-tax"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Work backwards from a target income
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Use this when the monthly amount you want to keep matters more
                than the headline salary.
              </p>
            </Link>

            <Link
              href="/calculator"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Inspect one salary in more detail
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Use the main calculator when you need a full guided reading of
                one salary route.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Browse nearby salary bands
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Use the hub when you want wider salary context rather than a
                two-point comparison only.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <EmailCapturePanel
              title="Keep this comparison for later"
              description="Use this area when you want a calmer way to return to the same decision later without relying on a live email flow."
              buttonLabel="Comparison follow-up"
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}