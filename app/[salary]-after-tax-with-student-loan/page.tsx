import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import SalaryVariantContent from "../../components/seo/salary-variant-content";
import { parseNumericSalary, getStudentLoanSalaryPageData, getVariantSalaryParams } from "../../components/seo/salary-variants";

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
    return { title: "Student Loan Salary Page | TaxDecod" };
  }

  return {
    title: `£${salary.toLocaleString("en-GB")} After Tax With Student Loan | TaxDecod`,
    description: `See estimated UK take-home pay for £${salary.toLocaleString(
      "en-GB"
    )} with student loan deductions included.`,
    alternates: {
      canonical: `https://taxdecod.com/${salary}-after-tax-with-student-loan`,
    },
  };
}

export default async function SalaryWithStudentLoanPage({ params }: PageProps) {
  const resolvedParams = await params;
  const salary = parseNumericSalary(resolvedParams.salary);

  if (!salary) notFound();

  const data = getStudentLoanSalaryPageData(salary);

  return (
    <main>
      <SiteHeader />
      <section className="py-16 sm:py-20">
        <Container>
          <SalaryVariantContent
            title={`£${salary.toLocaleString("en-GB")} after tax with student loan`}
            intro={`This page estimates take-home pay for a £${salary.toLocaleString(
              "en-GB"
            )} salary in the UK with a student loan repayment included.`}
            salary={salary}
            result={data.result}
            bullets={[
              "Uses a Plan 2 student loan assumption for this page template.",
              `Estimated monthly take-home pay is ${data.result.netMonthly.toLocaleString("en-GB", {
                style: "currency",
                currency: "GBP",
                maximumFractionDigits: 0,
              })}.`,
              "Useful for graduates comparing real net pay rather than headline salary only.",
            ]}
          />
        </Container>
      </section>
    </main>
  );
}