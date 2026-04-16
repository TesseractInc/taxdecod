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

export default function BenchmarkRegionsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Benchmark regions"
            title="Salary benchmarks by region"
            description="Start from the city or region first, then open the available job-role pages to compare local market context with your salary result."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryHub.description}
              points={[
                ...TRUST_COPY.salaryHub.points,
                "Region-led benchmark browsing for faster local salary context",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="How to use this page">
              Start with the location that matters most. Then open the role pages
              available in that market and compare those benchmarks with your own
              take-home and salary expectations.
            </SeoRealityCard>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {regions.map((region) => {
              const regionPages = benchmarkData.filter(
                (item) => item.region === region.slug
              );

              return (
                <div
                  key={region.slug}
                  className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800">
                    <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                      Region benchmark
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      {region.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      Available benchmark pages: {regionPages.length}
                    </p>
                  </div>

                  <div className="space-y-3 p-6">
                    {roles.map((role) => {
                      const exists = benchmarkData.some(
                        (item) =>
                          item.region === region.slug && item.role === role.slug
                      );

                      if (!exists) return null;

                      return (
                        <Link
                          key={role.slug}
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