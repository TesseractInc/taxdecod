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
  getScotlandSalaryPageData,
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
      title: "Scotland Salary Page | TaxDecod",
      description: "See estimated take-home pay in Scotland for a UK salary.",
      path: "/salary-hub",
    });
  }

  return buildSeoMetadata({
    title: `£${salary.toLocaleString(
      "en-GB"
    )} After Tax Scotland (${TAX_YEAR_LABEL}) – Take Home Pay`,
    description: `See estimated take-home pay in Scotland for a £${salary.toLocaleString(
      "en-GB"
    )} salary, using Scotland-specific income tax treatment.`,
    path: `/${salary}-after-tax-scotland`,
  });
}

export default async function SalaryScotlandPage({ params }: PageProps) {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) notFound();

  const data = getScotlandSalaryPageData(salary);

  return (
    <main>
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Scotland salary view"
            title={`£${salary.toLocaleString("en-GB")} after tax in Scotland`}
            description="This page focuses on how Scottish income tax treatment can change the real take-home outcome of the same headline salary."
            highlightValue={formatCurrency(data.result.netAnnual)}
            highlightSubtext={`${formatCurrency(
              data.result.netMonthly
            )} per month using Scotland-specific tax treatment`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Scotland reality">
              Scottish tax treatment can change the final take-home figure
              compared with standard UK rules. This page is most useful when
              users want a location-specific salary reading.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: `/${salary}-after-tax-uk`,
                  title: "Compare with standard UK rules",
                  description:
                    "See how England, Wales, and Northern Ireland treatment differs.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary levels",
                  description:
                    "Test whether another salary is worth more in real take-home terms.",
                },
                {
                  href: "/salary-hub",
                  title: "Explore more salary pages",
                  description:
                    "Move to nearby salary levels and related salary scenarios.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <SalaryVariantContent
              title={`£${salary.toLocaleString("en-GB")} after tax in Scotland`}
              intro={`This page estimates take-home pay for a ${formatCurrency(
                salary
              )} salary using Scotland-specific income tax treatment.`}
              salary={salary}
              result={data.result}
              bullets={[
                "Useful when comparing Scotland against the rest of the UK.",
                `Estimated monthly take-home pay is ${formatCurrency(
                  data.result.netMonthly
                )}.`,
                "Helps reveal how regional tax treatment can change real monthly pay.",
              ]}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}