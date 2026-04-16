import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "£40,000 Salary After Tax UK (2026) — Is It Good?",
  description:
    "See what £40k salary means after tax in the UK, including monthly take-home, lifestyle impact, and real-world affordability.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-bold app-title">
            £40,000 Salary After Tax in the UK — What Does It Really Mean?
          </h1>

          <p className="mt-4 app-copy max-w-2xl">
            £40,000 is one of the most common salary benchmarks in the UK. But
            the real question is not the headline number — it’s what you actually
            take home each month after tax, National Insurance, and deductions.
          </p>

          <h2 className="mt-10 text-xl font-semibold app-title">
            Quick take-home estimate
          </h2>

          <p className="mt-3 app-copy">
            A £40,000 salary typically results in around £2,400–£2,600 per month
            after tax, depending on pension contributions and student loan.
          </p>

          <h2 className="mt-10 text-xl font-semibold app-title">
            Where your money goes
          </h2>

          <p className="mt-3 app-copy">
            At this level, you are firmly within the basic tax band. You will pay:
          </p>

          <ul className="mt-4 space-y-2 app-copy">
            <li>• 20% Income Tax on most earnings</li>
            <li>• National Insurance contributions</li>
            <li>• Possible student loan deductions</li>
          </ul>

          <h2 className="mt-10 text-xl font-semibold app-title">
            Is £40k a good salary?
          </h2>

          <p className="mt-3 app-copy">
            Outside London, £40k is generally considered a solid and comfortable
            salary. It allows for stable rent, savings, and moderate lifestyle
            flexibility.
          </p>

          <p className="mt-4 app-copy">
            In London, however, this same salary may feel tighter due to higher
            housing costs.
          </p>

          <h2 className="mt-10 text-xl font-semibold app-title">
            Real-life meaning
          </h2>

          <p className="mt-3 app-copy">
            What matters most is not the salary itself, but how it translates into:
          </p>

          <ul className="mt-4 space-y-2 app-copy">
            <li>• Rent affordability</li>
            <li>• Monthly savings</li>
            <li>• Transport and commuting costs</li>
            <li>• Lifestyle flexibility</li>
          </ul>

          <div className="mt-12">
            <Link href="/calculator" className="app-button-primary">
              Check your exact £40k take-home
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}