import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../../components/seo/seo-cta-cluster";
import ComparisonPageContent from "../../../components/seo/comparison-page-content";
import CrossLinkRail from "../../../components/seo/cross-link-rail";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../../lib/tax/config";
import { buildSeoMetadata } from "../../../components/seo/metadata";
import {
  getComparisonClusterRoutes,
  getComparisonDecisionSummary,
  getComparisonPageData,
  getComparisonSeoSlugs,
  getNearbyComparisonRoutes,
  parseComparisonSlug,
} from "../../../components/seo/comparison-pages";
import { getContextualLinks } from "../../../components/seo/contextual-link-engine";
import { formatCurrency } from "../../../lib/tax/utils/currency";

type ComparisonSeoPageProps = {
  params: Promise<{
    comparison: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getComparisonSeoSlugs();
}

export async function generateMetadata({
  params,
}: ComparisonSeoPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const parsed = parseComparisonSlug(resolvedParams.comparison);

  if (!parsed) {
    return buildSeoMetadata({
      title: "Salary Comparison UK | TaxDecod",
      description: "Compare two UK salaries after tax and see the real difference.",
      path: "/compare-salary",
    });
  }

  const { salaryA, salaryB } = parsed;
  const data = getComparisonPageData(salaryA, salaryB);

  return buildSeoMetadata({
    title: `£${salaryA.toLocaleString("en-GB")} vs £${salaryB.toLocaleString(
      "en-GB"
    )} after tax UK (${TAX_YEAR_LABEL})`,
    description: `Compare £${salaryA.toLocaleString(
      "en-GB"
    )} vs £${salaryB.toLocaleString(
      "en-GB"
    )} after tax in the UK and see the real annual and monthly take-home difference of about ${formatCurrency(
      data.netMonthlyDifference
    )} a month.`,
    path: `/compare/${salaryA}-vs-${salaryB}-after-tax`,
  });
}

export default async function ComparisonSeoPage({
  params,
}: ComparisonSeoPageProps) {
  const resolvedParams = await params;
  const parsed = parseComparisonSlug(resolvedParams.comparison);

  if (!parsed) {
    notFound();
  }

  const { salaryA, salaryB } = parsed;
  const data = getComparisonPageData(salaryA, salaryB);

  const contextualLinks = getContextualLinks({
    type: "compare",
    salaryA,
    salaryB,
    strongerSalary: salaryB,
    strongerMonthlyNet: data.resultB.netMonthly,
  });

  const nearbyRoutes = getNearbyComparisonRoutes(salaryA, salaryB);
  const clusterRoutes = getComparisonClusterRoutes(salaryA, salaryB);
  const decisionSummary = getComparisonDecisionSummary(
    salaryA,
    salaryB,
    data.netMonthlyDifference
  );

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Salary comparison breakdown"
            title={`£${salaryA.toLocaleString("en-GB")} vs £${salaryB.toLocaleString(
              "en-GB"
            )} after tax`}
            description="This page shows the real gain after deductions so users can judge a salary jump by monthly reality, not gross headline alone."
            highlightValue={formatCurrency(data.netAnnualDifference)}
            highlightSubtext={`${formatCurrency(
              data.netMonthlyDifference
            )} per month difference after tax and deductions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.comparisonSeoPage.description}
              points={[
                ...TRUST_COPY.comparisonSeoPage.points,
                "Useful when gross salary alone is not the real answer",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Comparison reality">
              Using {TAX_YEAR_LABEL}-style assumptions, moving from{" "}
              <strong>£{salaryA.toLocaleString("en-GB")}</strong> to{" "}
              <strong>£{salaryB.toLocaleString("en-GB")}</strong> adds{" "}
              <strong>{formatCurrency(data.grossDifference)}</strong> in gross
              salary, but only around{" "}
              <strong>{formatCurrency(data.netAnnualDifference)}</strong> in real
              annual take-home pay. {decisionSummary}
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Use the interactive comparison tool",
                  description:
                    "Adjust the salaries directly when you want a live comparison instead of this fixed route.",
                },
                {
                  href: "/reverse-tax",
                  title: "Work backwards from a target income",
                  description:
                    "Use reverse salary planning when the amount you want to keep matters more than either headline salary.",
                },
                {
                  href: "/calculator",
                  title: "Inspect one salary in full",
                  description:
                    "Useful when you want the deeper deduction picture behind either side of this comparison.",
                },
              ]}
            />
          </div>

          <section className="mt-10 grid gap-4 lg:grid-cols-3">
            <Link
              href={`/${salaryA}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Inspect £{salaryA.toLocaleString("en-GB")} on its own
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want the full one-salary deduction reading behind
                the first side of the comparison.
              </p>
            </Link>

            <Link
              href={`/${salaryB}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Inspect £{salaryB.toLocaleString("en-GB")} on its own
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want the full one-salary deduction reading behind
                the second side of the comparison.
              </p>
            </Link>

            <Link
              href="/payslip-checker"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Check a real payslip if the difference still feels wrong
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when a comparison looks fine on paper but the actual
                payslip experience still feels off.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <ComparisonPageContent
              salaryA={salaryA}
              salaryB={salaryB}
              resultA={data.resultA}
              resultB={data.resultB}
              grossDifference={data.grossDifference}
              netAnnualDifference={data.netAnnualDifference}
              netMonthlyDifference={data.netMonthlyDifference}
              taxDrag={data.taxDrag}
              keepPercent={data.keepPercent}
              taxDragPercent={data.taxDragPercent}
            />
          </div>

          <CrossLinkRail
            title="Use this comparison to branch into the next best route"
            description="These links connect comparison pages to full salary pages, monthly planning, regional interpretation, and editorial salary-decision guidance."
            items={contextualLinks}
          />

          <CrossLinkRail
            eyebrow="Nearby comparison routes"
            title="Keep moving through nearby comparison bands"
            description="These are the most natural adjacent compare routes around this salary pair."
            items={nearbyRoutes}
          />

          <CrossLinkRail
            eyebrow="Compare cluster"
            title="Anchor this route inside the wider compare network"
            description="These comparison pages help turn fixed salary pairs into a stronger mid-funnel decision cluster."
            items={clusterRoutes}
          />

          <section className="mt-14 text-center">
            <h3 className="text-xl font-semibold app-title">
              Want to explore further?
            </h3>

            <p className="mt-2 app-copy">
              Move from comparison into planning or real-life salary context.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/reverse-tax"
                className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                }}
              >
                Reverse salary
              </Link>

              <Link
                href={`/good-salary/${salaryB}/london`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                }}
              >
                City context
              </Link>

              <Link
                href="/guides/how-much-salary-increase-is-worth-it"
                className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                }}
              >
                Raise guide
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}