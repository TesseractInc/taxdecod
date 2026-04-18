import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import { formatCurrency } from "../../../lib/tax/utils/currency";
import { getSalaryPageData } from "../../../components/seo/salary-pages";
import { TAX_YEAR_LABEL } from "../../../lib/tax/config";

const salary = 60000;

export const metadata: Metadata = {
  title: "Is £60,000 a good salary in the UK? | TaxDecod",
  description:
    "Is £60k a good salary in the UK? Understand take-home pay, monthly income, and real-life affordability for a £60,000 salary.",
};

export default function GuidePage() {
  const data = getSalaryPageData(salary);
  const monthly = data.result.netMonthly;

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold app-title sm:text-5xl">
            Is £60,000 a good salary in the UK?
          </h1>

          <div className="mt-6">
            <TaxYearTrustBar
              description={`This guide uses ${TAX_YEAR_LABEL}-style UK salary assumptions to explain what £60,000 actually means after tax.`}
              points={[
                "UK tax-year aligned",
                "Real take-home interpretation",
                "Not financial advice",
              ]}
            />
          </div>

          <p className="mt-8 text-base leading-8 app-copy">
            A £60,000 salary in the UK sounds strong on paper, but what really
            matters is what you take home. After tax and deductions, this salary
            typically results in around{" "}
            <strong>{formatCurrency(monthly)}</strong> per month.
          </p>

          <h2 className="mt-10 text-2xl font-semibold app-title">
            What £60k actually feels like monthly
          </h2>

          <p className="mt-4 text-base leading-8 app-copy">
            The difference between £40k and £60k is not just £20k — tax increases
            sharply in this range. That means your real gain in lifestyle depends
            on how much of that increase you keep after deductions.
          </p>

          <h2 className="mt-10 text-2xl font-semibold app-title">
            Is £60k good in London vs other cities?
          </h2>

          <p className="mt-4 text-base leading-8 app-copy">
            In London, £60k is often considered comfortable but not high-end due
            to rent and transport costs. Outside London, the same salary can feel
            significantly stronger and provide more disposable income.
          </p>

          <h2 className="mt-10 text-2xl font-semibold app-title">
            When £60k becomes “good”
          </h2>

          <ul className="mt-4 list-disc pl-5 space-y-2 text-base app-copy">
            <li>Lower housing costs</li>
            <li>No student loan deductions</li>
            <li>Dual-income households</li>
            <li>Controlled lifestyle spending</li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold app-title">
            Explore this salary properly
          </h2>

          <div className="mt-6 grid gap-4">
            <Link href="/60000-after-tax-uk" className="app-link">
              → Full £60,000 after tax breakdown
            </Link>
            <Link href="/compare/50000-vs-60000-after-tax" className="app-link">
              → Compare £50k vs £60k
            </Link>
            <Link href="/good-salary/60000/london" className="app-link">
              → £60k in London (real-life context)
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}