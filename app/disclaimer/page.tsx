import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import RelatedLinks from "../../components/seo/related-links";

export const metadata: Metadata = {
  title: "Disclaimer | TaxDecod",
  description:
    "Read the TaxDecod disclaimer and understand how to interpret estimate-based salary, tax, take-home, and payslip guidance responsibly.",
};

const disclaimerCards = [
  {
    title: "Guidance, not formal advice",
    body: "TaxDecod content and outputs are provided for general information, interpretation, and planning support. They are not legal advice, regulated financial advice, tax advice, or payroll advice.",
  },
  {
    title: "Estimate-based, not guaranteed exact",
    body: "Outputs are designed using assumptions and route settings. Real payroll and tax outcomes may differ because of employer setup, PAYE timing, benefits, code changes, and other factors.",
  },
  {
    title: "Official records take priority",
    body: "Where formal accuracy matters, users should rely on official payslips, employer payroll records, GOV.UK / HMRC materials, and qualified professional support where needed.",
  },
  {
    title: "User responsibility still matters",
    body: "Users remain responsible for how they interpret and act on outputs. TaxDecod is intended to support understanding, not to replace independent judgment or professional advice.",
  },
];

const highImportanceNotes = [
  {
    title: "Employment and payroll questions",
    body: "If a payroll issue, payslip discrepancy, or employer deduction issue matters to your employment situation, users should verify directly with their employer or payroll team.",
  },
  {
    title: "Tax and HMRC matters",
    body: "If a tax code issue, refund, underpayment, or formal tax position matters materially, users should verify with official records and professional or official support where appropriate.",
  },
  {
    title: "Immigration, visa, or legal reliance",
    body: "TaxDecod should not be relied on as a substitute for formal legal, immigration, regulatory, or compliance advice.",
  },
  {
    title: "Financial decisions",
    body: "Users should not treat TaxDecod as regulated financial advice. The platform is intended for clarity and planning support only.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Disclaimer</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              How TaxDecod outputs should be interpreted
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              TaxDecod is designed to help users understand salary, tax,
              take-home, comparison, reverse planning, and payslip questions more
              clearly. It should be used as a guidance and interpretation
              platform, not as a substitute for formal records, payroll systems,
              or professional advice.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description="This disclaimer exists to make the trust boundary clear. TaxDecod is designed for understanding and planning support, not for regulated or formal reliance."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Estimate-based salary guidance",
                "Official records override estimates",
                "Not legal, tax, or payroll advice",
              ]}
            />
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Main disclaimer points
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {disclaimerCards.map((item) => (
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
            <p className="text-sm font-medium app-accent">Important boundary</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
              TaxDecod should not be treated as a replacement for formal evidence or advice
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-base">
              Users should not rely on TaxDecod as a substitute for official
              payroll documents, formal HMRC records, legal advice, professional
              tax advice, employment advice, or regulated financial advice. The
              platform is intended to improve understanding and support better
              next-step decisions.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Higher-importance situations
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {highImportanceNotes.map((item) => (
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
            </div>
          </section>

          <section className="mt-12 grid gap-4 md:grid-cols-3">
            <Link
              href="/about"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">About</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Read the platform purpose and product direction.
              </p>
            </Link>

            <Link
              href="/methodology"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Methodology</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Read how TaxDecod approaches core route logic.
              </p>
            </Link>

            <Link
              href="/assumptions"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Assumptions</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Read the baseline assumptions behind outputs.
              </p>
            </Link>
          </section>

          <div className="mt-12">
            <RelatedLinks
              title="Trust and legal pages"
              links={[
                { title: "About", href: "/about" },
                { title: "Methodology", href: "/methodology" },
                { title: "Assumptions", href: "/assumptions" },
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