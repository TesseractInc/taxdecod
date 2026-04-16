import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";

export const metadata: Metadata = {
  title: "How Much Tax Do I Pay Per Month UK | TaxDecod",
  description:
    "Understand how much tax you pay monthly in the UK.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container className="max-w-4xl">

          <h1 className="text-3xl font-bold app-title sm:text-4xl">
            How much tax do I pay per month?
          </h1>

          <p className="mt-4 app-copy">
            Monthly tax depends on your salary and deductions such as pension and student loans.
          </p>

          <RelatedLinks
            links={[
              { title: "Calculate monthly tax", href: "/calculator" },
              { title: "How tax works UK", href: "/guides/how-income-tax-works-uk" },
            ]}
          />

        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}