import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/layout/site-header";
import SiteFooter from "../components/layout/site-footer";
import Container from "../components/ui/container";
import CalculatorCard from "../components/calculator/calculator-card";
import TaxYearTrustBar from "../components/shared/tax-year-trust-bar";

export const metadata: Metadata = {
  title: "UK Salary Calculator, Payslip Checker and Take-Home Pay Tools | TaxDecod",
  description:
    "Use TaxDecod to check UK salary after tax, compare take-home pay, reverse from a target income, check payslip deductions, and understand what salary actually means in real life.",
};

const quickSalaryRoutes = [25000, 30000, 35000, 40000, 45000, 50000];

const corePaths = [
  {
    title: "Compare this salary against another offer",
    description:
      "Use this when the real decision is whether a raise or a new role improves monthly life enough after deductions.",
    href: "/compare-salary",
  },
  {
    title: "Find the salary needed for a target monthly income",
    description:
      "Use this when you know the amount you want to keep and need the gross salary required to reach it.",
    href: "/reverse-tax",
  },
  {
    title: "Check whether a payslip looks on track",
    description:
      "Use this when deductions feel unusual and you want a first-check reading of PAYE, NI, and year-to-date totals.",
    href: "/payslip-checker",
  },
  {
    title: "Browse nearby salary bands and routes",
    description:
      "Use this when one salary alone is not enough and you want wider context around neighbouring pay levels.",
    href: "/salary-hub",
  },
];

const differentiators = [
  {
    title: "Reverse salary planning",
    description:
      "Start from the monthly income you actually want to keep and work backwards to the salary needed.",
    href: "/reverse-tax",
  },
  {
    title: "Payslip and tax-code interpretation",
    description:
      "Move beyond salary headlines and check whether PAYE, tax code, and year-to-date deductions look broadly normal.",
    href: "/payslip-checker",
  },
  {
    title: "Comparison after deductions",
    description:
      "Judge whether two salaries really feel different after tax rather than comparing gross pay in isolation.",
    href: "/compare-salary",
  },
];

const guideLinks = [
  {
    title: "How Income Tax works in the UK",
    href: "/guides/how-income-tax-works-uk",
  },
  {
    title: "How student loan affects take-home pay",
    href: "/guides/how-student-loan-affects-take-home-pay",
  },
  {
    title: "How to read a payslip in the UK",
    href: "/guides/how-to-read-a-payslip-uk",
  },
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-14">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 h-[340px] w-[340px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(14,165,233,0.14), transparent 72%)",
            }}
          />
          <div
            className="absolute right-[-10%] top-[18%] h-[240px] w-[240px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.08), transparent 72%)",
            }}
          />
        </div>

        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] app-accent sm:text-sm">
              UK salary calculator and take-home pay platform
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight app-title sm:text-5xl">
              Know what your salary actually leaves you with after tax
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 app-copy sm:text-base sm:leading-8">
              TaxDecod helps UK users check salary after tax, compare take-home
              pay, reverse from a target monthly income, and understand payslip
              deductions more clearly.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/calculator" className="app-button-primary">
                Check a salary now
              </Link>
              <Link href="/compare-salary" className="app-button-secondary">
                Compare two salaries
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description="TaxDecod is framed around the current UK tax year and is designed for salary interpretation, deduction clarity, and decision support. Results should be read as estimate-based guidance rather than payroll, legal, or financial advice."
              points={[
                "Updated for the current UK tax-year framing",
                "Built around PAYE-style employee salary interpretation",
                "Methodology, assumptions, and trust pages visible",
                "Best used for salary decisions and first-check clarity",
              ]}
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {quickSalaryRoutes.map((salary) => (
              <Link
                key={salary}
                href={`/${salary}-after-tax-uk`}
                className="inline-flex items-center rounded-full border px-4 py-2.5 text-sm font-medium transition"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                }}
              >
                £{salary.toLocaleString("en-GB")} after tax
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <div className="rounded-[30px] border p-2 shadow-[0_28px_100px_-44px_rgba(15,23,42,0.24)] app-card-strong sm:p-3">
              <CalculatorCard mode="overview" />
            </div>
          </div>

          <section className="mt-10 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Where TaxDecod is strongest
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Use salary tools that answer the next real question
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                TaxDecod is strongest when users need more than a single salary
                figure — especially for comparison, reverse planning, and payslip interpretation.
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-3 sm:p-7">
              {differentiators.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Best next steps
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Move from one number to a better salary decision
              </h2>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2 sm:p-7">
              {corePaths.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
              <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Scotland and route coverage
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Explore more than one salary path
                </h2>
              </div>

              <div className="grid gap-3 p-6 sm:p-7">
                <Link
                  href="/40000-after-tax-scotland"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  £40,000 after tax in Scotland
                </Link>
                <Link
                  href="/salary-hub"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Browse the salary hub
                </Link>
                <Link
                  href="/benchmarks"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Add benchmark context
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
              <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Guides and context
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Read before or after calculation
                </h2>
              </div>

              <div className="grid gap-3 p-6 sm:p-7">
                {guideLinks.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                  >
                    {guide.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}