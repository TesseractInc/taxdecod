import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import EmailCapturePanel from "../../components/shared/email-capture-panel";
import PayslipYtdChecker from "../../components/payslip-checker/payslip-ytd-checker";
import { TRUST_COPY } from "../../lib/tax/config";

export const metadata: Metadata = {
  title: "Payslip Checker UK | Check PAYE, NI and Year-to-Date Deductions | TaxDecod",
  description:
    "Use TaxDecod’s UK payslip checker to estimate whether Income Tax and National Insurance paid to date look broadly on track.",
};

const nextRoutes = [
  {
    title: "Decode the tax code first",
    description:
      "Use this when the payslip feels wrong and the tax code may be the reason deductions look unusual.",
    href: "/tax-code-decoder",
  },
  {
    title: "Check for refund or underpayment",
    description:
      "Use this when the year-to-date tax paid may be too high or too low overall.",
    href: "/tax-refund-calculator",
  },
  {
    title: "Return to the full salary calculator",
    description:
      "Use this when you want the broader salary and deduction picture behind the payslip route.",
    href: "/calculator",
  },
];

export default function PayslipCheckerPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Payslip / YTD check"
            title="Check whether your payslip deductions look broadly right"
            description="This is one of TaxDecod’s strongest differentiators. Use it when PAYE, National Insurance, or year-to-date totals feel off and you want a first-check reading before going deeper."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.payslipChecker.description}
              points={[
                ...TRUST_COPY.payslipChecker.points,
                "Built for first-check payslip interpretation",
              ]}
            />
          </div>

          <section
            className="mt-10 rounded-[30px] border px-6 py-6 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--card-strong)",
            }}
          >
            <p className="text-sm font-medium app-accent">Why this page matters</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
              This is where salary tools become more useful than generic calculators
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
              A salary number can look fine while a real payslip still feels wrong.
              This route exists to help users test whether tax and National
              Insurance paid to date look broadly aligned, instead of guessing from
              one payslip line in isolation.
            </p>
          </section>

          <div className="mt-10">
            <PayslipYtdChecker />
          </div>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            {nextRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-[28px] border px-6 py-6 transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-strong)",
                }}
              >
                <p className="text-lg font-semibold app-title">{route.title}</p>
                <p className="mt-3 text-sm leading-8 app-copy">
                  {route.description}
                </p>
              </Link>
            ))}
          </section>

          <div className="mt-14">
            <EmailCapturePanel
              title="Send your payslip check to your email"
              description="Keep the year-to-date reading for later if you want to compare it with a later payslip, P60, or another salary setup."
              buttonLabel="Send payslip check"
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}