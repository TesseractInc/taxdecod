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
import CrossLinkRail from "../../../../components/seo/cross-link-rail";
import { getContextualLinks } from "../../../../components/seo/contextual-link-engine";
import { buildSeoMetadata } from "../../../../components/seo/metadata";
import { TAX_YEAR_LABEL } from "../../../../lib/tax/config";
import { formatCurrency } from "../../../../lib/tax/utils/currency";
import { getSalaryPageData } from "../../../../components/seo/salary-pages";
import {
  getBenchmarkRegionBySlug,
  getBenchmarkRegions,
} from "../../../../components/seo/benchmark-taxonomy";
import { getGoodSalaryStaticParamsForRollout } from "../../../../components/seo/programmatic-expansion-config";

type PageProps = {
  params: Promise<{
    salary: string;
    region: string;
  }>;
};

export const dynamicParams = false;

function parseSalaryParam(value: string) {
  const salary = Number(value);
  if (!Number.isFinite(salary) || salary <= 0) return null;
  return Math.round(salary);
}

function getRegionalReading(region: string) {
  switch (region) {
    case "london":
      return "London usually requires a more demanding reading because housing and transport costs can absorb a large share of take-home pay.";
    case "manchester":
      return "Manchester usually gives a more balanced reading than London, but housing and lifestyle choices still matter a lot.";
    case "birmingham":
      return "Birmingham often gives a more moderate cost context than London, so the same salary can feel stronger here.";
    case "leeds":
      return "Leeds often gives a slightly more forgiving cost context than the highest-cost UK cities.";
    case "glasgow":
      return "Glasgow can change the affordability picture meaningfully compared with the most expensive English city routes.";
    case "bristol":
      return "Bristol often sits in the middle: not London-level, but still costly enough that take-home needs careful judging.";
    default:
      return "Regional cost context matters because the same salary can feel very different once housing and local costs are considered.";
  }
}

function clampMonthlyTarget(value: number) {
  return Math.max(1500, Math.min(5000, Math.round(value / 100) * 100));
}

export async function generateStaticParams() {
  return getGoodSalaryStaticParamsForRollout();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = parseSalaryParam(resolvedParams.salary);
  const region = getBenchmarkRegionBySlug(resolvedParams.region);

  if (!salary || !region) {
    return buildSeoMetadata({
      title: "Good Salary by Region | TaxDecod",
      description:
        "Judge what a salary may mean in real life by UK city and region context.",
      path: "/benchmarks/regions",
    });
  }

  return buildSeoMetadata({
    title: `Is ${formatCurrency(salary)} a good salary in ${region.label}? | TaxDecod`,
    description: `${formatCurrency(
      salary
    )} in ${region.label} should be judged by take-home pay, housing cost, and local affordability, not gross salary alone.`,
    path: `/good-salary/${salary}/${region.slug}`,
  });
}

