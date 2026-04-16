import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";

export const metadata: Metadata = {
  title: "About TaxDecod | UK Salary & Take-Home Pay Platform",
  description:
    "Learn how TaxDecod helps you understand your salary after tax, deductions, and real-world income decisions in the UK.",
};

export default function AboutPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          {/* HERO */}
          <h1 className="text-3xl font-bold app-title sm:text-4xl">
            About TaxDecod
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 app-copy">
            TaxDecod is a UK-focused salary and take-home pay platform built to
            help people understand what their income actually means after tax,
            deductions, and real-life costs.
          </p>

          {/* CORE IDEA */}
          <div className="mt-12 space-y-6 max-w-3xl">
            <h2 className="text-xl font-semibold app-title">
              Why TaxDecod exists
            </h2>

            <p className="app-copy leading-7">
              Most salary tools show a number. Very few explain what that number
              actually means in real life.
            </p>

            <p className="app-copy leading-7">
              TaxDecod was built to close that gap — by turning gross salary
              figures into clear, decision-ready insights.
            </p>

            <p className="app-copy leading-7">
              Whether you are comparing job offers, checking a payslip, or trying
              to understand how much you really take home each month, the goal is
              simple: make salary decisions easier and more transparent.
            </p>
          </div>

          {/* WHAT IT DOES */}
          <div className="mt-14 space-y-6 max-w-3xl">
            <h2 className="text-xl font-semibold app-title">
              What TaxDecod helps you do
            </h2>

            <ul className="space-y-3 app-copy leading-7">
              <li>• Estimate take-home pay after UK tax and deductions</li>
              <li>• Compare salaries based on real net income</li>
              <li>• Work backwards from a target monthly income</li>
              <li>• Understand payslips and deduction breakdowns</li>
              <li>• Explore how tax, student loans, and pensions affect income</li>
            </ul>
          </div>

          {/* HOW IT WORKS */}
          <div className="mt-14 space-y-6 max-w-3xl">
            <h2 className="text-xl font-semibold app-title">
              How calculations are handled
            </h2>

            <p className="app-copy leading-7">
              TaxDecod uses current UK tax-year assumptions, including income tax
              bands, National Insurance thresholds, and common employee
              deduction patterns.
            </p>

            <p className="app-copy leading-7">
              All results are estimates designed for clarity and planning — not
              exact payroll outputs.
            </p>

            <p className="app-copy leading-7">
              For full details, you can review the methodology and assumptions
              used across the platform.
            </p>
          </div>

          {/* IMPORTANT NOTE */}
          <div className="mt-14 rounded-[20px] border p-6 app-soft max-w-3xl">
            <h2 className="text-lg font-semibold app-title">
              Important note
            </h2>

            <p className="mt-3 text-sm leading-7 app-copy">
              TaxDecod is not a financial advisory service. It provides
              estimate-based calculations to help you understand salary outcomes
              more clearly. For official or legally binding figures, always refer
              to HMRC or your employer’s payroll.
            </p>
          </div>

          {/* CONTACT */}
          <div className="mt-14 space-y-4 max-w-3xl">
            <h2 className="text-xl font-semibold app-title">
              Contact
            </h2>

            <p className="app-copy leading-7">
              If you have questions, feedback, or notice anything that needs
              improvement, you can reach out via the contact page.
            </p>
          </div>

          {/* FINAL STATEMENT */}
          <div className="mt-16 max-w-3xl">
            <p className="text-sm app-subtle">
              Built for clarity. Focused on real take-home understanding.
            </p>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}