import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import CrossLinkRail from "../../components/seo/cross-link-rail";
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
    body: "The product is built around real questions like whether a raise is worth it, what salary is needed for a monthly target, and whether a payslip looks broadly on track.",
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
    body: "Programmatic salary pages exist to make after-tax answers easier to find and easier to compare, while still pushing users toward more useful next steps.",
  },
  {
    title: "Benchmarks and good-salary pages",
    body: "These routes add role, region, and city-context interpretation so the site can help with salary meaning, not just tax output.",
  },
  {
    title: "Guides and trust pages",
    body: "Editorial and trust pages exist to explain logic, assumptions, limitations, and responsible interpretation so the platform feels more mature and transparent.",
  },
];

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">About TaxDecod</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
              A UK salary clarity platform built for real decision-making
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              TaxDecod exists to help users move from headline salary curiosity
              into practical understanding. The platform is designed around what
              salary means after deductions, whether a raise is worth it, what a
              monthly target requires, and how salary interpretation changes when
              role, region, or payslip context is added.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description="About pages matter because they explain what the platform is trying to do, what kind of guidance it provides, and what users should not mistake it for."
              points={[
                "Built for salary clarity and decision support",
                "Estimate-based platform logic",
                "Transparent about limits and assumptions",
                "Not payroll, HMRC, or regulated advice",
              ]}
            />
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Core product principles
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {principles.map((item) => (
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
              What the main route families are for
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {whatPagesDo.map((item) => (
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
              TaxDecod is designed to support understanding, not replace official records
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-base">
              The platform is built to improve salary understanding and help users
              take a better next step. It is not a substitute for employer payroll,
              formal HMRC records, regulated financial advice, legal advice, or
              professional tax advice.
            </p>
          </section>

          <CrossLinkRail
            eyebrow="Trust and interpretation layer"
            title="Read the pages that explain how TaxDecod should be used"
            description="These pages are the strongest trust routes for users who need to understand logic, assumptions, boundaries, and platform intent."
            items={[
              {
                href: "/methodology",
                title: "Methodology",
                description:
                  "Read how TaxDecod approaches salary outputs, comparison logic, and planning routes.",
              },
              {
                href: "/assumptions",
                title: "Assumptions",
                description:
                  "Read the baseline assumptions behind estimate-based outputs and route logic.",
              },
              {
                href: "/disclaimer",
                title: "Disclaimer",
                description:
                  "Understand what the platform is and is not intended to provide.",
              },
              {
                href: "/contact",
                title: "Contact",
                description:
                  "Report a platform issue or reach out with a route-specific question.",
              },
            ]}
          />

          <section className="mt-12 grid gap-4 md:grid-cols-3">
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
                Browse the main salary, monthly, compare, and city-intent route families.
              </p>
            </Link>

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
                Move into the calculator, compare, reverse, payslip, and support tools.
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
                Read the editorial explanation layer behind TaxDecod decisions.
              </p>
            </Link>
          </section>

          <div className="mt-12">
            <RelatedLinks
              title="Trust and legal pages"
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