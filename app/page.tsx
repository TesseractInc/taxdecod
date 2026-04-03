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

export default function HomePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <HomeClient />

      <TrustStrip />
      <HowItWorks />
      <UseCases />

      <section className="pb-10" id="seo-links">
        <Container>
          <div className="app-card-strong overflow-hidden rounded-[32px] p-8 md:p-10">
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
                  deductions, and clearer salary breakdowns without starting
                  from scratch.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {popularSalaryPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-soft hover-lift rounded-[24px] px-5 py-5 text-sm transition"
                  >
                    <span className="app-title">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="app-card-strong overflow-hidden rounded-[32px] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
                  Specific salary scenarios
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Go deeper into salary variations
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  Explore monthly take-home, student loan impact, and
                  Scotland salary views with focused pages designed around
                  real user questions.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {variantPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-soft hover-lift rounded-[24px] px-5 py-5 text-sm transition"
                  >
                    <span className="app-title">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ExploreNext />
    </main>
  );
}