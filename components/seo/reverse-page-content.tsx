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
    <div className="space-y-8">
      <section className="rounded-3xl border app-card p-8">
        <p className="text-sm font-medium app-accent">
          Reverse salary breakdown
        </p>

        <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
          How much salary do you need for {formatCurrency(targetMonthlyNet)} a
          month after tax?
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 app-copy">
          To take home around <strong>{formatCurrency(targetMonthlyNet)}</strong>{" "}
          per month in the UK, you need to earn about{" "}
          <strong>{formatCurrency(grossAnnual)}</strong> per year under this
          standard employee setup.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border app-card p-5">
          <p className="text-sm app-subtle">Target monthly take-home</p>
          <p className="mt-3 text-2xl font-semibold app-title">
            {formatCurrency(targetMonthlyNet)}
          </p>
        </div>

        <div className="rounded-3xl border app-card p-5">
          <p className="text-sm app-subtle">Required gross salary</p>
          <p className="mt-3 text-2xl font-semibold app-title">
            {formatCurrency(grossAnnual)}
          </p>
        </div>

        <div className="rounded-3xl border app-card p-5">
          <p className="text-sm app-subtle">Estimated monthly net</p>
          <p className="mt-3 text-2xl font-semibold money-positive">
            {formatCurrency(result.netMonthly)}
          </p>
        </div>

        <div className="rounded-3xl border app-card p-5">
          <p className="text-sm app-subtle">Target annual take-home</p>
          <p className="mt-3 text-2xl font-semibold app-title">
            {formatCurrency(targetAnnualNet)}
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border app-card p-6">
          <p className="text-sm font-medium app-accent">Salary reality</p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            What happens between gross salary and take-home pay
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl app-soft p-4">
              <p className="text-sm app-subtle">You keep</p>
              <p className="mt-2 text-2xl font-semibold app-title">
                {keepPercent.toFixed(0)}%
              </p>
            </div>

            <div className="rounded-2xl app-soft p-4">
              <p className="text-sm app-subtle">Total deducted</p>
              <p className="mt-2 text-2xl font-semibold app-title">
                {formatCurrency(totalDeductions)}
              </p>
            </div>

            <div className="rounded-2xl app-soft p-4">
              <p className="text-sm app-subtle">Gross per month</p>
              <p className="mt-2 text-2xl font-semibold app-title">
                {formatCurrency(grossAnnual / 12)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-8 app-copy">
            <p>
              To receive roughly{" "}
              <strong>{formatCurrency(targetMonthlyNet)}</strong> per month
              after tax, the model estimates a gross annual salary of{" "}
              <strong>{formatCurrency(grossAnnual)}</strong>.
            </p>
            <p>
              That means around <strong>{formatCurrency(totalDeductions)}</strong>{" "}
              is lost each year to Income Tax, National Insurance, pension, and
              other deductions included in this setup.
            </p>
            <p>
              This page is useful for job-offer planning, salary target setting,
              and reverse budgeting when you care about the real monthly number
              more than the headline gross salary.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border app-card p-6">
          <p className="text-sm font-medium app-accent">Assumptions</p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            Standard employee setup
          </h2>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl app-soft px-4 py-4">
              <p className="text-sm app-subtle">Tax code used</p>
              <p className="mt-1 text-lg font-semibold app-title">
                {input.taxCode}
              </p>
            </div>

            <div className="rounded-2xl app-soft px-4 py-4">
              <p className="text-sm app-subtle">Pension assumption</p>
              <p className="mt-1 text-lg font-semibold app-title">
                {input.pensionPercent}%
              </p>
            </div>

            <div className="rounded-2xl app-soft px-4 py-4">
              <p className="text-sm app-subtle">Student loan</p>
              <p className="mt-1 text-lg font-semibold app-title">
                No student loan included
              </p>
            </div>

            <div className="rounded-2xl app-soft px-4 py-4">
              <p className="text-sm app-subtle">Region</p>
              <p className="mt-1 text-lg font-semibold app-title">
                England, Wales, Northern Ireland
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border app-card p-6">
        <p className="text-sm font-medium app-accent">Common questions</p>
        <h2 className="mt-2 text-2xl font-semibold app-title">
          Reverse salary questions
        </h2>

        <div className="mt-6 space-y-5">
          <div className="rounded-2xl app-soft p-4">
            <h3 className="text-lg font-semibold app-title">
              What salary do I need to take home {formatCurrency(targetMonthlyNet)} a month?
            </h3>
            <p className="mt-2 text-sm leading-7 app-copy">
              On this estimate, you need to earn about{" "}
              <strong>{formatCurrency(grossAnnual)}</strong> per year.
            </p>
          </div>

          <div className="rounded-2xl app-soft p-4">
            <h3 className="text-lg font-semibold app-title">
              Why is the required salary higher than the monthly target?
            </h3>
            <p className="mt-2 text-sm leading-7 app-copy">
              Because the gross salary is reduced by Income Tax, National
              Insurance, and pension deductions before it becomes take-home pay.
            </p>
          </div>

          <div className="rounded-2xl app-soft p-4">
            <h3 className="text-lg font-semibold app-title">
              Why might my real payslip be different?
            </h3>
            <p className="mt-2 text-sm leading-7 app-copy">
              Your actual payslip can change based on tax code, pension scheme,
              student loan plan, salary sacrifice, bonuses, overtime, or region.
            </p>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Explore nearby take-home targets"
        description="These nearby reverse salary pages help users compare whether a slightly higher or lower monthly target creates a big change in required gross salary."
        links={nearbyReverseLinks}
      />

      <section className="grid gap-6 md:grid-cols-3">
        <Link href="/reverse-tax" className="app-card p-6">
          <p className="font-semibold app-title">Interactive reverse calculator</p>
          <p className="mt-2 text-sm app-copy">
            Enter your own target monthly net pay and adjust assumptions live.
          </p>
        </Link>

        <Link href="/compare-salary" className="app-card p-6">
          <p className="font-semibold app-title">Compare salaries</p>
          <p className="mt-2 text-sm app-copy">
            Test whether a higher salary really improves monthly take-home pay.
          </p>
        </Link>

        <Link href="/salary-hub" className="app-card p-6">
          <p className="font-semibold app-title">Explore salary hub</p>
          <p className="mt-2 text-sm app-copy">
            Browse gross-salary pages and related take-home breakdowns.
          </p>
        </Link>
      </section>
    </div>
  );
}