import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import RelatedLinks from "../../components/seo/related-links";

export const metadata: Metadata = {
  title: "About TaxDecod | UK Salary Clarity Platform",
  description:
    "Learn what TaxDecod is, what it is designed to help with, and how the platform approaches UK salary clarity, take-home pay, and decision support.",
};

const principles = [
  {
    title: "Built for salary clarity",
    body: "TaxDecod is designed to help users understand what salary actually means after deductions, not just what the gross number looks like on paper.",
  },
  {
    title: "Designed for decision support",
    body: "The product is built around real user questions like whether a raise is worth it, what salary is needed for a monthly target, and whether a payslip looks broadly on track.",
  },
  {
    title: "Estimate-based and transparent",
    body: "The platform is designed around transparent assumptions and planning logic. It is not presented as employer payroll, formal tax advice, or an HMRC decision.",
  },
  {
    title: "Calm, practical, non-spammy",
    body: "TaxDecod is intended to feel useful, trustworthy, and clear rather than noisy, aggressive, or cluttered.",
  },
];

const whatPagesDo = [
  {
    title: "Core tools",
    body: "Interactive routes like the salary calculator, comparison tool, reverse salary calculator, payslip checker, and statutory pay tools are built to help with practical salary questions.",
  },
  {
    title: "Salary pages",
    body: "Programmatic salary pages exist to make after-tax answers easier to find and easier to compare, while still pushing users toward more useful next-step tools.",
  },
  {
    title: "Guides",
    body: "Editorial guides exist to explain the logic behind salary, tax, take-home pay, payslips, and common planning questions in plain English.",
  },
  {
    title: "Trust pages",
    body: "Methodology, assumptions, disclaimer, privacy, and terms pages exist so users can understand what the platform is doing, what it is not doing, and how to interpret outputs responsibly.",
  },
];

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TaxDecod",
    url: "https://taxdecod.com",
    description:
      "TaxDecod is a UK salary clarity platform built to help users understand take-home pay, salary comparisons, reverse salary planning, and payslip interpretation.",
  };

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />

          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">About TaxDecod</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              TaxDecod is built to make UK salary decisions clearer
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              TaxDecod is a UK salary clarity platform designed to help users
              understand what salary actually means after deductions. The goal is
              not just to show numbers, but to make salary, take-home pay,
              comparison, reverse planning, and payslip interpretation easier to
              understand in practical terms.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description="TaxDecod is designed around UK tax-year assumptions, planning logic, and transparent trust framing so users can understand what outputs mean and how to use them responsibly."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Built for salary clarity and planning",
                "Transparent assumptions and trust framing",
                "Not payroll, legal advice, or HMRC",
              ]}
            />
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              What TaxDecod is designed to help with
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {whatPagesDo.map((item) => (
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

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Product principles
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {principles.map((item) => (
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
            <p className="text-sm font-medium app-accent">Important trust note</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
              TaxDecod is a guidance and interpretation platform
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-base">
              TaxDecod is intended to help users understand salary outcomes more
              clearly. It is not a replacement for employer payroll, accountant
              advice, legal advice, regulated financial advice, or formal HMRC
              records and decisions. Where formal confirmation matters, users
              should always refer to official documents and qualified support.
            </p>
          </section>

          <section className="mt-12 grid gap-4 md:grid-cols-2">
            <Link
              href="/methodology"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Read the methodology
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                See how TaxDecod approaches salary calculations, comparisons,
                payslip checks, and guidance logic.
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
              <p className="text-lg font-semibold app-title">
                Read the assumptions
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Understand the default employee setup and the assumptions behind
                estimate-based outputs.
              </p>
            </Link>

            <Link
              href="/disclaimer"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Read the disclaimer
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Understand what TaxDecod is and is not designed to provide.
              </p>
            </Link>

            <Link
              href="/contact"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Contact</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Use the contact route for general questions, feedback, or site issues.
              </p>
            </Link>
          </section>

          <div className="mt-12">
            <RelatedLinks
              title="Trust and platform pages"
              links={[
                { title: "Methodology", href: "/methodology" },
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