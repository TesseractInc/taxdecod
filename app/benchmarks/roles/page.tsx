import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../components/seo/seo-reality-card";
import CrossLinkRail from "../../../components/seo/cross-link-rail";
import { TRUST_COPY } from "../../../lib/tax/config";
import {
  roles,
  regions,
  benchmarkData,
} from "../../../lib/benchmarks/benchmark-data";
import { formatCurrency } from "../../../lib/tax/utils/currency";

export const metadata: Metadata = {
  title: "Benchmark Roles | TaxDecod",
  description:
    "Browse salary benchmarks by role and move into region, after-tax, compare, and city-context salary routes.",
};

export default function BenchmarkRolesPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Benchmark roles"
            title="Salary benchmarks by role"
            description="Choose a role first, then move into the region routes that matter and continue into after-tax salary, comparison, or city-intent judgment pages."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryHub.description}
              points={[
                ...TRUST_COPY.salaryHub.points,
                "Role-led benchmark browsing for faster market context",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="How to use this page">
              Start with the work itself. Then open the region routes available
              for that role, compare the role-market context, and move into the
              after-tax or city-intent route that best matches the real decision.
            </SeoRealityCard>
          </div>

          <section className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => {
              const rolePages = benchmarkData.filter(
                (item) => item.role === role.slug
              );

              return (
                <div
                  key={role.slug}
                  className="rounded-[28px] border px-6 py-6"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-sm font-medium app-accent">
                    Role benchmark
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
                    {role.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 app-copy">
                    Available benchmark pages: {rolePages.length}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {regions.map((region) => {
                      const exists = benchmarkData.some(
                        (item) =>
                          item.role === role.slug && item.region === region.slug
                      );

                      if (!exists) return null;

                      return (
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
                          {role.title} in {region.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>

          <CrossLinkRail
            eyebrow="After-tax bridges"
            title="Move from role context into concrete salary routes"
            description="These common after-tax salary pages are good next-step anchors once a user has role context and wants a practical pay reading."
            items={[
              {
                href: "/30000-after-tax-uk",
                title: `${formatCurrency(30000)} after tax`,
                description:
                  "A strong lower-mid route for practical pay interpretation.",
              },
              {
                href: "/40000-after-tax-uk",
                title: `${formatCurrency(40000)} after tax`,
                description:
                  "A common benchmark-adjacent route for salary judgment.",
              },
              {
                href: "/50000-after-tax-uk",
                title: `${formatCurrency(50000)} after tax`,
                description:
                  "A strong mid-income route for compare and raise decisions.",
              },
              {
                href: "/60000-after-tax-uk",
                title: `${formatCurrency(60000)} after tax`,
                description:
                  "Useful when users are evaluating stronger salary bands.",
              },
            ]}
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
              href="/salary-pages"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Salary pages</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move from role context into the core after-tax salary cluster.
              </p>
            </Link>

            <Link
              href="/guides/what-is-a-good-salary-uk"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Salary-judgment guide
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Add editorial interpretation behind role-market salary reading.
              </p>
            </Link>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}