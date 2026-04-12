import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import { TRUST_COPY } from "../../lib/tax/config";
import { SEO_GROWTH_CONFIG } from "../../components/seo/growth-config";

export default function SalaryHubPage() {
  const popularSalaries = SEO_GROWTH_CONFIG.salaryHub.popularSalaries;
  const salaryGrid = SEO_GROWTH_CONFIG.salaryHub.gridSalaries;

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Salary discovery hub"
            title="Explore UK salaries after tax"
            description="This hub is designed for fast take-home lookup, salary exploration, and deeper movement into comparison, reverse salary planning, and high-intent salary pages."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryHub.description}
              points={[...TRUST_COPY.salaryHub.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why this hub matters">
              Salary discovery works best when users can move quickly between
              nearby salary levels, compare different outcomes, and open pages
              that match the question they are actually trying to answer.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Use the full salary calculator",
                  description:
                    "Enter your exact salary and get the full guided take-home experience.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare two salary outcomes",
                  description:
                    "See whether a pay rise or job move really changes monthly life after deductions.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a monthly goal",
                  description:
                    "Work backwards from the monthly amount you want to keep and find the salary behind it.",
                },
              ]}
            />
          </div>

          <section className="mt-14 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Popular salary lookups
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Start from common salary levels
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                These are some of the most useful salary pages for quick
                take-home checks and onward salary exploration.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 p-6 sm:p-8">
              {popularSalaries.map((salary) => (
                <Link
                  key={salary}
                  href={`/${salary}-after-tax-uk`}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950 dark:hover:text-sky-300"
                >
                  £{salary.toLocaleString("en-GB")} after tax
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    Salary grid
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                    Browse nearby salary bands quickly
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                    Use this grid to jump into a salary level that feels close
                    to yours, then move into variants, comparison pages, or
                    reverse salary planning.
                  </p>
                </div>

                <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  Internal linking hub
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:p-8">
              {salaryGrid.map((salary) => (
                <Link
                  key={salary}
                  href={`/${salary}-after-tax-uk`}
                  className="group rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Salary page
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    £{salary.toLocaleString("en-GB")}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    Open the after-tax breakdown, monthly reality, and related
                    salary paths.
                  </p>

                  <p className="mt-5 text-sm font-medium text-sky-700 dark:text-sky-300">
                    Open page →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </Container>
      </section>
    </main>
  );
}