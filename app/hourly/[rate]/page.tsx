import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../../components/seo/seo-cta-cluster";
import PageSchema from "../../../components/seo/page-schema";
import { buildSeoMetadata } from "../../../components/seo/metadata";
import { formatCurrency } from "../../../lib/tax/utils/currency";
import { TAX_YEAR_LABEL, TRUST_COPY } from "../../../lib/tax/config";
import {
  getHourlyPageData,
  getHourlyRateParams,
  parseHourlyRate,
} from "../../../components/seo/hourly-pages";

type HourlyPageProps = {
  params: Promise<{
    rate: string;
  }>;
};

export async function generateStaticParams() {
  return getHourlyRateParams();
}

export async function generateMetadata({
  params,
}: HourlyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rate = parseHourlyRate(resolvedParams.rate);

  if (!rate) {
    return buildSeoMetadata({
      title: "Hourly Pay After Tax UK | TaxDecod",
      description: "See how much hourly pay becomes after tax in the UK.",
      path: "/salary-hub",
    });
  }

  return buildSeoMetadata({
    title: `£${rate} an hour after tax UK (${TAX_YEAR_LABEL})`,
    description: `See what £${rate} an hour becomes after tax in the UK, including estimated monthly and yearly take-home pay.`,
    path: `/hourly/${rate}`,
  });
}

export default async function HourlyPage({ params }: HourlyPageProps) {
  const resolvedParams = await params;
  const rate = parseHourlyRate(resolvedParams.rate);

  if (!rate) notFound();

  const data = getHourlyPageData(rate);
  const totalDeductions =
    data.result.incomeTaxAnnual +
    data.result.nationalInsuranceAnnual +
    data.result.pensionAnnual +
    data.result.studentLoanAnnual;

  return (
    <main className="app-shell">
      <PageSchema
        pageUrl={`https://taxdecod.com/hourly/${rate}`}
        title={`£${rate} an hour after tax UK | TaxDecod`}
        description={`Estimated take-home pay for £${rate} an hour in the UK.`}
        breadcrumbs={[
          { name: "Home", url: "https://taxdecod.com" },
          { name: "Salary hub", url: "https://taxdecod.com/salary-hub" },
          { name: `£${rate} an hour after tax`, url: `https://taxdecod.com/hourly/${rate}` },
        ]}
        faqItems={[
          {
            question: `How much is £${rate} an hour after tax in the UK?`,
            answer: `At roughly 37.5 hours a week, £${rate} an hour is about ${formatCurrency(
              data.result.netMonthly
            )} per month after tax and deductions under this setup.`,
          },
          {
            question: `What yearly salary is £${rate} an hour?`,
            answer: `At about 37.5 hours a week, £${rate} an hour is roughly ${formatCurrency(
              data.grossAnnual
            )} gross per year.`,
          },
        ]}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Hourly pay breakdown"
            title={`£${rate} an hour after tax in the UK`}
            description="This page translates hourly pay into estimated yearly and monthly take-home so users can judge whether the rate is actually strong in real-life terms."
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
            <SeoRealityCard label="Hourly pay reality">
              Using {TAX_YEAR_LABEL}-style assumptions, <strong>£{rate} an hour</strong>{" "}
              is about <strong>{formatCurrency(data.grossAnnual)}</strong> gross per
              year and about <strong>{formatCurrency(data.result.netMonthly)}</strong>{" "}
              per month after deductions.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Open the full salary calculator",
                  description: "Check a full breakdown using an exact annual salary setup.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary outcomes",
                  description: "See whether the next pay band really changes monthly life.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a target monthly income",
                  description: "Find the salary needed for the monthly number you want.",
                },
              ]}
            />
          </div>

          <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Hourly conversion
              </p>
              <div className="mt-5 space-y-3">
                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Gross yearly</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(data.grossAnnual)}
                  </p>
                </div>
                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Net monthly</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(data.result.netMonthly)}
                  </p>
                </div>
                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Approx net hourly</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(data.netHourlyApprox)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                What this usually means
              </p>
              <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                <p>
                  Hourly pay often feels more intuitive than annual salary, but the
                  same problem still applies: gross pay is not what reaches you.
                </p>
                <p>
                  At <strong>£{rate} an hour</strong>, about{" "}
                  <strong>{formatCurrency(totalDeductions)}</strong> a year can still be
                  lost to tax and deductions.
                </p>
                <p>
                  The smartest next move is usually to compare this against a nearby
                  salary band or reverse-plan the monthly take-home you actually want.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <Link
                  href="/compare-salary"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Compare with another salary
                </Link>
                <Link
                  href="/reverse-tax"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Reverse from a monthly target
                </Link>
                <Link
                  href="/salary-hub"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Explore more salary pages
                </Link>
              </div>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}