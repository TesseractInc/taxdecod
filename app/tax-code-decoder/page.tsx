import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import TaxCodeDecoder from "../../components/tools/tax-code-decoder";
import { TRUST_COPY } from "../../lib/tax/config";

export default function TaxCodePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="PAYE interpretation tool"
            title="Tax code decoder"
            description="Understand what a UK tax code usually signals, what allowance it points to, and when the code may be causing deductions to feel unusually high."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.payslipChecker.description}
              points={[
                ...TRUST_COPY.payslipChecker.points,
                "Built for tax-code first-check clarity",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why this tool matters">
              A tax code can change salary deductions far more than many users
              expect. This tool is built to explain common PAYE tax code formats
              clearly before users move into payslip checks or refund estimates.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/payslip-checker",
                  title: "Check your payslip",
                  description:
                    "Best next step when you want to test whether deductions to date look broadly on track.",
                },
                {
                  href: "/tax-refund-calculator",
                  title: "Check for refund or underpayment",
                  description:
                    "Useful when the code may have caused too much or too little Income Tax to be paid.",
                },
                {
                  href: "/calculator",
                  title: "Open the salary calculator",
                  description:
                    "Move into the broader take-home view with pension, student loan, and salary context.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <TaxCodeDecoder />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}