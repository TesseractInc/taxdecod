import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import SalaryPageContent from "../../components/seo/salary-page-content";
import SalaryPageSchema from "../../components/seo/salary-page-schema";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../lib/tax/config";
import { buildSeoMetadata } from "../../components/seo/metadata";
import {
  formatSalaryTitle,
  getPopularSalarySlugs,
  getSalaryPageData,
  parseSalaryFromSlug,
} from "../../components/seo/salary-pages";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { getProgrammaticSalaryContent } from "../../components/seo/programmatic-salary-content";

type SalaryPageProps = {
  params: Promise<{
    salary: string;
  }>;
};

export async function generateStaticParams() {
  return getPopularSalarySlugs();
}

export async function generateMetadata({
  params,
}: SalaryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = parseSalaryFromSlug(resolvedParams.salary);

  if (!salary) {
    return buildSeoMetadata({
      title: "Salary Breakdown UK | TaxDecod",
      description: "UK salary breakdown and take-home pay estimates.",
      path: "/salary-hub",
    });
  }

  const data = getSalaryPageData(salary);
  const keepPercent =
    data.result.grossAnnual > 0
      ? (data.result.netAnnual / data.result.grossAnnual) * 100
      : 0;

  const contentPack = getProgrammaticSalaryContent({
    salary,
    netMonthly: data.result.netMonthly,
    netAnnual: data.result.netAnnual,
    keepPercent,
  });

  return buildSeoMetadata({
    title: formatSalaryTitle(salary),
    description: `${contentPack.summary} ${contentPack.thresholdNote}`.slice(
      0,
      155
    ),
    path: `/${salary}-after-tax-uk`,
  });
}

export default async function SalaryPage({ params }: SalaryPageProps) {
  const resolvedParams = await params;
  const salary = parseSalaryFromSlug(resolvedParams.salary);

  if (!salary) {
    notFound();
  }

  const data = getSalaryPageData(salary);

  const totalDeductions =
    data.result.incomeTaxAnnual +
    data.result.nationalInsuranceAnnual +
    data.result.pensionAnnual +
    data.result.studentLoanAnnual;

  const keepPercent =
    data.result.grossAnnual > 0
      ? (data.result.netAnnual / data.result.grossAnnual) * 100
      : 0;

  const contentPack = getProgrammaticSalaryContent({
    salary,
    netMonthly: data.result.netMonthly,
    netAnnual: data.result.netAnnual,
    keepPercent,
  });

  return (
    <main className="app-shell">
      <SalaryPageSchema
        salary={salary}
        netAnnual={data.result.netAnnual}
        netMonthly={data.result.netMonthly}
        faqItems={contentPack.faqItems}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="UK salary breakdown"
            title={`£${salary.toLocaleString("en-GB")} after tax in the UK`}
            description={contentPack.summary}
            highlightValue={formatCurrency(data.result.netAnnual)}
            highlightSubtext={`${formatCurrency(
              data.result.netMonthly
            )} per month after tax and deductions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Salary reality">
              Using {TAX_YEAR_LABEL}-style assumptions, this salary keeps about{" "}
              <strong>{keepPercent.toFixed(0)}%</strong> of gross pay and loses{" "}
              <strong>{formatCurrency(totalDeductions)}</strong> to tax and
              deductions each year. {contentPack.thresholdNote}
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Compare this with another salary",
                  description:
                    "See whether a higher salary really changes your monthly life after deductions.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a target monthly income",
                  description:
                    "Find the gross salary needed to hit the monthly number you actually want.",
                },
                {
                  href: "/salary-hub",
                  title: "Explore more salary pages",
                  description:
                    "Move into nearby salary levels, scenario pages, and related take-home routes.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <SalaryPageContent
              salary={salary}
              input={data.input}
              result={data.result}
              monthlyGross={data.monthlyGross}
              weeklyGross={data.weeklyGross}
              weeklyNet={data.weeklyNet}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}