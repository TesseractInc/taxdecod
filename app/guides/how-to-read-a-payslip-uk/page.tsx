import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How to Read a Payslip in the UK | TaxDecod",
  description:
    "Learn how to read a UK payslip, including gross pay, tax, National Insurance, and year-to-date figures.",
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Read a Payslip in the UK",
    description:
      "Learn how to read a UK payslip, including gross pay, tax, National Insurance, and year-to-date figures.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you read a UK payslip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A UK payslip shows your gross pay, deductions such as Income Tax and National Insurance, and your final net pay. It also usually includes tax code and year-to-date figures.",
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
            How to read a payslip in the UK
          </h1>

          <SnippetBlock
            question="How do you read a UK payslip?"
            answer="A UK payslip shows your gross pay, deductions such as Income Tax and National Insurance, and your final net pay. It also usually includes pension, tax code, and year-to-date totals."
            bullets={[
              "Gross pay is your earnings before deductions",
              "Deductions include tax, NI, and sometimes pension",
              "Net pay is what you actually receive",
              "Year-to-date figures help show the wider pattern",
            ]}
          />

          <p className="mt-6 app-copy">
            A payslip shows how your salary turns into net pay after deductions,
            but many people only look at the final number and miss the lines
            that explain what is really happening.
          </p>

          <AdSlot label="Advertisement" />

          <h2 className="mt-10 text-xl font-semibold app-title">
            The most important payslip lines
          </h2>

          <ul className="mt-4 space-y-2 app-copy">
            <li>• Gross pay</li>
            <li>• Income Tax</li>
            <li>• National Insurance</li>
            <li>• Pension contributions</li>
            <li>• Net pay</li>
            <li>• Tax code</li>
            <li>• Year-to-date totals</li>
          </ul>

          <h2 className="mt-10 text-xl font-semibold app-title">
            Why year-to-date totals matter
          </h2>

          <p className="mt-4 app-copy">
            These numbers help you see whether deductions across the tax year
            look broadly normal, especially if one month feels unusual.
          </p>

          <RelatedLinks
            links={[
              { title: "Use the payslip checker", href: "/payslip-checker" },
              { title: "Decode a tax code", href: "/tax-code-decoder" },
              { title: "Check salary after tax", href: "/calculator" },
              {
                title: "How much tax do I pay in the UK?",
                href: "/guides/how-much-tax-do-i-pay-uk",
              },
            ]}
          />

          <p className="mt-8 text-xs app-subtle">
            A payslip should be read as a full salary record, not just a net pay
            line.
          </p>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}