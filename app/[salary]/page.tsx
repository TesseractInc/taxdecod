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
import ContextualLinkSection from "../../components/seo/contextual-link-section";
import { getContextualLinks } from "../../components/seo/contextual-link-engine";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../lib/tax/config";
import { buildSeoMetadata } from "../../components/seo/metadata";
import {
  formatSalaryTitle,
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

export const dynamicParams = false;

export async function generateStaticParams() {
  const { getSalaryStaticParamsForRollout } = await import(
    "../../components/seo/programmatic-expansion-config"
  );

  return getSalaryStaticParamsForRollout();
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

  const nearbyLower = Math.max(salary - 5000, 10000);
  const nearbyHigher = salary + 5000;
  const roundedMonthlyTarget = Math.max(
    1500,
    Math.min(5000, Math.round(data.result.netMonthly / 100) * 100)
  );
  const lowerCompare = Math.max(10000, salary - 10000);
  const higherCompare = salary + 10000;

  const contextualLinks = getContextualLinks({
    type: "salary",
    salary,
    monthlyNet: data.result.netMonthly,
  });

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
            highlightValue={formatCurrency(data.result.netMonthly)}
            highlightSubtext={`estimated monthly take-home under ${TAX_YEAR_LABEL}-style assumptions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[
                ...TRUST_COPY.salaryPage.points,
                "Useful for real salary decisions, not just gross salary lookups",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Salary reality">
              On this salary, the number that matters most is not the gross
              headline but the monthly amount you actually keep. Under{" "}
              {TAX_YEAR_LABEL}-style assumptions, this route keeps about{" "}
              <strong>{keepPercent.toFixed(0)}%</strong> of gross pay and loses{" "}
              <strong>{formatCurrency(totalDeductions)}</strong> per year to
              deductions. {contentPack.thresholdNote}
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
                Useful when you want to know whether the lower nearby salary band
                feels materially weaker month to month.
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
                Useful when you want to see whether the next salary band creates
                a meaningfully better take-home result.
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
                Judge what this salary means in a city context
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want to go beyond tax and think about what this
                salary may feel like in real life.
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

          <ContextualLinkSection
            title="Move into the next most useful route from this salary"
            description="These links connect this salary page to monthly planning, comparison, editorial explanation, and regional interpretation routes."
            items={contextualLinks}
          />

          <section className="mt-14 text-center">
            <h3 className="text-xl font-semibold app-title">
              Still deciding if this salary is right?
            </h3>

            <p className="mt-2 app-copy">
              Compare it with nearby salaries or see what it looks like monthly.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href={`/compare/${lowerCompare}-vs-${salary}-after-tax`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                }}
              >
                Compare lower
              </Link>

              <Link
                href={`/compare/${salary}-vs-${higherCompare}-after-tax`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                }}
              >
                Compare higher
              </Link>

              <Link
                href={`/monthly-take-home/${roundedMonthlyTarget}`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                }}
              >
                Monthly view
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}