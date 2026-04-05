import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
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

  return buildSeoMetadata({
    title: formatSalaryTitle(salary),
    description: `If you earn £${salary.toLocaleString(
      "en-GB"
    )} in the UK, see your estimated take-home pay, monthly net income, tax breakdown, and real salary impact.`,
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

  return (
    <main>
      <SalaryPageSchema
        salary={salary}
        netAnnual={data.result.netAnnual}
        netMonthly={data.result.netMonthly}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="UK salary breakdown"
            title={`£${salary.toLocaleString("en-GB")} after tax in the UK`}
            description="Your estimated take-home pay is:"
            highlightValue={`£${data.result.netAnnual.toLocaleString("en-GB")}`}
            highlightSubtext={`£${data.result.netMonthly.toLocaleString(
              "en-GB"
            )} per month after tax and deductions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard>
              Using {TAX_YEAR_LABEL}-style assumptions, you keep{" "}
              <strong>{keepPercent.toFixed(0)}%</strong> of your salary and lose{" "}
              <strong>£{totalDeductions.toLocaleString("en-GB")}</strong> to tax
              and deductions.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Compare salaries",
                  description:
                    "See if a higher salary actually changes your take-home pay.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse calculator",
                  description:
                    "Find what you need to earn to reach your target income.",
                },
                {
                  href: "/salary-hub",
                  title: "Explore salaries",
                  description:
                    "Browse other salary levels and variations.",
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
    </main>
  );
}