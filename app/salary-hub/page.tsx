import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import CrossLinkRail from "../../components/seo/cross-link-rail";
import {
  getFeaturedComparisonPairs,
  getFlagshipSalaryValues,
  getPriorityMonthlyTakeHomeValues,
  getPriorityRegionSlugs,
  getPrioritySalaryValues,
} from "../../components/seo/programmatic-expansion-config";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { TAX_YEAR_LABEL } from "../../lib/tax/config";

export const metadata: Metadata = {
  title: "Salary Hub | TaxDecod",
  description:
    "Explore salary routes, monthly take-home targets, salary comparison paths, and city-based salary judgment pages across TaxDecod.",
};

export default function SalaryHubPage() {
  const flagshipSalaries = getFlagshipSalaryValues();
  const prioritySalaries = getPrioritySalaryValues();
  const monthlyTargets = getPriorityMonthlyTakeHomeValues();
  const regions = getPriorityRegionSlugs();
  const featuredComparisons = getFeaturedComparisonPairs();

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Salary hub</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              Explore salary routes, monthly targets, and decision paths
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              This hub should act as a true bridge layer across the platform —
              from after-tax salary pages into comparison, reverse planning,
              monthly take-home routes, city-based salary judgment, guides, and
              tool routes.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={`Salary hub pages use ${TAX_YEAR_LABEL}-style UK assumptions for consistency and discovery. They are designed to help users and crawlers move into the right route family quickly.`}
              points={[
                `Using ${TAX_YEAR_LABEL} UK salary assumptions`,
                "Built for salary discovery",
                "Connected to compare, monthly, and city-intent routes",
                "Useful for crawl discovery and navigation",
              ]}
            />
          </div>

          <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/salary-pages"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">After-tax salary pages</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Browse the expanded after-tax salary route cluster from lower bands to stronger earners.
              </p>
            </Link>

            <Link
              href="/salary-tools"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">Salary tools</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move into calculator, compare, reverse, payslip, and deduction tools.
              </p>
            </Link>

            <Link
              href="/benchmarks"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">Benchmarks</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Add role and region market context to salary and raise decisions.
              </p>
            </Link>

            <Link
              href="/guides"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">Guides</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Read the editorial explanation layer behind salary, tax, and compare routes.
              </p>
            </Link>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Flagship salary routes
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              These are the strongest high-intent salary anchors across the platform.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {flagshipSalaries.map((salary) => (
                <Link
                  key={salary}
                  href={`/${salary}-after-tax-uk`}
                  className="rounded-[28px] border px-6 py-6 transition hover-lift"
                  style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
                >
                  <p className="text-lg font-semibold app-title">
                    {formatCurrency(salary)} after tax
                  </p>
                  <p className="mt-3 text-sm leading-8 app-copy">
                    Open the full salary route and move into take-home interpretation.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Priority salary discovery
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              These routes cover the most common salary-intent bands users search for and compare.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {prioritySalaries.map((salary) => (
                <Link
                  key={salary}
                  href={`/${salary}-after-tax-uk`}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                    color: "var(--text)",
                  }}
                >
                  {formatCurrency(salary)}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-8 xl:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold app-title">
                Monthly take-home targets
              </h2>
              <p className="mt-3 text-sm leading-8 app-copy">
                These reverse the normal salary journey and start from the amount users want to keep each month.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {monthlyTargets.map((amount) => (
                  <Link
                    key={amount}
                    href={`/monthly-take-home/${amount}`}
                    className="rounded-[28px] border px-6 py-6 transition hover-lift"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--surface-2)",
                    }}
                  >
                    <p className="text-lg font-semibold app-title">
                      Take home {formatCurrency(amount)} / month
                    </p>
                    <p className="mt-3 text-sm leading-8 app-copy">
                      Open the reverse-intent route for this monthly target.
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold app-title">
                City-intent salary judgment
              </h2>
              <p className="mt-3 text-sm leading-8 app-copy">
                These routes help users judge what the same salary may mean in different UK city contexts.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {regions.map((region) => (
                  <Link
                    key={region}
                    href={`/good-salary/40000/${region}`}
                    className="rounded-[28px] border px-6 py-6 transition hover-lift"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--surface-2)",
                    }}
                  >
                    <p className="text-lg font-semibold capitalize app-title">
                      Good salary in {region}
                    </p>
                    <p className="mt-3 text-sm leading-8 app-copy">
                      Explore city-aware salary judgment pages for this region.
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <CrossLinkRail
            eyebrow="Comparison bridges"
            title="Use salary routes to move into raise and offer decisions"
            description="These fixed comparison pages are strong mid-funnel routes once a user is deciding whether the next salary band is actually worth it."
            items={featuredComparisons.slice(0, 4).map((pair) => ({
              href: `/compare/${pair.salaryA}-vs-${pair.salaryB}-after-tax`,
              title: `${formatCurrency(pair.salaryA)} vs ${formatCurrency(pair.salaryB)}`,
              description:
                "Use a fixed comparison route to judge retained value rather than gross change alone.",
            }))}
          />

          <CrossLinkRail
            eyebrow="Editorial bridges"
            title="Move from salary routes into the explanation layer"
            description="These are strong routes when the user needs help understanding tax drag, take-home logic, or whether a raise is really worth it."
            items={[
              {
                href: "/guides/how-much-salary-increase-is-worth-it",
                title: "How much salary increase is worth it?",
                description:
                  "Read the decision guide behind raise and offer comparisons.",
              },
              {
                href: "/guides/what-is-a-good-salary-uk",
                title: "What is a good salary in the UK?",
                description:
                  "Read the broader salary-judgment guide behind city and affordability context.",
              },
              {
                href: "/guides/how-much-salary-to-take-home-3000",
                title: "How much salary to take home £3,000?",
                description:
                  "Read the monthly target explanation route behind reverse salary planning.",
              },
              {
                href: "/guides/how-student-loan-affects-salary-uk",
                title: "How student loan affects salary",
                description:
                  "Read how student loan deductions can materially change take-home understanding.",
              },
            ]}
          />

          <section className="mt-12 grid gap-4 md:grid-cols-3">
            <Link
              href="/compare-salary"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">Compare salaries</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Judge whether the next salary band really changes monthly life enough.
              </p>
            </Link>

            <Link
              href="/reverse-tax"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">Reverse salary planning</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Work backwards from the monthly amount you actually want to keep.
              </p>
            </Link>

            <Link
              href="/payslip-checker"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">Payslip checker</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move from salary theory into real payslip and deduction interpretation.
              </p>
            </Link>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}