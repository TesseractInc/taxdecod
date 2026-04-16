import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import PageHero from "../../../components/ui/page-hero";

const sections = [
  {
    title: "Why payslips feel confusing",
    body: "Payslips compress several important deductions into short labels and figures. For many users, the problem is not the existence of the numbers but understanding what each line is doing and whether it looks normal.",
  },
  {
    title: "The main lines users usually need to understand",
    body: "The main lines are usually gross pay, Income Tax, National Insurance, pension, tax code, and year-to-date totals. These are the lines that most often affect whether take-home pay feels right or wrong.",
  },
  {
    title: "Why year-to-date totals matter",
    body: "Year-to-date totals help show whether deductions are building in a way that broadly matches the tax year so far. They can be useful when users suspect overpayment, underpayment, or an unusual tax-code effect.",
  },
  {
    title: "What to do if a payslip feels wrong",
    body: "The best next step is usually to check whether the tax code looks right, whether the year-to-date figures look broadly on track, and whether the salary route itself matches what you expected after deductions.",
  },
];

export default function PayslipGuidePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Guide"
            title="How to read a payslip in the UK"
            description="A plain-English guide to the main payslip lines and why tax code, PAYE, National Insurance, and year-to-date totals matter."
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
              <Link href="/payslip-checker" className="app-button-primary">
                Check a payslip
              </Link>
              <Link href="/tax-code-decoder" className="app-button-secondary">
                Decode a tax code
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