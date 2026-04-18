import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../../components/layout/site-header";
import SiteFooter from "../../../../components/layout/site-footer";
import Container from "../../../../components/ui/container";
import TaxYearTrustBar from "../../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../../../components/seo/seo-cta-cluster";
import ContextualLinkSection from "../../../../components/seo/contextual-link-section";
import { getContextualLinks } from "../../../../components/seo/contextual-link-engine";
import { buildSeoMetadata } from "../../../../components/seo/metadata";
import { formatCurrency } from "../../../../lib/tax/utils/currency";
import {
  getBenchmarkRoleBySlug,
  getBenchmarkRegionBySlug,
  getBenchmarkRoles,
  getBenchmarkRegions,
} from "../../../../components/seo/benchmark-taxonomy";
import { getBenchmarkPageData } from "../../../../components/seo/benchmark-page-data";
import { TAX_YEAR_LABEL } from "../../../../lib/tax/config";

type PageProps = {
  params: Promise<{
    role: string;
    region: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { getBenchmarkStaticParamsForRollout } = await import(
    "../../../../components/seo/programmatic-expansion-config"
  );

  return getBenchmarkStaticParamsForRollout();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const role = getBenchmarkRoleBySlug(resolvedParams.role);
  const region = getBenchmarkRegionBySlug(resolvedParams.region);

  if (!role || !region) {
    return buildSeoMetadata({
      title: "Salary Benchmarks | TaxDecod",
      description:
        "Explore salary benchmarks by role and region across the UK.",
      path: "/benchmarks",
    });
  }

  return buildSeoMetadata({
    title: `${role.label} salary benchmark in ${region.label} | TaxDecod`,
    description: `Explore estimated ${role.label.toLowerCase()} salary benchmarks in ${region.label} and compare them with after-tax salary routes.`,
    path: `/benchmarks/${role.slug}/${region.slug}`,
  });
}

export default async function BenchmarkRoleRegionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const role = getBenchmarkRoleBySlug(resolvedParams.role);
  const region = getBenchmarkRegionBySlug(resolvedParams.region);

  if (!role || !region) {
    notFound();
  }

  const data = getBenchmarkPageData(role, region);

  const nearbyRoles = getBenchmarkRoles()
    .filter((item) => item.slug !== role.slug)
    .slice(0, 3);

  const nearbyRegions = getBenchmarkRegions()
    .filter((item) => item.slug !== region.slug)
    .slice(0, 3);

  const contextualLinks = getContextualLinks({
    type: "benchmark",
    role: role.label,
    region: region.slug,
    medianSalary: data.medianSalary,
  });

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Role and region benchmark"
            title={`${role.label} salary benchmark in ${region.label}`}
            description={`Use this page to understand a practical salary benchmark range for ${role.label.toLowerCase()} roles in ${region.label}, then move into after-tax and comparison routes.`}
            highlightValue={formatCurrency(data.medianSalary)}
            highlightSubtext={`estimated benchmark midpoint for ${role.label.toLowerCase()} roles in ${region.label}`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={`Benchmark pages are designed as directional context. They work best when combined with ${TAX_YEAR_LABEL}-style salary routes, comparison tools, and city-based judgment pages.`}
              points={[
                "Directional benchmark context",
                "Useful with salary comparison tools",
                "Built for role and region interpretation",
                "Not a formal compensation survey",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Benchmark reality">
              A benchmark page should not be read as a single guaranteed market
              number. It is more useful as a directional context layer: what is
              entry-level, what feels mid-market, and what starts to look strong
              for a <strong>{role.label}</strong> in{" "}
              <strong>{region.label}</strong>.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${data.medianSalary}-after-tax-uk`,
                  title: "See the benchmark midpoint after tax",
                  description:
                    "Use the salary route when you want to know what the benchmark actually leaves you with after deductions.",
                },
                {
                  href: `/compare/${data.lowerComparisonSalary}-vs-${data.medianSalary}-after-tax`,
                  title: "Compare nearby benchmark salary bands",
                  description:
                    "Useful when you want to know whether the benchmark jump really changes monthly life enough.",
                },
                {
                  href: `/good-salary/${data.medianSalary}/${region.slug}`,
                  title: "Judge the midpoint in local lifestyle context",
                  description:
                    "Useful when you want to go beyond benchmark numbers and think about real-life affordability.",
                },
              ]}
            />
          </div>

          <section className="mt-10 grid gap-4 lg:grid-cols-3">
            <div
              className="rounded-[28px] border px-6 py-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-sm font-medium app-subtle">Entry benchmark</p>
              <p className="mt-3 text-3xl font-bold tracking-tight app-title">
                {formatCurrency(data.entrySalary)}
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                A directional entry-level benchmark for this role in this region.
              </p>
            </div>

            <div
              className="rounded-[28px] border px-6 py-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-sm font-medium app-subtle">Midpoint benchmark</p>
              <p className="mt-3 text-3xl font-bold tracking-tight app-title">
                {formatCurrency(data.medianSalary)}
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                A useful directional midpoint for comparing what “solid” often means.
              </p>
            </div>

            <div
              className="rounded-[28px] border px-6 py-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-sm font-medium app-subtle">Upper benchmark</p>
              <p className="mt-3 text-3xl font-bold tracking-tight app-title">
                {formatCurrency(data.upperSalary)}
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                A directional upper-range benchmark for stronger roles in this market.
              </p>
            </div>
          </section>

          <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href={`/${data.entrySalary}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See entry salary after tax
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move from benchmark context into a real take-home salary route.
              </p>
            </Link>

            <Link
              href={`/${data.medianSalary}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See midpoint salary after tax
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Best when you want the full after-tax picture of the benchmark midpoint.
              </p>
            </Link>

            <Link
              href={`/compare/${data.medianSalary}-vs-${data.comparisonSalary}-after-tax`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Compare midpoint vs stronger band
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when the real question is whether the stronger salary band is materially better.
              </p>
            </Link>

            <Link
              href={`/good-salary/${data.medianSalary}/${region.slug}`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Judge midpoint in city context
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Best when you want a salary judgment route, not just a role benchmark number.
              </p>
            </Link>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Compare this role across nearby regions
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {nearbyRegions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/benchmarks/${role.slug}/${item.slug}`}
                  className="rounded-[28px] border px-6 py-6 transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">
                    {role.label} in {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-8 app-copy">
                    Switch the regional context and compare how the benchmark moves.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Explore nearby role benchmarks in {region.label}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {nearbyRoles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/benchmarks/${item.slug}/${region.slug}`}
                  className="rounded-[28px] border px-6 py-6 transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">
                    {item.label} in {region.label}
                  </p>
                  <p className="mt-3 text-sm leading-8 app-copy">
                    Switch the role context while keeping the same city/region benchmark view.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <ContextualLinkSection
            title="Use this benchmark page to move into real salary-decision routes"
            description="These links connect benchmark context to after-tax salary pages, city-intent judgment pages, comparison routes, and editorial salary guidance."
            items={contextualLinks}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}