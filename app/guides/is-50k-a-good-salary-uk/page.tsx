import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "Is £50k a Good Salary in the UK? | TaxDecod",
  description:
    "A plain-English guide to whether £50k is a good salary in the UK, what it means after tax, and why the next salary jump still needs proper comparison.",
};

const strengthCards = [
  {
    title: "Why £50k is widely seen as strong",
    body: "In many parts of the UK, £50k is usually viewed as a strong salary because it often creates a noticeably better monthly position than the mid-range bands.",
  },
  {
    title: "Why £50k is still not a magic number",
    body: "Even though £50k sounds strong, the answer still depends on take-home pay, location, housing cost, and deductions.",
  },
  {
    title: "Why £50k changes the next question",
    body: "At this level, users often stop asking “is this good?” and start asking “is the next jump still worth it after tax?”",
  },
  {
    title: "Why city context still matters",
    body: "£50k can feel clearly strong outside high-cost areas, but in expensive cities it still deserves a more careful reading.",
  },
];

const contextCards = [
  {
    title: "Outside London",
    body: "£50k is often a strong salary in many lower-cost regions, especially when rent or mortgage costs are manageable.",
  },
  {
    title: "In London",
    body: "£50k can still be solid, but the margin often feels much less generous once rent and travel costs are included.",
  },
  {
    title: "With student loan",
    body: "The monthly result can still feel weaker than many users expect once repayment drag is included.",
  },
  {
    title: "Compared with £40k",
    body: "The jump is meaningful, but it should still be judged by retained monthly difference, not gross prestige alone.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "Is £50k a good salary in the UK?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "£50k is often a strong salary in many UK contexts, but the more useful answer still depends on take-home pay, location, housing cost, and deductions.",
    },
  },
  {
    "@type": "Question",
    name: "Is £50k a good salary in London?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "£50k can still be solid in London, but it usually needs a more cautious reading because housing and transport costs can absorb a large share of the monthly take-home result.",
    },
  },
  {
    "@type": "Question",
    name: "Should I compare £50k with nearby salary bands?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. Users often compare £50k against £40k, £60k, and nearby ranges to judge whether the next jump creates enough real monthly value after deductions.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Is £50k a Good Salary in the UK?",
    description:
      "A plain-English guide to whether £50k is a good salary in the UK, what it means after tax, and why the next salary jump still needs proper comparison.",
    mainEntityOfPage: "https://taxdecod.com/guides/is-50k-a-good-salary-uk",
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
            Is £50k a good salary in the UK?
          </h1>

          <p className="mt-4 app-copy">
            In many UK contexts, <strong>£50k is often a strong salary</strong>.
          </p>

          <p className="mt-4 app-copy">
            But just like with any salary judgment query, the better answer depends
            on what £50k actually leaves you with after deductions, where you live,
            and what kind of life the salary needs to support.
          </p>

          <SnippetBlock
            question="Is £50k a good salary in the UK?"
            answer="£50k is often a strong salary in many UK contexts, but the more useful answer still depends on take-home pay, location, rent, and deductions. In practice, the strongest way to judge it is by the monthly result after tax."
            bullets={[
              "£50k is widely seen as strong in many regions",
              "It still needs a cautious reading in expensive cities",
              "The after-tax monthly result matters more than the headline",
              "Users often compare £50k with £40k and £60k",
            ]}
          />

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {strengthCards.map((card) => (
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
              Why £50k feels like an important threshold
            </h2>

            <p className="mt-4 app-copy">
              £50k is one of the strongest salary intent queries because it sits
              right at the point where many users think:
            </p>

            <p className="mt-4 app-copy">“Surely this should feel very good now.”</p>

            <p className="mt-4 app-copy">
              And often it does feel strong. But the better interpretation is still:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• what is the monthly take-home?</li>
              <li>• how much goes on housing?</li>
              <li>• do student loan and pension drag reduce it more than expected?</li>
              <li>• would £60k feel proportionally better or not?</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why the answer still depends on context
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {contextCards.map((card) => (
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
              Why £50k changes the next decision
            </h2>

            <p className="mt-4 app-copy">
              At £50k, the question often becomes more strategic.
            </p>

            <p className="mt-4 app-copy">
              Users often stop asking:
            </p>

            <p className="mt-4 app-copy">“Is this good?”</p>

            <p className="mt-2 app-copy">and start asking:</p>

            <p className="mt-2 app-copy">
              “Is the next jump still worth it after deductions?”
            </p>

            <p className="mt-4 app-copy">
              That is why £50k usually needs comparison thinking, not just a one-number judgment.
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              The smartest next step
            </h2>

            <p className="mt-4 app-copy">
              If you are seriously judging £50k, the best next move is usually to
              check what it leaves you with and compare it against nearby salary bands.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/50000-after-tax-uk"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  See £50k after tax
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the actual monthly take-home result.
                </p>
              </Link>

              <Link
                href="/compare/50000-vs-60000-after-tax"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Compare £50k vs £60k
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want to judge whether the next jump is meaningfully stronger.
                </p>
              </Link>

              <Link
                href="/good-salary/50000/london"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Judge £50k in a city context
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want to know what £50k may feel like in a higher-cost area.
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
                  Best when you want role and region context beyond tax alone.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "See £50k after tax", href: "/50000-after-tax-uk" },
              { title: "Compare £50k vs £60k", href: "/compare/50000-vs-60000-after-tax" },
              { title: "Salary calculator", href: "/calculator" },
              { title: "Salary benchmarks", href: "/benchmarks" },
              {
                title: "What is a good salary in the UK?",
                href: "/guides/what-is-a-good-salary-uk",
              },
              {
                title: "Is £40k a good salary in the UK?",
                href: "/guides/is-40k-a-good-salary-uk",
              },
            ]}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}