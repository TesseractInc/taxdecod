import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import { buildSeoMetadata } from "../../components/seo/metadata";
import OvertimeCalculator from "../../components/tools/overtime-tax-calculator";

export const metadata: Metadata = buildSeoMetadata({
  title: "Overtime Calculator UK | Overtime Take-Home Estimate | TaxDecod",
  description:
    "Estimate how overtime affects take-home pay in the UK and see why extra hours can feel weaker than the gross figure suggests.",
  path: "/overtime-calculator",
});

export default function OvertimeCalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Extra-hours impact tool"
            title="Overtime calculator"
            description="Use this tool to estimate how overtime pay changes take-home and why extra hours can feel less rewarding after deductions than the gross figure suggests."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description="This page uses 2026/27-style UK deduction assumptions to estimate how overtime pay affects take-home outcomes."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Built for overtime take-home clarity",
                "Estimate-based, not payroll exact",
                "Useful before relying on gross overtime figures",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why this tool matters">
              Overtime often looks attractive in gross terms, but the actual
              monthly reward can feel weaker once tax, National Insurance,
              pension, and other deduction pressure are applied.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Open the main calculator",
                  description:
                    "Useful when you want the full salary route alongside the extra-hours impact.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare with higher salary",
                  description:
                    "Helpful when the real question is whether more hours or more base pay is the better route.",
                },
                {
                  href: "/bonus-tax-calculator",
                  title: "Compare overtime with bonus pay",
                  description:
                    "Useful when extra money could come through either route and you want better context.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <OvertimeCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}