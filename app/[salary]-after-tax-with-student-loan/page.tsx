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
            description="Your estimated take-home pay with student loan included is:"
            highlightValue={data.result.netAnnual.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
              maximumFractionDigits: 0,
            })}
            highlightSubtext={`${data.result.netMonthly.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
              maximumFractionDigits: 0,
            })} per month after tax, NI, pension, and loan deductions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Student loan reality">
              This page is designed for graduates and borrowers who want to see
              real take-home pay rather than headline gross salary. Student loan
              repayments can make a noticeable difference to monthly cash flow.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${salary}-after-tax-uk`,
                  title: "View without student loan",
                  description:
                    "Compare the same salary with standard deductions only.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary jumps",
                  description:
                    "See whether a higher salary outweighs student loan drag.",
                },
                {
                  href: "/reverse-tax",
                  title: "Target a better monthly number",
                  description:
                    "Find what salary you need to offset deductions and reach your goal.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <SalaryVariantContent
              title={`£${salary.toLocaleString("en-GB")} after tax with student loan`}
              intro={`This page estimates take-home pay for a £${salary.toLocaleString(
                "en-GB"
              )} salary in the UK with a student loan repayment included.`}
              salary={salary}
              result={data.result}
              bullets={[
                "Uses a Plan 2 student loan assumption for this page template.",
                `Estimated monthly take-home pay is ${data.result.netMonthly.toLocaleString(
                  "en-GB",
                  {
                    style: "currency",
                    currency: "GBP",
                    maximumFractionDigits: 0,
                  }
                )}.`,
                "Useful for graduates comparing real net pay rather than headline salary only.",
              ]}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}