import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import CrossLinkRail from "../../components/seo/cross-link-rail";
import RelatedLinks from "../../components/seo/related-links";

export const metadata: Metadata = {
  title: "Methodology | TaxDecod",
  description:
    "Understand how TaxDecod approaches UK salary calculations, take-home estimates, salary comparison logic, reverse salary planning, and payslip interpretation.",
};

const methodologySections = [
  {
    title: "Salary calculation logic",
    body: "Salary calculator routes estimate take-home pay using current UK tax-year assumptions, standard deduction logic, and the selected settings shown on the page, such as region, pension, and student loan plan where applicable.",
  },
  {
    title: "Comparison logic",
    body: "Comparison routes are designed to show the retained difference between salary options after deductions, not just the gross gap. This is intended to help users judge whether a raise or new role materially changes monthly life.",
  },
  {
    title: "Reverse salary planning",
    body: "Reverse routes estimate the gross salary required to reach a target monthly or annual net amount under the selected setup. These routes are intended for planning and salary-target thinking rather than payroll prediction.",
  },
  {
    title: "Payslip and tax-code interpretation",
    body: "Payslip and tax-code routes provide first-check interpretation only. They are designed to help users understand patterns, identify possible issues, and choose a better next step, not to replace payroll or HMRC records.",
  },
];

const scopeCards = [
  {
    title: "What the methodology is for",
    body: "This page exists to explain the logic and intent behind TaxDecod outputs so users understand what the platform is doing and how to interpret it responsibly.",
  },
  {
    title: "What the methodology is not",
    body: "This page is not a promise of payroll-perfect output in every case. Real payroll outcomes can vary because of employer configuration, cumulative PAYE, benefits, irregular pay, tax code changes, and other factors.",
  },
];

const sourceNotes = [
  {
    title: "Tax-year references",
    body: "TaxDecod is maintained using current UK tax-year assumptions and references to official GOV.UK / HMRC materials where relevant to platform logic and trust framing.",
  },
  {
    title: "Default employee setup",
    body: "Many pages use a default UK employee-style setup to keep outputs understandable and comparable. Where a route uses a specific configuration, that configuration should be read on the page itself.",
  },
  {
    title: "Estimate-based outputs",
    body: "Outputs are designed to support guidance, interpretation, and planning. They should not be treated as formal tax advice, legal advice, employer payroll, or an HMRC ruling.",
  },
  {
    title: "Page-specific context",
    body: "Some routes, such as comparison pages, reverse planning pages, student loan pages, or Scotland pages, apply route-specific context and should be read within that context.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Methodology</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              How TaxDecod approaches salary outputs and interpretation
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              TaxDecod is designed to help users understand salary, take-home pay,
              comparison logic, reverse planning, and payslip interpretation more
              clearly. This page explains the general methodology behind those outputs
              so users can interpret them more responsibly.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description="Methodology should be read alongside assumptions, route settings, and disclaimer language. Outputs are estimate-based and intended for clarity, guidance, and planning support."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Estimate-based guidance logic",
                "Transparent trust framing",
                "Not payroll or HMRC records",
              ]}
            />
          </div>

          <section className="mt-12 grid gap-4 md:grid-cols-2">
            {scopeCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border px-6 py-6"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-strong)",
                }}
              >
                <p className="text-lg font-semibold app-title">{item.title}</p>
                <p className="mt-3 text-sm leading-8 app-copy">{item.body}</p>
              </div>
            ))}
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Core methodology areas
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {methodologySections.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border px-6 py-6"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">{item.title}</p>
                  <p className="mt-3 text-sm leading-8 app-copy">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="mt-12 rounded-[30px] border px-6 py-6 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--card-strong)",
            }}
          >
            <p className="text-sm font-medium app-accent">Important interpretation note</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
              TaxDecod is designed to improve understanding, not replace official records
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-base">
              The platform is built to help users understand patterns, salary outcomes,
              and planning routes. Real payroll and formal tax outcomes can differ
              because of employer-specific processing, updated tax codes, irregular
              payments, benefits, cumulative PAYE, and other factors that may not be
              fully represented in an estimate-based tool.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Source and assumption notes
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {sourceNotes.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border px-6 py-6"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">{item.title}</p>
                  <p className="mt-3 text-sm leading-8 app-copy">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <CrossLinkRail
            eyebrow="Trust layer"
            title="Read the pages that complete the interpretation framework"
            description="Methodology is strongest when read together with assumptions, disclaimer language, and the broader platform context."
            items={[
              {
                href: "/assumptions",
                title: "Assumptions",
                description:
                  "Read the default employee-style and estimate-based assumptions behind outputs.",
              },
              {
                href: "/disclaimer",
                title: "Disclaimer",
                description:
                  "See what TaxDecod is and is not intended to provide.",
              },
              {
                href: "/about",
                title: "About",
                description:
                  "Read the broader platform purpose and product direction.",
              },
              {
                href: "/contact",
                title: "Contact",
                description:
                  "Report a platform issue or ask a route-specific question.",
              },
            ]}
          />

          <section className="mt-12 grid gap-4 md:grid-cols-3">
            <Link
              href="/salary-tools"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Salary tools</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move into the core product routes behind this methodology.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Salary hub</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Browse the main salary, monthly, compare, and guide route families.
              </p>
            </Link>

            <Link
              href="/guides"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Guides</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Read the editorial explanation layer behind route logic.
              </p>
            </Link>
          </section>

          <div className="mt-12">
            <RelatedLinks
              title="Trust and interpretation pages"
              links={[
                { title: "About", href: "/about" },
                { title: "Assumptions", href: "/assumptions" },
                { title: "Disclaimer", href: "/disclaimer" },
                { title: "Privacy Policy", href: "/privacy-policy" },
                { title: "Terms", href: "/terms" },
                { title: "Contact", href: "/contact" },
              ]}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}