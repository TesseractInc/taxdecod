import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import RelatedLinks from "../../../components/seo/related-links";
import SnippetBlock from "../../../components/seo/snippet-block";
import AdSlot from "../../../components/ads/ad-slot";

export const metadata: Metadata = {
  title: "How Income Tax Works in the UK (2026/27) | TaxDecod",
  description:
    "A plain-English guide to how Income Tax works in the UK, including Personal Allowance, tax bands, Scotland differences, and why salary after tax feels lower than gross pay.",
};

const englandWalesNiBands = [
  {
    label: "Personal Allowance",
    rate: "0%",
    range: "Up to £12,570",
    note: "Most employees pay no Income Tax on this part of income.",
  },
  {
    label: "Basic rate",
    rate: "20%",
    range: "£12,571 to £50,270",
    note: "Only the slice inside this band is taxed at 20%.",
  },
  {
    label: "Higher rate",
    rate: "40%",
    range: "£50,271 to £125,140",
    note: "Only the slice inside this band is taxed at 40%.",
  },
  {
    label: "Additional rate",
    rate: "45%",
    range: "Above £125,140",
    note: "Only income above this threshold is taxed at 45%.",
  },
];

const scotlandBands = [
  {
    label: "Starter rate",
    rate: "19%",
    range: "£12,571 to £16,537",
  },
  {
    label: "Basic rate",
    rate: "20%",
    range: "£16,538 to £29,526",
  },
  {
    label: "Intermediate rate",
    rate: "21%",
    range: "£29,527 to £43,662",
  },
  {
    label: "Higher rate",
    rate: "42%",
    range: "£43,663 to £75,000",
  },
  {
    label: "Advanced rate",
    rate: "45%",
    range: "£75,001 to £125,140",
  },
  {
    label: "Top rate",
    rate: "48%",
    range: "Above £125,140",
  },
];

const exampleRows = [
  {
    slice: "First £12,570",
    rate: "0%",
    tax: "£0",
  },
  {
    slice: "Next £17,430",
    rate: "20%",
    tax: "£3,486",
  },
];

