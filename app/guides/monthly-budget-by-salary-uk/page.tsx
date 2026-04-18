import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "Monthly Budget by Salary in the UK | TaxDecod",
  description:
    "A plain-English guide to planning a monthly budget by salary in the UK, with take-home thinking, budgeting logic, and salary planning routes.",
};

const budgetCards = [
  {
    title: "Start from take-home, not gross salary",
    body: "A monthly budget only becomes useful when it is built from the money that actually reaches your bank account after deductions.",
  },
  {
    title: "Housing usually decides the whole budget",
    body: "The salary can look fine on paper, but rent or mortgage cost usually determines whether the budget feels manageable or constantly tight.",
  },
  {
    title: "The same salary can support very different budgets",
    body: "Budget flexibility changes massively depending on city, house share versus solo rent, transport cost, and debt pressure.",
  },
  {
    title: "Salary planning is really budget planning",
    body: "Many users do not actually want a bigger salary number. They want a monthly result that gives more breathing room.",
  },
];

const budgetLayers = [
  {
    title: "Essentials",
    body: "Rent, bills, council tax, food, transport, phone, and basic recurring costs.",
  },
  {
    title: "Financial stability",
    body: "Debt repayment, emergency savings, pension awareness, and avoiding constant month-end pressure.",
  },
  {
    title: "Flexibility",
    body: "Eating out, social spending, travel, subscriptions, gifts, and occasional lifestyle costs.",
  },
  {
    title: "Future progress",
    body: "Saving toward bigger goals, reducing dependency on each payslip, and creating room for better decisions.",
  },
];

const misconceptionCards = [
  {
    title: "“I can budget from my gross salary”",
    body: "False. Real budgeting should start from take-home pay, not the headline salary figure.",
  },
  {
    title: "“A higher salary automatically means an easy budget”",
    body: "False. Housing cost, deductions, and location can absorb far more of the salary than expected.",
  },
  {
    title: "“Budgeting is only for low salaries”",
    body: "False. Monthly planning matters at every level because take-home efficiency matters at every level.",
  },
  {
    title: "“If my salary sounds good, my budget should be fine”",
    body: "False. The monthly result may still feel tighter than expected once deductions and living costs are included.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "How do I build a monthly budget by salary in the UK?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Start from take-home pay, not gross salary. Then split the monthly result across essentials, financial stability, flexibility, and longer-term progress.",
    },
  },
  {
    "@type": "Question",
    name: "Why should budgeting start from take-home pay?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because gross salary is not the money available to spend. Budgeting should be built from the amount left after deductions.",
    },
  },
  {
    "@type": "Question",
    name: "Why can the same salary support very different budgets?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because location, rent, transport, debt, student loan, pension contributions, and household setup can all materially change how comfortable the monthly result feels.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Monthly Budget by Salary in the UK",
    description:
      "A plain-English guide to planning a monthly budget by salary in the UK, with take-home thinking, budgeting logic, and salary planning routes.",
    mainEntityOfPage:
      "https://taxdecod.com/guides/monthly-budget-by-salary-uk",
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
            Monthly budget by salary in the UK
          </h1>

          <p className="mt-4 app-copy">
            The strongest way to budget by salary is to ignore the headline
            number at first and start from what you actually keep each month.
          </p>

          <p className="mt-4 app-copy">
            A gross salary can sound strong, but a monthly budget only becomes
            useful when it is built around take-home pay, housing cost, and the
            real pressure points of daily life.
          </p>

          <SnippetBlock
            question="How do I build a monthly budget by salary?"
            answer="Build the budget from take-home pay, not gross salary. Start with essentials first, then financial stability, then lifestyle flexibility, and only then longer-term progress goals."
            bullets={[
              "Start from take-home, not gross pay",
              "Housing usually shapes the whole budget",
              "Budget pressure changes a lot by location",
              "Salary planning is really monthly-life planning",
            ]}
          />

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {budgetCards.map((card) => (
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
              A simple way to think about monthly budgeting
            </h2>

            <p className="mt-4 app-copy">
              A good monthly budget is not just a spreadsheet exercise. It is a
              practical map of what your salary needs to do for you.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {budgetLayers.map((item) => (
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
              Why salary alone is not enough
            </h2>

            <p className="mt-4 app-copy">
              The same salary can support a very different monthly budget
              depending on:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• whether you live in London or elsewhere</li>
              <li>• whether you rent alone or house share</li>
              <li>• whether you have student loan deductions</li>
              <li>• whether you pay a larger pension contribution</li>
              <li>• whether transport costs are light or heavy</li>
              <li>• whether debt repayments are already eating into net pay</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why a “monthly budget by salary” guide should never be read
              like a fixed rule. It is a planning framework, not a universal answer.
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Common bad assumptions
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {misconceptionCards.map((item) => (
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
              The smartest next steps
            </h2>

            <p className="mt-4 app-copy">
              If you are trying to budget properly, the strongest next move is
              usually to calculate the monthly take-home result or reverse-plan
              the monthly figure you actually want.
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
                  Best when you want the real monthly take-home result from a salary.
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
                  Reverse from a monthly target
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you know the monthly amount you want your budget to support.
                </p>
              </Link>

              <Link
                href="/monthly-take-home/2500"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Explore monthly take-home routes
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want planning pages built around monthly life, not gross salary alone.
                </p>
              </Link>

              <Link
                href="/guides/how-much-salary-to-take-home-3000"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Read the £3,000 take-home guide
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the planning goal is a stronger monthly benchmark.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "UK salary calculator", href: "/calculator" },
              { title: "Reverse salary calculator", href: "/reverse-tax" },
              { title: "Monthly take-home routes", href: "/monthly-take-home/2500" },
              {
                title: "How much salary to take home £3,000",
                href: "/guides/how-much-salary-to-take-home-3000",
              },
              {
                title: "Take-home pay explained",
                href: "/guides/take-home-pay-explained",
              },
              {
                title: "What is a good salary in the UK?",
                href: "/guides/what-is-a-good-salary-uk",
              },
            ]}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}