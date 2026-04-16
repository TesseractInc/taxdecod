import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";

import PaternityPayCalculator from "components/paternity/PaternityPayCalculator";

export const metadata: Metadata = {
  title: "Paternity Pay Calculator UK | TaxDecod",
  description:
    "Estimate statutory paternity pay in the UK based on your weekly earnings.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-bold app-title">
            Paternity Pay Calculator (UK)
          </h1>

          <p className="mt-3 app-copy max-w-2xl">
            Estimate how much statutory paternity pay you may receive.
          </p>

          <div className="mt-10">
            <PaternityPayCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}