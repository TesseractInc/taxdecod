import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "Net vs Gross Salary Explained | TaxDecod",
  description:
    "Understand the difference between gross salary and net take-home pay in the UK.",
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Net vs Gross Salary Explained",
    description:
      "Understand the difference between gross salary and net take-home pay in the UK.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between net and gross salary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gross salary is your income before tax and deductions, while net salary is the amount you actually receive after tax, National Insurance, and other payroll deductions.",
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
            Net vs gross salary explained
          </h1>

          <SnippetBlock
            question="What is the difference between net and gross salary?"
            answer="Gross salary is your pay before tax and deductions. Net salary is what you actually receive after Income Tax, National Insurance, and any other payroll deductions have been taken off."
            bullets={[
              "Gross salary is the headline number",
              "Net salary is your real take-home pay",
              "Net pay is what funds your monthly life",
            ]}
          />

          <p className="mt-6 app-copy">
            Gross salary is your pay before deductions. Net salary is what you
            actually receive after tax, National Insurance, and any other
            payroll deductions.
          </p>

          <AdSlot label="Advertisement" />

          <h2 className="mt-10 text-xl font-semibold app-title">
            Why the difference matters
          </h2>

          <p className="mt-4 app-copy">
            Many people compare jobs using gross salary, but daily life is paid
            for with net salary. That is why take-home pay is usually the more
            useful number for real decisions.
          </p>

          <h2 className="mt-10 text-xl font-semibold app-title">
            The practical takeaway
          </h2>

          <p className="mt-4 app-copy">
            If you want to know whether a salary is strong, whether a raise is
            worth it, or whether a move makes sense, always compare net pay, not
            just gross salary.
          </p>

          <RelatedLinks
            links={[
              { title: "Calculate net salary", href: "/calculator" },
              { title: "Compare two salaries", href: "/compare-salary" },
              {
                title: "How much tax do I pay?",
                href: "/guides/how-much-tax-do-i-pay-uk",
              },
              {
                title: "How salary increases really work",
                href: "/guides/how-much-salary-increase-is-worth-it",
              },
            ]}
          />

          <p className="mt-8 text-xs app-subtle">
            Net salary is what funds your real monthly life.
          </p>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}