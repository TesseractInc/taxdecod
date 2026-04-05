import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  getMonthlySalaryPageData,
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
      title: "Monthly Salary Page | TaxDecod",
      description: "See estimated monthly take-home pay for a UK salary.",
      path: "/salary-hub",
    });
  }

  return buildSeoMetadata({
    title: `£${salary.toLocaleString(
      "en-GB"
    )} After Tax Monthly (${TAX_YEAR_LABEL}) – UK Monthly Take Home Pay`,
    description: `See estimated monthly take-home pay for a £${salary.toLocaleString(
      "en-GB"
    )} salary in the UK, including tax and deduction assumptions.`,
    path: `/${salary}-after-tax-monthly`,
  });
}

export default async function SalaryMonthlyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) notFound();

  const data = getMonthlySalaryPageData(salary);

  return (
    <main>
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Monthly salary view"
            title={`£${salary.toLocaleString("en-GB")} after tax monthly`}
            description="Your estimated monthly take-home pay is:"
            highlightValue={data.result.netMonthly.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
              maximumFractionDigits: 0,
            })}
            highlightSubtext={`Based on a yearly salary of £${salary.toLocaleString(
              "en-GB"
            )} under standard UK assumptions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Monthly reality">
              This page is for users who think in monthly cash flow, rent,
              bills, and real affordability. The monthly take-home figure is the
              most useful number for day-to-day planning.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${salary}-after-tax-uk`,
                  title: "View the full yearly breakdown",
                  description:
                    "See the annual version, deductions, and deeper salary context.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare monthly outcomes",
                  description:
                    "See whether another salary creates a meaningful monthly difference.",
                },
                {
                  href: "/reverse-tax",
                  title: "Work backwards from a target",
                  description:
                    "Find the gross salary needed to hit your ideal monthly income.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <SalaryVariantContent
              title={`£${salary.toLocaleString("en-GB")} after tax monthly`}
              intro={`This page focuses on the estimated monthly take-home pay for a £${salary.toLocaleString(
                "en-GB"
              )} yearly salary in the UK, using a standard employee setup.`}
              salary={salary}
              result={data.result}
              bullets={[
                `Estimated monthly net pay is ${data.result.netMonthly.toLocaleString(
                  "en-GB",
                  {
                    style: "currency",
                    currency: "GBP",
                    maximumFractionDigits: 0,
                  }
                )}.`,
                "Useful for budgeting, rent planning, and monthly affordability checks.",
                "Helps users who think in monthly cash flow rather than annual gross pay.",
              ]}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}