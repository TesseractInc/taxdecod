import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import { getSalaryPageData } from "../../../components/seo/salary-pages";
import { formatCurrency } from "../../../lib/tax/utils/currency";
import { TAX_YEAR_LABEL } from "../../../lib/tax/config";

const salary = 60000;

export const metadata: Metadata = {
  title: "How much tax do you pay on £60,000 in the UK? | TaxDecod",
  description:
    "Find out how much tax you pay on a £60,000 salary in the UK including income tax, national insurance, and take-home pay.",
};

export default function Page() {
  const data = getSalaryPageData(salary);

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold app-title sm:text-5xl">
            How much tax do you pay on £60,000?
          </h1>

          <div className="mt-6">
            <TaxYearTrustBar
              description={`Based on ${TAX_YEAR_LABEL} UK tax rules.`}
              points={["Income tax", "National insurance", "Estimated results"]}
            />
          </div>

          <p className="mt-8 app-copy">
            On a £60,000 salary, you will typically pay:
          </p>

          <ul className="mt-6 space-y-2 app-copy">
            <li>Income tax: {formatCurrency(data.result.incomeTaxAnnual)}</li>
            <li>National Insurance: {formatCurrency(data.result.nationalInsuranceAnnual)}</li>
          </ul>

          <p className="mt-6 app-copy">
            Your take-home pay is approximately{" "}
            <strong>{formatCurrency(data.result.netAnnual)}</strong> per year.
          </p>

          <div className="mt-10 space-y-3">
            <Link href="/60000-after-tax-uk" className="app-link">
              → Full salary breakdown
            </Link>
            <Link href="/compare/50000-vs-60000-after-tax" className="app-link">
              → Compare salaries
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}