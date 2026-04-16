import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "Monthly Budget by Salary UK | TaxDecod",
  description:
    "Understand how to budget your monthly income in the UK based on your real take-home pay.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container className="max-w-4xl">

          <h1 className="text-3xl font-bold app-title sm:text-4xl">
            Monthly budget by salary in the UK
          </h1>

          <p className="mt-4 app-copy">
            Your monthly budget should be based on your take-home pay, not your gross salary.
          </p>

          <AdSlot label="Advertisement" />

          <h2 className="mt-10 text-xl font-semibold app-title">
            Typical spending breakdown
          </h2>

          <ul className="mt-4 app-copy space-y-2">
            <li>• Rent: 30–50%</li>
            <li>• Food: 10–15%</li>
            <li>• Transport: 5–10%</li>
            <li>• Savings: 10–20%</li>
          </ul>

          <RelatedLinks
            links={[
              { title: "Calculate your take-home pay", href: "/calculator" },
              { title: "What is a good salary UK", href: "/guides/what-is-a-good-salary-uk" },
              { title: "Compare salaries", href: "/compare-salary" },
              { title: "Reverse salary planning", href: "/reverse-tax" },
            ]}
          />

        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}