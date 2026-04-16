import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../components/seo/seo-reality-card";
import { TRUST_COPY } from "../../../lib/tax/config";
import {
  roles,
  regions,
  benchmarkData,
} from "../../../lib/benchmarks/benchmark-data";

export default function BenchmarkRolesPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Benchmark roles"
            title="Salary benchmarks by role"
            description="Choose a job role first, then open benchmark pages by city or region to compare market context with your own TaxDecod salary result."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryHub.description}
              points={[
                ...TRUST_COPY.salaryHub.points,
                "Role-led benchmark browsing for faster market context",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="How to use this page">
              Start with the job family that matches the work. Then open the
              location routes available for that role and compare market context
              against your after-tax outcome.
            </SeoRealityCard>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => {
              const rolePages = benchmarkData.filter(
                (item) => item.role === role.slug
              );

              return (
                <div
                  key={role.slug}
                  className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800">
                    <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                      Role benchmark
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      {role.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      Available benchmark pages: {rolePages.length}
                    </p>
                  </div>

                  <div className="space-y-3 p-6">
                    {regions.map((region) => {
                      const exists = benchmarkData.some(
                        (item) =>
                          item.role === role.slug && item.region === region.slug
                      );

                      if (!exists) return null;

                      return (
                        <Link
                          key={region.slug}
                          href={`/benchmarks/${role.slug}/${region.slug}`}
                          className="block rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-sky-800"
                        >
                          {role.title} in {region.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}