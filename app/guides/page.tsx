import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const guides = [
  {
    title: "How Income Tax works in the UK",
    description:
      "A plain-English guide to how Income Tax affects salary and why take-home differs from gross pay.",
    href: "/guides/how-income-tax-works-uk",
  },
  {
    title: "How student loan affects salary in the UK",
    description:
      "A guide to why student loan repayment can materially change what salary actually leaves you with.",
    href: "/guides/how-student-loan-affects-salary-uk",
  },
  {
    title: "How to read a payslip in the UK",
    description:
      "A plain-English guide to PAYE, National Insurance, pension, tax code, and year-to-date deduction lines.",
    href: "/guides/how-to-read-a-payslip-uk",
  },
  {
    title: "How much tax do I pay in the UK?",
    description:
      "Understand how salary is reduced by Income Tax, National Insurance, pension, and student loan deductions.",
    href: "/guides/how-much-tax-do-i-pay-uk",
  },
  {
    title: "Net vs gross salary explained",
    description:
      "Understand the real difference between gross salary and what actually reaches your bank account.",
    href: "/guides/net-vs-gross-salary-explained",
  },
  {
    title: "How much salary increase is worth it?",
    description:
      "See why a pay rise can feel smaller than expected after deductions and how to judge it more realistically.",
    href: "/guides/how-much-salary-increase-is-worth-it",
  },
];

export default function GuidesPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Guides"
            title="Salary and payslip guides"
            description="These guides are designed to make TaxDecod more useful beyond calculation alone by adding context, interpretation, and plain-English salary understanding."
          />

          <section
            className="mt-8 rounded-[28px] border px-6 py-5 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
              Why these guides exist
            </p>
            <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
              TaxDecod is not built around calculation alone. These guides exist
              to explain the meaning behind salary numbers, deductions, payslips,
              and monthly outcomes in a clearer, more useful way.
            </p>
          </section>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-[30px] border px-6 py-6 transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-strong)",
                }}
              >
                <h2 className="text-2xl font-semibold tracking-tight app-title">
                  {guide.title}
                </h2>
                <p className="mt-4 text-sm leading-8 app-copy">
                  {guide.description}
                </p>
                <p className="mt-6 text-sm font-semibold app-accent">
                  Read guide →
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
              After reading a guide, the best next move is usually to check a
              salary, compare two salary routes, inspect a payslip, or decode a tax code.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/calculator" className="app-button-primary">
                Check a salary
              </Link>
              <Link href="/compare-salary" className="app-button-secondary">
                Compare salaries
              </Link>
              <Link href="/payslip-checker" className="app-button-secondary">
                Check a payslip
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}