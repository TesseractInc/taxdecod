import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How Much Salary Increase Is Worth It? | TaxDecod",
  description:
    "A plain-English guide to judging whether a salary increase is actually worth it after tax and deductions.",
};

const decisionCards = [
  {
    title: "The gross raise",
    body: "This is the number people focus on first, but it is not the number that determines whether life actually improves.",
  },
  {
    title: "The retained monthly gain",
    body: "This is usually the most useful number. It shows how much the raise changes real monthly life after deductions.",
  },
  {
    title: "The role trade-off",
    body: "A raise should also be judged against extra pressure, commute, workload, responsibility, and future progression.",
  },
  {
    title: "The planning question",
    body: "Sometimes the better question is not whether this raise is good, but what monthly amount would actually make the move worth it.",
  },
];

const badAssumptions = [
  {
    title: "“A £5k raise means I really gain £5k”",
    body: "False. Only part of the raise is retained once deductions are applied.",
  },
  {
    title: "“A bigger salary always means a better decision”",
    body: "False. A bigger salary can still be poor value if the retained monthly difference is small compared with the extra pressure.",
  },
  {
    title: "“I should judge the raise by annual gross only”",
    body: "False. Monthly net gain is usually the more practical number.",
  },
  {
    title: "“If the title is better, the raise must be worth it”",
    body: "Not automatically. It still depends on what the actual monthly result looks like.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "How much salary increase is worth it?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "A salary increase is worth it when the retained monthly gain after deductions is strong enough to justify the role change, workload, commute, and other trade-offs.",
    },
  },
  {
    "@type": "Question",
    name: "Why can a raise feel smaller than expected?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because Income Tax, National Insurance, pension, and student loan deductions reduce the gross raise before it becomes monthly take-home pay.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Salary Increase Is Worth It?",
    description:
      "A plain-English guide to judging whether a salary increase is actually worth it after tax and deductions.",
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
            How much salary increase is worth it?
          </h1>

          <p className="mt-4 app-copy">
            A salary increase is worth it when the money you actually keep is
            strong enough to justify the change.
          </p>

          <p className="mt-4 app-copy">
            That sounds obvious, but it is where many users go wrong. They judge
            the raise by the gross headline instead of the monthly result after deductions.
          </p>

          <SnippetBlock
            question="How do you judge whether a salary increase is worth it?"
            answer="The strongest way to judge a raise is by the retained monthly difference after deductions, not just the gross salary increase. The role trade-offs also matter."
            bullets={[
              "Judge the raise by monthly net gain, not headline gross alone",
              "Include tax, NI, pension, and student loan drag",
              "Compare the gain against extra workload and stress",
              "Use a comparison tool if the decision is close",
            ]}
          />

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {decisionCards.map((card) => (
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
              The most useful way to think about a raise
            </h2>

            <p className="mt-4 app-copy">
              The gross raise matters. But the more useful number is usually:
            </p>

            <p className="mt-4 app-copy">
              <strong>How much more per month do I actually keep?</strong>
            </p>

            <p className="mt-4 app-copy">
              That is the number that affects:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• rent flexibility</li>
              <li>• savings rate</li>
              <li>• debt repayment speed</li>
              <li>• monthly breathing room</li>
              <li>• whether the role change feels worth it</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why a raise often feels smaller than expected
            </h2>

            <p className="mt-4 app-copy">
              A raise can feel weaker than expected because the extra gross money
              is also reduced by:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• Income Tax</li>
              <li>• National Insurance</li>
              <li>• pension contributions</li>
              <li>• student loan repayment</li>
            </ul>

            <p className="mt-5 app-copy">
              So even a psychologically strong raise can turn into a much more
              moderate monthly improvement.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              What else should be weighed besides money?
            </h2>

            <p className="mt-4 app-copy">
              A salary increase should usually be judged against:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• extra stress</li>
              <li>• longer commute</li>
              <li>• more management pressure</li>
              <li>• worse hours or less flexibility</li>
              <li>• better progression or stronger future opportunities</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why the right question is rarely just:
            </p>

            <p className="mt-4 app-copy">“Is the number bigger?”</p>

            <p className="mt-2 app-copy">It is more often:</p>

            <p className="mt-2 app-copy">
              “Is the retained monthly improvement strong enough to justify the move?”
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Common bad assumptions
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {badAssumptions.map((item) => (
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
              The strongest next step
            </h2>

            <p className="mt-4 app-copy">
              If you are genuinely deciding whether a raise is worth it, the best
              next move is usually not more reading. It is comparing the two
              salary routes properly.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
                  Best when the decision is between one salary and a better offer or raise.
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
                  Reverse from your target monthly income
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want to know what monthly result would actually make the move worth it.
                </p>
              </Link>

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
                  Best when you want the full deduction picture for one salary first.
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
                  Best when the core confusion is still about headline pay versus real pay.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "Compare two salaries", href: "/compare-salary" },
              { title: "Reverse salary calculator", href: "/reverse-tax" },
              { title: "UK salary calculator", href: "/calculator" },
              {
                title: "Net vs gross salary explained",
                href: "/guides/net-vs-gross-salary-explained",
              },
              {
                title: "How student loan affects salary in the UK",
                href: "/guides/how-student-loan-affects-salary-uk",
              },
              {
                title: "Take-home pay explained",
                href: "/guides/take-home-pay-explained",
              },
            ]}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}