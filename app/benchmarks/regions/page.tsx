import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../components/seo/seo-reality-card";
import CrossLinkRail from "../../../components/seo/cross-link-rail";
import {
  getBenchmarkRolesByRollout,
  getRegionsByRollout,
  PROGRAMMATIC_ROLLOUT,
} from "../../../components/seo/programmatic-expansion-config";
import { formatCurrency } from "../../../lib/tax/utils/currency";

export const metadata: Metadata = {
  title: "Benchmark Regions | TaxDecod",
  description:
    "Browse salary benchmark routes by region and move into role, after-tax, compare, and city-context salary routes.",
};

export default function BenchmarkRegionsPage() {
  const roles = getBenchmarkRolesByRollout(PROGRAMMATIC_ROLLOUT.benchmarkPages);
  const regions = getRegionsByRollout(PROGRAMMATIC_ROLLOUT.benchmarkPages);

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <SeoPageHero
            eyebrow="Benchmark regions"
            title="Browse salary benchmarks by region"
            description="Start with the local market context first, then move into role routes, salary pages, comparison pages, or city-intent judgment routes."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description="Benchmark region pages help users judge role salary context inside local market conditions. They work best when combined with after-tax and city-intent salary routes."
              points={[
                "Directional regional benchmark context",
                "Region-first discovery layer",
                "Connected to role and salary routes",
                "Built for crawl and user discovery",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="How to use this page">
              Start with the city or regional context that feels most relevant.
              Then switch into the role family that matters and continue into the
              after-tax or good-salary route that best matches the real question.
            </SeoRealityCard>
          </div>

          <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {regions.map((region) => (
              <div
                key={region.slug}
                className="rounded-[28px] border px-6 py-6"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-strong)",
                }}
              >
                <p className="text-lg font-semibold app-title">{region.label}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <Link
                      key={role.slug}
                      href={`/benchmarks/${role.slug}/${region.slug}`}
                      className="rounded-full border px-3.5 py-2 text-xs font-medium transition hover-lift"
                      style={{
                        borderColor: "var(--line)",
                        background: "var(--surface-2)",
                        color: "var(--text)",
                      }}
                    >
                      {role.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <CrossLinkRail
            eyebrow="City-intent bridges"
            title="Move from region context into real salary judgment pages"
            description="These routes help users go beyond market context and judge what the same salary may feel like locally."
            items={regions.slice(0, 4).map((region) => ({
              href: `/good-salary/40000/${region.slug}`,
              title: `${formatCurrency(40000)} in ${region.label}`,
              description:
                "Judge a common salary point in a real city or region context.",
            }))}
          />

          <section className="mt-12 grid gap-4 md:grid-cols-3">
            <Link
              href="/benchmarks"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Benchmarks hub</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Return to the full benchmark discovery layer.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Salary hub</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move into the broader salary, monthly, compare, and guide system.
              </p>
            </Link>

            <Link
              href="/guides"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Guides</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Add editorial explanation behind regional salary decisions.
              </p>
            </Link>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}