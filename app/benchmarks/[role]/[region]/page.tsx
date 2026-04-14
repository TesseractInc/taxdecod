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
import { TRUST_COPY } from "../../../../lib/tax/config";
import {
  formatCitySlug,
  formatRoleSlug,
  getBenchmarkParams,
  parseBenchmark,
} from "../../../../components/seo/role-region-benchmarks";

type BenchmarkPageProps = {
  params: Promise<{
    role: string;
    region: string;
  }>;
};

export async function generateStaticParams() {
  return getBenchmarkParams().map(({ role, city }) => ({
    role,
    region: city,
  }));
}

export async function generateMetadata({
  params,
}: BenchmarkPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const benchmark = parseBenchmark(resolvedParams.role, resolvedParams.region);

  if (!benchmark) {
    return buildSeoMetadata({
      title: "Salary Benchmarks UK | TaxDecod",
      description: "Role and region salary benchmark pages for UK salary decisions.",
      path: "/benchmarks",
    });
  }

  const roleLabel = formatRoleSlug(benchmark.role);
  const regionLabel = formatCitySlug(benchmark.city);

  return buildSeoMetadata({
    title: `${roleLabel} salary ${regionLabel} after tax context`,
    description: `See ${roleLabel} salary context in ${regionLabel}, including lower, median, and upper benchmark ranges for salary decision support.`,
    path: `/benchmarks/${benchmark.role}/${benchmark.city}`,
  });
}

export default async function BenchmarkPage({
  params,
}: BenchmarkPageProps) {
  const resolvedParams = await params;
  const benchmark = parseBenchmark(resolvedParams.role, resolvedParams.region);

  if (!benchmark) notFound();

  const roleLabel = formatRoleSlug(benchmark.role);
  const regionLabel = formatCitySlug(benchmark.city);

  return (
    <main className="app-shell">
      <PageSchema
        pageUrl={`https://taxdecod.com/benchmarks/${benchmark.role}/${benchmark.city}`}
        title={`${roleLabel} salary ${regionLabel} after tax context | TaxDecod`}
        description={`Salary benchmark context for ${roleLabel} in ${regionLabel}.`}
        breadcrumbs={[
          { name: "Home", url: "https://taxdecod.com" },
          { name: "Benchmarks", url: "https://taxdecod.com/benchmarks" },
          {
            name: `${roleLabel} ${regionLabel}`,
            url: `https://taxdecod.com/benchmarks/${benchmark.role}/${benchmark.city}`,
          },
        ]}
        faqItems={[
          {
            question: `What is a typical ${roleLabel} salary in ${regionLabel}?`,
            answer: `A rough benchmark range is ${formatCurrency(
              benchmark.low
            )} to ${formatCurrency(benchmark.high)}, with a median around ${formatCurrency(
              benchmark.median
            )}.`,
          },
          {
            question: `Why does role and region salary context matter?`,
            answer:
              "Because a salary only becomes useful when judged against market level, living costs, progression, and the monthly take-home that actually reaches you.",
          },
        ]}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Role + region salary benchmark"
            title={`${roleLabel} salary in ${regionLabel}`}
            description="This page adds role and region context to salary decisions so users can judge whether a salary is weak, typical, or strong before moving into after-tax comparison."
            highlightValue={formatCurrency(benchmark.median)}
            highlightSubtext="approx median benchmark"
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryHub.description}
              points={[...TRUST_COPY.salaryHub.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Benchmark reality">
              A benchmark is not just about the headline salary. The real decision is
              whether the role-level pay in <strong>{regionLabel}</strong> creates a
              monthly take-home strong enough for the life and cost structure users
              actually face there.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Check a salary after tax",
                  description: "Move from benchmark context into real take-home numbers.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare two salary outcomes",
                  description: "Useful when deciding between current pay and a new offer.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a monthly target",
                  description: "Start from the income you actually want to keep.",
                },
              ]}
            />
          </div>

          <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Benchmark range
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Lower range</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(benchmark.low)}
                  </p>
                </div>

                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Median range</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(benchmark.median)}
                  </p>
                </div>

                <div className="rounded-[22px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Upper range</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(benchmark.high)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                How to use this page
              </p>

              <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                <p>
                  Benchmark pages are for context, not final answers. They help users
                  judge whether a role-level salary looks weak, median, or strong in a
                  specific region.
                </p>
                <p>
                  The real next step is to take a salary from this range and check the
                  after-tax outcome. That is where benchmark context becomes decision
                  quality.
                </p>
                <p>
                  For example, a median benchmark of{" "}
                  <strong>{formatCurrency(benchmark.median)}</strong> may still feel
                  very different after tax depending on student loan, pension, and
                  housing cost.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <Link
                  href="/calculator"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Check a benchmark salary after tax
                </Link>
                <Link
                  href="/compare-salary"
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  Compare current salary vs benchmark
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