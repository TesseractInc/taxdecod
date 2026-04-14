import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../../components/seo/seo-cta-cluster";
import ComparisonPageContent from "../../../components/seo/comparison-page-content";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../../lib/tax/config";
import { buildSeoMetadata } from "../../../components/seo/metadata";
import {
  getComparisonPageData,
  getComparisonSeoSlugs,
  parseComparisonSlug,
} from "../../../components/seo/comparison-pages";
import { formatCurrency } from "../../../lib/tax/utils/currency";

type ComparisonSeoPageProps = {
  params: Promise<{
    comparison: string;
  }>;
};

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

  return buildSeoMetadata({
    title: `£${salaryA.toLocaleString("en-GB")} vs £${salaryB.toLocaleString(
      "en-GB"
    )} after tax UK (${TAX_YEAR_LABEL})`,
    description: `Compare £${salaryA.toLocaleString(
      "en-GB"
    )} vs £${salaryB.toLocaleString(
      "en-GB"
    )} after tax in the UK and see the real annual and monthly take-home difference.`,
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
              points={[...TRUST_COPY.comparisonSeoPage.points]}
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
              annual take-home pay.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Use the interactive comparison tool",
                  description:
                    "Enter your own salary pair and compare live in a more flexible way.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a monthly target",
                  description:
                    "Work backwards from the number you want to keep each month.",
                },
                {
                  href: "/salary-hub",
                  title: "Explore more salary pages",
                  description:
                    "Browse more salary bands, variants, and take-home scenarios.",
                },
              ]}
            />
          </div>

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
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}