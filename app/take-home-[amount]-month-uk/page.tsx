import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import ReversePageContent from "../../components/seo/reverse-page-content";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../lib/tax/config";
import { buildSeoMetadata } from "../../components/seo/metadata";
import {
  getReverseSeoSlugs,
  parseMonthlyTakeHomeFromSlug,
  solveGrossForTargetMonthlyNet,
} from "../../components/seo/reverse-pages";
import { formatCurrency } from "../../lib/tax/utils/currency";

type ReverseSeoPageProps = {
  params: Promise<{
    amount: string;
  }>;
};

export async function generateStaticParams() {
  return getReverseSeoSlugs();
}

export async function generateMetadata({
  params,
}: ReverseSeoPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const amount = parseMonthlyTakeHomeFromSlug(resolvedParams.amount);

  if (!amount) {
    return buildSeoMetadata({
      title: "Reverse Salary UK | TaxDecod",
      description: "Find the salary needed for your target monthly take-home pay.",
      path: "/reverse-tax",
    });
  }

  return buildSeoMetadata({
    title: `Salary needed for £${amount.toLocaleString(
      "en-GB"
    )} a month after tax UK (${TAX_YEAR_LABEL})`,
    description: `Find out how much salary you need to earn in the UK to take home about £${amount.toLocaleString(
      "en-GB"
    )} per month after tax and deductions.`,
    path: `/take-home-${amount}-month-uk`,
  });
}

export default async function ReverseSeoPage({
  params,
}: ReverseSeoPageProps) {
  const resolvedParams = await params;
  const amount = parseMonthlyTakeHomeFromSlug(resolvedParams.amount);

  if (!amount) {
    notFound();
  }

  const data = solveGrossForTargetMonthlyNet(amount);

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Reverse salary breakdown"
            title={`Salary needed for ${formatCurrency(amount)} a month after tax`}
            description="This page starts from a target monthly take-home figure and works backwards to the gross salary needed to reach it."
            highlightValue={formatCurrency(data.grossAnnual)}
            highlightSubtext={`${formatCurrency(
              data.result.netMonthly
            )} estimated monthly take-home under standard assumptions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.reverseSeoPage.description}
              points={[...TRUST_COPY.reverseSeoPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Reverse salary reality">
              Using {TAX_YEAR_LABEL}-style assumptions, you need about{" "}
              <strong>{formatCurrency(data.grossAnnual)}</strong> in gross salary
              to take home roughly <strong>{formatCurrency(amount)}</strong> per
              month, while losing about{" "}
              <strong>{formatCurrency(data.totalDeductions)}</strong> to
              deductions each year.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/reverse-tax",
                  title: "Use the interactive reverse calculator",
                  description:
                    "Enter your own monthly target and adjust assumptions live.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary outcomes",
                  description:
                    "Test whether a higher salary really improves monthly take-home pay.",
                },
                {
                  href: "/salary-hub",
                  title: "Explore more salary pages",
                  description:
                    "Browse more gross-salary pages and linked take-home routes.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <ReversePageContent
              targetMonthlyNet={data.targetMonthlyNet}
              targetAnnualNet={data.targetAnnualNet}
              grossAnnual={data.grossAnnual}
              input={data.input}
              result={data.result}
              totalDeductions={data.totalDeductions}
              keepPercent={data.keepPercent}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}