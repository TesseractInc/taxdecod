import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";
import type { TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";

type ComparisonPageContentProps = {
  salaryA: number;
  salaryB: number;
  resultA: TakeHomeResult;
  resultB: TakeHomeResult;
  grossDifference: number;
  netAnnualDifference: number;
  netMonthlyDifference: number;
  taxDrag: number;
  keepPercent: number;
  taxDragPercent: number;
};

function getNearbyComparisonLinks(salaryA: number, salaryB: number) {
  const candidates = [
    [salaryA, salaryB + 5000],
    [salaryA, salaryB + 10000],
    [salaryA + 5000, salaryB + 5000],
    [salaryA + 10000, salaryB + 10000],
    [salaryA - 5000, salaryB],
  ].filter(([a, b]) => a >= 10000 && b > a);

  const seen = new Set<string>();

  return candidates
    .filter(([a, b]) => {
      const key = `${a}-${b}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(([a, b]) => ({
      label: `Compare £${a.toLocaleString("en-GB")} vs £${b.toLocaleString("en-GB")} after tax`,
      href: `/compare/${a}-vs-${b}-after-tax`,
    }));
}

export default function ComparisonPageContent({
  salaryA,
  salaryB,
  resultA,
  resultB,
  grossDifference,
  netAnnualDifference,
  netMonthlyDifference,
  taxDrag,
  keepPercent,
  taxDragPercent,
}: ComparisonPageContentProps) {
  const nearbyLinks = getNearbyComparisonLinks(salaryA, salaryB);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border app-card p-8">
        <p className="text-sm font-medium app-accent">
          Salary comparison breakdown
        </p>

        <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
          £{salaryA.toLocaleString("en-GB")} vs £{salaryB.toLocaleString("en-GB")} after tax
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 app-copy">
          This page compares what changes in real take-home pay when you move
          from <strong>£{salaryA.toLocaleString("en-GB")}</strong> to{" "}
          <strong>£{salaryB.toLocaleString("en-GB")}</strong> in the UK.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border app-card p-5">
          <p className="text-sm app-subtle">Salary A net monthly</p>
          <p className="mt-3 text-2xl font-semibold app-title">
            {formatCurrency(resultA.netMonthly)}
          </p>
        </div>

        <div className="rounded-3xl border app-card p-5">
          <p className="text-sm app-subtle">Salary B net monthly</p>
          <p className="mt-3 text-2xl font-semibold app-title">
            {formatCurrency(resultB.netMonthly)}
          </p>
        </div>

        <div className="rounded-3xl border app-card p-5">
          <p className="text-sm app-subtle">Real monthly gain</p>
          <p className="mt-3 text-2xl font-semibold money-positive">
            {formatCurrency(netMonthlyDifference)}
          </p>
        </div>

        <div className="rounded-3xl border app-card p-5">
          <p className="text-sm app-subtle">Net annual gain</p>
          <p className="mt-3 text-2xl font-semibold app-title">
            {formatCurrency(netAnnualDifference)}
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border app-card p-6">
          <p className="text-sm font-medium app-accent">Decision insight</p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            What the salary jump really gives you
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl app-soft p-4">
              <p className="text-sm app-subtle">Gross increase</p>
              <p className="mt-2 text-2xl font-semibold app-title">
                {formatCurrency(grossDifference)}
              </p>
            </div>

            <div className="rounded-2xl app-soft p-4">
              <p className="text-sm app-subtle">You actually keep</p>
              <p className="mt-2 text-2xl font-semibold app-title">
                {keepPercent.toFixed(0)}%
              </p>
            </div>

            <div className="rounded-2xl app-soft p-4">
              <p className="text-sm app-subtle">Lost to tax drag</p>
              <p className="mt-2 text-2xl font-semibold app-title">
                {formatCurrency(taxDrag)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-8 app-copy">
            <p>
              Moving from <strong>£{salaryA.toLocaleString("en-GB")}</strong> to{" "}
              <strong>£{salaryB.toLocaleString("en-GB")}</strong> adds{" "}
              <strong>{formatCurrency(grossDifference)}</strong> in gross salary,
              but the real annual gain is only{" "}
              <strong>{formatCurrency(netAnnualDifference)}</strong>.
            </p>

            <p>
              In monthly terms, that works out to about{" "}
              <strong>{formatCurrency(netMonthlyDifference)}</strong> extra per
              month after tax and deductions.
            </p>

            <p>
              Around <strong>{formatCurrency(taxDrag)}</strong> of the gross
              increase is absorbed by tax and deductions, which is about{" "}
              <strong>{taxDragPercent.toFixed(0)}%</strong> of the increase.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border app-card p-6">
          <p className="text-sm font-medium app-accent">Quick comparison</p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            Side-by-side take-home view
          </h2>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl app-soft px-4 py-4">
              <p className="text-sm app-subtle">£{salaryA.toLocaleString("en-GB")} net yearly</p>
              <p className="mt-1 text-lg font-semibold app-title">
                {formatCurrency(resultA.netAnnual)}
              </p>
            </div>

            <div className="rounded-2xl app-soft px-4 py-4">
              <p className="text-sm app-subtle">£{salaryB.toLocaleString("en-GB")} net yearly</p>
              <p className="mt-1 text-lg font-semibold app-title">
                {formatCurrency(resultB.netAnnual)}
              </p>
            </div>

            <div className="rounded-2xl app-soft px-4 py-4">
              <p className="text-sm app-subtle">£{salaryA.toLocaleString("en-GB")} net monthly</p>
              <p className="mt-1 text-lg font-semibold app-title">
                {formatCurrency(resultA.netMonthly)}
              </p>
            </div>

            <div className="rounded-2xl app-soft px-4 py-4">
              <p className="text-sm app-subtle">£{salaryB.toLocaleString("en-GB")} net monthly</p>
              <p className="mt-1 text-lg font-semibold app-title">
                {formatCurrency(resultB.netMonthly)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border app-card p-6">
        <p className="text-sm font-medium app-accent">Common questions</p>
        <h2 className="mt-2 text-2xl font-semibold app-title">
          Comparison questions
        </h2>

        <div className="mt-6 space-y-5">
          <div className="rounded-2xl app-soft p-4">
            <h3 className="text-lg font-semibold app-title">
              Is £{salaryB.toLocaleString("en-GB")} really much better than £{salaryA.toLocaleString("en-GB")}?
            </h3>
            <p className="mt-2 text-sm leading-7 app-copy">
              It depends on the real take-home difference. On this estimate, the
              jump gives about <strong>{formatCurrency(netMonthlyDifference)}</strong>{" "}
              more per month.
            </p>
          </div>

          <div className="rounded-2xl app-soft p-4">
            <h3 className="text-lg font-semibold app-title">
              Why is the real gain smaller than the gross difference?
            </h3>
            <p className="mt-2 text-sm leading-7 app-copy">
              Because Income Tax, National Insurance, pension, and other payroll
              deductions reduce how much of the increase you actually keep.
            </p>
          </div>

          <div className="rounded-2xl app-soft p-4">
            <h3 className="text-lg font-semibold app-title">
              Why might my result be different?
            </h3>
            <p className="mt-2 text-sm leading-7 app-copy">
              Your actual result can differ based on tax code, pension setup,
              student loan plan, salary sacrifice, bonuses, or region.
            </p>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Explore related comparison pages"
        description="These nearby comparison pages help users test whether a slightly different salary jump creates a more meaningful take-home change."
        links={nearbyLinks}
      />

      <section className="grid gap-6 md:grid-cols-3">
        <Link href="/compare-salary" className="app-card p-6">
          <p className="font-semibold app-title">Interactive comparison tool</p>
          <p className="mt-2 text-sm app-copy">
            Enter your own salary pair and compare live.
          </p>
        </Link>

        <Link href="/reverse-tax" className="app-card p-6">
          <p className="font-semibold app-title">Reverse calculator</p>
          <p className="mt-2 text-sm app-copy">
            Find the salary needed to hit a target monthly take-home.
          </p>
        </Link>

        <Link href="/salary-hub" className="app-card p-6">
          <p className="font-semibold app-title">Explore salary hub</p>
          <p className="mt-2 text-sm app-copy">
            Browse more salary levels and linked take-home pages.
          </p>
        </Link>
      </section>
    </div>
  );
}