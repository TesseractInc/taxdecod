import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import ReverseTaxCalculator from "../../components/reverse-tax/ReverseTaxCalculator";
import HmrcReferencePanel from "../../components/shared/hmrc-reference-panel";
import { TRUST_COPY } from "../../lib/tax/config";

export const metadata: Metadata = {
  title:
    "Reverse Salary Calculator UK | Find the Gross Salary for Your Target Take-Home | TaxDecod",
  description:
    "Work backwards from the monthly income you want to keep and estimate the gross UK salary needed after tax and deductions.",
};

export default function ReverseTaxPage() {
  const reversePoints = TRUST_COPY.reversePage?.points
    ? [...TRUST_COPY.reversePage.points]
    : [
        "Built for target take-home planning",
        "Estimate-based salary guidance",
        "Useful for offer, rent, and budgeting decisions",
        "Best read with assumptions and methodology",
      ];

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Reverse salary planning"
            title="Find the salary needed for the income you actually want"
            description="This is one of TaxDecod’s strongest routes. Use it when the real question is not gross pay, but the monthly amount you need to keep after deductions."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={
                TRUST_COPY.reversePage?.description ??
                "This reverse salary page is designed for UK take-home planning using current tax-year framing, visible assumptions, and estimate-based deduction logic."
              }
              points={reversePoints}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why reverse salary planning matters">
              Many users do not start with a gross salary question. They start
              with a monthly life question: rent, savings, household cost, or the
              minimum income needed for a move. This page is built for that exact
              use case.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <HmrcReferencePanel
              compact
              title="Official references behind this planning route"
              description="When a reverse salary result matters for a real decision, it should be read alongside current GOV.UK guidance and actual payroll treatment."
            />
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Compare the required salary against other pay levels",
                  description:
                    "Use this when you want to see whether nearby salary bands materially improve the result.",
                },
                {
                  href: "/calculator",
                  title: "Inspect the full salary route afterwards",
                  description:
                    "Open the main calculator once you want the broader deduction picture behind the required gross salary.",
                },
                {
                  href: "/guides/how-income-tax-works-uk",
                  title: "Read how tax changes salary outcomes",
                  description:
                    "Useful when you want context around why extra gross salary does not always convert cleanly into take-home pay.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <ReverseTaxCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}