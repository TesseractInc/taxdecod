import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export const metadata: Metadata = {
  title: "Contact TaxDecod | Support, Corrections & Platform Questions",
  description:
    "Contact TaxDecod for general support, issue reporting, correction requests, and platform-related questions about salary and take-home pay calculations.",
};

const contactCards = [
  {
    title: "General support",
    body: "Use this route for general site questions, broken-page reports, correction requests, and platform feedback.",
  },
  {
    title: "Calculation and content issues",
    body: "If you believe a page, threshold, wording block, or tool output needs review, contact TaxDecod with the page URL and a short explanation of the issue.",
  },
  {
    title: "What this contact route is not for",
    body: "This page is not a route for personal tax advice, legal advice, payroll processing support, or case-specific HMRC decisions.",
  },
];

export default function ContactPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Contact"
            title="Contact TaxDecod"
            description="Use this page for general support, issue reporting, correction requests, and trust-related questions about how TaxDecod works."
          />

          <section
            className="mt-8 rounded-[28px] border px-6 py-5 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
              Contact framing
            </p>
            <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
              TaxDecod is a guidance platform built to help users understand UK
              salary, deductions, and take-home outcomes more clearly. This
              contact route is for platform-level questions and quality issues,
              not for personal legal, payroll, or regulated tax advice.
            </p>
          </section>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <section
              className="rounded-[30px] border px-6 py-6 sm:px-7"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <h2 className="text-2xl font-semibold tracking-tight app-title">
                Support and issue reporting
              </h2>

              <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
                For general support, correction requests, or trust-related
                questions about how a page should be interpreted, contact:
              </p>

              <div
                className="mt-5 rounded-[22px] border px-4 py-4"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-semibold app-title">
                  contact@taxdecod.com
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Please include the relevant page URL and a short explanation if
                  you are reporting a calculation, wording, or trust-related issue.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm leading-7 app-copy">
                  TaxDecod aims to review genuine platform issues, broken links,
                  and obvious content or logic problems as quickly as possible.
                </p>
                <p className="text-sm leading-7 app-copy">
                  For formal tax positions, payroll corrections, or legally
                  significant questions, users should verify details with HMRC,
                  their employer’s payroll team, or a qualified professional.
                </p>
              </div>
            </section>

            <section
              className="rounded-[30px] border px-6 py-6 sm:px-7"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <h2 className="text-2xl font-semibold tracking-tight app-title">
                Important note
              </h2>

              <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
                TaxDecod can explain how the platform is designed to work, but it
                cannot provide personal payroll handling, regulated financial advice,
                legal advice, or direct HMRC support.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/methodology" className="app-button-secondary">
                  Read methodology
                </Link>
                <Link href="/disclaimer" className="app-button-secondary">
                  Read disclaimer
                </Link>
                <Link href="/assumptions" className="app-button-secondary">
                  Read assumptions
                </Link>
              </div>
            </section>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {contactCards.map((card) => (
              <section
                key={card.title}
                className="rounded-[28px] border px-6 py-6"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <h2 className="text-lg font-semibold app-title">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 app-copy">{card.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}