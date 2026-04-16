import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "What Is a Good Salary in the UK? | TaxDecod",
  description:
    "Understand what counts as a good salary in the UK based on take-home pay, cost of living, and monthly reality.",
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is a Good Salary in the UK?",
    description:
      "Understand what counts as a good salary in the UK based on take-home pay, cost of living, and monthly reality.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a good salary in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A good salary in the UK depends on your location, living costs, and deductions, but many people judge it by monthly take-home pay rather than gross salary alone.",
        },
      },
    ],
  };

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container className="max-w-4xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />

          <h1 className="text-3xl font-bold app-title sm:text-4xl">
            What is a good salary in the UK?
          </h1>

          <SnippetBlock
            question="What is a good salary in the UK?"
            answer="A good salary in the UK depends on where you live, your monthly costs, and what you actually take home after deductions. In practice, take-home pay matters more than the gross annual number."
            bullets={[
              "Rent and location change what feels comfortable",
              "Take-home pay matters more than salary headlines",
              "Student loan and pension deductions affect monthly reality",
              "A strong salary should create breathing room after essentials",
            ]}
          />

          <p className="mt-6 app-copy">
            A good salary in the UK depends less on the headline number and more
            on what you actually take home after tax, plus where you live and
            what your monthly costs look like.
          </p>

          <p className="mt-4 app-copy">
            For one person, £35,000 may feel strong. For another, especially in
            a high-rent city, it may feel much tighter than expected.
          </p>

          <AdSlot label="Advertisement" />

          <h2 className="mt-10 text-xl font-semibold app-title">
            Why there is no single answer
          </h2>

          <ul className="mt-4 space-y-2 app-copy">
            <li>• Take-home pay matters more than gross salary</li>
            <li>• Rent changes everything</li>
            <li>• Student loan and pension deductions matter</li>
            <li>• Lifestyle expectations are different for everyone</li>
          </ul>

          <h2 className="mt-10 text-xl font-semibold app-title">
            What matters most in practice
          </h2>

          <p className="mt-4 app-copy">
            A “good” salary is the one that covers essentials, allows some
            savings, and leaves enough breathing room each month. That is why
            comparing salaries after deductions is usually more useful than
            looking at gross salary alone.
          </p>

          <RelatedLinks
            links={[
              { title: "Check your salary after tax", href: "/calculator" },
              { title: "Compare salary outcomes", href: "/compare-salary" },
              {
                title: "Reverse from a target monthly income",
                href: "/reverse-tax",
              },
              {
                title: "Monthly budget by salary",
                href: "/guides/monthly-budget-by-salary-uk",
              },
            ]}
          />

          <p className="mt-8 text-xs app-subtle">
            Built around UK salary interpretation and take-home planning, not
            just gross salary headlines.
          </p>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}