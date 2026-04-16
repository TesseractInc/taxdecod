import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";

import HolidayPayCalculator from "components/holiday/HolidayPayCalculator";

export const metadata: Metadata = {
  title: "Holiday Pay Calculator UK | TaxDecod",
  description:
    "Estimate holiday pay based on your weekly earnings and working pattern.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-bold app-title">
            Holiday Pay Calculator (UK)
          </h1>

          <p className="mt-3 app-copy max-w-2xl">
            Estimate your holiday pay using standard UK entitlement rules.
          </p>

          <div className="mt-10">
            <HolidayPayCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}