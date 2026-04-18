import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How to Read a Payslip in the UK | TaxDecod",
  description:
    "A plain-English guide to reading a UK payslip, including gross pay, net pay, PAYE, National Insurance, pension, tax code, and year-to-date values.",
};

const payslipLines = [
  {
    title: "Gross pay",
    body: "Your pay before deductions are taken off.",
  },
  {
    title: "Net pay",
    body: "The amount left after deductions. This is the figure that actually matters for monthly life.",
  },
  {
    title: "PAYE tax",
    body: "Income Tax deducted through Pay As You Earn.",
  },
  {
    title: "National Insurance",
    body: "A separate deduction from Income Tax and one of the main reasons take-home is lower than many users expect.",
  },
  {
    title: "Pension",
    body: "Your workplace pension contribution, if one is being deducted through payroll.",
  },
  {
    title: "Student loan",
    body: "Repayment taken through payroll if your income is above the relevant threshold.",
  },
  {
    title: "Tax code",
    body: "A code like 1257L, BR, or 0T that affects how PAYE is applied.",
  },
  {
    title: "Year-to-date (YTD)",
    body: "The running total of pay and deductions across the tax year so far.",
  },
];

const warningCards = [
  {
    title: "Tax looks unexpectedly high",
    body: "This can be caused by tax code issues, emergency tax, bonus months, or payroll catch-up rather than a simple permanent error.",
  },
  {
    title: "Net pay feels too low for the salary",
    body: "This can happen because of pension, student loan, salary sacrifice, or irregular deductions that are easy to ignore if you only look at gross pay.",
  },
  {
    title: "One month looks strange",
    body: "One payslip is not always the full story. Year-to-date values often explain more than one isolated month.",
  },
  {
    title: "The code looks unfamiliar",
    body: "A tax code can materially change PAYE, so it should never be ignored when the payslip feels wrong.",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "How do I read a UK payslip?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Start with gross pay, then check PAYE tax, National Insurance, pension, student loan, tax code, and year-to-date totals. The most useful question is usually why net pay looks the way it does.",
    },
  },
  {
    "@type": "Question",
    name: "What matters most on a payslip?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Gross pay matters, but net pay, tax code, PAYE, National Insurance, and year-to-date totals are usually the most useful lines when something feels wrong.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Read a Payslip in the UK",
    description:
      "A plain-English guide to reading a UK payslip, including gross pay, net pay, PAYE, National Insurance, pension, tax code, and year-to-date values.",
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
            How to read a payslip in the UK
          </h1>

          <p className="mt-4 app-copy">
            A payslip is not just a receipt. It is the clearest live picture of
            how your salary is actually being turned into take-home pay.
          </p>

          <p className="mt-4 app-copy">
            Most users do not need to memorise every payroll term. They need to
            know which lines matter when the net pay feels wrong.
          </p>

          <SnippetBlock
            question="How do I read a UK payslip?"
            answer="Start with gross pay, then check net pay, PAYE tax, National Insurance, pension, student loan, tax code, and year-to-date totals. If something feels wrong, the tax code and YTD values are often the most useful lines to inspect first."
            bullets={[
              "Gross pay is before deductions",
              "Net pay is what actually reaches you",
              "PAYE and NI are not the same deduction",
              "Tax code and YTD values often explain problems faster",
            ]}
          />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              The key payslip lines to understand
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {payslipLines.map((item) => (
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

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              The best order to read a payslip
            </h2>

            <p className="mt-4 app-copy">
              A practical order is:
            </p>

            <ol className="mt-4 space-y-2 app-copy">
              <li>1. Check gross pay</li>
              <li>2. Check net pay</li>
              <li>3. Check PAYE tax</li>
              <li>4. Check National Insurance</li>
              <li>5. Check pension and student loan deductions</li>
              <li>6. Check the tax code</li>
              <li>7. Check year-to-date values</li>
            </ol>

            <p className="mt-5 app-copy">
              This order works because it helps answer the real question:{" "}
              <strong>why is my net pay this number?</strong>
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why year-to-date values matter so much
            </h2>

            <p className="mt-4 app-copy">
              Many users only look at the current month. That is a mistake.
            </p>

            <p className="mt-4 app-copy">
              Year-to-date values often tell you more because they show:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• how much tax has been paid across the year so far</li>
              <li>• how much National Insurance has already been deducted</li>
              <li>• whether the overall pattern looks normal or not</li>
            </ul>

            <p className="mt-5 app-copy">
              If one payslip looks strange, the YTD totals can help show whether
              it is a one-month issue or part of a bigger pattern.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              The tax code line matters more than many users think
            </h2>

            <p className="mt-4 app-copy">
              If your tax code is not what you expected, PAYE can change
              materially. That means a payslip can look wrong even when the gross
              salary looks normal.
            </p>

            <p className="mt-4 app-copy">
              Codes like <strong>BR</strong>, <strong>0T</strong>, or{" "}
              <strong>K codes</strong> are especially worth checking when
              deductions feel unusual.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Common warning signs
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {warningCards.map((card) => (
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

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              What a payslip does not tell you on its own
            </h2>

            <p className="mt-4 app-copy">
              A payslip is powerful, but it is still only part of the picture.
            </p>

            <p className="mt-4 app-copy">
              It does not automatically explain:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• whether HMRC will eventually refund tax</li>
              <li>• whether cumulative PAYE will correct itself later</li>
              <li>• whether a role change is worth it overall</li>
              <li>• whether the monthly target you want is realistic</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why payslip reading usually needs to connect to tools, not
              just theory.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Best next steps after reading a payslip
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/payslip-checker"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Use the payslip checker
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want a first-check reading of PAYE and NI against YTD values.
                </p>
              </Link>

              <Link
                href="/tax-code-decoder"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Decode the tax code
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the code itself may be the reason deductions look unusual.
                </p>
              </Link>

              <Link
                href="/tax-refund-calculator"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Check for refund signals
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the tax paid looks high enough to justify a closer review.
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
                  Return to the salary calculator
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want the broader salary and deduction context behind the payslip.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "Use the payslip checker", href: "/payslip-checker" },
              { title: "Decode a tax code", href: "/tax-code-decoder" },
              { title: "Check refund signals", href: "/tax-refund-calculator" },
              { title: "UK salary calculator", href: "/calculator" },
              {
                title: "How much tax do I pay in the UK?",
                href: "/guides/how-much-tax-do-i-pay-uk",
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