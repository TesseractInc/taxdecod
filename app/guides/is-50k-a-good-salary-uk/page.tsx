import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";

export const metadata: Metadata = {
  title: "Is 50k a Good Salary UK | TaxDecod",
  description:
    "Find out if £50,000 is a good salary in the UK.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container className="max-w-4xl">

          <h1 className="text-3xl font-bold app-title sm:text-4xl">
            Is £50,000 a good salary in the UK?
          </h1>

          <p className="mt-4 app-copy">
            £50,000 is above the UK average and generally considered a strong salary.
          </p>

          <RelatedLinks
            links={[
              { title: "View £50k breakdown", href: "/50000-after-tax-uk" },
              { title: "Compare salaries", href: "/compare-salary" },
            ]}
          />

        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}