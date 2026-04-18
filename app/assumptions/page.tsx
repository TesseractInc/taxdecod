import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import RelatedLinks from "../../components/seo/related-links";

export const metadata: Metadata = {
  title: "Assumptions | TaxDecod",
  description:
    "Read the main assumptions used across TaxDecod salary, take-home, comparison, reverse planning, and interpretation routes.",
};

const assumptionCards = [
  {
    title: "Current UK tax-year framing",
    body: "Pages are designed around the current UK tax-year assumptions used across the platform, including the current 2026/27 trust layer and tax-year messaging.",
  },
  {
    title: "Standard employee-style logic",
    body: "Many routes assume a typical employee-style salary scenario unless a page clearly indicates a more specific setup or user-controlled settings are applied.",
  },
  {
    title: "Selected route settings matter",
    body: "Region, pension contribution, student loan plan, tax code, and route-specific context can all change the output. Users should always read the settings shown on the page they are using.",
  },
  {
    title: "Estimate-based interpretation",
    body: "Outputs are built to support understanding, planning, and first-check interpretation. They should not be treated as a direct payroll substitute.",
  },
];

const whyAssumptionsMatter = [
  {
    title: "Why assumptions exist",
    body: "Without assumptions, salary pages become inconsistent, confusing, and harder to compare. Assumptions create a stable baseline for clarity.",
  },
  {
    title: "Why assumptions can never cover every case",
    body: "Real payroll can vary because of employer rules, benefits, salary sacrifice, bonus timing, code changes, cumulative PAYE, and other context not always represented in a general tool.",
  },
  {
    title: "Why users should still verify where needed",
    body: "Where legal, financial, immigration, or employment decisions depend on precision, users should verify details using official records and qualified support.",
  },
  {
    title: "Why page context still matters",
    body: "A reverse salary page, a comparison page, a Scotland page, and a payslip route each have different intent. The assumption baseline should always be read in that context.",
  },
];

export default function AssumptionsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Assumptions</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              The baseline assumptions behind TaxDecod outputs
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              TaxDecod uses a transparent assumption layer so salary and
              take-home outputs can be interpreted more consistently. This page
              explains the general assumptions users should keep in mind when
              reading platform outputs.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description="Assumptions are part of the trust layer. They are intended to create clarity, not to suggest that every real payroll case will match the same baseline perfectly."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Baseline employee-style assumptions",
                "Settings and route context still matter",
                "Official records override estimates",
              ]}
            />
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Main assumptions
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {assumptionCards.map((item) => (
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
            <p className="text-sm font-medium app-accent">Important user note</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
              A baseline assumption is not a guarantee of exact payroll alignment
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-base">
              The purpose of assumptions is to create a stable interpretation
              layer. They are not a promise that every employer payroll outcome,
              payslip line, or tax position will match the baseline exactly.
              Real-world variations can and do occur.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Why assumptions matter
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {whyAssumptionsMatter.map((item) => (
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
              href="/methodology"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">Methodology</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Read how TaxDecod applies logic across core route types.
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
              <p className="text-lg font-semibold app-title">Disclaimer</p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Read what the platform is and is not intended to provide.
              </p>
            </Link>

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
                Read the broader product purpose and platform direction.
              </p>
            </Link>
          </section>

          <div className="mt-12">
            <RelatedLinks
              title="Trust and interpretation pages"
              links={[
                { title: "About", href: "/about" },
                { title: "Methodology", href: "/methodology" },
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