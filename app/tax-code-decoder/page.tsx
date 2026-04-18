import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import TaxCodeDecoder from "../../components/tools/tax-code-decoder";
import { buildSeoMetadata } from "../../components/seo/metadata";

export const metadata: Metadata = buildSeoMetadata({
  title: "Tax Code Decoder UK | Understand Your PAYE Code | TaxDecod",
  description:
    "Decode common UK PAYE tax codes, understand what they usually mean, and see when a tax code may be changing your deductions.",
  path: "/tax-code-decoder",
});

export default function TaxCodePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="PAYE interpretation tool"
            title="Tax code decoder"
            description="Understand what a UK tax code usually signals, what allowance it points to, and when the code may be causing deductions to feel unusually high or low."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description="This page is designed to help users interpret common UK PAYE tax codes using 2026/27-style tax-year framing."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Built for tax-code first-check clarity",
                "Useful before payslip or refund checks",
                "Estimate-based interpretation, not an HMRC ruling",
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