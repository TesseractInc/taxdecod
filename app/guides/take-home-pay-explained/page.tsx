import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "Take-Home Pay Explained | TaxDecod",
  description:
    "A plain-English guide to take-home pay, what it really means, and why it matters more than gross salary for real monthly decisions.",
};

const meaningCards = [
  {
    title: "Take-home pay is the money you actually keep",
    body: "It is the amount left after tax and other deductions. This is the number that really matters in everyday life.",
  },
  {
    title: "It is more useful than gross salary",
    body: "Gross salary sounds impressive, but take-home pay is what determines affordability, budgeting, and whether a raise feels worth it.",
  },
  {
    title: "It changes by deduction setup",
    body: "The same gross salary can produce different take-home results depending on pension, student loan, tax code, and payroll context.",
  },
  {
    title: "It is the number real life runs on",
    body: "Rent, bills, transport, food, savings, and debt repayment all come from take-home pay, not the headline gross figure.",
  },
];

const misunderstandingCards = [
  {
    title: "“Take-home pay is basically the same as salary”",
    body: "False. Salary is the gross number. Take-home pay is what remains after deductions.",
  },
  {
    title: "“If I know my tax band, I know my take-home”",
    body: "False. National Insurance, pension, student loan, and tax-code issues can all materially change the final result.",
  },
  {
    title: "“A raise should be judged by annual gross only”",
    body: "False. The retained monthly difference is usually the more useful number.",
  },
  {
    title: "“Take-home pay only matters for low salaries”",
    body: "False. It matters at every income level because it is the number that affects actual life, not salary prestige.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "What is take-home pay?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Take-home pay is the money left after deductions like Income Tax, National Insurance, pension, and student loan are taken off your salary.",
    },
  },
  {
    "@type": "Question",
    name: "Why is take-home pay more useful than gross salary?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because take-home pay is the amount that actually reaches your bank account and supports budgeting, affordability, and salary decisions.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Take-Home Pay Explained",
    description:
      "A plain-English guide to take-home pay, what it really means, and why it matters more than gross salary for real monthly decisions.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
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
            Take-home pay explained
          </h1>

          <p className="mt-4 app-copy">
            Take-home pay is the number that actually matters once salary stops
            being theory and becomes real life.
          </p>

          <p className="mt-4 app-copy">
            Gross salary matters for headlines, negotiation, and status. But
            take-home pay is what determines whether the salary really works month to month.
          </p>

          <SnippetBlock
            question="What is take-home pay?"
            answer="Take-home pay is the money left after deductions like Income Tax, National Insurance, pension, and student loan are taken off your salary. It is the amount that actually reaches your bank account."
            bullets={[
              "Take-home pay is your real usable pay",
              "It is lower than gross salary because of deductions",
              "It matters more than headline salary for monthly life",
              "It is usually the best number for real salary decisions",
            ]}
          />

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {meaningCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-base font-semibold app-title">{card.title}</p>
                <p className="mt-3 text-sm leading-7 app-copy">{card.body}</p>
              </div>
            ))}
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why take-home pay matters more than people think
            </h2>

            <p className="mt-4 app-copy">
              In practical terms, take-home pay decides:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• what rent feels affordable</li>
              <li>• how much room is left after bills</li>
              <li>• how quickly you can save</li>
              <li>• whether a raise changes real life enough</li>
              <li>• whether a new role is actually better</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why users often feel disappointed when they focus on gross
              salary and ignore the monthly net result.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why take-home pay is lower than gross salary
            </h2>

            <p className="mt-4 app-copy">
              Take-home pay is reduced by deductions such as:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• Income Tax</li>
              <li>• National Insurance</li>
              <li>• pension contributions</li>
              <li>• student loan repayment</li>
              <li>• salary sacrifice and payroll-specific setups</li>
            </ul>

            <p className="mt-5 app-copy">
              This is why the same gross salary can feel very different depending
              on the person’s payroll setup and deductions.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why take-home pay matters in salary comparisons
            </h2>

            <p className="mt-4 app-copy">
              A common mistake is comparing salaries by gross number only.
            </p>

            <p className="mt-4 app-copy">
              In real life, two roles should usually be compared by:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• monthly take-home difference</li>
              <li>• not just the annual gross gap</li>
              <li>• and not just what the offer sounds like on paper</li>
            </ul>

            <p className="mt-5 app-copy">
              That is where take-home pay becomes the more intelligent decision number.
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Common misunderstandings
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {misunderstandingCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[24px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <p className="text-base font-semibold app-title">{card.title}</p>
                  <p className="mt-3 text-sm leading-7 app-copy">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              What should you do next?
            </h2>

            <p className="mt-4 app-copy">
              Once you understand what take-home pay really is, the best next
              move is usually to check it properly or compare it against another route.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/calculator"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Use the salary calculator
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want a clear take-home result from a gross salary.
                </p>
              </Link>

              <Link
                href="/compare-salary"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Compare two salary routes
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the real decision is whether a raise or new role is worth it.
                </p>
              </Link>

              <Link
                href="/reverse-tax"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Reverse from a target monthly amount
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you care about the monthly figure you want to keep.
                </p>
              </Link>

              <Link
                href="/guides/net-vs-gross-salary-explained"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Read net vs gross salary explained
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the difference between headline and real pay clarified first.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "UK salary calculator", href: "/calculator" },
              { title: "Compare two salaries", href: "/compare-salary" },
              { title: "Reverse salary calculator", href: "/reverse-tax" },
              {
                title: "Net vs gross salary explained",
                href: "/guides/net-vs-gross-salary-explained",
              },
              {
                title: "How much tax do I pay in the UK?",
                href: "/guides/how-much-tax-do-i-pay-uk",
              },
              {
                title: "How much salary increase is worth it?",
                href: "/guides/how-much-salary-increase-is-worth-it",
              },
            ]}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}