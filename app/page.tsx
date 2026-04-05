import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/layout/site-header";
import Container from "../components/ui/container";
import TrustStrip from "../components/home/trust-strip";
import UseCases from "../components/home/use-cases";
import HowItWorks from "../components/home/how-it-works";
import ExploreNext from "../components/home/explore-next";
import HomeClient from "../components/home/home-client";

export const metadata: Metadata = {
  title: "TaxDecod | UK Salary & Take-Home Pay Calculator",
  description:
    "See exactly what you take home after tax, NI, pension, and student loan. TaxDecod turns UK salary into a clear visual experience.",
};

const popularSalaryPages = [
  { label: "£30,000 after tax", href: "/30000-after-tax-uk" },
  { label: "£40,000 after tax", href: "/40000-after-tax-uk" },
  { label: "£50,000 after tax", href: "/50000-after-tax-uk" },
  { label: "£60,000 after tax", href: "/60000-after-tax-uk" },
];

const variantPages = [
  { label: "£30,000 after tax monthly", href: "/30000-after-tax-monthly" },
  {
    label: "£30,000 after tax with student loan",
    href: "/30000-after-tax-with-student-loan",
  },
  { label: "£30,000 after tax Scotland", href: "/30000-after-tax-scotland" },
];

const quickJourney = [
  {
    title: "Start with your salary",
    description:
      "Open the main calculator and see your real yearly and monthly take-home pay.",
    href: "/calculator",
  },
  {
    title: "Compare two salaries",
    description:
      "See whether a salary jump actually changes your real monthly life.",
    href: "/compare-salary",
  },
  {
    title: "Reverse your target pay",
    description:
      "Find the gross salary needed to reach your ideal monthly take-home.",
    href: "/reverse-tax",
  },
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <HomeClient />

      <section className="pb-10">
        <Container>
          <div className="app-card-strong overflow-hidden rounded-[34px] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
                  Start here
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Move through TaxDecod like a guided product
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  TaxDecod works best when you do more than one thing. Start
                  with your salary, then compare, reverse, and explore related
                  salary pages to understand what your number really means.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <div className="app-chip px-4 py-2 text-sm font-medium">
                    Net pay first
                  </div>
                  <div className="app-soft px-4 py-2 text-sm app-subtle">
                    Salary meaning
                  </div>
                  <div className="app-soft px-4 py-2 text-sm app-subtle">
                    Compare and reverse
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
                    <p className="text-lg font-semibold app-title">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 app-copy">
                      {item.description}
                    </p>
                    <p className="mt-5 text-sm font-medium app-accent">
                      Open →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip />
      <HowItWorks />
      <UseCases />

      <section className="pb-10" id="seo-links">
        <Container>
          <div className="app-card-strong overflow-hidden rounded-[34px] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
                  Popular salary pages
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Explore common salary examples instantly
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  Open popular UK salary pages to see take-home pay,
                  deductions, and salary meaning without starting from scratch.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {popularSalaryPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-soft hover-lift rounded-[24px] px-5 py-5 text-sm transition"
                  >
                    <span className="block text-base font-semibold app-title">
                      {item.label}
                    </span>
                    <span className="mt-3 block app-copy">
                      Open the full breakdown and next-step tools.
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <div className="app-card-strong overflow-hidden rounded-[34px] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
                  Specific salary scenarios
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Go deeper into salary variations
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  Explore monthly take-home, student loan impact, and Scotland
                  salary views with focused pages designed around real user
                  questions.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {variantPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-soft hover-lift rounded-[24px] px-5 py-5 text-sm transition"
                  >
                    <span className="block text-base font-semibold app-title">
                      {item.label}
                    </span>
                    <span className="mt-3 block app-copy">
                      View the focused scenario and related salary pages.
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="app-card overflow-hidden rounded-[34px] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
                  Better salary decisions
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Don’t stop at the first answer
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  Most people should do three things: calculate their real
                  take-home pay, compare another salary, and check what income
                  they would need to reach their target monthly number.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  href="/calculator"
                  className="app-soft hover-lift rounded-[24px] px-5 py-5 transition"
                >
                  <p className="text-sm font-medium app-accent">Step 1</p>
                  <p className="mt-2 text-lg font-semibold app-title">
                    Calculate
                  </p>
                </Link>

                <Link
                  href="/compare-salary"
                  className="app-soft hover-lift rounded-[24px] px-5 py-5 transition"
                >
                  <p className="text-sm font-medium app-accent">Step 2</p>
                  <p className="mt-2 text-lg font-semibold app-title">
                    Compare
                  </p>
                </Link>

                <Link
                  href="/reverse-tax"
                  className="app-soft hover-lift rounded-[24px] px-5 py-5 transition"
                >
                  <p className="text-sm font-medium app-accent">Step 3</p>
                  <p className="mt-2 text-lg font-semibold app-title">
                    Reverse
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ExploreNext />
    </main>
  );
}