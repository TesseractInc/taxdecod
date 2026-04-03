import CalculatorCard from "../../components/calculator/calculator-card";
import NextActions from "../../components/calculator/next-actions";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import ExperiencePager from "../../components/ui/experience-pager";

export default function CalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(14,165,233,0.16), transparent 72%)",
            }}
          />
          <div
            className="absolute right-[-6%] top-[20%] h-[280px] w-[280px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.10), transparent 72%)",
            }}
          />
        </div>

        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
              Core calculator
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight app-title sm:text-5xl">
              Calculate your real salary
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 app-copy sm:text-lg">
              See exactly what you take home after tax, National Insurance,
              pension, and student loan. This is the main TaxDecod experience —
              clear, visual, and built for real salary decisions.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="app-chip px-4 py-2 text-sm font-medium">
                Net pay first
              </div>
              <div className="app-soft px-4 py-2 text-sm app-subtle">
                Visual deductions
              </div>
              <div className="app-soft px-4 py-2 text-sm app-subtle">
                Salary reality
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="rounded-[36px] border p-3 shadow-[0_28px_100px_-40px_rgba(15,23,42,0.35)] app-card-strong sm:p-5">
              <CalculatorCard mode="overview" />
            </div>
          </div>

          <div className="mt-12">
            <NextActions />
          </div>

          <div className="mt-12">
            <ExperiencePager
              next={{ href: "/insights", label: "Salary leaderboard and insights" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}