import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import SalaryVariantContent from "../../components/seo/salary-variant-content";
import PageSchema from "../../components/seo/page-schema";
import { buildSeoMetadata } from "../../components/seo/metadata";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../lib/tax/config";
import {
  getStudentLoanSalaryPageData,
  getVariantSalaryParams,
  parseNumericSalary,
} from "../../components/seo/salary-variants";

type StudentLoanVariantPageProps = {
  params: Promise<{
    salary: string;
  }>;
};

export async function generateStaticParams() {
  return getVariantSalaryParams();
}

export async function generateMetadata({
  params,
}: StudentLoanVariantPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) {
    return buildSeoMetadata({
      title: "Salary After Tax With Student Loan UK | TaxDecod",
      description:
        "See salary take-home pay with student loan deductions in the UK.",
      path: "/salary-hub",
    });
  }

  return buildSeoMetadata({
    title: `£${salary.toLocaleString(
      "en-GB"
    )} after tax with student loan UK (${TAX_YEAR_LABEL})`,
    description: `See how much £${salary.toLocaleString(
      "en-GB"
    )} salary becomes after tax with student loan deductions in the UK, including estimated monthly take-home pay.`,
    path: `/${salary}-after-tax-with-student-loan`,
  });
}

export default async function StudentLoanSalaryVariantPage({
  params,
}: StudentLoanVariantPageProps) {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) {
    notFound();
  }

  const data = getStudentLoanSalaryPageData(salary);

  return (
    <main className="app-shell">
      <PageSchema
        pageUrl={`https://taxdecod.com/${salary}-after-tax-with-student-loan`}
        title={`£${salary.toLocaleString(
          "en-GB"
        )} after tax with student loan | TaxDecod`}
        description={`Student-loan-adjusted take-home pay view for £${salary.toLocaleString(
          "en-GB"
        )} salary in the UK.`}
        breadcrumbs={[
          { name: "Home", url: "https://taxdecod.com" },
          { name: "Salary hub", url: "https://taxdecod.com/salary-hub" },
          {
            name: `£${salary.toLocaleString(
              "en-GB"
            )} after tax with student loan`,
            url: `https://taxdecod.com/${salary}-after-tax-with-student-loan`,
          },
        ]}
        faqItems={[
          {
            question: `How much is £${salary.toLocaleString(
              "en-GB"
            )} after tax with student loan deductions?`,
            answer: `Estimated monthly take-home pay is about ${formatCurrency(
              data.result.netMonthly
            )} under this student loan salary view.`,
          },
          {
            question: "Why does student loan reduce take-home pay?",
            answer:
              "Because student loan repayments are deducted from earnings above the relevant threshold, reducing the money that reaches you as net pay.",
          },
          {
            question: "Is this page useful for comparing student loan impact?",
            answer:
              "Yes. It helps users compare the same salary with and without student loan deductions to understand the real drag on monthly take-home pay.",
          },
        ]}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Student loan salary breakdown"
            title={`£${salary.toLocaleString(
              "en-GB"
            )} after tax with student loan`}
            description="This page isolates the student-loan-adjusted view so users can see how loan repayments affect take-home pay."
            highlightValue={formatCurrency(data.result.netMonthly)}
            highlightSubtext="estimated monthly take-home with student loan"
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Student loan reality">
              Using {TAX_YEAR_LABEL}-style assumptions with a{" "}
              <strong>Plan 2 student loan</strong>, a salary of{" "}
              <strong>£{salary.toLocaleString("en-GB")}</strong> becomes about{" "}
              <strong>{formatCurrency(data.result.netMonthly)}</strong> per
              month after tax and deductions.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${salary}-after-tax-uk`,
                  title: "Compare against the main salary reading",
                  description:
                    "See how the same gross salary differs without the student loan variant applied.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary outcomes",
                  description:
                    "Test whether nearby salaries meaningfully improve take-home after deductions.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a monthly target",
                  description:
                    "Work backwards from the monthly amount you actually want to keep.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <SalaryVariantContent
              salary={salary}
              input={data.input}
              result={data.result}
              variant="student-loan"
              title={`£${salary.toLocaleString(
                "en-GB"
              )} after tax with student loan`}
              intro={`Estimated monthly take-home pay for a salary of £${salary.toLocaleString(
                "en-GB"
              )} with a Plan 2 student loan is about ${formatCurrency(
                data.result.netMonthly
              )}. This page helps users understand how student loan deductions change the real monthly outcome of the same gross salary.`}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}