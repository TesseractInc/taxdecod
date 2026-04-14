import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import OvertimeTaxCalculator from "components/tools/overtime-tax-calculator";

export default function OvertimeCalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Specialist tool
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Overtime after tax calculator
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
              Estimate how much overtime really adds after deductions and whether
              the extra hours are worth the net outcome.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description="This overtime route is designed for salary interpretation and extra-hours decision support. It should be read as estimate-based guidance rather than payroll advice."
              points={[
                "Updated for 2025/26 salary interpretation",
                "Estimate-based outputs, not financial advice",
                "Useful for overtime value and pay-efficiency checks",
              ]}
            />
          </div>

          <div className="mt-10">
            <OvertimeTaxCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}