import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import Container from "../../../components/ui/container";
import { roles, regions, benchmarkData } from "../../../lib/benchmarks/benchmark-data";

export default function BenchmarkRegionsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-12 sm:py-14">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
              Benchmark regions
            </p>
            <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
              Salary benchmarks by region
            </h1>
            <p className="mt-4 text-lg leading-8 app-copy">
              Open regional salary benchmark pages by role, then compare those
              market medians with your TaxDecod salary result.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {regions.map((region) => {
              const regionPages = benchmarkData.filter(
                (item) => item.region === region.slug
              );

              return (
                <div
                  key={region.slug}
                  className="app-card-strong rounded-[28px] p-6"
                >
                  <h2 className="text-2xl font-semibold app-title">
                    {region.name}
                  </h2>

                  <p className="mt-3 text-sm app-copy">
                    Available benchmark pages: {regionPages.length}
                  </p>

                  <div className="mt-5 space-y-3">
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
                          className="block rounded-[18px] border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm font-medium app-title transition hover-lift"
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
    </main>
  );
}