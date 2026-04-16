import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";

import MaternityPayCalculator from "components/maternity/MaternityPayCalculator";

export const metadata: Metadata = {
  title: "Maternity Pay Calculator UK (SMP) | TaxDecod",
  description:
    "Estimate Statutory Maternity Pay (SMP) in the UK based on your salary and weekly earnings.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-bold app-title">
            Maternity Pay Calculator (UK)
          </h1>

          <p className="mt-3 app-copy max-w-2xl">
            Estimate how much Statutory Maternity Pay (SMP) you may receive
            based on your weekly earnings.
          </p>

          <div className="mt-6">
            <TaxYearTrustBar
              description="Based on UK SMP rules (first 6 weeks at 90%, remaining weeks at statutory rate)."
              points={[
                "UK SMP rules",
                "Estimate-based calculation",
                "Weekly and total breakdown",
              ]}
            />
          </div>

          <div className="mt-10">
            <MaternityPayCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}