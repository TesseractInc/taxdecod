import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import EmailCapturePanel from "../../components/shared/email-capture-panel";
import PayslipYtdChecker from "../../components/payslip-checker/payslip-ytd-checker";
import { TRUST_COPY } from "../../lib/tax/config";

export default function PayslipCheckerPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Payslip / YTD check"
            title="Check if your payslip deductions look right so far"
            description="Use your gross pay to date, Income Tax paid to date, and NI paid to date to get a first-check estimate of whether your current payslip pattern looks roughly on track."
            ctaLabel="Open salary calculator"
            ctaHref="/calculator"
          />

          <div className="mt-8">
            <TaxYearTrustBar
              title="YTD payslip trust system"
              description={TRUST_COPY.payslipChecker.description}
              points={[...TRUST_COPY.payslipChecker.points]}
            />
          </div>

          <div className="mt-10">
            <PayslipYtdChecker />
          </div>

          <div className="mt-14">
            <EmailCapturePanel
              title="Send your payslip check to your email"
              description="Save the year-to-date payslip reading so you can compare it with a later payslip, P60, or another salary setup."
              buttonLabel="Send payslip check"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}