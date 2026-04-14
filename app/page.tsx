import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/layout/site-header";
import SiteFooter from "../components/layout/site-footer";
import Container from "../components/ui/container";
import HeroSection from "../components/home/hero-section";
import CalculatorCard from "../components/calculator/calculator-card";
import JourneyCards from "../components/home/journey-cards";
import MoneyExplainer from "../components/home/money-explainer";
import HowItWorks from "../components/home/how-it-works";
import UseCases from "../components/home/use-cases";
import ExploreNext from "../components/home/explore-next";
import EmailCapturePanel from "../components/shared/email-capture-panel";

export const metadata: Metadata = {
  title: "TaxDecod | UK Salary Intelligence Platform",
  description:
    "TaxDecod helps people in the UK understand take-home pay, compare salaries, reverse-plan target income, and judge salary decisions with clearer context.",
};

const popularRoutes = [
  { label: "£30,000 after tax", href: "/30000-after-tax-uk" },
  { label: "£40,000 after tax", href: "/40000-after-tax-uk" },
  { label: "£50,000 after tax", href: "/50000-after-tax-uk" },
  { label: "£60,000 after tax", href: "/60000-after-tax-uk" },
  { label: "£15 an hour after tax", href: "/hourly/15" },
  { label: "What salary gives £2,500/month?", href: "/monthly-take-home/2500" },
];

const platformClusters = [
  {
    title: "Compare and reverse",
    description:
      "Move beyond one salary result and test whether the next salary band or monthly target changes the decision.",
    links: [
      { label: "Compare salaries", href: "/compare-salary" },
      { label: "Reverse from target", href: "/reverse-tax" },
    ],
  },
  {
    title: "Browse and benchmark",
    description:
      "Explore salary pages, role-city benchmark context, and newer intent routes like city salary judgement pages.",
    links: [
      { label: "Salary hub", href: "/salary-hub" },
      { label: "Benchmarks hub", href: "/benchmarks" },
    ],
  },
  {
    title: "Decode and verify",
    description:
      "Use payslip and refund tools when the question is about payroll correctness, not just salary estimate.",
    links: [
      { label: "Payslip checker", href: "/payslip-checker" },
      { label: "Tax refund calculator", href: "/tax-refund-calculator" },
    ],
  },
];

const trustLinks = [
  {
    title: "Methodology",
    description: "See how TaxDecod approaches salary logic and interpretation.",
    href: "/methodology",
  },
  {
    title: "Assumptions",
    description: "Understand what the calculator assumes before reading the result.",
    href: "/assumptions",
  },
  {
    title: "Contact",
    description: "Use the contact page for support, partnerships, or editorial questions.",
    href: "/contact",
  },
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <HeroSection />

      <section id="calculator-section" className="pb-8">
        <Container>
          <div className="rounded-[30px] border p-2 shadow-[0_28px_100px_-44px_rgba(15,23,42,0.24)] app-card-strong sm:p-3">
            <CalculatorCard mode="overview" />
          </div>
        </Container>
      </section>

      <section className="pb-9">
        <Container>
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
            <div className="grid gap-6 p-6 md:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Fast entry points
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                  Enter the platform from the route that matches your question
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                  Some users know their salary. Some know their hourly rate. Some
                  care about a monthly target. Some want city context. TaxDecod
                  should support all of those entry points cleanly.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {popularRoutes.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/75 px-5 py-5 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/72 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                  >
                    <span className="block text-base font-semibold text-slate-900 dark:text-slate-100">
                      {item.label}
                    </span>
                    <span className="mt-3 block leading-7 text-slate-600 dark:text-slate-400">
                      Open the relevant decision route directly.
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <JourneyCards />
      <MoneyExplainer />
      <HowItWorks />
      <UseCases />

      <section className="pb-9">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {platformClusters.map((cluster) => (
              <div
                key={cluster.title}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Platform cluster
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {cluster.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {cluster.description}
                </p>

                <div className="mt-5 grid gap-3">
                  {cluster.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-9">
        <Container>
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
            <div className="grid gap-6 p-7 md:p-8 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Trust and source clarity
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                  Keep trust visible without turning the homepage into a brochure
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                  Trust pages, methodology, and support routes should be easy to find,
                  but the homepage should still prioritize calculation and decision flow.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">
                    Current UK salary logic
                  </div>
                  <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Methodology visibility
                  </div>
                  <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Contact legitimacy
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {trustLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/78 px-5 py-5 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/72 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                  >
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                    <p className="mt-5 text-sm font-medium text-sky-700 dark:text-sky-300">
                      Open now →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <EmailCapturePanel
            title="Save your salary journey across tools"
            description="Use your email sign-in to come back to saved salary routes, comparison paths, and monthly-target planning later."
            buttonLabel="Continue with email"
          />
        </Container>
      </section>

      <ExploreNext />
      <SiteFooter />
    </main>
  );
}