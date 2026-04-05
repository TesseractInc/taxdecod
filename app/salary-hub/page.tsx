import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import { TRUST_COPY } from "../../lib/tax/config";
import { SEO_GROWTH_CONFIG } from "../../components/seo/growth-config";

export default function SalaryHubPage() {
  const popularSalaries = SEO_GROWTH_CONFIG.salaryHub.popularSalaries;
  const salaryGrid = SEO_GROWTH_CONFIG.salaryHub.gridSalaries;

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-12 sm:py-14">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
              Salary discovery hub
            </p>

            <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
              Explore salaries after tax
            </h1>

            <p className="mt-4 text-lg leading-8 app-copy">
              Browse real take-home pay across common UK salary levels. This is
              the quickest way to explore salary pages, compare ranges, and jump
              into higher-intent tools.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryHub.description}
              points={[...TRUST_COPY.salaryHub.points]}
            />
          </div>

          <div className="mt-10">
            <p className="text-sm font-medium app-accent">Popular salaries</p>

            <div className="mt-4 flex flex-wrap gap-3">
              {popularSalaries.map((salary) => (
                <Link
                  key={salary}
                  href={`/${salary}-after-tax-uk`}
                  className="app-chip px-4 py-2 text-sm font-medium transition hover:scale-[1.03]"
                >
                  £{salary.toLocaleString("en-GB")}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium app-accent">Salary grid</p>
                <h2 className="mt-1 text-2xl font-semibold app-title">
                  Start from a salary level that feels close to yours
                </h2>
              </div>

              <p className="max-w-xl text-sm app-copy">
                These pages are designed for quick take-home lookup, internal
                comparison, and deeper navigation into monthly, student loan,
                and Scotland variants.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {salaryGrid.map((salary) => (
                <Link
                  key={salary}
                  href={`/${salary}-after-tax-uk`}
                  className="group app-card rounded-[28px] p-5 transition hover:-translate-y-1"
                >
                  <p className="text-sm app-subtle">Salary page</p>

                  <h3 className="mt-2 text-xl font-semibold app-title">
                    £{salary.toLocaleString("en-GB")}
                  </h3>

                  <p className="mt-3 text-sm leading-7 app-copy">
                    See take-home pay, deduction context, and related salary
                    variants.
                  </p>

                  <p className="mt-5 text-sm font-medium app-accent">
                    Explore →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <Link href="/calculator" className="app-card p-6">
              <p className="font-semibold app-title">Main calculator</p>
              <p className="mt-2 text-sm app-copy">
                Enter your exact salary and get the full guided experience.
              </p>
            </Link>

            <Link href="/reverse-tax" className="app-card p-6">
              <p className="font-semibold app-title">Reverse calculator</p>
              <p className="mt-2 text-sm app-copy">
                Find the gross salary needed to hit your target take-home.
              </p>
            </Link>

            <Link href="/compare-salary" className="app-card p-6">
              <p className="font-semibold app-title">Compare salaries</p>
              <p className="mt-2 text-sm app-copy">
                See whether a higher salary really changes your monthly pay.
              </p>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}