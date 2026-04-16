import Link from "next/link";

export default function Page() {
  return (
    <main className="app-shell py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-semibold app-title">
          How much tax do you pay on £50,000 in the UK?
        </h1>

        <p className="mt-4 app-copy">
          On a £50,000 salary, you typically pay income tax and National Insurance,
          leaving around £3,100–£3,300 per month.
        </p>

        <h2 className="mt-8 text-xl font-semibold app-title">
          Breakdown
        </h2>

        <ul className="mt-4 app-copy space-y-2">
          <li>• Income tax at 20% and 40%</li>
          <li>• National Insurance contributions</li>
        </ul>

        <div className="mt-10 app-card p-6">
          <Link href="/50000-after-tax-uk" className="app-button-primary">
            View full £50k breakdown
          </Link>
        </div>

      </div>
    </main>
  );
}