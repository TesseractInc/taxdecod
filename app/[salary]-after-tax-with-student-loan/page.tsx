import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import SalaryVariantContent from "../../components/seo/salary-variant-content";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../lib/tax/config";
import { buildSeoMetadata } from "../../components/seo/metadata";
import {
  parseNumericSalary,
  getStudentLoanSalaryPageData,
  getVariantSalaryParams,
} from "../../components/seo/salary-variants";
import { formatCurrency } from "../../lib/tax/utils/currency";

type PageProps = {
  params: Promise<{
    salary: string;
  }>;
};

export async function generateStaticParams() {
  return getVariantSalaryParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) {
    return buildSeoMetadata({
      title: "Student Loan Salary Page | TaxDecod",
      description:
        "See estimated UK take-home pay with student loan deductions included.",
      path: "/salary-hub",
    });
  }

  return buildSeoMetadata({
    title: `£${salary.toLocaleString(
      "en-GB"
    )} After Tax With Student Loan (${TAX_YEAR_LABEL}) – UK Take Home Pay`,
    description: `See estimated UK take-home pay for £${salary.toLocaleString(
      "en-GB"
    )} with student loan deductions included.`,
    path: `/${salary}-after-tax-with-student-loan`,
  });
}

export default async function SalaryWithStudentLoanPage({
  params,
}: PageProps) {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) notFound();

  const data = getStudentLoanSalaryPageData(salary);

  return (
    <main>
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Student loan salary view"
            title={`£${salary.toLocaleString("en-GB")} after tax with student loan`}
            description="This page is designed for graduates and borrowers who want to see the real monthly impact of student loan deductions."
            highlightValue={formatCurrency(data.result.netAnnual)}
            highlightSubtext={`${formatCurrency(
              data.result.netMonthly
            )} per month after tax, NI, pension, and student loan deductions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Student loan reality">
              Student loan repayments can create a meaningful drag on monthly
              take-home pay. This page is useful for graduates comparing real
              net pay rather than gross salary only.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${salary}-after-tax-uk`,
                  title: "View without student loan",
                  description:
                    "Compare the same salary under standard deductions only.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary jumps",
                  description:
                    "See whether a higher salary meaningfully outweighs student loan drag.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse a better monthly target",
                  description:
                    "Find the gross salary needed to offset deductions and reach a stronger monthly outcome.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <SalaryVariantContent
              title={`£${salary.toLocaleString("en-GB")} after tax with student loan`}
              intro={`This page estimates take-home pay for a ${formatCurrency(
                salary
              )} salary in the UK with student loan repayment included.`}
              salary={salary}
              result={data.result}
              bullets={[
                "Uses a Plan 2 student loan assumption for this template.",
                `Estimated monthly take-home pay is ${formatCurrency(
                  data.result.netMonthly
                )}.`,
                "Useful for graduates who want a more realistic net-pay reading before making salary decisions.",
              ]}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}