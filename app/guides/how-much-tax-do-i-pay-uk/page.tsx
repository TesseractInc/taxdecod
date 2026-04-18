import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How Much Tax Do I Pay in the UK? (2026/27) | TaxDecod",
  description:
    "A plain-English guide to how much tax you pay in the UK, including Income Tax, National Insurance, and why take-home pay is lower than gross salary.",
};

const exampleCards = [
  {
    title: "£20,000 salary",
    body: "At this level, Income Tax exists, but the bigger practical question is usually whether the monthly take-home covers essentials once National Insurance and other deductions are included.",
  },
  {
    title: "£30,000 salary",
    body: "This is where many users first notice that gross salary sounds stronger than the amount that actually lands each month.",
  },
  {
    title: "£40,000 salary",
    body: "This often feels like a meaningful salary level, but the monthly result still matters more than the headline figure for real-life decisions.",
  },
  {
    title: "£50,000+ salary",
    body: "At this stage, users usually need to understand not just tax paid, but how efficiently the next salary jump is converting into real take-home.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "How much tax do I pay in the UK?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "That depends on taxable income, region, tax code, and whether National Insurance, pension, and student loan deductions also apply. Most employees need to think about total deductions, not Income Tax alone.",
    },
  },
  {
    "@type": "Question",
    name: "Why does my take-home pay feel lower than expected?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because take-home pay is reduced by more than Income Tax. National Insurance, pension, student loan deductions, and payroll timing can all reduce what reaches your bank account.",
    },
  },
  {
    "@type": "Question",
    name: "Do I only need to know my tax band to know my take-home pay?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "No. Knowing the band helps, but real take-home depends on the full deduction stack, not just Income Tax alone.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Tax Do I Pay in the UK? (2026/27)",
    description:
      "A plain-English guide to how much tax you pay in the UK, including Income Tax, National Insurance, and why take-home pay is lower than gross salary.",
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
            How much tax do I pay in the UK?
          </h1>

          <p className="mt-4 app-copy">
            The honest answer is: usually <strong>less simple than people think</strong>.
          </p>

          <p className="mt-4 app-copy">
            Most people ask this question expecting one percentage. But UK pay
            does not work like that. The amount you lose from salary usually
            depends on:
          </p>

          <ul className="mt-4 space-y-2 app-copy">
            <li>• Income Tax</li>
            <li>• National Insurance</li>
            <li>• pension contributions</li>
            <li>• student loan deductions</li>
            <li>• tax code setup</li>
            <li>• payroll timing</li>
            <li>• whether you are in Scotland or not</li>
          </ul>

          <SnippetBlock
            question="How much tax do I pay in the UK?"
            answer="Most employees do not just pay Income Tax. They usually also pay National Insurance, and may also lose pension contributions or student loan deductions. That is why the monthly take-home result matters more than one single tax percentage."
            bullets={[
              "Income Tax is only one part of the salary deduction picture",
              "National Insurance also reduces take-home pay",
              "Pension and student loan can materially change the result",
              "The monthly amount you keep is usually the more useful number",
            ]}
          />

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              The first mistake: thinking tax means only Income Tax
            </h2>

            <p className="mt-4 app-copy">
              When users ask “how much tax do I pay?”, they often really mean:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• how much is taken off my salary overall</li>
              <li>• why is my take-home lower than expected</li>
              <li>• what percentage am I actually losing</li>
            </ul>

            <p className="mt-5 app-copy">
              In practical terms, most employees need to think about{" "}
              <strong>total deduction pressure</strong>, not just the Income Tax band.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              What usually comes off your salary?
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-base font-semibold app-title">Income Tax</p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Charged progressively depending on how much taxable income sits
                  inside each tax band.
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
                  National Insurance
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Separate from Income Tax and one of the main reasons take-home
                  is lower than many users expect.
                </p>
              </div>

              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-base font-semibold app-title">Pension</p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Often a good long-term deduction, but still something that
                  reduces what reaches your bank account now.
                </p>
              </div>

              <div
                className="rounded-[24px] border px-5 py-5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-base font-semibold app-title">Student loan</p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Can materially change monthly take-home even when gross salary
                  looks decent on paper.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why the answer changes by salary level
            </h2>

            <p className="mt-4 app-copy">
              The phrase “how much tax do I pay?” means something different at
              different salary levels.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {exampleCards.map((card) => (
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
              Why take-home pay matters more than the tax percentage
            </h2>

            <p className="mt-4 app-copy">
              In real life, most users do not make salary decisions based on
              tax-band theory alone.
            </p>

            <p className="mt-4 app-copy">
              They care about:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• how much reaches the bank each month</li>
              <li>• whether a raise is actually worth it</li>
              <li>• whether a different role changes monthly life enough</li>
              <li>• whether deductions on a payslip look normal</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why the strongest answer to “how much tax do I pay?” is
              usually not a lecture. It is a proper take-home calculation.
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
                  “I know my tax band so I know my take-home”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Not true. National Insurance, pension, student loan, and tax
                  code issues can all materially change the final number.
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
                  “A higher salary always feels proportionally better”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Not always. A higher gross salary may lose more to deductions,
                  so the monthly gain can feel smaller than expected.
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
                  “If my payslip looks wrong, it must be just tax bands”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Not necessarily. Tax code, cumulative PAYE, irregular income,
                  and employer payroll timing can all change the picture.
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
                  “Income Tax and take-home are basically the same thing”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  No. Income Tax is only one part of the total deduction stack.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              What should you do next?
            </h2>

            <p className="mt-4 app-copy">
              If you really want to know how much you pay, the best next step is
              usually one of these:
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
                  Best when you want the full after-tax and deduction result.
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
                href="/payslip-checker"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Check if your payslip looks right
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the salary result makes sense but the real payslip still feels wrong.
                </p>
              </Link>

              <Link
                href="/guides/how-income-tax-works-uk"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Read how Income Tax works
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the theory behind the deduction logic first.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "Use the UK salary calculator", href: "/calculator" },
              { title: "Compare two salaries", href: "/compare-salary" },
              { title: "Check your payslip", href: "/payslip-checker" },
              {
                title: "How Income Tax works in the UK",
                href: "/guides/how-income-tax-works-uk",
              },
              {
                title: "Take-home pay explained",
                href: "/guides/take-home-pay-explained",
              },
              {
                title: "Net vs gross salary explained",
                href: "/guides/net-vs-gross-salary-explained",
              },
            ]}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}