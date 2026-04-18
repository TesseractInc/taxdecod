import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import HmrcReferencePanel from "../../components/shared/hmrc-reference-panel";
import ReverseTaxCalculator from "../../components/reverse-tax/ReverseTaxCalculator";

export const metadata: Metadata = {
  title: "Reverse Salary Calculator | What Salary Do I Need? | TaxDecod",
  description:
    "Work backwards from a target monthly or yearly take-home amount to estimate the gross salary needed in the UK.",
};

export default function ReverseTaxPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] app-accent sm:text-sm">
              Reverse salary calculator
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight app-title sm:text-5xl">
              Work backwards from the income you actually want to keep
            </h1>

            <p className="mt-4 text-sm leading-7 app-copy sm:text-base sm:leading-8">
              Start with your target monthly or yearly take-home amount, then
              estimate the gross salary needed to reach it after deductions.
            </p>

            <p className="mt-3 text-xs app-subtle">
              Best for planning, job targeting, raise decisions, and translating
              monthly goals into a usable salary route.
            </p>
          </div>

          <div className="mt-10">
            <TaxYearTrustBar
              description="Reverse salary results are designed for planning and salary clarity. They should be read as estimate-based guidance rather than payroll, legal, or financial advice."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Estimate-based reverse salary logic",
                "Useful for planning and target-income decisions",
                "Methodology and assumptions visible",
              ]}
            />
          </div>

          <div className="mt-10">
            <HmrcReferencePanel
              compact
              title="Official references behind the trust layer"
              description="Where formal confirmation matters, reverse-planning results should be read alongside official GOV.UK guidance and real payroll records."
            />
          </div>

          <div className="mt-10">
            <ReverseTaxCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}