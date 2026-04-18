import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const tools = [
  {
    title: "Student loan calculator",
    description:
      "Estimate how student loan repayment changes what salary actually leaves you with.",
    href: "/student-loan-calculator",
  },
  {
    title: "Bonus tax calculator",
    description:
      "Estimate how bonus pay is affected by tax pressure and salary context.",
    href: "/bonus-tax-calculator",
  },
  {
    title: "Overtime calculator",
    description:
      "Estimate how overtime affects take-home rather than just gross pay.",
    href: "/overtime-calculator",
  },
  {
    title: "Salary sacrifice calculator",
    description:
      "Estimate how sacrifice can change tax efficiency and overall take-home structure.",
    href: "/salary-sacrifice-calculator",
  },
  {
    title: "Tax refund calculator",
    description:
      "Check whether Income Tax paid looks broadly high, low, or aligned.",
    href: "/tax-refund-calculator",
  },
  {
    title: "Tax code decoder",
    description:
      "Decode common PAYE tax codes in plain English before guessing at deduction issues.",
    href: "/tax-code-decoder",
  },
  {
    title: "Leave pay tools",
    description:
      "Estimate maternity, paternity, and leave-pay routes under statutory-style rules.",
    href: "/leave-pay",
  },
];

export default function SalaryToolsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Salary tools"
            title="Specialist salary and deduction tools"
            description="These tools exist for more specific salary questions that go beyond the main calculator, comparison, and reverse-planning routes."
          />

          <section
            className="mt-8 rounded-[28px] border px-6 py-5 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
              How to use this page
            </p>
            <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
              Use these routes when your question is narrower than a normal salary
              check — for example student loan drag, bonus tax, tax-code interpretation,
              refund signals, or statutory-style pay routes.
            </p>
          </section>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-[30px] border px-6 py-6 transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-strong)",
                }}
              >
                <h2 className="text-2xl font-semibold tracking-tight app-title">
                  {tool.title}
                </h2>
                <p className="mt-4 text-sm leading-8 app-copy">
                  {tool.description}
                </p>
                <p className="mt-6 text-sm font-semibold app-accent">
                  Open route →
                </p>
              </Link>
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
            <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
              If the specialist route still leaves a broader question open, the
              best next move is usually to return to the main calculator, compare
              two salary outcomes, or read a guide for more context.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/calculator" className="app-button-primary">
                Open salary calculator
              </Link>
              <Link href="/compare-salary" className="app-button-secondary">
                Compare salaries
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