import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const sections = [
  {
    title: "What TaxDecod is",
    body: "TaxDecod is a UK salary and deduction interpretation platform. It is designed to help users understand what a salary actually means after Income Tax, National Insurance, pension, and student loan deductions — not just what the gross number looks like on paper.",
  },
  {
    title: "What TaxDecod is built for",
    body: "The platform is built for people making salary-related decisions: comparing offers, checking whether a raise materially changes monthly life, understanding payslip deductions, working backwards from a target income, and interpreting salary outcomes more clearly.",
  },
  {
    title: "What TaxDecod is not",
    body: "TaxDecod is not payroll software, is not HMRC, and is not a substitute for regulated legal, financial, or tax advice. It provides structured guidance and estimate-based interpretation to help users understand salary numbers more clearly and ask better follow-up questions.",
  },
  {
    title: "Why this platform exists",
    body: "Many salary tools stop at a number. TaxDecod is built around the idea that the real question is usually what a salary actually means in real life — month to month, after deductions, in comparison with alternatives, and in the context of real decisions.",
  },
];

export default function AboutPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="About"
            title="About TaxDecod"
            description="TaxDecod is built to make UK salary, deduction, and take-home outcomes easier to understand for real-world decision making."
          />

          <section
            className="mt-8 rounded-[28px] border px-6 py-5 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
              Platform framing
            </p>
            <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
              TaxDecod should be read as a salary-decision and deduction
              interpretation platform for UK users. It exists to make salary
              numbers more understandable, not to replace payroll, HMRC records,
              or regulated advice.
            </p>
          </section>

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
            <p className="text-sm font-medium app-accent">Public contact and trust</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
              How TaxDecod should be interpreted
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
              TaxDecod is designed to support salary understanding, deduction
              interpretation, and planning. Important outcomes should still be
              checked against employer payroll records, HMRC information, and
              other official documentation where appropriate.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/methodology" className="app-button-secondary">
                Read methodology
              </Link>
              <Link href="/contact" className="app-button-primary">
                Contact TaxDecod
              </Link>
              <Link href="/guides" className="app-button-secondary">
                Read guides
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}