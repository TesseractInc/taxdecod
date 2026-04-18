import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import { buildSeoMetadata } from "../../components/seo/metadata";
import TaxRefundCalculator from "components/tools/tax-refund/tax-refund-estimator";

export const metadata: Metadata = buildSeoMetadata({
  title: "Tax Refund Calculator UK | Overpaid Tax First-Check Tool | TaxDecod",
  description:
    "Use TaxDecod’s UK tax refund calculator as a first-check estimate when you think too much Income Tax may have been paid.",
  path: "/tax-refund-calculator",
});

export default function TaxRefundCalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Refund first-check"
            title="Tax refund calculator"
            description="Use this when you think too much Income Tax may have been paid and you want a calmer first-check estimate before going deeper."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description="This page is built for refund-style first checks using 2026/27-style UK tax assumptions. It does not confirm an HMRC refund outcome."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Estimate-based refund signal",
                "Useful before formal follow-up",
                "Not an HMRC decision or guarantee",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why this tool matters">
              Overpaid tax often starts as a suspicion, not a certainty. This
              tool exists to help users check whether the pattern looks worth
              investigating before assuming a refund is definitely due.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/tax-code-decoder",
                  title: "Decode the tax code first",
                  description:
                    "Useful when the overpayment concern may be caused by the code applied to your pay.",
                },
                {
                  href: "/payslip-checker",
                  title: "Check your payslip pattern",
                  description:
                    "Use this when you want to inspect year-to-date PAYE and NI before relying on a refund assumption.",
                },
                {
                  href: "/calculator",
                  title: "Open the main salary calculator",
                  description:
                    "Useful when you want the broader take-home route alongside the refund-style check.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <TaxRefundCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}