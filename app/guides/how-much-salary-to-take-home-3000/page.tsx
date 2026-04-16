import Link from "next/link";

export default function Page() {
  return (
    <main className="app-shell py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-semibold app-title">
          How much salary do I need to take home £3,000 a month?
        </h1>

        <p className="mt-4 app-copy">
          To take home £3,000 per month in the UK, you typically need a salary
          between £48,000 and £55,000 depending on deductions like pension and student loans.
        </p>

        <h2 className="mt-8 text-xl font-semibold app-title">
          Why the salary needs to be higher
        </h2>

        <p className="mt-4 app-copy">
          Income tax and National Insurance reduce your gross salary significantly,
          especially as you approach higher tax bands.
        </p>

        <div className="mt-10 app-card p-6">
          <h3 className="app-title font-semibold">
            Calculate your exact required salary
          </h3>

          <Link href="/reverse-tax" className="app-button-primary mt-4 inline-block">
            Reverse calculate your salary
          </Link>
        </div>

      </div>
    </main>
  );
}