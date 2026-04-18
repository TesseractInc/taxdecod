import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import CrossLinkRail from "../../components/seo/cross-link-rail";
import {
  getBenchmarkRolesByRollout,
  getFeaturedComparisonPairs,
  getFlagshipSalaryValues,
  getPriorityRegionSlugs,
  getRegionsByRollout,
  PROGRAMMATIC_ROLLOUT,
} from "../../components/seo/programmatic-expansion-config";
import { formatCurrency } from "../../lib/tax/utils/currency";

export const metadata: Metadata = {
  title: "Salary Benchmarks | TaxDecod",
  description:
    "Explore salary benchmarks by role and region across the UK, then move into after-tax salary, compare, and city-context routes.",
};

export default function BenchmarksHubPage() {
  const roles = getBenchmarkRolesByRollout(
    PROGRAMMATIC_ROLLOUT.benchmarkPages
  );
  const regions = getRegionsByRollout(PROGRAMMATIC_ROLLOUT.benchmarkPages);
  const featuredSalaries = getFlagshipSalaryValues().slice(0, 6);
  const featuredComparisons = getFeaturedComparisonPairs().slice(0, 4);
  const priorityRegions = getPriorityRegionSlugs().slice(0, 4);

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Benchmarks hub</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              Explore salary benchmarks by role and region
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              Benchmark pages are meant to add market context to salary decisions.
              They work best when they feed directly into after-tax salary pages,
              comparison routes, and city-based judgment pages instead of staying
              isolated as broad reference pages.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description="Benchmark pages are directional context pages, not formal salary survey guarantees. Use them to understand role and region patterns, then move into after-tax analysis."
              points={[
                "Directional benchmark context",
                "Role and region discovery layer",
                "Connected to after-tax and comparison routes",
                "Built for salary judgment support",
              ]}
            />
          </div>

          <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/benchmarks/roles"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">
                Browse all benchmark roles
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Start role-first and move into city or region benchmark routes.
              </p>
            </Link>

            <Link
              href="/benchmarks/regions"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">
                Browse all benchmark regions
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Start region-first and then move into the most relevant role family.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">Salary hub</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move across salary, monthly, compare, city-intent, and guide families.
              </p>
            </Link>

            <Link
              href="/guides/what-is-a-good-salary-uk"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--card-strong)" }}
            >
              <p className="text-lg font-semibold app-title">
                Read the salary-judgment guide
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Add editorial interpretation behind benchmark context and salary meaning.
              </p>
            </Link>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Full benchmark role coverage
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              Role pages should work as a bridge from market context into real salary routes.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {roles.map((role) => (
                <div
                  key={role.slug}
                  className="rounded-[28px] border px-6 py-6"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">{role.label}</p>
                  <p className="mt-2 text-sm capitalize app-subtle">
                    {role.category}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <Link
                        key={region.slug}
                        href={`/benchmarks/${role.slug}/${region.slug}`}
                        className="rounded-full border px-3.5 py-2 text-xs font-medium transition hover-lift"
                        style={{
                          borderColor: "var(--line)",
                          background: "var(--surface-2)",
                          color: "var(--text)",
                        }}
                      >
                        {region.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Full benchmark region coverage
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              Region pages should make it easier to switch the location context while keeping role intent.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {regions.map((region) => (
                <div
                  key={region.slug}
                  className="rounded-[28px] border px-6 py-6"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">{region.label}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {roles.slice(0, 6).map((role) => (
                      <Link
                        key={`${region.slug}-${role.slug}`}
                        href={`/benchmarks/${role.slug}/${region.slug}`}
                        className="rounded-full border px-3.5 py-2 text-xs font-medium transition hover-lift"
                        style={{
                          borderColor: "var(--line)",
                          background: "var(--card-strong)",
                          color: "var(--text)",
                        }}
                      >
                        {role.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <CrossLinkRail
            eyebrow="Benchmark bridges"
            title="Move from benchmark context into real decision routes"
            description="These routes are the best next steps once a user has a role or city context and wants a practical salary reading."
            items={[
              ...featuredSalaries.map((salary) => ({
                href: `/${salary}-after-tax-uk`,
                title: `${formatCurrency(salary)} after tax`,
                description:
                  "Move from market context into a concrete after-tax salary route.",
              })),
            ].slice(0, 4)}
          />

          <CrossLinkRail
            eyebrow="Compare bridges"
            title="Use benchmark context to evaluate nearby salary jumps"
            description="These comparison routes help users test whether the benchmark-adjacent salary jump is materially stronger after deductions."
            items={featuredComparisons.map((pair) => ({
              href: `/compare/${pair.salaryA}-vs-${pair.salaryB}-after-tax`,
              title: `${formatCurrency(pair.salaryA)} vs ${formatCurrency(pair.salaryB)}`,
              description:
                "Use a fixed compare route to judge retained value, not just gross change.",
            }))}
          />

          <CrossLinkRail
            eyebrow="City-intent bridges"
            title="Switch from benchmark context into real-life city salary judgment"
            description="These routes help users judge what the same salary may feel like in different regional cost contexts."
            items={priorityRegions.map((region) => ({
              href: `/good-salary/40000/${region}`,
              title: `${formatCurrency(40000)} in ${region}`,
              description:
                "Move into the city-intent layer and judge the salary in practical local context.",
            }))}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}