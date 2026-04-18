import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "Net vs Gross Salary Explained | TaxDecod",
  description:
    "Understand the difference between net salary and gross salary, and why the money you keep matters more than the headline pay figure.",
};

const comparisonCards = [
  {
    title: "Gross salary",
    body: "The salary before Income Tax, National Insurance, pension, student loan, and other deductions are taken off.",
  },
  {
    title: "Net salary",
    body: "The money left after deductions. This is the amount that actually matters for monthly life and budgeting.",
  },
];

const examples = [
  {
    title: "A job advert",
    body: "Most job adverts show gross salary, not what you will actually receive in your bank account.",
  },
  {
    title: "A pay rise",
    body: "A raise increases gross pay, but the retained monthly gain is often smaller than many users expect.",
  },
  {
    title: "A monthly budget",
    body: "Rent, bills, travel, debt, and savings are paid from net income, not gross salary.",
  },
  {
    title: "A salary comparison",
    body: "Two salaries can look far apart gross, but much closer once deductions are applied.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "What is the difference between gross salary and net salary?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Gross salary is pay before deductions. Net salary is the money left after deductions like Income Tax, National Insurance, pension, and student loan are taken off.",
    },
  },
  {
    "@type": "Question",
    name: "Why does gross salary matter less than net salary for real life?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because real-life spending, budgeting, and salary decisions depend on the amount actually received after deductions, not the headline gross pay figure.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Net vs Gross Salary Explained",
    description:
      "Understand the difference between net salary and gross salary, and why the money you keep matters more than the headline pay figure.",
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
            Net vs gross salary explained
          </h1>

          <p className="mt-4 app-copy">
            Gross salary is the number people talk about. Net salary is the
            number people actually live on.
          </p>

          <p className="mt-4 app-copy">
            That is the simplest and most useful way to understand the difference.
          </p>

          <SnippetBlock
            question="What is the difference between gross and net salary?"
            answer="Gross salary is pay before deductions. Net salary is what remains after Income Tax, National Insurance, pension, student loan, and other deductions are taken off."
            bullets={[
              "Gross salary is the headline pay figure",
              "Net salary is what reaches your bank account",
              "Real-life budgeting happens from net pay, not gross pay",
              "Salary decisions should usually be judged by net outcome",
            ]}
          />

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {comparisonCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-lg font-semibold app-title">{card.title}</p>
                <p className="mt-3 text-sm leading-7 app-copy">{card.body}</p>
              </div>
            ))}
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why gross salary is the number people over-trust
            </h2>

            <p className="mt-4 app-copy">
              Gross salary is useful for job adverts, negotiation, and comparing
              headline packages. But it is not the number that tells you what
              monthly life actually feels like.
            </p>

            <p className="mt-4 app-copy">
              The reason is simple: deductions sit between the gross figure and
              the money you actually receive.
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• Income Tax</li>
              <li>• National Insurance</li>
              <li>• pension contributions</li>
              <li>• student loan deductions</li>
              <li>• salary sacrifice or payroll variations</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why net salary is the more important number
            </h2>

            <p className="mt-4 app-copy">
              Net salary is what determines:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• how much rent you can comfortably afford</li>
              <li>• how much room you have after bills</li>
              <li>• whether a raise feels meaningful</li>
              <li>• whether a job change actually improves life</li>
              <li>• whether your monthly target is realistic</li>
            </ul>

            <p className="mt-5 app-copy">
              If your real question is about life, planning, or affordability,
              net salary is usually the number that matters more.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Real-world examples
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {examples.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <p className="text-base font-semibold app-title">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 app-copy">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why this matters in salary decisions
            </h2>

            <p className="mt-4 app-copy">
              A common mistake is thinking:
            </p>

            <p className="mt-4 app-copy">
              “£50,000 is clearly much better than £40,000.”
            </p>

            <p className="mt-4 app-copy">
              In gross terms, yes. But in real life, the decision should be
              judged by:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• the extra monthly net pay</li>
              <li>• the extra stress or workload</li>
              <li>• commute and role quality</li>
              <li>• how much of the raise is lost to deductions</li>
            </ul>

            <p className="mt-5 app-copy">
              That is exactly why users need net-vs-gross clarity before making
              salary decisions.
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Common misunderstandings
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-base font-semibold app-title">
                  “Gross salary tells me whether the role is worth it”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Not fully. A role should usually be judged by net outcome and
                  real-life trade-offs, not headline pay alone.
                </p>
              </div>

              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-base font-semibold app-title">
                  “Net and gross are basically close enough”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Often false. The gap can be large enough to materially change
                  how a salary feels month to month.
                </p>
              </div>

              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-base font-semibold app-title">
                  “Only very high salaries need net-vs-gross thinking”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  False. This matters at every level, especially when users are
                  budgeting tightly or comparing offers.
                </p>
              </div>

              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-base font-semibold app-title">
                  “A raise always feels like the gross increase”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  False. The retained monthly difference is usually the more
                  useful way to judge a raise.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Best next steps
            </h2>

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
                  Best when you want a clear net result from a gross salary.
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
                  Compare two salaries
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the real question is whether a raise is worth it after deductions.
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
                  Reverse from target take-home
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you care about the monthly amount you want to keep.
                </p>
              </Link>

              <Link
                href="/guides/take-home-pay-explained"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Read take-home pay explained
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the wider salary reality in plain English.
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
                title: "Take-home pay explained",
                href: "/guides/take-home-pay-explained",
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