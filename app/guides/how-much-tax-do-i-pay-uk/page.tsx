import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How Much Tax Do I Pay in the UK? | TaxDecod",
  description:
    "Understand how much income tax and National Insurance you pay in the UK, and what really affects your take-home pay.",
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Tax Do I Pay in the UK?",
    description:
      "Understand how much income tax and National Insurance you pay in the UK, and what really affects your take-home pay.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much tax do I pay in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In the UK, most employees pay Income Tax and National Insurance. The exact amount depends on salary, tax code, pension contributions, and student loan deductions.",
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
            How much tax do I pay in the UK?
          </h1>

          <SnippetBlock
            question="How much tax do I pay in the UK?"
            answer="In the UK, most people pay Income Tax and National Insurance on earnings above key thresholds. Your actual take-home pay depends on salary, pension contributions, student loan repayments, and your tax code."
            bullets={[
              "Income Tax usually starts above £12,570",
              "National Insurance also reduces take-home pay",
              "Pension and student loan deductions can materially change the result",
              "Take-home pay matters more than tax band alone",
            ]}
          />

          <p className="mt-6 app-copy">
            Most UK employees pay Income Tax and National Insurance. Depending
            on your salary, tax code, pension contributions, and student loan
            plan, your take-home pay can vary more than many people expect.
          </p>

          <p className="mt-4 app-copy">
            That is why the real question is usually not just “what tax band am
            I in?” but “what actually reaches my bank account each month?”
          </p>

          <AdSlot label="Advertisement" />

          <h2 className="mt-10 text-xl font-semibold app-title">
            The main deductions from salary
          </h2>

          <ul className="mt-4 space-y-2 app-copy">
            <li>• Income Tax</li>
            <li>• National Insurance</li>
            <li>• Pension contributions</li>
            <li>• Student loan repayments where applicable</li>
          </ul>

          <h2 className="mt-10 text-xl font-semibold app-title">
            Why tax feels confusing
          </h2>

          <p className="mt-4 app-copy">
            Many people expect one flat percentage, but UK salary deductions are
            layered. Income Tax and National Insurance do not work in exactly
            the same way, and your final take-home can also change because of
            pension and student loan deductions.
          </p>

          <h2 className="mt-10 text-xl font-semibold app-title">
            The practical way to understand it
          </h2>

          <p className="mt-4 app-copy">
            The easiest way to understand tax is to calculate your real
            take-home pay using your salary and deduction setup. That gives you
            a much more useful answer than looking at tax bands alone.
          </p>

          <RelatedLinks
            links={[
              { title: "Use the UK salary calculator", href: "/calculator" },
              {
                title: "Compare two salaries after tax",
                href: "/compare-salary",
              },
              { title: "Check a payslip", href: "/payslip-checker" },
              {
                title: "Net vs gross salary explained",
                href: "/guides/net-vs-gross-salary-explained",
              },
            ]}
          />

          <p className="mt-8 text-xs app-subtle">
            Based on UK tax rules and HMRC-style guidance. Estimates are for
            planning purposes only.
          </p>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}