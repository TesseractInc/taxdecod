import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import SalaryPageContent from "../../components/seo/salary-page-content";
import SalaryPageSchema from "../../components/seo/salary-page-schema";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../lib/tax/config";
import { buildSeoMetadata } from "../../components/seo/metadata";
import {
  formatSalaryTitle,
  getPopularSalarySlugs,
  getSalaryPageData,
  parseSalaryFromSlug,
} from "../../components/seo/salary-pages";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { getProgrammaticSalaryContent } from "../../components/seo/programmatic-salary-content";

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
    return buildSeoMetadata({
      title: "Salary Breakdown UK | TaxDecod",
      description: "UK salary breakdown and take-home pay estimates.",
      path: "/salary-hub",
    });
  }

  const data = getSalaryPageData(salary);
  const keepPercent =
    data.result.grossAnnual > 0
      ? (data.result.netAnnual / data.result.grossAnnual) * 100
      : 0;

  const contentPack = getProgrammaticSalaryContent({
    salary,
    netMonthly: data.result.netMonthly,
    netAnnual: data.result.netAnnual,
    keepPercent,
  });

  return buildSeoMetadata({
    title: formatSalaryTitle(salary),
    description: `${contentPack.summary} ${contentPack.thresholdNote}`.slice(
      0,
      155
    ),
    path: `/${salary}-after-tax-uk`,
  });
}

export default async function SalaryPage({ params }: SalaryPageProps) {
  const resolvedParams = await params;
  const salary = parseSalaryFromSlug(resolvedParams.salary);

  if (!salary) {
    notFound();
  }

  const data = getSalaryPageData(salary);

  const totalDeductions =
    data.result.incomeTaxAnnual +
    data.result.nationalInsuranceAnnual +
    data.result.pensionAnnual +
    data.result.studentLoanAnnual;

  const keepPercent =
    data.result.grossAnnual > 0
      ? (data.result.netAnnual / data.result.grossAnnual) * 100
      : 0;

  const contentPack = getProgrammaticSalaryContent({
    salary,
    netMonthly: data.result.netMonthly,
    netAnnual: data.result.netAnnual,
    keepPercent,
  });

  const nearbyLower = Math.max(salary - 5000, 15000);
  const nearbyHigher = salary + 5000;

  return (
    <main className="app-shell">
      <SalaryPageSchema
        salary={salary}
        netAnnual={data.result.netAnnual}
        netMonthly={data.result.netMonthly}
        faqItems={contentPack.faqItems}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="UK salary breakdown"
            title={`£${salary.toLocaleString("en-GB")} after tax in the UK`}
            description={contentPack.summary}
            highlightValue={formatCurrency(data.result.netAnnual)}
            highlightSubtext={`${formatCurrency(
              data.result.netMonthly
            )} per month after tax and deductions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[
                ...TRUST_COPY.salaryPage.points,
                "Useful for comparing salary reality, not just gross pay",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Salary reality">
              Using {TAX_YEAR_LABEL}-style assumptions, this salary keeps about{" "}
              <strong>{keepPercent.toFixed(0)}%</strong> of gross pay and loses{" "}
              <strong>{formatCurrency(totalDeductions)}</strong> to tax and
              deductions each year. {contentPack.thresholdNote}
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Compare this with another salary",
                  description:
                    "Use this when the next question is whether a higher salary really changes monthly life enough after deductions.",
                },
                {
                  href: "/reverse-tax",
                  title: "Work backwards from a target monthly income",
                  description:
                    "Use this when the real goal is the amount you want to keep, not just the gross salary headline.",
                },
                {
                  href: "/payslip-checker",
                  title: "Check whether a real payslip looks on track",
                  description:
                    "Useful when the salary number looks fine but actual deductions on a payslip still feel wrong.",
                },
              ]}
            />
          </div>

          <section className="mt-10 grid gap-4 lg:grid-cols-3">
            <Link
              href={`/${nearbyLower}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See £{nearbyLower.toLocaleString("en-GB")} after tax
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want context around the next lower salary band.
              </p>
            </Link>

            <Link
              href={`/${nearbyHigher}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See £{nearbyHigher.toLocaleString("en-GB")} after tax
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want context around the next higher salary band.
              </p>
            </Link>

            <Link
              href={`/good-salary/${salary}/london`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Judge whether this feels strong in a city context
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want to go beyond tax and think about what this salary means in real life.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <SalaryPageContent
              salary={salary}
              input={data.input}
              result={data.result}
              monthlyGross={data.monthlyGross}
              weeklyGross={data.weeklyGross}
              weeklyNet={data.weeklyNet}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}