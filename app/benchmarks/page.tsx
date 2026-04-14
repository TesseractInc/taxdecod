import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import { TRUST_COPY } from "../../lib/tax/config";

const benchmarkRoutes = [
  {
    title: "Software Engineer salary London",
    href: "/benchmarks/software-engineer/london",
  },
  {
    title: "Software Engineer salary Manchester",
    href: "/benchmarks/software-engineer/manchester",
  },
  {
    title: "Teacher salary London",
    href: "/benchmarks/teacher/london",
  },
  {
    title: "Teacher salary Manchester",
    href: "/benchmarks/teacher/manchester",
  },
  {
    title: "Nurse salary London",
    href: "/benchmarks/nurse/london",
  },
  {
    title: "Nurse salary Glasgow",
    href: "/benchmarks/nurse/glasgow",
  },
  {
    title: "Data Analyst salary Leeds",
    href: "/benchmarks/data-analyst/leeds",
  },
  {
    title: "Accountant salary Birmingham",
    href: "/benchmarks/accountant/birmingham",
  },
];

const cityIntentRoutes = [
  {
    title: "Is 30k a good salary in London?",
    href: "/good-salary/30000/london",
  },
  {
    title: "Is 40k a good salary in Manchester?",
    href: "/good-salary/40000/manchester",
  },
  {
    title: "Is 50k a good salary in Birmingham?",
    href: "/good-salary/50000/birmingham",
  },
  {
    title: "Is 35k a good salary in Leeds?",
    href: "/good-salary/35000/leeds",
  },
];

export default function BenchmarksHubPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Salary benchmarks hub"
            title="Role and city salary context for UK decisions"
            description="Benchmark pages help users judge whether a salary is weak, typical, or strong before moving into after-tax comparison and monthly reality."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryHub.description}
              points={[...TRUST_COPY.salaryHub.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why benchmarks matter">
              A salary on its own is incomplete. Benchmark context adds market
              position, while after-tax tools add monthly reality. The best
              decision comes from combining both.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Check a salary after tax",
                  description:
                    "Move from salary benchmark context into real take-home numbers.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare two salary outcomes",
                  description:
                    "Test whether a new offer or raise changes monthly life enough.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a target monthly income",
                  description:
                    "Start from the amount you want to keep and work backwards.",
                },
              ]}
            />
          </div>

          <section className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Role + city benchmarks
              </p>
              <div className="mt-5 grid gap-3">
                {benchmarkRoutes.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                “Is this a good salary?” routes
              </p>
              <div className="mt-5 grid gap-3">
                {cityIntentRoutes.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}