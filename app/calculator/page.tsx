import Link from "next/link";
import CalculatorCard from "../../components/calculator/calculator-card";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import ExperiencePager from "../../components/ui/experience-pager";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import HmrcReferencePanel from "../../components/shared/hmrc-reference-panel";
import AdSlot from "../../components/ads/ad-slot";
import AffiliateRecommendationPanel from "../../components/monetization/affiliate-recommendation-panel";
import RelatedLinks from "../../components/seo/related-links";

const nextRoutes = [
  {
    title: "Compare this salary against another offer",
    description:
      "Use this when the real question is whether a raise or a new role changes monthly life enough after deductions.",
    href: "/compare-salary",
  },
  {
    title: "Work backwards from a target monthly income",
    description:
      "Use this when you know the amount you want to keep and need the gross salary required to reach it.",
    href: "/reverse-tax",
  },
  {
    title: "Check whether a payslip looks on track",
    description:
      "Use this when your deductions feel unusual and you want a first-check reading of PAYE, National Insurance, pension, and year-to-date totals.",
    href: "/payslip-checker",
  },
  {
    title: "Browse nearby salary bands and routes",
    description:
      "Use this when you want more context around neighbouring salary levels rather than a single isolated result.",
    href: "/salary-hub",
  },
];

export default function CalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="relative overflow-hidden py-6 sm:py-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(14,165,233,0.14), transparent 72%)",
            }}
          />
          <div
            className="absolute right-[-8%] top-[22%] h-[220px] w-[220px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.08), transparent 72%)",
            }}
          />
        </div>

        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] app-accent sm:text-sm">
              UK salary calculator
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight app-title sm:text-5xl">
              See what your salary actually leaves you with
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 app-copy sm:text-base sm:leading-8">
              Check take-home pay after Income Tax, National Insurance, pension,
              and student loan deductions, then use the result to make a better
              salary decision.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-xs app-subtle sm:text-sm">
              Built for salary clarity, comparison, and first-check planning —
              not as a replacement for payroll or formal advice.
            </p>
          </div>

          <div className="mt-8">
            <AdSlot label="Advertisement" minHeight={90} />
          </div>

          <div className="mt-8 sm:mt-10">
            <div className="rounded-[30px] border p-2 shadow-[0_28px_100px_-44px_rgba(15,23,42,0.24)] app-card-strong sm:p-3">
              <CalculatorCard mode="full" />
            </div>
          </div>

          <div className="mt-8">
            <AdSlot label="Advertisement" />
          </div>

          <div className="mt-10">
            <TaxYearTrustBar
              description="TaxDecod calculator results are designed to help users understand UK salary outcomes more clearly. They should be read as estimate-based salary guidance rather than payroll, legal, or financial advice."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Estimate-based outputs, not financial advice",
                "Methodology and assumptions visible",
                "Best used for salary decisions and first-check clarity",
              ]}
            />
          </div>

          <div className="mt-10">
            <HmrcReferencePanel
              compact
              title="Official references behind the trust layer"
              description="Where formal confirmation matters, salary users should read calculator outputs alongside official GOV.UK guidance and payroll records."
            />
          </div>

          <section className="mt-10 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                What affects the result
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                The take-home number depends on more than gross salary
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Income Tax is only one part of the outcome. National Insurance,
                pension contributions, student loan repayments, region, and tax
                code assumptions can all materially change what actually reaches
                your bank account.
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-3 sm:p-7">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Why the estimate can differ from a payslip
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Real payroll can differ because of cumulative PAYE, tax-code
                  changes, bonus timing, pension setup, salary sacrifice, or
                  employer-specific payroll handling.
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  When to use this page
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Use this route when you want a strong first-read of one salary
                  before moving into comparison, reverse planning, or payslip
                  interpretation.
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  When to use another tool instead
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  If your main question is “is this raise worth it?”, “what salary
                  gives me £X per month?”, or “does this payslip look right?”,
                  another TaxDecod route will be more useful than staying here.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Where to go after the first result
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Use the result to answer the next salary question properly
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                The first number is only the start. Most users then need to
                compare a different offer, work backwards from a target income,
                or check whether deductions look normal.
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2 sm:p-7">
              {nextRoutes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 text-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8">
            <AdSlot label="Advertisement" />
          </div>

          <div className="mt-10">
            <RelatedLinks
              title="Understand your salary better"
              links={[
                {
                  title: "How much tax do I pay in the UK?",
                  href: "/guides/how-much-tax-do-i-pay-uk",
                },
                {
                  title: "Net vs gross salary explained",
                  href: "/guides/net-vs-gross-salary-explained",
                },
                {
                  title: "What is a good salary in the UK?",
                  href: "/guides/what-is-a-good-salary-uk",
                },
                {
                  title: "How much salary increase is worth it?",
                  href: "/guides/how-much-salary-increase-is-worth-it",
                },
              ]}
            />
          </div>

          <div className="mt-10">
            <AffiliateRecommendationPanel
              eyebrow="Useful next move"
              title="Once your take-home is clear, stay inside the right TaxDecod route"
              description="After understanding one salary, most users either compare another offer, work backwards from a monthly target, or check whether a real payslip fits the same pattern."
              items={[
                {
                  title: "Compare this against another salary",
                  description:
                    "Best when the next step is judging whether a raise or competing offer really changes monthly life after deductions.",
                  href: "/compare-salary",
                  badge: "Compare",
                },
                {
                  title: "Work backwards from your target monthly income",
                  description:
                    "Use this when your real question is how much gross salary you need to keep a specific amount each month.",
                  href: "/reverse-tax",
                  badge: "Planning",
                },
                {
                  title: "Check whether your payslip looks normal",
                  description:
                    "Use this when you want a first-check reading of PAYE, National Insurance, pension, and year-to-date deductions against a real payslip.",
                  href: "/payslip-checker",
                  badge: "Payslip",
                },
              ]}
            />
          </div>

          <div className="mt-10 sm:mt-12">
            <ExperiencePager
              previous={{ href: "/salary-hub", label: "Browse salary pages" }}
              next={{ href: "/compare-salary", label: "Compare salary outcomes" }}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}