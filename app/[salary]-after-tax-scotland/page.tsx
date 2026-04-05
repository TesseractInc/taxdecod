import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import SalaryVariantContent from "../../components/seo/salary-variant-content";
import { TAX_YEAR_LABEL } from "../../lib/tax/config";
import { buildSeoMetadata } from "../../components/seo/metadata";
import {
  parseNumericSalary,
  getScotlandSalaryPageData,
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
          <SalaryVariantContent
            title={`£${salary.toLocaleString("en-GB")} after tax in Scotland`}
            intro={`This page estimates take-home pay for a £${salary.toLocaleString(
              "en-GB"
            )} salary using Scotland-specific income tax treatment.`}
            salary={salary}
            result={data.result}
            bullets={[
              "Useful for users comparing Scotland against the rest of the UK.",
              `Estimated monthly take-home pay is ${data.result.netMonthly.toLocaleString(
                "en-GB",
                {
                  style: "currency",
                  currency: "GBP",
                  maximumFractionDigits: 0,
                }
              )}.`,
              "Helps highlight that Scottish income tax treatment can differ from England, Wales, and Northern Ireland.",
            ]}
          />
        </Container>
      </section>
    </main>
  );
}