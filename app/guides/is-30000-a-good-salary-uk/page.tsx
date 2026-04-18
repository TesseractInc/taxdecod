import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import { formatCurrency } from "../../../lib/tax/utils/currency";
import { getSalaryPageData } from "../../../components/seo/salary-pages";
import { TAX_YEAR_LABEL } from "../../../lib/tax/config";

const salary = 30000;

export const metadata: Metadata = {
  title: "Is £30,000 a good salary in the UK? | TaxDecod",
  description:
    "Is £30k a good salary in the UK? See take-home pay, monthly income, and what £30,000 actually means in real life.",
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
            Is £30,000 a good salary in the UK?
          </h1>

          <div className="mt-6">
            <TaxYearTrustBar
              description={`Based on ${TAX_YEAR_LABEL} UK salary assumptions.`}
              points={["Entry-level benchmark", "After-tax focused", "Real-world context"]}
            />
          </div>

          <p className="mt-8 app-copy">
            A £30,000 salary typically results in around{" "}
            <strong>{formatCurrency(monthly)}</strong> per month after tax.
          </p>

          <h2 className="mt-10 text-2xl font-semibold app-title">
            Is £30k enough?
          </h2>

          <p className="mt-4 app-copy">
            It depends heavily on location. Outside London, £30k can support a
            basic but stable lifestyle. In London, it can feel tight unless
            housing costs are shared.
          </p>

          <h2 className="mt-10 text-2xl font-semibold app-title">
            Who £30k is good for
          </h2>

          <ul className="mt-4 list-disc pl-5 space-y-2 app-copy">
            <li>Early career professionals</li>
            <li>Graduates</li>
            <li>People sharing accommodation</li>
          </ul>

          <div className="mt-10 space-y-3">
            <Link href="/30000-after-tax-uk" className="app-link">
              → Full breakdown
            </Link>
            <Link href="/compare/30000-vs-40000-after-tax" className="app-link">
              → Compare £30k vs £40k
            </Link>
            <Link href="/good-salary/30000/manchester" className="app-link">
              → £30k in Manchester
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}