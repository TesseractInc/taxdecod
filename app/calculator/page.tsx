import CalculatorCard from "../../components/calculator/calculator-card";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import ExperiencePager from "../../components/ui/experience-pager";

export default function CalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="relative overflow-hidden py-6 sm:py-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(14,165,233,0.14), transparent 72%)",
            }}
          />
          <div
            className="absolute right-[-8%] top-[22%] h-[220px] w-[220px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.08), transparent 72%)",
            }}
          />
        </div>

        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] app-accent sm:text-sm">
              UK salary calculator
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight app-title sm:text-5xl">
              Accurate take-home pay, clearly shown
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 app-copy sm:text-base sm:leading-8">
              Check what reaches you after Income Tax, National Insurance,
              pension, and student loan deductions.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <div className="app-chip px-4 py-2 text-xs font-semibold sm:text-sm">
                PAYE-style logic
              </div>
              <div className="app-soft px-4 py-2 text-xs app-subtle sm:text-sm">
                Live net pay
              </div>
              <div className="app-soft px-4 py-2 text-xs app-subtle sm:text-sm">
                Clean breakdown
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            <div className="rounded-[30px] border p-2 shadow-[0_28px_100px_-44px_rgba(15,23,42,0.24)] app-card-strong sm:p-3">
              <CalculatorCard mode="overview" />
            </div>
          </div>

          <div className="mt-10 sm:mt-12">
            <ExperiencePager
              next={{ href: "/insights", label: "Salary leaderboard and insights" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}