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
  getScotlandSalaryPageData,
  getVariantSalaryParams,
  parseNumericSalary,
} from "../../components/seo/salary-variants";

type ScotlandVariantPageProps = {
  params: Promise<{
    salary: string;
  }>;
};

export async function generateStaticParams() {
  return getVariantSalaryParams();
}

export async function generateMetadata({
  params,
}: ScotlandVariantPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) {
    return buildSeoMetadata({
      title: "Scotland Salary Breakdown UK | TaxDecod",
      description:
        "See Scotland-specific take-home pay for UK salaries after tax and deductions.",
      path: "/salary-hub",
    });
  }

  return buildSeoMetadata({
    title: `£${salary.toLocaleString("en-GB")} after tax in Scotland (${TAX_YEAR_LABEL})`,
    description: `See how much £${salary.toLocaleString(
      "en-GB"
    )} salary becomes after tax in Scotland, including estimated monthly take-home pay and Scottish tax context.`,
    path: `/${salary}-after-tax-scotland`,
  });
}

export default async function ScotlandSalaryVariantPage({
  params,
}: ScotlandVariantPageProps) {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) {
    notFound();
  }

  const data = getScotlandSalaryPageData(salary);

  return (
    <main className="app-shell">
      <PageSchema
        pageUrl={`https://taxdecod.com/${salary}-after-tax-scotland`}
        title={`£${salary.toLocaleString("en-GB")} after tax in Scotland | TaxDecod`}
        description={`Scotland-specific take-home pay view for £${salary.toLocaleString(
          "en-GB"
        )} salary.`}
        breadcrumbs={[
          { name: "Home", url: "https://taxdecod.com" },
          { name: "Salary hub", url: "https://taxdecod.com/salary-hub" },
          {
            name: `£${salary.toLocaleString("en-GB")} after tax in Scotland`,
            url: `https://taxdecod.com/${salary}-after-tax-scotland`,
          },
        ]}
        faqItems={[
          {
            question: `How much is £${salary.toLocaleString(
              "en-GB"
            )} after tax in Scotland?`,
            answer: `Estimated monthly take-home pay is about ${formatCurrency(
              data.result.netMonthly
            )} under Scotland-specific tax assumptions.`,
          },
          {
            question: "Why can Scotland salary results differ from the rest of the UK?",
            answer:
              "Because Scotland uses different income tax bands and rates from England, Wales, and Northern Ireland.",
          },
          {
            question: "Is the Scotland after-tax reading useful for salary comparison?",
            answer:
              "Yes. It is especially useful when users want to compare Scottish tax treatment against the main UK reading for the same gross salary.",
          },
        ]}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Scotland salary breakdown"
            title={`£${salary.toLocaleString("en-GB")} after tax in Scotland`}
            description="This page isolates the Scotland-specific salary view so users can judge the same gross salary under Scottish tax treatment."
            highlightValue={formatCurrency(data.result.netMonthly)}
            highlightSubtext="estimated monthly take-home in Scotland"
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Scotland salary reality">
              Using {TAX_YEAR_LABEL}-style Scottish tax assumptions, a salary of{" "}
              <strong>£{salary.toLocaleString("en-GB")}</strong> becomes about{" "}
              <strong>{formatCurrency(data.result.netMonthly)}</strong> per
              month after tax and deductions in Scotland.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${salary}-after-tax-uk`,
                  title: "Compare against the main UK salary reading",
                  description:
                    "See how the same gross salary differs under the standard UK route.",
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
              variant="scotland"
              title={`£${salary.toLocaleString("en-GB")} after tax in Scotland`}
              intro={`Estimated monthly take-home pay for a salary of £${salary.toLocaleString(
                "en-GB"
              )} in Scotland is about ${formatCurrency(
                data.result.netMonthly
              )}. This page is useful when comparing Scotland-specific tax treatment against the main UK reading for the same gross salary.`}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}