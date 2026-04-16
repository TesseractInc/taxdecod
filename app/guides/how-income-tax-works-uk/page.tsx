import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import PageHero from "../../../components/ui/page-hero";

const sections = [
  {
    title: "Why gross salary is not the real answer",
    body: "Gross salary is the headline figure before deductions. What matters in practice is how much remains after Income Tax, National Insurance, pension, and any other applicable deductions.",
  },
  {
    title: "What Income Tax is doing to salary",
    body: "Income Tax is charged on taxable income according to the tax-year rules and the way PAYE is applied. This is one of the biggest reasons why a salary that looks strong at gross level can feel materially smaller in practice.",
  },
  {
    title: "Why two salaries can feel closer than expected",
    body: "As salary rises, more of the increase can be affected by higher deduction pressure. That means a gross pay rise does not always translate into a proportionate increase in take-home pay.",
  },
  {
    title: "Why this matters for decision making",
    body: "When comparing roles, negotiating salary, or setting target income goals, understanding the deduction effect matters more than relying on the gross number alone.",
  },
];

export default function IncomeTaxGuidePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Guide"
            title="How Income Tax works in the UK"
            description="A plain-English guide to why tax changes what salary actually leaves you with and why gross pay is never the whole story."
          />

          <div className="mt-10 grid gap-4">
            {sections.map((section) => (
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
              background: "var(--card-strong)",
            }}
          >
            <h2 className="text-2xl font-semibold tracking-tight app-title">
              Related next steps
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/calculator" className="app-button-primary">
                Check a salary
              </Link>
              <Link href="/compare-salary" className="app-button-secondary">
                Compare two salaries
              </Link>
              <Link href="/guides" className="app-button-secondary">
                Back to guides
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}