import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Container from "@/components/ui/container";
import TaxYearTrustBar from "@/components/shared/tax-year-trust-bar";
import SeoPageHero from "@/components/seo/seo-page-hero";
import SeoRealityCard from "@/components/seo/seo-reality-card";
import SeoCtaCluster from "@/components/seo/seo-cta-cluster";
import EmailCapturePanel from "@/components/shared/email-capture-panel";
import TaxRefundEstimator from "@/components/tax-refund/tax-refund-estimator";
import { TAX_YEAR_LABEL } from "@/lib/tax/config";

export default function TaxRefundCalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Tax refund estimator"
            title="Check if you may have overpaid Income Tax"
            description="This tool helps PAYE users estimate whether the Income Tax already paid looks higher, lower, or roughly in line with the estimated tax due."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={`This feature is built as a first-check PAYE estimator using TaxDecod's current ${TAX_YEAR_LABEL} site assumptions. It works best when users know their gross income, tax code, and tax already paid.`}
              points={[
                `Using ${TAX_YEAR_LABEL} site assumptions`,
                "PAYE Income Tax estimate only",
                "Best with P60 or payslip tax paid",
                "HMRC decides final refund or underpayment",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="What this tool is for">
              This is a fast refund / underpayment signal, not a formal HMRC
              outcome. It is designed to help users understand whether their paid
              Income Tax looks too high or too low before they take the next step.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Open the salary calculator",
                  description:
                    "See the full take-home pay and deduction picture behind your salary.",
                },
                {
                  href: "/payslip-explained",
                  title: "Decode your payslip",
                  description:
                    "Understand PAYE, National Insurance, pension, and tax code lines in plain English.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from take-home",
                  description:
                    "Find the gross salary needed to reach a target monthly income.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <TaxRefundEstimator />
          </div>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            <Link
              href="/payslip-explained"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Understand tax code and PAYE
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Helpful when a refund signal may be caused by the wrong code or a payroll mismatch.
              </p>
            </Link>

            <Link
              href="/calculator"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Check your salary normally
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Move back into the full salary reading if you want the broader net-pay picture.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Explore salary pages
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Browse common UK salary levels and related take-home routes.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <EmailCapturePanel
              title="Send your refund estimate to your email"
              description="Save the refund or underpayment reading so you can compare it with a payslip, P60, or another salary scenario later."
              buttonLabel="Send refund estimate"
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}