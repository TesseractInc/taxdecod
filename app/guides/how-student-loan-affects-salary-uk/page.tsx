import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How Student Loan Affects Salary in the UK | TaxDecod",
  description:
    "A plain-English guide to how student loan repayment affects salary in the UK and why take-home pay can feel lower than expected.",
};

const impactCards = [
  {
    title: "It reduces net pay, not gross pay",
    body: "Your headline salary still looks the same, but the money reaching your bank account can be materially lower once student loan repayment starts.",
  },
  {
    title: "It can make a raise feel smaller",
    body: "A salary increase can still help, but the monthly improvement may feel weaker when part of the gain is also pulled into student loan repayment.",
  },
  {
    title: "It changes salary comparisons",
    body: "Two people on the same gross salary can feel very different month to month if one has student loan deductions and the other does not.",
  },
  {
    title: "It affects planning decisions",
    body: "Budgeting, affordability, and job-change decisions often feel different once student loan drag is included in the monthly picture.",
  },
];

const misconceptionCards = [
  {
    title: "“Student loan does not matter if my salary is decent”",
    body: "False. Even on a decent gross salary, repayment can still reduce the monthly amount enough to change how the salary feels in practice.",
  },
  {
    title: "“A raise means I fully keep the extra money”",
    body: "False. If student loan repayment increases too, only part of the raise is actually retained.",
  },
  {
    title: "“Gross salary is enough to compare jobs”",
    body: "False. A role can look stronger in gross terms while feeling much less impressive once student loan drag is included.",
  },
  {
    title: "“Student loan is basically the same as tax”",
    body: "Not exactly. It behaves like a payroll deduction and reduces take-home, but users should still think about it separately when comparing salary routes.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "How does student loan affect salary in the UK?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Student loan affects salary by reducing take-home pay once earnings are above the repayment threshold for the relevant plan. The gross salary stays the same, but the money you keep becomes lower.",
    },
  },
  {
    "@type": "Question",
    name: "Why can a salary raise feel smaller with student loan?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because part of the extra gross salary may also increase student loan repayment, so the retained monthly gain can feel smaller than the headline raise suggests.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Student Loan Affects Salary in the UK",
    description:
      "A plain-English guide to how student loan repayment affects salary in the UK and why take-home pay can feel lower than expected.",
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
            How student loan affects salary in the UK
          </h1>

          <p className="mt-4 app-copy">
            Student loan is one of the easiest salary deductions to underestimate.
          </p>

          <p className="mt-4 app-copy">
            Many users look at a gross salary and assume they know roughly what
            life will feel like. But once student loan repayment starts, the
            monthly reality can feel noticeably weaker than expected.
          </p>

          <SnippetBlock
            question="How does student loan affect salary?"
            answer="Student loan affects salary by reducing take-home pay once earnings move above the relevant repayment threshold. The gross salary still looks the same, but the money you actually keep becomes lower."
            bullets={[
              "Student loan does not reduce the headline salary figure",
              "It does reduce the take-home amount that reaches you",
              "It can make raises feel smaller than expected",
              "It matters a lot in real salary comparisons",
            ]}
          />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why student loan feels different from normal tax thinking
            </h2>

            <p className="mt-4 app-copy">
              Most users understand that tax reduces salary. But student loan is
              often less visible mentally because it sits inside payroll and is
              easy to ignore when looking only at the gross number.
            </p>

            <p className="mt-4 app-copy">
              In practical terms, student loan changes the question from:
            </p>

            <p className="mt-4 app-copy">
              “What is my salary?”
            </p>

            <p className="mt-2 app-copy">to</p>

            <p className="mt-2 app-copy">
              “What do I actually keep once this extra drag is included?”
            </p>
          </section>

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {impactCards.map((card) => (
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
              Why a raise can still feel disappointing
            </h2>

            <p className="mt-4 app-copy">
              One of the biggest reasons users search about student loan and salary
              is because a raise does not feel as strong as they expected.
            </p>

            <p className="mt-4 app-copy">
              That usually happens because the raise is being reduced by:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• Income Tax</li>
              <li>• National Insurance</li>
              <li>• pension contributions</li>
              <li>• student loan repayment</li>
            </ul>

            <p className="mt-5 app-copy">
              So the real question is rarely just “did my salary go up?” It is
              more often “how much of the extra salary do I actually keep?”
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why student loan matters in job comparisons
            </h2>

            <p className="mt-4 app-copy">
              A gross salary comparison can become misleading when student loan
              is involved.
            </p>

            <p className="mt-4 app-copy">
              For example, a new role may look clearly better on paper, but the
              monthly gain after deductions may be much smaller than expected.
            </p>

            <p className="mt-4 app-copy">
              That is why job decisions should usually be judged by:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• the retained monthly difference</li>
              <li>• not just the gross headline increase</li>
              <li>• and not just what the recruiter or advert says</li>
            </ul>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Common misunderstandings
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
              What should you do with this?
            </h2>

            <p className="mt-4 app-copy">
              If student loan is part of your salary picture, the best next step
              is usually not another general article. It is using the right tool
              to see the monthly effect clearly.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/student-loan-calculator"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Use the student loan calculator
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the repayment drag isolated clearly.
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
                  Best when you want to see whether the next salary jump is still worth it.
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
                  Use the full salary calculator
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the wider after-tax picture, not student loan alone.
                </p>
              </Link>

              <Link
                href="/guides/how-much-salary-increase-is-worth-it"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Read the raise guide
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the real question is whether a salary increase is meaningful.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "Student loan calculator", href: "/student-loan-calculator" },
              { title: "Compare two salaries", href: "/compare-salary" },
              { title: "UK salary calculator", href: "/calculator" },
              {
                title: "How much salary increase is worth it?",
                href: "/guides/how-much-salary-increase-is-worth-it",
              },
              {
                title: "Net vs gross salary explained",
                href: "/guides/net-vs-gross-salary-explained",
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