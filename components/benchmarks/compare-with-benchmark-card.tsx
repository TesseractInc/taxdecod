import Link from "next/link";

type CompareWithBenchmarkCardProps = {
  roleTitle: string;
  regionName: string;
  median: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CompareWithBenchmarkCard({
  roleTitle,
  regionName,
  median,
}: CompareWithBenchmarkCardProps) {
  return (
    <section className="app-card-strong rounded-[30px] p-6 sm:p-7">
      <p className="text-sm font-medium app-accent">Use this benchmark properly</p>
      <h2 className="mt-2 text-2xl font-semibold app-title">
        Compare this market figure with your real take-home
      </h2>
      <p className="mt-3 text-sm leading-8 app-copy">
        The benchmark median for {roleTitle.toLowerCase()} in {regionName} is{" "}
        <strong className="app-title">{formatCurrency(median)}</strong>, but the
        number that matters in real life is what reaches you after deductions.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/calculator" className="app-soft rounded-[22px] p-5 hover-lift">
          <p className="font-semibold app-title">Run calculator</p>
          <p className="mt-2 text-sm app-copy">
            See estimated take-home after tax and deductions.
          </p>
        </Link>

        <Link href="/compare-salary" className="app-soft rounded-[22px] p-5 hover-lift">
          <p className="font-semibold app-title">Compare two salaries</p>
          <p className="mt-2 text-sm app-copy">
            Test whether a higher market salary really changes your monthly life.
          </p>
        </Link>

        <Link href="/reverse-tax" className="app-soft rounded-[22px] p-5 hover-lift">
          <p className="font-semibold app-title">Reverse target income</p>
          <p className="mt-2 text-sm app-copy">
            Work backwards from the take-home amount you want to keep.
          </p>
        </Link>
      </div>
    </section>
  );
}