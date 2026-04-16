import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../../components/layout/site-header";
import SiteFooter from "../../../../components/layout/site-footer";
import Container from "../../../../components/ui/container";
import TaxYearTrustBar from "../../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../../../components/seo/seo-cta-cluster";
import PageSchema from "../../../../components/seo/page-schema";
import { buildSeoMetadata } from "../../../../components/seo/metadata";
import { formatCurrency } from "../../../../lib/tax/utils/currency";
import { TRUST_COPY, TAX_YEAR_LABEL } from "../../../../lib/tax/config";
import {
  formatCityIntentLabel,
  getCitySalaryIntentData,
  getCityIntentParams,
} from "../../../../components/seo/city-salary-intent";

type GoodSalaryPageProps = {
  params: Promise<{
    salary: string;
    region: string;
  }>;
};

export async function generateStaticParams() {
  return getCityIntentParams();
}

export async function generateMetadata({
  params,
}: GoodSalaryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const salary = Number(resolvedParams.salary);
  const regionLabel = formatCityIntentLabel(resolvedParams.region);
  const data = getCitySalaryIntentData(salary, resolvedParams.region);

  if (!data || !Number.isFinite(salary)) {
    return buildSeoMetadata({
      title: "Is this a good salary? | TaxDecod",
      description:
        "City-specific salary context pages for UK salary decision support.",
      path: "/benchmarks",
    });
  }

  return buildSeoMetadata({
    title: `Is £${salary.toLocaleString("en-GB")} a good salary in ${regionLabel}?`,
    description: `See whether £${salary.toLocaleString(
      "en-GB"
    )} is a good salary in ${regionLabel}, using take-home pay and city cost context rather than gross salary alone.`,
    path: `/good-salary/${salary}/${resolvedParams.region}`,
  });
}

export default async function GoodSalaryPage({
  params,
}: GoodSalaryPageProps) {
  const resolvedParams = await params;
  const salary = Number(resolvedParams.salary);

  if (!Number.isFinite(salary)) {
    notFound();
  }

  const data = getCitySalaryIntentData(salary, resolvedParams.region);

  if (!data) {
    notFound();
  }

  const regionLabel = formatCityIntentLabel(resolvedParams.region);

  return (
    <main className="app-shell">
      <PageSchema
        pageUrl={`https://taxdecod.com/good-salary/${salary}/${resolvedParams.region}`}
        title={`Is £${salary.toLocaleString(
          "en-GB"
        )} a good salary in ${regionLabel}? | TaxDecod`}
        description={`City-specific salary context for £${salary.toLocaleString(
          "en-GB"
        )} in ${regionLabel}.`}
        breadcrumbs={[
          { name: "Home", url: "https://taxdecod.com" },
          { name: "Benchmarks", url: "https://taxdecod.com/benchmarks" },
          {
            name: `Is £${salary.toLocaleString(
              "en-GB"
            )} a good salary in ${regionLabel}?`,
            url: `https://taxdecod.com/good-salary/${salary}/${resolvedParams.region}`,
          },
        ]}
        faqItems={[
          {
            question: `Is £${salary.toLocaleString(
              "en-GB"
            )} a good salary in ${regionLabel}?`,
            answer: data.verdictSummary,
          },
          {
            question: `How much is £${salary.toLocaleString(
              "en-GB"
            )} after tax per month?`,
            answer: `Estimated take-home pay is about ${formatCurrency(
              data.result.netMonthly
            )} per month under standard assumptions.`,
          },
          {
            question: `Why does city context matter when judging salary?`,
            answer:
              "Because the same take-home pay can feel very different depending on rent, commuting, household size, debt, and the general cost level of the city.",
          },
        ]}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="City salary decision page"
            title={`Is £${salary.toLocaleString(
              "en-GB"
            )} a good salary in ${regionLabel}?`}
            description="This page combines after-tax salary reality with city cost context so users can judge the salary more intelligently than by gross pay alone."
            highlightValue={formatCurrency(data.result.netMonthly)}
            highlightSubtext="estimated monthly take-home"
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[
                ...TRUST_COPY.salaryPage.points,
                "Useful when city context matters as much as tax",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Verdict">
              Using {TAX_YEAR_LABEL}-style assumptions, a salary of{" "}
              <strong>£{salary.toLocaleString("en-GB")}</strong> becomes about{" "}
              <strong>{formatCurrency(data.result.netMonthly)}</strong> a month
              after deductions. {data.city.tone}
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Inspect the full deduction breakdown",
                  description:
                    "Useful when you want the deeper take-home picture behind this salary.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare this against a nearby salary",
                  description:
                    "Useful when you want to know whether the next pay band actually changes life enough.",
                },
                {
                  href: "/reverse-tax",
                  title: "Work backwards from a target income",
                  description:
                    "Useful when the amount you want to keep matters more than judging a single fixed salary.",
                },
              ]}
            />
          </div>

          <section className="mt-10 grid gap-4 lg:grid-cols-3">
            <Link
              href={`/${salary}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See the full after-tax salary route
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want the full deduction reading behind this city-context verdict.
              </p>
            </Link>

            <Link
              href={`/benchmarks/software-engineer/${resolvedParams.region}`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Add a role benchmark in {regionLabel}
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when market role context matters alongside take-home pay.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Explore more salary routes
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want wider salary context rather than one city verdict alone.
              </p>
            </Link>
          </section>

          <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Main answer
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                {data.verdictTitle}
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                <p>{data.verdictSummary}</p>
                <p>
                  Estimated keep rate is about{" "}
                  <strong>{data.keepPercent.toFixed(0)}%</strong>, which means
                  gross salary alone does not tell the full story.
                </p>
                <p>
                  The right answer depends on rent, travel cost, debt,
                  household structure, and how much monthly flexibility you actually
                  need in {regionLabel}.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Decision routes
              </p>

              <div className="mt-5 grid gap-3">
                <Link
                  href="/compare-salary"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Compare this with another salary
                </Link>
                <Link
                  href={`/benchmarks/software-engineer/${resolvedParams.region}`}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Explore a role benchmark in {regionLabel}
                </Link>
                <Link
                  href="/salary-hub"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Explore more salary routes
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