import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "../components/home/hero-section";
import SiteHeader from "../components/layout/site-header";
import Container from "../components/ui/container";
import TrustStrip from "../components/home/trust-strip";
import UseCases from "../components/home/use-cases";
import HowItWorks from "../components/home/how-it-works";
import FeaturedInsights from "../components/home/featured-insights";
import MoneyExplainer from "../components/home/money-explainer";
import ExploreNext from "../components/home/explore-next";
import JourneyCards from "../components/home/journey-cards";
import Reveal from "../components/ui/reveal";

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
      <HeroSection />
      <TrustStrip />
      <MoneyExplainer />
      <JourneyCards />
      <HowItWorks />
      <FeaturedInsights />
      <UseCases />

      <section className="pb-10" id="seo-links">
        <Container>
          <Reveal>
            <div className="app-card-strong p-8 md:p-10">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
                  Popular salary pages
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Explore UK after-tax salary breakdowns
                </h2>
                <p className="mt-4 app-copy">
                  Jump straight into popular salary examples and see estimated
                  take-home pay, deductions, and monthly income in a clearer,
                  more visual format.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {popularSalaryPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-soft hover-lift rounded-3xl px-5 py-5 text-sm"
                  >
                    <span className="app-title">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-14">
        <Container>
          <Reveal>
            <div className="app-card-strong p-8 md:p-10">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
                  Salary variants
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                  Explore more specific salary scenarios
                </h2>
                <p className="mt-4 app-copy">
                  Go deeper into monthly take-home, student loan impact, and
                  Scotland-focused salary pages.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {variantPages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-soft hover-lift rounded-3xl px-5 py-5 text-sm"
                  >
                    <span className="app-title">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ExploreNext />
    </main>
  );
}