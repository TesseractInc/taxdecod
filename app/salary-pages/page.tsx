import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import {
  getExpandedSalaryValues,
  getFlagshipSalaryValues,
  getPriorityMonthlyTakeHomeValues,
  getRegionsByRollout,
  PROGRAMMATIC_ROLLOUT,
} from "../../components/seo/programmatic-expansion-config";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { TAX_YEAR_LABEL } from "../../lib/tax/config";

export const metadata: Metadata = {
  title: "Salary Pages | TaxDecod",
  description:
    "Browse UK after-tax salary pages, monthly take-home targets, and next-step salary routes across TaxDecod.",
};

function buildSalaryBands(values: number[]) {
  return [
    values.slice(0, 18),
    values.slice(18, 48),
    values.slice(48, 84),
    values.slice(84, 120),
    values.slice(120),
  ].filter((group) => group.length > 0);
}

export default function SalaryPagesHub() {
  const flagship = getFlagshipSalaryValues();
  const expanded = getExpandedSalaryValues();
  const monthlyTargets = getPriorityMonthlyTakeHomeValues();
  const regions = getRegionsByRollout(PROGRAMMATIC_ROLLOUT.goodSalaryPages);
  const groupedExpanded = buildSalaryBands(expanded);

  const featuredCityIntentSalaries = [30000, 40000, 50000, 60000];

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Salary pages hub</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              Browse after-tax salary pages and expansion routes
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              This hub exists to surface the main salary route families across
              TaxDecod. Use it to move between flagship salary pages, the wider
              salary index, monthly take-home targets, and city-based judgment routes.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={`These pages use ${TAX_YEAR_LABEL}-style UK salary assumptions for consistency. They are designed for guidance, comparison, and planning support rather than payroll-perfect outputs.`}
              points={[
                `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
                "Built for salary route discovery",
                "Connected to monthly and city-intent paths",
                "Useful for crawl discovery and user movement",
              ]}
            />
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Flagship salary pages
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              These are the highest-value salary entry points and should remain the
              strongest internal anchors.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {flagship.map((salary) => (
                <Link
                  key={salary}
                  href={`/${salary}-after-tax-uk`}
                  className="rounded-[28px] border px-6 py-6 transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">
                    {formatCurrency(salary)} after tax
                  </p>
                  <p className="mt-3 text-sm leading-8 app-copy">
                    Open the full salary route and monthly take-home interpretation.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Monthly take-home planning routes
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              Move from gross salary curiosity into monthly-life planning with reverse-intent pages.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                    Open the reverse salary route for this monthly target.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Full city-intent salary judgment
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              These routes help users judge salary within real regional context instead of tax alone.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {regions.flatMap((region) =>
                featuredCityIntentSalaries.slice(0, 2).map((salary) => (
                  <Link
                    key={`${salary}-${region.slug}`}
                    href={`/good-salary/${salary}/${region.slug}`}
                    className="rounded-[28px] border px-6 py-6 transition hover-lift"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--card-strong)",
                    }}
                  >
                    <p className="text-lg font-semibold capitalize app-title">
                      {formatCurrency(salary)} in {region.label}
                    </p>
                    <p className="mt-3 text-sm leading-8 app-copy">
                      Open a city-aware salary judgment page for this route.
                    </p>
                  </Link>
                ))
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {regions.map((region) =>
                featuredCityIntentSalaries.map((salary) => (
                  <Link
                    key={`chip-${salary}-${region.slug}`}
                    href={`/good-salary/${salary}/${region.slug}`}
                    className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--surface-2)",
                      color: "var(--text)",
                    }}
                  >
                    {formatCurrency(salary)} in {region.label}
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Full salary index
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              This expanded index helps surface the wider route family to both users and crawlers.
            </p>

            <div className="mt-6 space-y-5">
              {groupedExpanded.map((group, index) => (
                <div
                  key={index}
                  className="rounded-[28px] border px-6 py-6"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <div className="flex flex-wrap gap-3">
                    {group.map((salary) => (
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
                </div>
              ))}
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}