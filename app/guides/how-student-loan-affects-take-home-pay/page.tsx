import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import PageHero from "../../../components/ui/page-hero";

const sections = [
  {
    title: "Why student loan matters more than many users expect",
    body: "Student loan repayment can materially reduce what salary leaves you with, especially when users focus only on gross pay and do not account for how repayment interacts with tax and other deductions.",
  },
  {
    title: "Why the same salary can feel weaker",
    body: "Two people on the same gross salary can experience different take-home outcomes if one has student loan deductions and the other does not. That makes salary comparison harder if student loan is ignored.",
  },
  {
    title: "Why this affects job and raise decisions",
    body: "A raise may still feel smaller than expected when student loan drag is applied. This is one reason why comparison and reverse-calculation tools are useful in salary planning.",
  },
  {
    title: "How to use this insight properly",
    body: "The best way to use this is to compare salaries with and without loan drag in mind, rather than assuming the gross increase tells the whole story.",
  },
];

export default function StudentLoanGuidePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Guide"
            title="How student loan affects take-home pay"
            description="A plain-English guide to why student loan repayment can materially change what salary actually leaves you with."
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
              <Link href="/student-loan-calculator" className="app-button-primary">
                Open student loan calculator
              </Link>
              <Link href="/compare-salary" className="app-button-secondary">
                Compare salaries
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