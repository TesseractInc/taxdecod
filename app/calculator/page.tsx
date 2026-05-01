import CalculatorCard from "../../components/calculator/calculator-card";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import ExperiencePager from "../../components/ui/experience-pager";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import HmrcReferencePanel from "../../components/shared/hmrc-reference-panel";
import AffiliateRecommendationPanel from "../../components/monetization/affiliate-recommendation-panel";
import RelatedLinks from "../../components/seo/related-links";
import FintechToolShell from "../../components/tools/fintech-tool-shell";

const nextRoutes = [
  {
    title: "Compare another offer",
    description:
      "Use this when the real question is whether a raise or new role changes monthly life enough after deductions.",
    href: "/compare-salary",
  },
  {
    title: "Reverse-plan income",
    description:
      "Use this when you know the monthly amount you want to keep and need the gross salary required.",
    href: "/reverse-tax",
  },
  {
    title: "Check a payslip",
    description:
      "Use this when deductions feel unusual and you want a first-check reading of PAYE, NI, pension, and YTD totals.",
    href: "/payslip-checker",
  },
  {
    title: "Browse salary bands",
    description:
      "Use this when you want more context around neighbouring salary levels rather than one isolated result.",
    href: "/salary-hub",
  },
];

export default function CalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fc] text-slate-950">
      <SiteHeader />

      <Container>
        <FintechToolShell
          eyebrow="UK salary calculator"
          title="Calculate your take-home pay without decoding payroll jargon."
          description="See estimated annual and monthly take-home pay after Income Tax, National Insurance, pension, and student loan deductions."
          helperText="Best for one-salary clarity before you compare an offer, reverse-plan income, or check a real payslip."
          visualKind="calculator"
          primaryAction={{
            label: "Use calculator",
            href: "#salary-calculator",
          }}
          secondaryAction={{
            label: "Compare salaries",
            href: "/compare-salary",
          }}
          stats={[
            {
              label: "Primary result",
              value: "Monthly net",
              note: "The number most users understand fastest.",
            },
            {
              label: "Built for",
              value: "PAYE",
              note: "UK employee salary interpretation.",
            },
            {
              label: "Tax year",
              value: "2026/27",
              note: "Assumption-led estimate framing.",
            },
          ]}
          explainerTitle="A gross salary is not the number that reaches your bank account."
          explainerBody="This page keeps the first salary calculation simple, then shows users where to go next. Income Tax is only part of the outcome. National Insurance, pension contributions, student loan repayments, region, and tax code assumptions can all materially change take-home pay."
          trustSlot={
            <TaxYearTrustBar
              description="TaxDecod calculator results are designed to help users understand UK salary outcomes more clearly. They should be read as estimate-based salary guidance rather than payroll, legal, or financial advice."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Estimate-based outputs, not financial advice",
                "Methodology and assumptions visible",
                "Best used for salary decisions and first-check clarity",
              ]}
            />
          }
          referenceSlot={
            <HmrcReferencePanel
              compact
              title="Official references behind the trust layer"
              description="Where formal confirmation matters, salary users should read calculator outputs alongside official GOV.UK guidance and payroll records."
            />
          }
          nextSteps={nextRoutes}
        >
          <div id="salary-calculator">
            <CalculatorCard mode="full" />
          </div>
        </FintechToolShell>

        <section className="mt-2 rounded-[34px] border border-slate-200 bg-white/72 p-6 shadow-[0_24px_80px_-55px_rgba(15,23,42,0.36)] backdrop-blur-2xl sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
            Result quality
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Why the calculator estimate can differ from a real payslip
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "PAYE timing",
                body: "Cumulative PAYE can smooth or catch up deductions across the tax year, so one month can look different from the estimate.",
              },
              {
                title: "Employer payroll setup",
                body: "Pension method, salary sacrifice, taxable benefits, and payroll timing can change the exact payslip pattern.",
              },
              {
                title: "Tax code changes",
                body: "A new, temporary, or adjusted tax code can make real deductions differ from a standard estimate.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[26px] border border-slate-200 bg-slate-50/70 p-5"
              >
                <p className="text-lg font-semibold text-slate-950">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <AffiliateRecommendationPanel
            eyebrow="Useful next move"
            title="Once the take-home number is clear, stay inside the right TaxDecod route"
            description="Most users move into comparison, target-income planning, or payslip verification after the first calculator result."
            items={[
              {
                title: "Compare this salary against another offer",
                description:
                  "Best when you need to know whether a raise or role change is actually worth it after deductions.",
                href: "/compare-salary",
                badge: "Compare",
              },
              {
                title: "Work backwards from a target monthly income",
                description:
                  "Best when you know what you want to keep and need the gross salary needed to reach it.",
                href: "/reverse-tax",
                badge: "Planning",
              },
              {
                title: "Check whether a payslip looks broadly on track",
                description:
                  "Best when a real payslip deduction pattern feels different from your salary expectation.",
                href: "/payslip-checker",
                badge: "Payslip",
              },
            ]}
          />
        </div>

        <div className="mt-10">
          <RelatedLinks
            links={[
              {
                href: "/salary-hub",
                title: "Salary hub",
                description:
                  "Browse salary routes and common UK take-home pay pages.",
              },
              {
                href: "/guides/how-income-tax-works-uk",
                title: "How Income Tax works",
                description:
                  "Understand the basic deduction layer behind the calculator.",
              },
              {
                href: "/guides/net-vs-gross-salary-explained",
                title: "Net vs gross salary",
                description:
                  "Learn why the headline salary and real take-home pay differ.",
              },
            ]}
          />
        </div>

        <div className="mt-10">
          <ExperiencePager
            previous={{ href: "/", label: "Home" }}
            next={{ href: "/compare-salary", label: "Compare salary" }}
          />
        </div>
      </Container>

      <SiteFooter />
    </main>
  );
}