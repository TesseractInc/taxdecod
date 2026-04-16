import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const methodologySections = [
  {
    title: "What TaxDecod is built to do",
    body: "TaxDecod is designed to help users understand salary, deductions, and take-home outcomes more clearly. The site is built for estimation, interpretation, and decision support — especially where gross salary alone is not enough to answer the real question.",
  },
  {
    title: "How salary outcomes are approached",
    body: "TaxDecod uses current UK tax-year logic, visible assumptions, and structured deduction modelling to estimate Income Tax, National Insurance, pension impact, and student loan drag where applicable. The aim is to make outputs understandable, not just technically generated.",
  },
  {
    title: "Why estimates can differ from payroll",
    body: "Actual employer payroll outcomes may differ because real payslips can be affected by tax-code changes, cumulative PAYE treatment, irregular pay, bonus treatment, salary sacrifice setup, payroll timing, and employer-specific deductions or benefits.",
  },
  {
    title: "How benchmark and comparison pages should be read",
    body: "Benchmark, comparison, and salary-exploration pages are designed to help users reason about relative value, market context, and take-home trade-offs. They are not employment-market guarantees, official salary ranges, or financial recommendations.",
  },
  {
    title: "What this methodology does not claim",
    body: "TaxDecod does not claim to replace payroll software, regulated tax advice, legal advice, or an HMRC record. It does not decide refunds, underpayments, or formal tax positions. It provides structured guidance to help users ask better questions and understand their numbers more clearly.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Methodology"
            title="How TaxDecod approaches salary and deduction estimates"
            description="This page explains the operating logic behind the platform so users can understand what the site is designed to do, what it is not designed to do, and how outputs should be interpreted."
          />

          <div className="mt-10 grid gap-4">
            {methodologySections.map((section) => (
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