import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import SalaryPageContent from "../../components/seo/salary-page-content";
import SalaryPageSchema from "../../components/seo/salary-page-schema";
import {
  formatSalaryTitle,
  getPopularSalarySlugs,
  getSalaryPageData,
  parseSalaryFromSlug,
} from "../../components/seo/salary-pages";

type SalaryPageProps = {
  params: Promise<{
    salary: string;
  }>;
};

export async function generateStaticParams() {
  return getPopularSalarySlugs();
}

export async function generateMetadata({
  params,
}: SalaryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = parseSalaryFromSlug(resolvedParams.salary);

  if (!salary) {
    return {
      title: "Salary Page | TaxDecod",
      description: "UK salary breakdown and take-home pay estimates.",
    };
  }

  const title = `${formatSalaryTitle(salary)} | TaxDecod`;
  const description = `See an estimated breakdown of £${salary.toLocaleString(
    "en-GB"
  )} after tax in the UK, including Income Tax, National Insurance, pension, and monthly take-home pay.`;

  const url = `https://taxdecod.com/${salary}-after-tax-uk`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "TaxDecod",
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SalaryPage({ params }: SalaryPageProps) {
  const resolvedParams = await params;
  const salary = parseSalaryFromSlug(resolvedParams.salary);

  if (!salary) {
    notFound();
  }

  const data = getSalaryPageData(salary);

  return (
    <main>
      <SalaryPageSchema
        salary={salary}
        netAnnual={data.result.netAnnual}
        netMonthly={data.result.netMonthly}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SalaryPageContent
            salary={salary}
            input={data.input}
            result={data.result}
            monthlyGross={data.monthlyGross}
            weeklyGross={data.weeklyGross}
            weeklyNet={data.weeklyNet}
          />
        </Container>
      </section>
    </main>
  );
}