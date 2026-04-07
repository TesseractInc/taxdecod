import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/layout/site-header";
import SiteFooter from "../components/layout/site-footer";
import Container from "../components/ui/container";
import HeroSection from "../components/home/hero-section";
import TrustStrip from "../components/home/trust-strip";
import HowItWorks from "../components/home/how-it-works";
import UseCases from "../components/home/use-cases";
import ExploreNext from "../components/home/explore-next";
import EmailCapturePanel from "../components/shared/email-capture-panel";

export const metadata: Metadata = {
  title: "TaxDecod | UK Salary & Take-Home Pay Calculator",
  description:
    "See what your salary really means after tax, National Insurance, pension and student loan with a clearer UK salary intelligence platform.",
};

const quickJourney = [
  {
    title: "Calculate take-home pay",
    description:
      "Start with your gross salary and see yearly, monthly and weekly take-home clearly.",
    href: "/calculator",
    eyebrow: "Start here",
  },
  {
    title: "Compare two salaries",
    description:
      "See whether a salary jump actually improves your real monthly life after deductions.",
    href: "/compare-salary",
    eyebrow: "Decision tool",
  },
  {
    title: "Reverse your target income",
    description:
      "Find the gross salary needed to reach the monthly take-home you actually want.",
    href: "/reverse-tax",
    eyebrow: "Planning tool",
  },
];

const popularSalaryPages = [
  { label: "£30,000 after tax", href: "/30000-after-tax-uk" },
  { label: "£40,000 after tax", href: "/40000-after-tax-uk" },
  { label: "£50,000 after tax", href: "/50000-after-tax-uk" },
  { label: "£60,000 after tax", href: "/60000-after-tax-uk" },
  { label: "£30,000 monthly breakdown", href: "/30000-after-tax-monthly" },
  {
    label: "£30,000 with student loan",
    href: "/30000-after-tax-with-student-loan",
  },
];

const trustPoints = [
  "Built around UK PAYE, National Insurance, pension and student loan logic",
  "Updated using current UK tax-year assumptions and payroll-style treatment",
  "Designed for salary decisions, payslip understanding and comparison",
  "Made to explain your salary clearly instead of dumping one number",
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <HeroSection />

      <section className="pb-8 sm:pb-10 -mt-1">
        <Container>
          <div className="app-card-strong overflow-hidden rounded-[34px] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] app-accent">
                  Welcome to TaxDecod
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  A salary intelligence platform, not just a calculator
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  TaxDecod is built for people who want to understand what their
                  salary really means in real life. Use it to decode take-home
                  pay, compare job offers, understand deductions, and plan your
                  next financial move with more confidence.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <div className="app-chip px-4 py-2 text-sm font-medium">
                    Clearer than legacy tools
                  </div>
                  <div className="app-soft px-4 py-2 text-sm app-subtle">
                    Updated for UK tax-year assumptions
                  </div>
                  <div className="app-soft px-4 py-2 text-sm app-subtle">
                    Built for real salary decisions
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {quickJourney.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-soft hover-lift rounded-[26px] px-5 py-5 transition"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
                      {item.eyebrow}
                    </p>
                    <p className="mt-3 text-lg font-semibold app-title">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 app-copy">
                      {item.description}
                    </p>
                    <p className="mt-5 text-sm font-semibold app-accent">
                      Open now →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip />

      <section className="pb-8 sm:pb-10">
        <Container>
          <div className="app-card overflow-hidden rounded-[34px] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] app-accent">
                  Why people trust it
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Built around UK salary logic and clearer explanations
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  TaxDecod is designed to help users understand what reaches
                  them, what gets deducted, and what to do next. It is not HMRC,
                  but it is built around UK payroll-style deduction logic and
                  current tax-year assumptions.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {trustPoints.map((point) => (
                  <div
                    key={point}
                    className="app-soft rounded-[22px] px-5 py-4 text-sm leading-7 app-copy"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <HowItWorks />

      <section className="pb-8 sm:pb-10" id="seo-links">
        <Container>
          <div className="app-card overflow-hidden rounded-[34px] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] app-accent">
                  Popular salary lookups
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Quick salary answers people search for every day
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  Open a salary page, get a direct answer quickly, then move
                  into deeper comparison, reverse planning, or payslip
                  understanding.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {popularSalaryPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-soft hover-lift rounded-[24px] px-5 py-5 text-sm transition"
                  >
                    <span className="block text-base font-semibold app-title">
                      {item.label}
                    </span>
                    <span className="mt-3 block leading-7 app-copy">
                      Open the breakdown, deductions and next steps.
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <UseCases />

      <section className="pb-8 sm:pb-10">
        <Container>
          <EmailCapturePanel />
        </Container>
      </section>

      <ExploreNext />
      <SiteFooter />
    </main>
  );
}