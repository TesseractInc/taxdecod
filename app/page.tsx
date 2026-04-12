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
  title: "TaxDecod | UK Salary & Take-Home Pay Calculator",
  description:
    "See what you really keep after tax, National Insurance, pension, and student loan. TaxDecod turns UK salary into a clearer, more visual take-home pay reading.",
};

const popularSalaryPages = [
  { label: "£30,000 after tax", href: "/30000-after-tax-uk" },
  { label: "£40,000 after tax", href: "/40000-after-tax-uk" },
  { label: "£50,000 after tax", href: "/50000-after-tax-uk" },
  { label: "£60,000 after tax", href: "/60000-after-tax-uk" },
];

const trustLinks = [
  {
    title: "Methodology",
    description: "See how the site approaches salary logic and assumptions.",
    href: "/methodology",
  },
  {
    title: "Services",
    description: "Explore wider services and business-facing tools.",
    href: "/services",
  },
  {
    title: "Contact",
    description: "Reach out for support, partnerships, or commercial questions.",
    href: "/contact",
  },
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <HeroSection />
      <CalculatorCard />

      <section className="pb-8 pt-2 sm:pb-9">
        <Container>
          <div className="rounded-[28px] border border-slate-200 bg-white/88 p-4 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.18)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/86">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  Advertisement
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  This area can hold a clearly labelled sponsored placement or ad
                  unit without overlapping with navigation or calculator controls.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
                <div className="rounded-[20px] border border-slate-200 bg-slate-50/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Clear separation
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    Distinct from navigation, CTAs, and tools.
                  </p>
                </div>

                <div className="rounded-[20px] border border-slate-200 bg-slate-50/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Monetization-ready
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    Keeps sponsored content visibly separate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <JourneyCards />
      <MoneyExplainer />
      <HowItWorks />

      <section className="pb-9">
        <Container>
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
            <div className="grid gap-6 p-6 md:p-7 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Popular salary lookups
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                  Check common salary levels quickly
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                  Useful when someone wants a fast answer first, then moves into comparison, payslip checks, or refund exploration.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {popularSalaryPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/75 px-5 py-5 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/72 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                  >
                    <span className="block text-base font-semibold text-slate-900 dark:text-slate-100">
                      {item.label}
                    </span>
                    <span className="mt-3 block leading-7 text-slate-600 dark:text-slate-400">
                      Open the breakdown, deductions, and next useful actions.
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <UseCases />

      <section className="pb-9">
        <Container>
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
            <div className="grid gap-6 p-7 md:p-8 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Trust and source clarity
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                  Reassure users without repeating the same message everywhere
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                  Keep trust, methodology, and support routes in one cleaner place near the lower decision stage.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">
                    Current UK salary logic
                  </div>
                  <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Methodology visibility
                  </div>
                  <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Support routes
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
            title="Get your salary breakdown sent to you"
            description="Save your result, revisit it later, or keep track when you compare multiple salary scenarios."
            buttonLabel="Send my salary report"
          />
        </Container>
      </section>

      <ExploreNext />
      <SiteFooter />
    </main>
  );
}