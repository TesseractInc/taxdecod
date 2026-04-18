import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "Is £40k a Good Salary in the UK? | TaxDecod",
  description:
    "A plain-English guide to whether £40k is a good salary in the UK, how it feels after tax, and what makes it strong or weak depending on your situation.",
};

const strengthCards = [
  {
    title: "Why £40k often feels strong",
    body: "In many parts of the UK, £40k is usually above the range where salary feels tight and starts to offer more meaningful monthly flexibility.",
  },
  {
    title: "Why £40k is not automatically comfortable everywhere",
    body: "In higher-cost areas, especially London, the same salary can still feel much less impressive after rent, transport, and deductions.",
  },
  {
    title: "Why take-home matters more than the headline",
    body: "£40k sounds strong gross, but the better question is what it actually leaves you with each month after tax and other deductions.",
  },
  {
    title: "Why nearby salary bands matter",
    body: "At this level, users often want to know whether £45k or £50k would materially improve life or only look better on paper.",
  },
];

const whatItDependsOn = [
  {
    title: "Your location",
    body: "£40k can feel solid in lower-cost areas but much more stretched in expensive cities.",
  },
  {
    title: "Your housing cost",
    body: "A low-rent setup versus a high-rent setup can completely change whether £40k feels good.",
  },
  {
    title: "Your deductions",
    body: "Pension, student loan, and tax-code issues can materially change the monthly result.",
  },
  {
    title: "Your lifestyle target",
    body: "The answer changes depending on whether the goal is basic comfort, strong savings, or a higher-cost city lifestyle.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "Is £40k a good salary in the UK?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "£40k is often a good salary in many UK contexts, but the better answer depends on take-home pay, housing cost, deductions, and location. It can feel strong in some areas and only moderate in higher-cost places.",
    },
  },
  {
    "@type": "Question",
    name: "Is £40k a good salary in London?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "£40k can still be workable in London, but it is usually judged much more cautiously because rent and transport costs can absorb a large share of take-home pay.",
    },
  },
  {
    "@type": "Question",
    name: "What should I compare £40k against?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Users often compare £40k against £35k, £45k, and £50k to judge whether the next salary band creates enough real monthly improvement to matter.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Is £40k a Good Salary in the UK?",
    description:
      "A plain-English guide to whether £40k is a good salary in the UK, how it feels after tax, and what makes it strong or weak depending on your situation.",
    mainEntityOfPage: "https://taxdecod.com/guides/is-40k-a-good-salary-uk",
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
            Is £40k a good salary in the UK?
          </h1>

          <p className="mt-4 app-copy">
            In many parts of the UK, <strong>£40k is often a good salary</strong>.
          </p>

          <p className="mt-4 app-copy">
            But the better answer is not just “yes” or “no.” The real question is
            what £40k actually leaves you with after deductions and whether that
            monthly result supports the life you want.
          </p>

          <SnippetBlock
            question="Is £40k a good salary in the UK?"
            answer="£40k is often a good salary in many UK contexts, but the better answer depends on take-home pay, location, rent, and deductions. In practice, the strongest way to judge it is by the monthly amount left after tax."
            bullets={[
              "£40k is often strong in many regions",
              "It can feel much weaker in high-cost cities",
              "The monthly after-tax result matters more than the headline",
              "Users often compare £40k against £35k, £45k, and £50k",
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
              Why £40k is such a common decision point
            </h2>

            <p className="mt-4 app-copy">
              £40k is one of the most common salary judgment points because it often
              sits in the zone where users expect life to feel clearly better than
              the lower bands.
            </p>

            <p className="mt-4 app-copy">
              It is usually high enough that the question becomes less about basic
              survival and more about:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• how much monthly room is left after rent and bills</li>
              <li>• whether saving starts to feel more realistic</li>
              <li>• whether the next jump is actually worth chasing</li>
              <li>• how different the answer is in London versus elsewhere</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              What the answer depends on
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {whatItDependsOn.map((item) => (
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
              Why £40k still needs context
            </h2>

            <p className="mt-4 app-copy">
              The same £40k salary can mean:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• properly solid in one region</li>
              <li>• only moderate in another</li>
              <li>• much weaker if rent is high</li>
              <li>• much less impressive if student loan and pension deductions are heavy</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why “is £40k good?” is really a context question, not just a number question.
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              The smarter next question
            </h2>

            <p className="mt-4 app-copy">
              Once you understand that £40k may or may not be strong depending on context,
              the best next question is usually:
            </p>

            <p className="mt-4 app-copy">
              “How much does £40k actually leave me with, and what would £45k or £50k change?”
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/40000-after-tax-uk"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  See £40k after tax
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the actual monthly result first.
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
                  Judge £40k in a city context
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want a more practical London-style reading.
                </p>
              </Link>

              <Link
                href="/compare/40000-vs-50000-after-tax"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Compare £40k vs £50k
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the real decision is whether the next salary band is meaningfully stronger.
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
                  Best when you want wider role and region context.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "See £40k after tax", href: "/40000-after-tax-uk" },
              { title: "Compare £40k vs £50k", href: "/compare/40000-vs-50000-after-tax" },
              { title: "Salary calculator", href: "/calculator" },
              { title: "Salary benchmarks", href: "/benchmarks" },
              {
                title: "What is a good salary in the UK?",
                href: "/guides/what-is-a-good-salary-uk",
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