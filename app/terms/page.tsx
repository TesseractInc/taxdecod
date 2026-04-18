import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export const metadata: Metadata = {
  title: "Terms of Use | TaxDecod",
  description:
    "Read the terms for using TaxDecod, including service scope, limitations of reliance, content availability, and user responsibility.",
};

const termSections = [
  {
    title: "Use of the service",
    body: "By using TaxDecod, users agree to use the site lawfully and responsibly. The platform is offered as an informational salary, payslip, and deduction guidance service rather than payroll software, legal advice, or a regulated financial advisory service.",
  },
  {
    title: "Informational nature of the platform",
    body: "TaxDecod is built to support salary understanding, interpretation, and decision preparation. It should not be treated as an official payroll record, an HMRC record, or a guarantee of tax treatment or future financial outcome.",
  },
  {
    title: "No guarantee of exact result",
    body: "TaxDecod does not guarantee that any estimate, benchmark, comparison, refund indication, or interpretation on the site will exactly match employer payroll results, HMRC records, or future tax outcomes.",
  },
  {
    title: "Content and tool availability",
    body: "TaxDecod may update, improve, pause, remove, or replace tools, routes, content blocks, and features as the platform develops. The service is provided on an ongoing-improvement basis rather than a guarantee of uninterrupted availability.",
  },
  {
    title: "User judgment and verification",
    body: "Users remain responsible for verifying important decisions against official documents, payslips, employer payroll information, HMRC records, and qualified professional advice where appropriate.",
  },
  {
    title: "Limitation of reliance",
    body: "TaxDecod should not be used as the sole basis for employment decisions, salary negotiation, formal tax action, legal positions, or financial commitments without additional verification from appropriate official or professional sources.",
  },
  {
    title: "Intellectual property and site content",
    body: "Unless otherwise stated, the design, layout, copy, tool structure, and platform content of TaxDecod are provided for user access and platform use only. Users should not copy, republish, or misuse platform content in a way that breaches applicable rights or laws.",
  },
  {
    title: "Acceptance of terms",
    body: "By continuing to use the platform, users accept these terms together with the published privacy, disclaimer, methodology, and trust framing associated with the site.",
  },
];

export default function TermsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Terms"
            title="Terms for using TaxDecod"
            description="These terms explain the basis on which TaxDecod is offered and how the platform should be used and interpreted."
          />

          <div className="mt-10 grid gap-4">
            {termSections.map((section) => (
              <section
                key={section.title}
                className="rounded-[30px] border px-6 py-6 sm:px-7"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-strong)",
                }}
              >
                <h2 className="text-2xl font-semibold tracking-tight app-title">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <section
            className="mt-10 rounded-[30px] border px-6 py-6 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <h2 className="text-2xl font-semibold tracking-tight app-title">
              Read this alongside
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
              These terms work together with the site’s privacy, disclaimer, and
              methodology pages to explain what TaxDecod does, what it does not do,
              and how users should interpret its outputs.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/privacy-policy" className="app-button-secondary">
                Privacy policy
              </Link>
              <Link href="/disclaimer" className="app-button-secondary">
                Disclaimer
              </Link>
              <Link href="/methodology" className="app-button-secondary">
                Methodology
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}