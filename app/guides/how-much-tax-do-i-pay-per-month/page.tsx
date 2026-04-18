import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How Much Tax Do I Pay Per Month? | TaxDecod",
  description:
    "A plain-English guide to thinking about how much tax you pay per month in the UK and why monthly deductions matter more than just annual tax theory.",
};

const monthlyRealityCards = [
  {
    title: "Monthly thinking is usually more useful than annual thinking",
    body: "Most users feel tax through the monthly payslip, not through an abstract yearly tax number.",
  },
  {
    title: "Monthly tax is not the whole picture",
    body: "Even if you know the monthly tax amount, take-home is also affected by National Insurance, pension, and student loan deductions.",
  },
  {
    title: "The same salary can feel very different monthly",
    body: "A salary that sounds good annually can still feel tighter than expected once the monthly deduction stack is visible.",
  },
  {
    title: "This is really a payslip question",
    body: "When users ask about monthly tax, they often really want to know why the payslip feels the way it does.",
  },
];

const misunderstandingCards = [
  {
    title: "“Monthly tax is all I need to know”",
    body: "False. Monthly tax alone does not explain the full take-home result because other deductions also matter.",
  },
  {
    title: "“The annual figure is enough, I can just divide it mentally”",
    body: "Not always. Real monthly salary decisions are usually easier when viewed directly in monthly terms.",
  },
  {
    title: "“If my monthly tax looks high, something must be wrong”",
    body: "Not automatically. Tax code, cumulative PAYE, bonus months, and irregular payroll timing can all affect the monthly number.",
  },
  {
    title: "“Gross salary tells me enough about monthly life”",
    body: "False. Monthly deductions are exactly why the real-life result often feels different from the headline salary.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "How much tax do I pay per month?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "That depends on your salary, tax code, region, and deduction setup. In practice, users usually need to think about monthly total deductions rather than monthly Income Tax alone.",
    },
  },
  {
    "@type": "Question",
    name: "Why is monthly tax more useful than annual tax for many users?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because real salary life happens monthly. Most users feel deductions through payslips, rent, bills, and monthly take-home rather than through an annual tax theory number.",
    },
  },
  {
    "@type": "Question",
    name: "Does monthly tax explain take-home pay on its own?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "No. National Insurance, pension, student loan, and payroll timing can all materially change the final monthly result.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Tax Do I Pay Per Month?",
    description:
      "A plain-English guide to thinking about how much tax you pay per month in the UK and why monthly deductions matter more than just annual tax theory.",
    mainEntityOfPage:
      "https://taxdecod.com/guides/how-much-tax-do-i-pay-per-month",
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
            How much tax do I pay per month?
          </h1>

          <p className="mt-4 app-copy">
            For most users, this is a much more useful question than asking
            about annual tax in the abstract.
          </p>

          <p className="mt-4 app-copy">
            Real salary life happens monthly. Rent, bills, transport, savings,
            and take-home pressure all show up through the payslip, not through
            a year-end theory number.
          </p>

          <SnippetBlock
            question="How much tax do I pay per month?"
            answer="That depends on your salary, tax code, region, and deduction setup. But in practice, the stronger question is usually not just monthly Income Tax, but total monthly deductions and what they leave you with."
            bullets={[
              "Monthly thinking is usually more useful than annual tax thinking",
              "Monthly tax is only one part of the payslip",
              "National Insurance and other deductions also matter",
              "Take-home pay is usually the real number users care about",
            ]}
          />

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {monthlyRealityCards.map((card) => (
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
              Why users usually ask this
            </h2>

            <p className="mt-4 app-copy">
              When someone asks how much tax they pay per month, they often really mean:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• why is my payslip lower than I expected?</li>
              <li>• how much is tax reducing my monthly life?</li>
              <li>• what part of my monthly deductions is actually tax?</li>
              <li>• what will this salary really feel like per month?</li>
            </ul>

            <p className="mt-5 app-copy">
              So this is usually a payslip and take-home question, not just a tax-band question.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why monthly deductions matter more than many users expect
            </h2>

            <p className="mt-4 app-copy">
              Even if you know the monthly tax amount, the final monthly result is still shaped by:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• National Insurance</li>
              <li>• pension contributions</li>
              <li>• student loan deductions</li>
              <li>• payroll timing</li>
              <li>• tax code issues</li>
              <li>• bonus or irregular pay months</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why monthly tax should usually be read as one part of the
              monthly deduction stack, not the whole story.
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Common bad assumptions
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
              The strongest next steps
            </h2>

            <p className="mt-4 app-copy">
              If your real concern is monthly tax, the best next move is usually
              to inspect the actual monthly take-home or the payslip pattern directly.
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
                  Best when you want the monthly take-home breakdown from one salary.
                </p>
              </Link>

              <Link
                href="/payslip-checker"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Check the payslip pattern
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when your monthly deductions already look unusual on a real payslip.
                </p>
              </Link>

              <Link
                href="/guides/how-much-tax-do-i-pay-uk"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Read the full UK tax guide
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the bigger annual picture behind the monthly question.
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
                  Best when the real question is what the monthly result means overall.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "UK salary calculator", href: "/calculator" },
              { title: "Payslip checker", href: "/payslip-checker" },
              {
                title: "How much tax do I pay in the UK?",
                href: "/guides/how-much-tax-do-i-pay-uk",
              },
              {
                title: "Take-home pay explained",
                href: "/guides/take-home-pay-explained",
              },
              {
                title: "How much salary to take home £3,000",
                href: "/guides/how-much-salary-to-take-home-3000",
              },
              {
                title: "Monthly budget by salary in the UK",
                href: "/guides/monthly-budget-by-salary-uk",
              },
            ]}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}