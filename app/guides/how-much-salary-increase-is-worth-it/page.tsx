import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How Much Salary Increase Is Worth It? | TaxDecod",
  description:
    "Understand how much of a pay rise you actually keep after tax and deductions in the UK.",
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Salary Increase Is Worth It?",
    description:
      "Understand how much of a pay rise you actually keep after tax and deductions in the UK.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is a salary increase worth it after tax?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A salary increase can still be worth it, but you will not keep all of it. Tax and other deductions reduce the real monthly gain, which is why net comparison matters more than gross salary alone.",
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
            How much salary increase is worth it?
          </h1>

          <SnippetBlock
            question="Is a salary increase worth it after tax?"
            answer="A salary increase can still be worth it, but you do not keep all of it. Tax, National Insurance, pension contributions, and student loan deductions reduce the real monthly gain."
            bullets={[
              "Gross increase is not the same as net increase",
              "Higher tax bands reduce how much you keep",
              "Monthly take-home difference matters most",
            ]}
          />

          <p className="mt-6 app-copy">
            A pay rise does not convert fully into take-home pay. Tax, National
            Insurance, pension contributions, and student loan deductions reduce
            how much of the increase you actually keep.
          </p>

          <AdSlot label="Advertisement" />

          <h2 className="mt-10 text-xl font-semibold app-title">
            Why raises feel smaller than expected
          </h2>

          <p className="mt-4 app-copy">
            The gross increase may look meaningful, but the monthly net
            difference can feel much smaller. That is why salary comparison
            after deductions is the smarter way to judge whether a raise is
            really worth it.
          </p>

          <RelatedLinks
            links={[
              {
                title: "Compare salary increases properly",
                href: "/compare-salary",
              },
              { title: "Check your take-home pay", href: "/calculator" },
              {
                title: "Net vs gross salary explained",
                href: "/guides/net-vs-gross-salary-explained",
              },
              {
                title: "Reverse from a target income",
                href: "/reverse-tax",
              },
            ]}
          />

          <p className="mt-8 text-xs app-subtle">
            The real value of a raise should always be judged after deductions.
          </p>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}