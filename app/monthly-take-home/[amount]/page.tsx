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
  getMonthlyTakeHomePageData,
  getMonthlyTakeHomeParams,
  parseMonthlyTakeHomeAmount,
} from "../../../components/seo/monthly-target-pages";

type MonthlyTakeHomePageProps = {
  params: Promise<{
    amount: string;
  }>;
};

export async function generateStaticParams() {
  return getMonthlyTakeHomeParams();
}

export async function generateMetadata({
  params,
}: MonthlyTakeHomePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const amount = parseMonthlyTakeHomeAmount(resolvedParams.amount);

  if (!amount) {
    return buildSeoMetadata({
      title: "Monthly Take-Home Salary Planning UK | TaxDecod",
      description: "Find the salary needed for your target monthly take-home in the UK.",
      path: "/reverse-tax",
    });
  }

  return buildSeoMetadata({
    title: `What salary gives £${amount.toLocaleString("en-GB")} take-home per month UK`,
    description: `Find the estimated gross salary needed to take home about £${amount.toLocaleString(
      "en-GB"
    )} per month in the UK after tax and deductions.`,
    path: `/monthly-take-home/${amount}`,
  });
}

export default async function MonthlyTakeHomePage({
  params,
}: MonthlyTakeHomePageProps) {
  const resolvedParams = await params;
  const amount = parseMonthlyTakeHomeAmount(resolvedParams.amount);

  if (!amount) notFound();

  const data = getMonthlyTakeHomePageData(amount);

  return (
    <main className="app-shell">
      <PageSchema
        pageUrl={`https://taxdecod.com/monthly-take-home/${amount}`}
        title={`What salary gives £${amount.toLocaleString("en-GB")} take-home per month UK | TaxDecod`}
        description={`Find the salary needed for about £${amount.toLocaleString("en-GB")} monthly take-home in the UK.`}
        breadcrumbs={[
          { name: "Home", url: "https://taxdecod.com" },
          { name: "Reverse salary", url: "https://taxdecod.com/reverse-tax" },
          { name: `£${amount.toLocaleString("en-GB")} monthly take-home`, url: `https://taxdecod.com/monthly-take-home/${amount}` },
        ]}
        faqItems={[
          {
            question: `What salary do I need to take home £${amount.toLocaleString("en-GB")} a month?`,
            answer: `Under standard UK assumptions, you need about ${formatCurrency(
              data.grossAnnual
            )} gross salary to take home roughly £${amount.toLocaleString("en-GB")} a month.`,
          },
          {
            question: "Why is the gross salary needed much higher than the monthly take-home target?",
            answer:
              "Because tax, National Insurance, pension contributions, and other deductions reduce what reaches you as net pay.",
          },
        ]}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Monthly income planning"
            title={`What salary gives £${amount.toLocaleString("en-GB")} take-home per month?`}
            description="This page is for users who think in monthly life first and want to know the gross salary needed behind that target."
            highlightValue={formatCurrency(data.grossAnnual)}
            highlightSubtext="estimated gross salary needed"
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.reversePage.description}
              points={[...TRUST_COPY.reversePage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Monthly planning reality">
              Using {TAX_YEAR_LABEL}-style assumptions, taking home about{" "}
              <strong>£{amount.toLocaleString("en-GB")}</strong> a month usually
              means earning about <strong>{formatCurrency(data.grossAnnual)}</strong>{" "}
              gross per year.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/reverse-tax",
                  title: "Use the interactive reverse calculator",
                  description: "Adjust the target and assumptions live.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary outcomes",
                  description: "Test whether nearby salary bands improve take-home enough.",
                },
                {
                  href: "/calculator",
                  title: "Open the full calculator",
                  description: "Inspect the full deduction breakdown for the result salary.",
                },
              ]}
            />
          </div>

          <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Reverse salary result
              </p>
              <div className="mt-5 space-y-3">
                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Target monthly take-home</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(amount)}
                  </p>
                </div>
                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Required gross salary</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(data.grossAnnual)}
                  </p>
                </div>
                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Estimated keep rate</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {data.keepPercent.toFixed(0)}%
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
                  Monthly targets are usually more useful than gross salary
                  guessing because they connect directly to rent, saving, and
                  real affordability.
                </p>
                <p>
                  To reach about <strong>{formatCurrency(amount)}</strong> per month,
                  the salary required is often higher than users expect because
                  deductions sit between gross pay and usable income.
                </p>
                <p>
                  The best next step is usually to compare this result against
                  a nearby salary band or use the full calculator for a deeper
                  deduction reading.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <Link
                  href="/compare-salary"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Compare nearby salaries
                </Link>
                <Link
                  href="/calculator"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Open the full calculator
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