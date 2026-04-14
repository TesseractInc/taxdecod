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
  getMonthlySalaryPageData,
  getVariantSalaryParams,
  parseNumericSalary,
} from "../../components/seo/salary-variants";

type MonthlyVariantPageProps = {
  params: Promise<{
    salary: string;
  }>;
};

export async function generateStaticParams() {
  return getVariantSalaryParams();
}

export async function generateMetadata({
  params,
}: MonthlyVariantPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) {
    return buildSeoMetadata({
      title: "Monthly Salary Breakdown UK | TaxDecod",
      description:
        "See monthly take-home pay for UK salaries after tax and deductions.",
      path: "/salary-hub",
    });
  }

  return buildSeoMetadata({
    title: `£${salary.toLocaleString("en-GB")} after tax monthly UK (${TAX_YEAR_LABEL})`,
    description: `See how much £${salary.toLocaleString(
      "en-GB"
    )} salary becomes per month after tax in the UK, including net monthly pay and deduction context.`,
    path: `/${salary}-after-tax-monthly`,
  });
}

export default async function MonthlySalaryVariantPage({
  params,
}: MonthlyVariantPageProps) {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) {
    notFound();
  }

  const data = getMonthlySalaryPageData(salary);

  return (
    <main className="app-shell">
      <PageSchema
        pageUrl={`https://taxdecod.com/${salary}-after-tax-monthly`}
        title={`£${salary.toLocaleString("en-GB")} after tax monthly UK | TaxDecod`}
        description={`Monthly take-home view for £${salary.toLocaleString(
          "en-GB"
        )} salary in the UK.`}
        breadcrumbs={[
          { name: "Home", url: "https://taxdecod.com" },
          { name: "Salary hub", url: "https://taxdecod.com/salary-hub" },
          {
            name: `£${salary.toLocaleString("en-GB")} after tax monthly`,
            url: `https://taxdecod.com/${salary}-after-tax-monthly`,
          },
        ]}
        faqItems={[
          {
            question: `How much is £${salary.toLocaleString(
              "en-GB"
            )} per month after tax in the UK?`,
            answer: `Estimated monthly take-home pay is about ${formatCurrency(
              data.result.netMonthly
            )} under standard UK assumptions.`,
          },
          {
            question:
              "Why is the monthly number more useful than the yearly salary?",
            answer:
              "Because rent, bills, savings, and daily life are usually planned monthly, not by gross annual salary alone.",
          },
          {
            question: "Can the monthly take-home differ from a real payslip?",
            answer:
              "Yes. Tax code changes, pension setup, student loan deductions, bonuses, salary sacrifice, and payroll timing can all affect a real payslip.",
          },
        ]}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Monthly salary breakdown"
            title={`£${salary.toLocaleString("en-GB")} after tax per month`}
            description="This page isolates the monthly view so users can judge a salary by the number that usually matters most in real life."
            highlightValue={formatCurrency(data.result.netMonthly)}
            highlightSubtext="estimated monthly take-home"
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Monthly reality">
              Using {TAX_YEAR_LABEL}-style assumptions, a salary of{" "}
              <strong>£{salary.toLocaleString("en-GB")}</strong> becomes about{" "}
              <strong>{formatCurrency(data.result.netMonthly)}</strong> per
              month after tax and deductions. That is usually a more
              decision-relevant number than the gross annual headline.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${salary}-after-tax-uk`,
                  title: "View the full annual salary breakdown",
                  description:
                    "Go back to the main salary page for broader yearly and deduction context.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary outcomes",
                  description:
                    "See whether a nearby salary band changes monthly life enough.",
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
              variant="monthly"
              title={`£${salary.toLocaleString("en-GB")} after tax monthly`}
              intro={`Estimated monthly take-home pay for a salary of £${salary.toLocaleString(
                "en-GB"
              )} in the UK is about ${formatCurrency(
                data.result.netMonthly
              )}. This page is built for users who think in monthly affordability, bills, rent, and savings rather than gross annual salary alone.`}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}