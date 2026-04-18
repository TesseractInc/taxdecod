import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import EmailCapturePanel from "../../components/shared/email-capture-panel";
import HmrcReferencePanel from "../../components/shared/hmrc-reference-panel";
import PayslipYtdChecker from "../../components/payslip-checker/payslip-ytd-checker";
import { TRUST_COPY } from "../../lib/tax/config";

export const metadata: Metadata = {
  title:
    "Payslip Checker UK | Check PAYE, NI and Year-to-Date Deductions | TaxDecod",
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
    title: "Check for refund or underpayment signals",
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
  {
    title: "Read how to understand a payslip properly",
    description:
      "Use the guide route when you want plain-English explanation of PAYE, NI, pension, and tax-code lines.",
    href: "/guides/how-to-read-a-payslip-uk",
  },
];

const mismatchReasons = [
  {
    title: "Tax code changes",
    body: "A changed or temporary tax code can push deductions higher or lower than expected, especially mid-year.",
  },
  {
    title: "Bonus or irregular pay",
    body: "A bonus month, overtime spike, or one-off payment can distort tax and NI compared with an ordinary month.",
  },
  {
    title: "Cumulative PAYE timing",
    body: "PAYE can catch up or smooth out over time, which means one payslip can look strange even when the year eventually balances better.",
  },
  {
    title: "Pension or salary sacrifice",
    body: "Pension setup and sacrifice arrangements can materially change the deduction pattern versus a simpler estimate.",
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
            description="Use this when PAYE, National Insurance, or year-to-date totals feel off and you want a first-check reading before going deeper."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.payslipChecker.description}
              points={[...TRUST_COPY.payslipChecker.points]}
            />
          </div>

          <div className="mt-10">
            <HmrcReferencePanel
              compact
              title="Official references behind the trust layer"
              description="Where formal confirmation matters, payslip checks should be read alongside your actual payslips, employer payroll records, and official GOV.UK guidance."
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
              This is where TaxDecod becomes more useful than a generic calculator
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
              A salary result can look fine while a real payslip still feels wrong.
              This route exists to help users check whether Income Tax and
              National Insurance paid to date look broadly aligned, instead of
              guessing from one line in isolation.
            </p>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-3">
            <div
              className="rounded-[28px] border px-6 py-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">What this tool is for</p>
              <p className="mt-3 text-sm leading-7 app-copy">
                A first-check reading of PAYE and National Insurance using your
                year-to-date payslip values.
              </p>
            </div>

            <div
              className="rounded-[28px] border px-6 py-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                What this tool does not replace
              </p>
              <p className="mt-3 text-sm leading-7 app-copy">
                It does not replace employer payroll, HMRC records, formal tax
                advice, or a final refund or underpayment determination.
              </p>
            </div>

            <div
              className="rounded-[28px] border px-6 py-6"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Best way to use the result
              </p>
              <p className="mt-3 text-sm leading-7 app-copy">
                Use the result to decide whether you should decode your tax code,
                inspect a refund route, or compare against the broader salary setup.
              </p>
            </div>
          </section>

          <div className="mt-10">
            <PayslipYtdChecker />
          </div>

          <section
            className="mt-14 rounded-[30px] border px-6 py-6 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--card-strong)",
            }}
          >
            <p className="text-sm font-medium app-accent">
              Common reasons a payslip can feel wrong
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title">
              A mismatch does not always mean a definite error
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {mismatchReasons.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <p className="text-base font-semibold app-title">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 app-copy">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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