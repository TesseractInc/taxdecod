import Link from "next/link";
import CalculatorCard from "../../components/calculator/calculator-card";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import ExperiencePager from "../../components/ui/experience-pager";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";

const nextRoutes = [
  {
    title: "Compare this salary against another offer",
    description:
      "Use this when the real question is whether a raise or a new role changes monthly life enough after deductions.",
    href: "/compare-salary",
  },
  {
    title: "Work backwards from a target monthly income",
    description:
      "Use this when you know the amount you want to keep and need the gross salary required to reach it.",
    href: "/reverse-tax",
  },
  {
    title: "Check whether a payslip looks on track",
    description:
      "Use this when your deductions feel unusual and you want a first-check reading of PAYE, NI, and year-to-date totals.",
    href: "/payslip-checker",
  },
  {
    title: "Browse nearby salary bands and routes",
    description:
      "Use this when you want more context around neighbouring salary levels rather than a single isolated result.",
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
              See what your salary actually leaves you with
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 app-copy sm:text-base sm:leading-8">
              Check take-home pay after Income Tax, National Insurance, pension,
              and student loan deductions, then use the result to make a better
              salary decision.
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <div className="rounded-[30px] border p-2 shadow-[0_28px_100px_-44px_rgba(15,23,42,0.24)] app-card-strong sm:p-3">
              <CalculatorCard mode="full" />
            </div>
          </div>

          <div className="mt-10">
            <TaxYearTrustBar
              description="TaxDecod calculator results are designed to help users understand UK salary outcomes more clearly for 2025/26. They should be read as estimate-based salary guidance rather than payroll, legal, or financial advice."
              points={[
                "Updated for 2025/26 salary interpretation",
                "Estimate-based outputs, not financial advice",
                "Methodology and assumptions visible",
                "Best used for salary decisions and first-check clarity",
              ]}
            />
          </div>

          <section className="mt-10 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Where to go after the first result
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Use the result to answer the next salary question properly
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                The first number is only the start. Most users then need to
                compare a different offer, work backwards from a target income,
                or check whether deductions look normal.
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