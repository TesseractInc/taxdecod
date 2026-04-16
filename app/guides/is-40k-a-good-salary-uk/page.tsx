import Link from "next/link";

export default function Page() {
  return (
    <main className="app-shell py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-semibold app-title">
          Is £40,000 a good salary in the UK?
        </h1>

        <p className="mt-4 app-copy">
          A £40,000 salary in the UK is considered above average, but whether it
          is “good” depends heavily on your location, living costs, and lifestyle.
        </p>

        <h2 className="mt-8 text-xl font-semibold app-title">
          Take-home pay on £40k
        </h2>

        <p className="mt-4 app-copy">
          After tax, National Insurance, and typical deductions, a £40k salary
          usually results in around £2,500–£2,700 per month.
        </p>

        <h2 className="mt-8 text-xl font-semibold app-title">
          London vs outside London
        </h2>

        <p className="mt-4 app-copy">
          In London, £40k can feel tight due to rent. Outside London, it can
          support a comfortable lifestyle depending on spending habits.
        </p>

        <div className="mt-10 app-card p-6">
          <h3 className="text-lg font-semibold app-title">
            See exact breakdown for £40k
          </h3>

          <Link href="/40000-after-tax-uk" className="app-button-primary mt-4 inline-block">
            View £40k take-home
          </Link>
        </div>

      </div>
    </main>
  );
}