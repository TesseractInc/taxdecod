import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";

type ReversePageContentProps = {
  targetMonthlyNet: number;
  targetAnnualNet: number;
  grossAnnual: number;
  input: CalculatorInput;
  result: TakeHomeResult;
  totalDeductions: number;
  keepPercent: number;
};

function getNearbyReverseLinks(targetMonthlyNet: number) {
  const nearby = [
    targetMonthlyNet - 300,
    targetMonthlyNet - 200,
    targetMonthlyNet - 100,
    targetMonthlyNet + 100,
    targetMonthlyNet + 200,
    targetMonthlyNet + 300,
  ].filter((value) => value >= 1000);

  const seen = new Set<number>();

  return nearby
    .filter((value) => {
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    })
    .map((value) => ({
      label: `Salary needed for ${formatCurrency(value)} per month`,
      href: `/take-home-${value}-month-uk`,
    }));
}

export default function ReversePageContent({
  targetMonthlyNet,
  targetAnnualNet,
  grossAnnual,
  input,
  result,
  totalDeductions,
  keepPercent,
}: ReversePageContentProps) {
  const nearbyReverseLinks = getNearbyReverseLinks(targetMonthlyNet);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Reverse salary reality
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            How much gross salary sits behind {formatCurrency(targetMonthlyNet)} a month?
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400">
            This page works backwards from a target monthly take-home figure so
            users can think in real-life income first, then understand the gross
            salary needed to reach it.
          </p>
        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-[1.05fr_0.95fr] sm:p-8">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Required gross salary
            </p>

            <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              {formatCurrency(grossAnnual)}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              To reach around{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(targetMonthlyNet)}
              </strong>{" "}
              per month after deductions, the model estimates a gross annual
              salary of{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(grossAnnual)}
              </strong>
              .
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Target monthly take-home
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(targetMonthlyNet)}
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Target annual take-home
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(targetAnnualNet)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Salary pressure
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Estimated monthly net
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(result.netMonthly)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Gross per month
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(grossAnnual / 12)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Total deductions
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatCurrency(totalDeductions)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-[20px] bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  You keep
                </span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {keepPercent.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            What this means
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Reverse thinking is often more useful than gross salary thinking
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
            <p>
              Most people start with the job advert or gross salary figure.
              This page flips that logic and starts with the monthly amount a
              person actually wants to keep.
            </p>

            <p>
              To reach around{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(targetMonthlyNet)}
              </strong>{" "}
              per month, the model estimates a gross salary of{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(grossAnnual)}
              </strong>
              , with about{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(totalDeductions)}
              </strong>{" "}
              lost to deductions each year.
            </p>

            <p>
              That makes this page useful for reverse budgeting, job targeting,
              raise planning, and monthly affordability decisions.
            </p>
          </div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Standard assumptions
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Tax code
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {input.taxCode}
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Pension assumption
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {input.pensionPercent}%
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Student loan
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                No student loan included
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Region
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                England, Wales & Northern Ireland
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Common reverse questions
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              What salary do I need for {formatCurrency(targetMonthlyNet)} a month?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              On this estimate, about{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {formatCurrency(grossAnnual)}
              </strong>{" "}
              per year.
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Why is the required salary higher than the monthly target?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Because the gross salary is reduced by income tax, National
              Insurance, pension deductions, and other payroll pressure before
              it becomes take-home pay.
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Why can my real payslip differ?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Your actual result can change based on tax code, pension scheme,
              salary sacrifice, benefits, overtime, bonus timing, or region.
            </p>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Explore nearby take-home targets"
        description="These nearby reverse salary pages help users compare whether a slightly higher or lower monthly target creates a meaningful change in required gross salary."
        links={nearbyReverseLinks}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/reverse-tax"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Use the reverse calculator
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Enter your own target and adjust assumptions interactively.
          </p>
        </Link>

        <Link
          href="/compare-salary"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compare salary jumps
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Test whether a higher salary meaningfully improves monthly take-home.
          </p>
        </Link>

        <Link
          href="/salary-hub"
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Explore salary hub
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Move into more salary levels, breakdowns, and scenario pages.
          </p>
        </Link>
      </section>
    </div>
  );
}