import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import Container from "../../../components/ui/container";
import { roles, regions, benchmarkData } from "../../../lib/benchmarks/benchmark-data";

export default function BenchmarkRolesPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-12 sm:py-14">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
              Benchmark roles
            </p>
            <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
              Salary benchmarks by role
            </h1>
            <p className="mt-4 text-lg leading-8 app-copy">
              Choose a job role, then open benchmark pages by region to compare
              market salary context with your own salary result.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => {
              const rolePages = benchmarkData.filter((item) => item.role === role.slug);

              return (
                <div
                  key={role.slug}
                  className="app-card-strong rounded-[28px] p-6"
                >
                  <h2 className="text-2xl font-semibold app-title">
                    {role.title}
                  </h2>

                  <p className="mt-3 text-sm app-copy">
                    Available benchmark pages: {rolePages.length}
                  </p>

                  <div className="mt-5 space-y-3">
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