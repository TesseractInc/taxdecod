import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const assumptions = [
  {
    title: "Tax year framing",
    body: "TaxDecod pages are framed around the current UK tax year and the site’s published interpretation of standard employee salary treatment. Results should be read within that tax-year context, not as timeless figures.",
  },
  {
    title: "Standard employee assumptions",
    body: "Many salary calculations assume a standard employee-style route with PAYE Income Tax, employee National Insurance, and ordinary salary flow. Real employer payroll setups can differ depending on tax code, benefit treatment, sacrifice arrangements, and pay timing.",
  },
  {
    title: "Pension and student loan assumptions",
    body: "Where pension and student loan settings are used, TaxDecod assumes the selected deduction structure applies consistently to the salary route being tested. Real payroll treatment may vary depending on scheme design and employer setup.",
  },
  {
    title: "Payslip and refund checks",
    body: "Payslip and refund-related pages provide estimate-based guidance only. They are best used as first-check interpretation tools rather than final determinations of overpayment, underpayment, or payroll error.",
  },
  {
    title: "Benchmark and salary-context assumptions",
    body: "Benchmark and salary-context pages are designed to support interpretation and comparison. They should not be read as guarantees of market salary, guaranteed offers, or formal compensation standards.",
  },
];

export default function AssumptionsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Assumptions"
            title="Core assumptions behind TaxDecod pages"
            description="This page explains the practical assumptions that sit behind TaxDecod’s salary, deduction, payslip, and comparison outputs."
          />

          <div className="mt-10 grid gap-4">
            {assumptions.map((section) => (
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
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}