import Link from "next/link";
import CalculatorCard from "../../components/calculator/calculator-card";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import ExperiencePager from "../../components/ui/experience-pager";

const nextRoutes = [
  {
    title: "Compare two salaries",
    description:
      "Best next move when you want to know whether a raise or new offer really changes monthly life.",
    href: "/compare-salary",
  },
  {
    title: "Reverse from a target income",
    description:
      "Start from the monthly amount you actually want to keep and work backwards to the gross salary needed.",
    href: "/reverse-tax",
  },
  {
    title: "Understand payslip deductions",
    description:
      "Useful when your payslip numbers feel confusing or you want plain-English deduction context.",
    href: "/payslip-explained",
  },
  {
    title: "Browse salary pages",
    description:
      "Jump into nearby salary bands and explore related after-tax routes quickly.",
    href: "/salary-hub",
  },
];

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

          <section className="mt-10 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                What to do after the first result
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Move into the next salary decision, not just the first calculation
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                The calculator should not be a dead end. After a result, users
                usually need comparison, reverse planning, payslip understanding,
                or a nearby salary path.
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2 sm:p-7">
              {nextRoutes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 text-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-10 sm:mt-12">
            <ExperiencePager
              previous={{ href: "/salary-hub", label: "Browse salary pages" }}
              next={{ href: "/compare-salary", label: "Compare salary outcomes" }}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}