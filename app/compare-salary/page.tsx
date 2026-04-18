import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import FeaturedRoutes from "../../components/seo/featured-routes";
import {
  getComparisonPairsByRollout,
  PROGRAMMATIC_ROLLOUT,
} from "../../components/seo/programmatic-expansion-config";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { TAX_YEAR_LABEL } from "../../lib/tax/config";

export const metadata: Metadata = {
  title: "Compare Salary After Tax | TaxDecod",
  description:
    "Compare two UK salaries after tax and see the real annual and monthly difference after deductions.",
};

export default function CompareSalaryHubPage() {
  const comparisonPairs = getComparisonPairsByRollout(
    PROGRAMMATIC_ROLLOUT.comparisonPages
  );

  const featuredPairs = comparisonPairs.slice(0, 8);
  const expandedPairs = comparisonPairs.slice(8, 28);

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Comparison hub</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              Compare salary jumps the right way
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              Comparison pages are where headline salary turns into a real decision.
              Use them to see whether the next salary band is actually worth it
              after tax and deductions.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={`Comparison pages use ${TAX_YEAR_LABEL}-style UK salary assumptions. They are designed to show retained value after deductions, not just the gross gap.`}
              points={[
                `Using ${TAX_YEAR_LABEL} UK salary assumptions`,
                "Built for retained-value decisions",
                "Connected to salary and monthly pages",
                "Useful for real raise decisions",
              ]}
            />
          </div>

          <FeaturedRoutes
            title="Start with the strongest comparison routes"
            description="These are the highest-value salary jumps and the clearest decision pages."
            routes={featuredPairs.slice(0, 4).map((pair) => ({
              href: `/compare/${pair.salaryA}-vs-${pair.salaryB}-after-tax`,
              title: `${formatCurrency(pair.salaryA)} vs ${formatCurrency(
                pair.salaryB
              )}`,
              description:
                "See the real monthly and annual gain after deductions.",
            }))}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Featured comparison routes
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredPairs.map((pair) => (
                <Link
                  key={`${pair.salaryA}-${pair.salaryB}`}
                  href={`/compare/${pair.salaryA}-vs-${pair.salaryB}-after-tax`}
                  className="rounded-[28px] border px-6 py-6 transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">
                    {formatCurrency(pair.salaryA)} vs {formatCurrency(pair.salaryB)}
                  </p>
                  <p className="mt-3 text-sm leading-8 app-copy">
                    Compare the real retained difference after tax and deductions.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Expanded comparison matrix
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              These routes help cover the broader salary-decision layer without
              turning comparison pages into low-value noise.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {expandedPairs.map((pair) => (
                <Link
                  key={`chip-${pair.salaryA}-${pair.salaryB}`}
                  href={`/compare/${pair.salaryA}-vs-${pair.salaryB}-after-tax`}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                    color: "var(--text)",
                  }}
                >
                  {formatCurrency(pair.salaryA)} vs {formatCurrency(pair.salaryB)}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-4 md:grid-cols-3">
            <Link
              href="/salary-hub"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Browse salary pages</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move from comparison into one-salary breakdown routes.
              </p>
            </Link>

            <Link
              href="/reverse-tax"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Reverse plan salary</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Work backwards from the monthly amount you actually want to keep.
              </p>
            </Link>

            <Link
              href="/guides/how-much-salary-increase-is-worth-it"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Read the raise guide</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move into the editorial layer behind comparison decisions.
              </p>
            </Link>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}