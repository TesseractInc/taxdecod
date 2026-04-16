import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";

export const metadata: Metadata = {
  title: "UK Tax Bands Explained | TaxDecod",
  description:
    "Simple explanation of UK tax bands and how they affect your salary.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container className="max-w-4xl">

          <h1 className="text-3xl font-bold app-title sm:text-4xl">
            UK tax bands explained simply
          </h1>

          <p className="mt-4 app-copy">
            Tax bands determine how much tax you pay on each portion of your income.
          </p>

          <RelatedLinks
            links={[
              { title: "Calculate salary after tax", href: "/calculator" },
              { title: "How much tax do I pay", href: "/guides/how-much-tax-do-i-pay-uk" },
            ]}
          />

        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}