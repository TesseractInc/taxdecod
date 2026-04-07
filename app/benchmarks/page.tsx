import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import { roles, regions, benchmarkData } from "../../lib/benchmarks/benchmark-data";

export default function BenchmarksHubPage() {
  const totalPages = benchmarkData.length;

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-12 sm:py-14">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
              Benchmarks
            </p>
            <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
              Compare your salary against market benchmarks
            </h1>
            <p className="mt-4 text-lg leading-8 app-copy">
              Explore role and region benchmark pages, then compare those market
              ranges with your own TaxDecod salary result.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="app-card rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                Roles
              </p>
              <p className="mt-2 text-3xl font-bold app-title">{roles.length}</p>
            </div>

            <div className="app-card rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                Regions
              </p>
              <p className="mt-2 text-3xl font-bold app-title">{regions.length}</p>
            </div>

            <div className="app-card rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-[0.14em] app-subtle">
                Benchmark pages
              </p>
              <p className="mt-2 text-3xl font-bold app-title">{totalPages}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Link
              href="/benchmarks/roles"
              className="app-card-strong rounded-[30px] p-6 hover-lift"
            >
              <p className="text-sm font-medium app-accent">Browse by role</p>
              <h2 className="mt-2 text-2xl font-semibold app-title">
                Salary benchmarks by job role
              </h2>
              <p className="mt-3 text-sm leading-8 app-copy">
                Open benchmark pages for software developer, teacher, nurse,
                accountant, and more.
              </p>
              <p className="mt-5 text-sm font-semibold app-accent">
                Open roles →
              </p>
            </Link>

            <Link
              href="/benchmarks/regions"
              className="app-card-strong rounded-[30px] p-6 hover-lift"
            >
              <p className="text-sm font-medium app-accent">Browse by region</p>
              <h2 className="mt-2 text-2xl font-semibold app-title">
                Salary benchmarks by region
              </h2>
              <p className="mt-3 text-sm leading-8 app-copy">
                Explore London, Manchester, Birmingham, and other benchmark
                markets through role-specific salary pages.
              </p>
              <p className="mt-5 text-sm font-semibold app-accent">
                Open regions →
              </p>
            </Link>
          </div>

          <div className="mt-10 app-card rounded-[30px] p-6 sm:p-7">
            <p className="text-sm font-medium app-accent">How to use this</p>
            <h2 className="mt-2 text-2xl font-semibold app-title">
              Benchmarks are context, not your final answer
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              Use benchmark pages to understand market ranges. Then run your own
              salary through the calculator to see what actually reaches you
              after tax, National Insurance, pension and student loan.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Link href="/calculator" className="app-soft rounded-[22px] p-5 hover-lift">
                <p className="font-semibold app-title">Run calculator</p>
                <p className="mt-2 text-sm app-copy">
                  See your real take-home after deductions.
                </p>
              </Link>

              <Link href="/compare-salary" className="app-soft rounded-[22px] p-5 hover-lift">
                <p className="font-semibold app-title">Compare salaries</p>
                <p className="mt-2 text-sm app-copy">
                  Judge whether a pay jump changes monthly life.
                </p>
              </Link>

              <Link href="/reverse-tax" className="app-soft rounded-[22px] p-5 hover-lift">
                <p className="font-semibold app-title">Reverse target income</p>
                <p className="mt-2 text-sm app-copy">
                  Work back from the take-home you want.
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}