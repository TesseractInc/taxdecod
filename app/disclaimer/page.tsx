import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const disclaimerSections = [
  {
    title: "General position",
    body: "TaxDecod provides estimate-based salary, deduction, and take-home guidance for informational use. Nothing on the site should be read as payroll processing, legal advice, regulated financial advice, or a formal tax determination.",
  },
  {
    title: "No HMRC or employer authority",
    body: "TaxDecod is not HMRC, is not affiliated with HMRC, and does not control employer payroll systems. Final tax treatment, tax-code application, refund decisions, underpayments, and official records remain subject to HMRC and employer payroll processes.",
  },
  {
    title: "Estimate limitations",
    body: "Results can differ from real payslips or payroll outcomes due to cumulative PAYE treatment, tax-code variation, pension setup, irregular income, benefits, salary sacrifice structure, timing issues, and employer-specific deductions.",
  },
  {
    title: "User responsibility",
    body: "Users should verify important decisions against their payslip, P60, employer payroll information, HMRC records, or a qualified professional where appropriate. TaxDecod is designed to support understanding, not replace formal verification.",
  },
  {
    title: "Use at your own judgment",
    body: "By using this site, users accept that TaxDecod outputs are guidance tools only and should be used with reasonable judgment, especially in matters involving employment, tax, salary negotiation, or financial planning.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Disclaimer"
            title="Important interpretation and limitation notice"
            description="This page explains the limits of TaxDecod so users can understand where the platform is helpful and where formal payroll, HMRC, or professional confirmation is still required."
          />

          <div className="mt-10 grid gap-4">
            {disclaimerSections.map((section) => (
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