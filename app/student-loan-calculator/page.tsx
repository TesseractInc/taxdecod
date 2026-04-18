import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import StudentLoanCalculator from "../../components/tools/student-loan/student-loan-calculator";
import { buildSeoMetadata } from "../../components/seo/metadata";
import PageSchema from "../../components/seo/page-schema";
import { TRUST_COPY } from "../../lib/tax/config";

export const metadata: Metadata = buildSeoMetadata({
  title: "Student Loan Repayment Calculator UK | TaxDecod",
  description:
    "See how student loan repayment changes take-home pay in the UK and compare the same salary with and without loan drag.",
  path: "/student-loan-calculator",
});

export default function StudentLoanCalculatorPage() {
  return (
    <main className="app-shell">
      <PageSchema
        pageUrl="https://taxdecod.com/student-loan-calculator"
        title="Student Loan Repayment Calculator UK | TaxDecod"
        description="Standalone student loan repayment and take-home impact calculator for UK salaries."
        breadcrumbs={[
          { name: "Home", url: "https://taxdecod.com" },
          { name: "Salary tools", url: "https://taxdecod.com/salary-tools" },
          {
            name: "Student loan calculator",
            url: "https://taxdecod.com/student-loan-calculator",
          },
        ]}
        faqItems={[
          {
            question: "How does student loan affect take-home pay?",
            answer:
              "Student loan repayments reduce net pay because repayment is taken from earnings above the relevant threshold for the selected plan.",
          },
          {
            question: "Why use a standalone student loan calculator?",
            answer:
              "Because it isolates student-loan drag and makes it easier to see how much salary is being reduced by repayments before moving into broader salary decisions.",
          },
        ]}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Standalone deduction tool"
            title="Student loan repayment calculator"
            description="Use this tool when the real question is not just salary after tax, but how much student loan repayment is changing what actually reaches you."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description="This page uses 2026/27-style UK deduction assumptions to help show how student loan repayment can change take-home pay."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Plan-based student loan logic",
                "Built for repayment drag comparison",
                "Useful before broader salary decisions",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why this tool matters">
              Student loan is one of the most misunderstood salary drags because
              a gross salary can look strong while the monthly result still feels
              weaker than expected after repayments.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Compare two salaries",
                  description:
                    "Useful when you want to see whether a raise still feels strong after student-loan drag.",
                },
                {
                  href: "/calculator",
                  title: "Open the full calculator",
                  description:
                    "Check the broader single-salary route with tax, pension, and student loan context together.",
                },
                {
                  href: "/guides/how-student-loan-affects-salary-uk",
                  title: "Read the student loan guide",
                  description:
                    "Useful when you want the plain-English explanation behind why repayments can make a salary feel weaker.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <StudentLoanCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}