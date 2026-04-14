import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "See how TaxDecod approaches UK salary, tax, deductions, take-home pay, and result interpretation.",
};

const methodologySections = [
  {
    title: "What TaxDecod is designed to do",
    body: "TaxDecod is designed to help users understand how gross salary turns into real take-home pay in the UK. The platform focuses on salary understanding, deduction visibility, comparison, reverse planning, and salary decision support rather than just showing a raw output number.",
  },
  {
    title: "How salary results are framed",
    body: "Results are presented as estimates based on the salary inputs a user provides and the tax logic implemented on the platform. The goal is to make salary outcomes easier to interpret through yearly, monthly, weekly, and deduction-focused views.",
  },
  {
    title: "What can affect the final real-world result",
    body: "Real payroll outcomes can vary depending on tax code, pension arrangement, salary sacrifice, payroll timing, benefit-in-kind treatment, student loan plan, Scottish tax treatment, employer setup, bonuses, and other circumstances that are not always fully captured in a simplified calculator flow.",
  },
  {
    title: "What the platform is not",
    body: "TaxDecod is not HMRC, is not a payroll bureau, and is not a substitute for personal tax, payroll, financial, legal, or regulated advice. Users should use platform outputs as guidance and context, not as a binding statement of what an employer or payroll system will pay.",
  },
];

const interpretationBlocks = [
  "Gross salary is the starting point, not the usable number.",
  "Net monthly pay is often the most decision-relevant salary view.",
  "Deductions should be understood individually, not treated as one hidden drop.",
  "Comparison and reverse-planning tools are used to support decision quality, not just curiosity.",
];

export default function MethodologyPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Methodology"
            title="How TaxDecod approaches salary logic and result interpretation"
            description="This page explains what TaxDecod is trying to solve, how results should be understood, and where estimate-based salary tools can differ from real payroll outcomes."
            ctaLabel="Open calculator"
            ctaHref="/calculator"
          />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              {methodologySections.map((section) => (
                <section key={section.title} className="app-card p-6 sm:p-7">
                  <h2 className="text-2xl font-semibold app-title">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 app-copy">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="app-card p-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
                  Interpretation principles
                </p>
                <div className="mt-5 space-y-3">
                  {interpretationBlocks.map((item) => (
                    <div key={item} className="app-soft rounded-2xl px-4 py-4">
                      <p className="text-sm leading-7 app-copy">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="app-card p-6">
                <h3 className="text-xl font-semibold app-title">
                  Related trust pages
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <Link href="/assumptions" className="block app-copy hover:underline">
                    Assumptions
                  </Link>
                  <Link href="/disclaimer" className="block app-copy hover:underline">
                    Disclaimer
                  </Link>
                  <Link href="/privacy-policy" className="block app-copy hover:underline">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="block app-copy hover:underline">
                    Terms
                  </Link>
                  <Link href="/contact" className="block app-copy hover:underline">
                    Contact
                  </Link>
                </div>
              </div>

              <div className="app-card p-6">
                <h3 className="text-xl font-semibold app-title">
                  Editorial ownership
                </h3>
                <p className="mt-3 text-sm leading-7 app-copy">
                  TaxDecod is responsible for the structure, wording, and
                  interpretation framing of the platform. This page exists so
                  users can understand how outputs should be read before making
                  salary decisions.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}