export default async function GoodSalaryRegionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const salary = parseSalaryParam(resolvedParams.salary);
  const region = getBenchmarkRegionBySlug(resolvedParams.region);

  if (!salary || !region) {
    notFound();
  }

  const data = getSalaryPageData(salary);
  const otherRegions = getBenchmarkRegions()
    .filter((item) => item.slug !== region.slug)
    .slice(0, 3);

  const keepPercent =
    data.result.grossAnnual > 0
      ? (data.result.netAnnual / data.result.grossAnnual) * 100
      : 0;

  const lowerSalary = Math.max(10000, salary - 10000);
  const higherSalary = salary + 10000;
  const roundedMonthlyTarget = clampMonthlyTarget(data.result.netMonthly);

  const contextualLinks = getContextualLinks({
    type: "goodSalary",
    salary,
    region: region.slug,
    monthlyNet: data.result.netMonthly,
    nearbyRegions: otherRegions.map((item) => item.slug),
  });

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Regional salary reading"
            title={`Is ${formatCurrency(salary)} a good salary in ${region.label}?`}
            description={`This page helps judge what ${formatCurrency(
              salary
            )} may mean in ${region.label} after tax and within a local affordability context.`}
            highlightValue={formatCurrency(data.result.netMonthly)}
            highlightSubtext={`estimated monthly take-home under ${TAX_YEAR_LABEL}-style assumptions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={`This page combines ${TAX_YEAR_LABEL}-style UK salary assumptions with a regional lifestyle reading. It is designed for judgment and planning, not as a definitive affordability rule.`}
              points={[
                `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
                `${region.label} context matters`,
                "Built for planning and salary judgment",
                "Not a universal affordability guarantee",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Regional reality">
              {formatCurrency(salary)} only becomes meaningful once the monthly
              result is understood. At about{" "}
              <strong>{formatCurrency(data.result.netMonthly)}</strong> per month
              after deductions, the stronger question is whether that result is
              enough for <strong>{region.label}</strong>, not whether the gross
              salary sounds good on paper. {getRegionalReading(region.slug)}
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${salary}-after-tax-uk`,
                  title: "See the full after-tax salary page",
                  description:
                    "Use the full salary route when you want the complete deduction picture behind this regional judgment.",
                },
                {
                  href: `/compare/${salary}-vs-${higherSalary}-after-tax`,
                  title: "Compare this with the next salary band",
                  description:
                    "Useful when the real question is whether a nearby salary jump is meaningfully stronger in real life.",
                },
                {
                  href: `/benchmarks/roles`,
                  title: "Explore role benchmarks",
                  description:
                    "Useful when you want to compare this salary against role-based market context, not just a generic city reading.",
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
              <p className="text-sm font-medium app-subtle">Monthly take-home</p>
              <p className="mt-3 text-3xl font-bold tracking-tight app-title">
                {formatCurrency(data.result.netMonthly)}
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                This is the number that matters most for judging whether the salary
                really works in {region.label}.
              </p>
            </div>

            <div
              className="rounded-[28px] border px-6 py-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-sm font-medium app-subtle">Keep rate</p>
              <p className="mt-3 text-3xl font-bold tracking-tight app-title">
                {keepPercent.toFixed(0)}%
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Roughly this share of gross salary is retained after deductions in
                this route.
              </p>
            </div>

            <div
              className="rounded-[28px] border px-6 py-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-sm font-medium app-subtle">Regional reading</p>
              <p className="mt-3 text-lg font-semibold app-title">
                {region.label} context
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                {getRegionalReading(region.slug)}
              </p>
            </div>
          </section>

          <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href={`/${lowerSalary}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See {formatCurrency(lowerSalary)} after tax
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want to know whether the lower nearby band would
                feel materially weaker.
              </p>
            </Link>

            <Link
              href={`/${higherSalary}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See {formatCurrency(higherSalary)} after tax
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want to know whether the next band really changes
                monthly life.
              </p>
            </Link>

            <Link
              href={`/compare/${salary}-vs-${higherSalary}-after-tax`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Compare {formatCurrency(salary)} vs {formatCurrency(higherSalary)}
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Best when the real decision is whether the next salary jump is worth it.
              </p>
            </Link>

            <Link
              href={`/monthly-take-home/${roundedMonthlyTarget}`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Reverse from this monthly level
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want the planning route built around monthly life,
                not just gross salary.
              </p>
            </Link>
          </section>

          <CrossLinkRail
            title="Use this regional salary reading to move into the next best route"
            description="These links connect the city-intent salary layer to after-tax pages, reverse planning, comparison routes, editorial guides, and nearby city contexts."
            items={contextualLinks}
          />

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Compare this salary across nearby city contexts
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {otherRegions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/good-salary/${salary}/${item.slug}`}
                  className="rounded-[28px] border px-6 py-6 transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">
                    {formatCurrency(salary)} in {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-8 app-copy">
                    Switch the city context and judge how the same salary may feel differently.
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}