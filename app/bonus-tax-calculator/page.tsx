import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import { buildSeoMetadata } from "../../components/seo/metadata";
import BonusTaxCalculator from "../../components/tools/bonus-tax-calculator";

export const metadata: Metadata = buildSeoMetadata({
  title: "Bonus Tax Calculator UK | Bonus Take-Home Estimate | TaxDecod",
  description:
    "Estimate how a bonus affects take-home pay in the UK and see why a bonus can feel smaller than the headline figure.",
  path: "/bonus-tax-calculator",
});

export default function BonusTaxCalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Bonus impact tool"
            title="Bonus tax calculator"
            description="Use this tool to estimate how much of a bonus you may actually keep after deductions and why the number can feel smaller than expected."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description="This page uses 2026/27-style UK deduction assumptions to estimate bonus impact on take-home pay."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Built for bonus take-home clarity",
                "Estimate-based, not payroll exact",
                "Useful before comparing salary routes",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why this tool matters">
              Bonuses often create disappointment because users compare the gross
              figure with what arrives after PAYE, National Insurance, pension,
              and student loan pressure in the bonus month.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Compare salary routes",
                  description:
                    "Useful when you want to judge whether a raise would feel stronger than a one-off bonus.",
                },
                {
                  href: "/calculator",
                  title: "Open the main calculator",
                  description:
                    "Check the broader salary route alongside the bonus impact.",
                },
                {
                  href: "/guides/how-much-salary-increase-is-worth-it",
                  title: "Read the raise guide",
                  description:
                    "Useful when the real question is whether permanent pay beats one-off bonus money.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <BonusTaxCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}