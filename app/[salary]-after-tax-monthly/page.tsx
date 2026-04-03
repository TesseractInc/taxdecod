import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import SalaryVariantContent from "../../components/seo/salary-variant-content";
import { parseNumericSalary, getMonthlySalaryPageData, getVariantSalaryParams } from "../../lib/tax/seo/salary-variants";

type PageProps = {
  params: Promise<{
    salary: string;
  }>;
};

export async function generateStaticParams() {
  return getVariantSalaryParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) {
    return { title: "Monthly Salary Page | TaxDecod" };
  }

  return {
    title: `£${salary.toLocaleString("en-GB")} After Tax Monthly | TaxDecod`,
    description: `See estimated monthly take-home pay for a £${salary.toLocaleString(
      "en-GB"
    )} salary in the UK.`,
    alternates: {
      canonical: `https://taxdecod.com/${salary}-after-tax-monthly`,
    },
  };
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
          <SalaryVariantContent
            title={`£${salary.toLocaleString("en-GB")} after tax monthly`}
            intro={`This page focuses on the estimated monthly take-home pay for a £${salary.toLocaleString(
              "en-GB"
            )} yearly salary in the UK, using a standard employee setup.`}
            salary={salary}
            result={data.result}
            bullets={[
              `Estimated monthly net pay is ${data.result.netMonthly.toLocaleString("en-GB", {
                style: "currency",
                currency: "GBP",
                maximumFractionDigits: 0,
              })}.`,
              "Useful for budgeting, rent planning, and monthly affordability checks.",
              "Helps users who think in monthly cash flow rather than annual gross pay.",
            ]}
          />
        </Container>
      </section>
    </main>
  );
}