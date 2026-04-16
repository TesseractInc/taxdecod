import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";

export const metadata: Metadata = {
  title: "Take Home Pay Explained | TaxDecod",
  description:
    "Understand what take-home pay means and how it is calculated in the UK.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container className="max-w-4xl">

          <h1 className="text-3xl font-bold app-title sm:text-4xl">
            What is take-home pay?
          </h1>

          <p className="mt-4 app-copy">
            Take-home pay is your income after all deductions including tax and National Insurance.
          </p>

          <RelatedLinks
            links={[
              { title: "Salary calculator", href: "/calculator" },
              { title: "Net vs gross salary", href: "/guides/net-vs-gross-salary-explained" },
            ]}
          />

        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}