import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "What Is a Good Salary in the UK? | TaxDecod",
  description:
    "A plain-English guide to what counts as a good salary in the UK, why the answer depends on take-home pay and location, and how to judge salary properly.",
};

const realityCards = [
  {
    title: "There is no single UK-wide magic number",
    body: "A good salary in the UK depends on city, rent, household setup, commute, debt, and what monthly life you are trying to support.",
  },
  {
    title: "Take-home matters more than the headline",
    body: "A salary only becomes useful once you know what it actually leaves you with after tax and deductions.",
  },
  {
    title: "A salary can be good in one place and weak in another",
    body: "The same gross salary can feel very different in London compared with cheaper regions once housing and everyday costs are considered.",
  },
  {
    title: "A good salary is a decision number, not just a prestige number",
    body: "The real question is usually whether the salary supports your lifestyle, not whether it sounds impressive in conversation.",
  },
];

const usefulRanges = [
  {
    title: "Around £20k–£25k",
    body: "Usually a tighter affordability range where the real question is whether essentials are manageable once deductions and rent are accounted for.",
  },
  {
    title: "Around £30k–£40k",
    body: "Often where many users first feel a salary becoming properly workable, but comfort still depends heavily on location and deductions.",
  },
  {
    title: "Around £40k–£50k",
    body: "Often seen as strong in many UK contexts, but still needs judging by monthly retained value, not gross status alone.",
  },
  {
    title: "Above £50k",
    body: "Usually strong in many parts of the UK, but the useful question becomes how efficiently extra salary is converting into take-home after deductions.",
  },
];

const misconceptionCards = [
  {
    title: "“A good salary means the same thing everywhere in the UK”",
    body: "False. City, housing costs, transport, and local lifestyle pressure change the answer a lot.",
  },
  {
    title: "“If the gross number sounds good, it is good”",
    body: "False. Gross salary can sound strong while take-home still feels weaker than expected.",
  },
  {
    title: "“A good salary is only about tax”",
    body: "False. A good salary is about what remains after deductions and whether that monthly result supports the life you want.",
  },
  {
    title: "“The answer is one number”",
    body: "False. The stronger way to judge salary is by affordability, take-home, and comparison against local or role context.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "What is a good salary in the UK?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "A good salary in the UK depends on take-home pay, location, housing cost, deductions, and what lifestyle the salary needs to support. There is no single magic number that fits everyone.",
    },
  },
  {
    "@type": "Question",
    name: "Is a good salary judged by gross salary or take-home pay?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Take-home pay is usually the more useful number because that is what actually supports monthly life after deductions.",
    },
  },
  {
    "@type": "Question",
    name: "Why does location change whether a salary is good?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because rent, transport, and daily living costs vary a lot across the UK, especially between London and lower-cost regions.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is a Good Salary in the UK?",
    description:
      "A plain-English guide to what counts as a good salary in the UK, why the answer depends on take-home pay and location, and how to judge salary properly.",
    mainEntityOfPage: "https://taxdecod.com/guides/what-is-a-good-salary-uk",
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
            What is a good salary in the UK?
          </h1>

          <p className="mt-4 app-copy">
            A good salary in the UK is not one fixed number.
          </p>

          <p className="mt-4 app-copy">
            The honest answer depends on what the salary actually leaves you
            with, where you live, what you pay for housing, and what kind of
            monthly life you are trying to support.
          </p>

          <SnippetBlock
            question="What is a good salary in the UK?"
            answer="A good salary in the UK depends on take-home pay, deductions, location, housing costs, and what lifestyle the salary needs to support. In practice, the stronger question is not just “what is the gross salary?” but “what does it really leave me with each month?”"
            bullets={[
              "There is no single UK-wide magic number",
              "Take-home pay matters more than headline gross alone",
              "Location can completely change the answer",
              "A good salary should be judged by monthly life, not just prestige",
            ]}
          />

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {realityCards.map((card) => (
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
              Why the question is harder than it sounds
            </h2>

            <p className="mt-4 app-copy">
              Many people ask this expecting a simple number like:
            </p>

            <p className="mt-4 app-copy">“£40k is good.”</p>

            <p className="mt-4 app-copy">or</p>

            <p className="mt-2 app-copy">“£50k is good.”</p>

            <p className="mt-4 app-copy">
              But the stronger way to judge salary is to ask:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• what is the take-home pay?</li>
              <li>• how expensive is the area I live in?</li>
              <li>• how much rent or mortgage am I carrying?</li>
              <li>• do I have pension or student loan deductions?</li>
              <li>• what standard of living am I trying to support?</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why TaxDecod treats salary as a decision-support question,
              not just a headline-number question.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Rough salary ranges people often think about
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {usefulRanges.map((item) => (
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
              Why take-home pay is the better judging number
            </h2>

            <p className="mt-4 app-copy">
              Gross salary can be useful for job adverts and negotiation.
            </p>

            <p className="mt-4 app-copy">
              But when users ask whether a salary is “good,” they usually mean:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• will this feel comfortable month to month?</li>
              <li>• will I have enough after rent and bills?</li>
              <li>• will I be able to save properly?</li>
              <li>• will this be enough in my city?</li>
            </ul>

            <p className="mt-5 app-copy">
              Those are take-home questions, not gross-salary questions.
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Common bad assumptions
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {misconceptionCards.map((card) => (
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
              The strongest next steps
            </h2>

            <p className="mt-4 app-copy">
              If you are seriously judging whether a salary is good, the best
              next move is usually not more abstract theory. It is checking the
              actual after-tax result or putting the salary into local context.
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
                  Best when you want to see what a gross salary actually leaves you with.
                </p>
              </Link>

              <Link
                href="/benchmarks"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Explore salary benchmarks
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want role and region context, not just tax output.
                </p>
              </Link>

              <Link
                href="/good-salary/40000/london"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Use a good-salary route
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want city-based interpretation instead of a generic answer.
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
                  Best when the real decision is whether the next salary is meaningfully better.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "UK salary calculator", href: "/calculator" },
              { title: "Salary benchmarks", href: "/benchmarks" },
              { title: "Compare two salaries", href: "/compare-salary" },
              { title: "Salary hub", href: "/salary-hub" },
              {
                title: "Is £40k a good salary in the UK?",
                href: "/guides/is-40k-a-good-salary-uk",
              },
              {
                title: "Is £50k a good salary in the UK?",
                href: "/guides/is-50k-a-good-salary-uk",
              },
            ]}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}