const faqItems = [
  {
    "@type": "Question",
    name: "How does Income Tax work in the UK?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Income Tax in the UK is progressive. That means different portions of earnings are taxed at different rates rather than your full salary being taxed at one single rate.",
    },
  },
  {
    "@type": "Question",
    name: "Do you pay 40% tax on all your salary once you cross the higher-rate threshold?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "No. Only the part of your taxable income above the higher-rate threshold is taxed at 40%. The lower portion still uses the lower bands.",
    },
  },
  {
    "@type": "Question",
    name: "Why is my take-home pay lower than I expected even if I understand Income Tax?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Because take-home pay is affected by more than Income Tax alone. National Insurance, pension contributions, student loan deductions, tax code changes, and payroll timing can all reduce what reaches your bank account.",
    },
  },
];

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Income Tax Works in the UK (2026/27)",
    description:
      "A plain-English guide to how Income Tax works in the UK, including Personal Allowance, tax bands, Scotland differences, and why salary after tax feels lower than gross pay.",
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
            How income tax works in the UK
          </h1>

          <p className="mt-4 app-copy">
            Income Tax in the UK is progressive. That means different parts of
            your income are taxed at different rates rather than your whole
            salary being taxed at one flat percentage.
          </p>

          <p className="mt-4 app-copy">
            This is one of the biggest reasons people misunderstand pay. A salary
            may cross into a higher band, but that does <strong>not</strong>{" "}
            mean the entire salary is suddenly taxed at the higher rate.
          </p>

          <SnippetBlock
            question="How does Income Tax work in the UK?"
            answer="Income Tax works by taxing different slices of taxable income at different rates. Most employees first benefit from a Personal Allowance, then move through tax bands depending on how much taxable income they earn."
            bullets={[
              "Most people get a Personal Allowance before Income Tax starts",
              "Only the income inside each band is taxed at that band’s rate",
              "Crossing a threshold does not re-tax your full salary",
              "Take-home pay is also affected by National Insurance, pension, and student loan deductions",
            ]}
          />

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Step 1: understand the Personal Allowance
            </h2>

            <p className="mt-4 app-copy">
              For the 2026/27 tax year, the standard Personal Allowance is{" "}
              <strong>£12,570</strong>. For many employees, that means the first
              £12,570 of income is not charged to Income Tax.
            </p>

            <p className="mt-4 app-copy">
              Once income goes above that point, Income Tax starts applying to
              the taxable portion above the allowance, not to the entire salary.
            </p>

            <div
              className="mt-5 rounded-[24px] border px-5 py-5"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-sm font-semibold app-title">
                Important high-income rule
              </p>
              <p className="mt-2 text-sm leading-7 app-copy">
                If adjusted net income goes above <strong>£100,000</strong>, the
                Personal Allowance is reduced by £1 for every £2 above that
                limit. It falls to zero at <strong>£125,140</strong>.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Step 2: understand the main Income Tax bands
            </h2>

            <p className="mt-4 app-copy">
              For employees in England, Wales, and Northern Ireland, the main
              2026/27 Income Tax structure is usually understood like this:
            </p>

            <div className="mt-5 grid gap-3">
              {englandWalesNiBands.map((band) => (
                <div
                  key={band.label}
                  className="rounded-[22px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold app-title">
                        {band.label}
                      </p>
                      <p className="mt-1 text-sm app-copy">{band.range}</p>
                    </div>

                    <div
                      className="inline-flex rounded-full border px-3 py-1.5 text-sm font-semibold"
                      style={{
                        borderColor: "var(--line)",
                        background: "var(--surface-1)",
                        color: "var(--text)",
                      }}
                    >
                      {band.rate}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-7 app-copy">{band.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Example: how a £30,000 salary is taxed
            </h2>

            <p className="mt-4 app-copy">
              A common mistake is thinking someone on £30,000 is “in the 20%
              band” so 20% applies to the whole salary. That is not how it
              works.
            </p>

            <p className="mt-4 app-copy">
              A simpler way to think about it:
            </p>

            <div className="mt-5 grid gap-3">
              {exampleRows.map((row) => (
                <div
                  key={row.slice}
                  className="rounded-[22px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold app-title">
                        {row.slice}
                      </p>
                      <p className="mt-1 text-sm app-copy">Tax rate: {row.rate}</p>
                    </div>

                    <div className="text-base font-semibold app-title">
                      Tax: {row.tax}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 app-copy">
              So the total Income Tax is about <strong>£3,486</strong> before
              thinking about National Insurance, pension, or student loan.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Scotland works differently
            </h2>

            <p className="mt-4 app-copy">
              Scottish Income Tax uses different bands and rates for
              non-savings, non-dividend income. That means the same salary can
              produce a different Income Tax result in Scotland than in England,
              Wales, or Northern Ireland.
            </p>

            <div className="mt-5 grid gap-3">
              {scotlandBands.map((band) => (
                <div
                  key={band.label}
                  className="rounded-[22px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold app-title">
                        {band.label}
                      </p>
                      <p className="mt-1 text-sm app-copy">{band.range}</p>
                    </div>

                    <div
                      className="inline-flex rounded-full border px-3 py-1.5 text-sm font-semibold"
                      style={{
                        borderColor: "var(--line)",
                        background: "var(--surface-1)",
                        color: "var(--text)",
                      }}
                    >
                      {band.rate}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 app-copy">
              This is exactly why Scotland salary pages should be checked
              separately instead of assuming the UK result is identical.
            </p>
          </section>

          <AdSlot label="Advertisement" />

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              Why Income Tax is not the same as take-home pay
            </h2>

            <p className="mt-4 app-copy">
              Even if you fully understand Income Tax, your take-home pay will
              still usually be lower than expected unless you also account for:
            </p>

            <ul className="mt-4 space-y-2 app-copy">
              <li>• National Insurance</li>
              <li>• pension contributions</li>
              <li>• student loan deductions</li>
              <li>• tax code issues</li>
              <li>• payroll timing and cumulative PAYE</li>
              <li>• bonus or irregular income months</li>
            </ul>

            <p className="mt-5 app-copy">
              That is why many users do not really need a tax-bands lecture on
              its own. They need a way to connect Income Tax to the actual
              monthly result.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              The most common misunderstandings
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
                  “I crossed the 40% band so all my salary is taxed at 40%”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  False. Only the part above the higher-rate threshold is taxed
                  at 40%.
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
                  “Income Tax explains everything on my payslip”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  False. National Insurance, pension, student loan, and payroll
                  timing can change the final number a lot.
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
                  “A higher salary band always feels proportionally better”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Not always. Extra gross pay may convert less efficiently once
                  deductions rise.
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
                  “The tax code does not matter if I know my salary”
                </p>
                <p className="mt-3 text-sm leading-7 app-copy">
                  False. The code can materially change what is deducted in the
                  first place.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold app-title">
              So what should you do with this?
            </h2>

            <p className="mt-4 app-copy">
              Once you understand how Income Tax works, the smartest next step is
              usually not more theory. It is checking how that theory turns into
              your actual monthly pay, or comparing it against another salary
              route.
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
                  Best when you want the full take-home view, not just the tax band explanation.
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
                  Compare two salaries after deductions
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the real question is whether the next salary jump is actually worth it.
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
                  Check whether a payslip looks on track
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when the salary theory makes sense but the real payslip still feels wrong.
                </p>
              </Link>

              <Link
                href="/guides/uk-tax-bands-explained-simple"
                className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-medium app-title">
                  Read the tax bands guide
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Best when you want a simpler band-by-band explanation without the wider salary context.
                </p>
              </Link>
            </div>
          </section>

          <RelatedLinks
            title="Related tools and guides"
            links={[
              { title: "UK salary calculator", href: "/calculator" },
              { title: "Compare two salaries", href: "/compare-salary" },
              {
                title: "UK tax bands explained simply",
                href: "/guides/uk-tax-bands-explained-simple",
              },
              {
                title: "How much tax do I pay in the UK?",
                href: "/guides/how-much-tax-do-i-pay-uk",
              },
              {
                title: "Take-home pay explained",
                href: "/guides/take-home-pay-explained",
              },
              {
                title: "Check if your payslip looks right",
                href: "/payslip-checker",
              },
            ]}
          />

          <p className="mt-8 text-xs app-subtle">
            Income Tax is only one part of the salary story. The monthly amount
            you keep is usually the number that matters most.
          </p>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}