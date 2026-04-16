import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import { TRUST_COPY } from "../../lib/tax/config";
import { SEO_GROWTH_CONFIG } from "../../components/seo/growth-config";

const intentRoutes = [
  {
    title: "Use the full salary calculator",
    description:
      "Best when you know the salary already and want the complete deduction reading.",
    href: "/calculator",
  },
  {
    title: "Compare two salary outcomes",
    description:
      "Best when the real question is whether a raise or job move changes monthly life enough.",
    href: "/compare-salary",
  },
  {
    title: "Work backwards from a monthly income target",
    description:
      "Best when you know the amount you want to keep and need the salary behind it.",
    href: "/reverse-tax",
  },
  {
    title: "Check whether a payslip looks on track",
    description:
      "Best when the issue is not salary alone but how deductions are appearing on a real payslip.",
    href: "/payslip-checker",
  },
];

const monthlyTargets = SEO_GROWTH_CONFIG.contentClusters.monthlyIntentTargets;

const benchmarkSeeds = [
  {
    role: "software-engineer",
    city: "london",
    label: "Software Engineer salary London",
  },
  {
    role: "teacher",
    city: "manchester",
    label: "Teacher salary Manchester",
  },
  {
    role: "nurse",
    city: "glasgow",
    label: "Nurse salary Glasgow",
  },
  {
    role: "data-analyst",
    city: "leeds",
    label: "Data Analyst salary Leeds",
  },
];

const scotlandRoutes = [
  { label: "£30,000 after tax in Scotland", href: "/30000-after-tax-scotland" },
  { label: "£40,000 after tax in Scotland", href: "/40000-after-tax-scotland" },
  { label: "£50,000 after tax in Scotland", href: "/50000-after-tax-scotland" },
  { label: "Browse Scotland salary routes", href: "/40000-after-tax-scotland" },
];

const differentiatorRoutes = [
  {
    title: "Reverse salary planning",
    description:
      "A stronger route when you are solving for the income you need rather than starting from a gross salary.",
    href: "/reverse-tax",
  },
  {
    title: "Payslip interpretation",
    description:
      "A stronger route when your real question is whether deductions to date look normal.",
    href: "/payslip-checker",
  },
  {
    title: "Student loan drag",
    description:
      "A stronger route when the same salary feels weaker because student loan repayment is changing the result.",
    href: "/student-loan-calculator",
  },
];

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
            title="Explore salary routes, take-home pay, and better next steps"
            description="This hub is designed for fast salary lookup, wider route discovery, and movement into the tools that answer the next real question after a single salary result."
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
              nearby salary levels, comparison routes, reverse planning, benchmark
              context, and deduction interpretation — not just open another salary page.
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
                  title: "Work backwards from a monthly goal",
                  description:
                    "Use reverse salary planning when the amount you want to keep matters most.",
                },
              ]}
            />
          </div>

          <section className="mt-10 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Best route by question
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Choose the right route, not just another salary page
              </h2>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2 sm:p-8">
              {intentRoutes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Where TaxDecod is strongest
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Go beyond one salary figure
              </h2>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-3 sm:p-8">
              {differentiatorRoutes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
              <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Monthly target routes
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Start from take-home goals
                </h2>
              </div>

              <div className="flex flex-wrap gap-3 p-6 sm:p-8">
                {monthlyTargets.map((amount) => (
                  <Link
                    key={amount}
                    href={`/monthly-take-home/${amount}`}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-white hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-950 dark:hover:text-sky-300"
                  >
                    £{amount.toLocaleString("en-GB")}/month target
                  </Link>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
              <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Role + city benchmarks
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Add market context
                </h2>
              </div>

              <div className="grid gap-3 p-6 sm:p-8">
                {benchmarkSeeds.map((item) => (
                  <Link
                    key={`${item.role}-${item.city}`}
                    href={`/benchmarks/${item.role}/${item.city}`}
                    className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Scotland routes
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Explore Scotland-specific salary pages
              </h2>
            </div>

            <div className="grid gap-3 p-6 md:grid-cols-2 sm:p-8">
              {scotlandRoutes.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Popular salary lookups
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Start from common salary levels
              </h2>
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
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Salary grid
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Browse nearby salary bands quickly
              </h2>
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
                    Open the after-tax breakdown, monthly reality, and related salary paths.
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

      <SiteFooter />
    </main>
  );
}