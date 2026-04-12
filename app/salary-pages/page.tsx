import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";

const salaryPages = [
  20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000,
];

export default function SalaryPagesHubPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Salary pages"
            title="Browse high-intent UK salary breakdown pages"
            description="These pages are designed for users who want a direct salary answer first, then a clearer understanding of take-home pay, deductions, and the next useful salary step."
          />

          <div className="mt-8">
            <SeoRealityCard label="How to use these pages">
              Start with the salary level that feels closest to yours, then move
              into comparison, reverse salary planning, or nearby salary pages
              if the first answer is not enough.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Use the full salary calculator",
                  description:
                    "Enter your exact salary and get the live guided result experience.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary outcomes",
                  description:
                    "See whether a different salary creates a meaningful monthly change.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from monthly income",
                  description:
                    "Find the salary required to reach your target take-home pay.",
                },
              ]}
            />
          </div>

          <section className="mt-14 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-8">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Core salary entries
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Open a salary page and go deeper from there
              </h2>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
              {salaryPages.map((salary) => (
                <Link
                  key={salary}
                  href={`/${salary}-after-tax-uk`}
                  className="group rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Core page
                  </p>

                  <p className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    £{salary.toLocaleString("en-GB")}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    Open the after-tax breakdown, monthly net pay, and related
                    salary actions.
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