import Link from "next/link";
import { formatCurrency } from "../../lib/tax/utils/currency";

export default function GuideFunnelCTA({
  salary,
}: {
  salary: number;
}) {
  const lower = Math.max(10000, salary - 10000);
  const higher = salary + 10000;

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold app-title">
        Turn this into a real salary decision
      </h2>

      <p className="mt-3 app-copy">
        Understanding a salary is useful, but the next step is comparing it,
        testing it, and seeing how it behaves in real scenarios.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Link href={`/${salary}-after-tax-uk`} className="card">
          <p className="font-semibold app-title">
            Full breakdown
          </p>
          <p className="app-copy text-sm mt-2">
            See exactly what {formatCurrency(salary)} looks like after tax.
          </p>
        </Link>

        <Link href={`/compare/${lower}-vs-${salary}-after-tax`} className="card">
          <p className="font-semibold app-title">
            Compare lower salary
          </p>
          <p className="app-copy text-sm mt-2">
            See if {formatCurrency(lower)} vs {formatCurrency(salary)} is meaningful.
          </p>
        </Link>

        <Link href={`/compare/${salary}-vs-${higher}-after-tax`} className="card">
          <p className="font-semibold app-title">
            Compare higher salary
          </p>
          <p className="app-copy text-sm mt-2">
            Test if the next salary jump is worth it.
          </p>
        </Link>

        <Link href={`/good-salary/${salary}/london`} className="card">
          <p className="font-semibold app-title">
            Real-life context
          </p>
          <p className="app-copy text-sm mt-2">
            See what this salary feels like in real life.
          </p>
        </Link>

      </div>
    </section>
  );
}