import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../components/seo/seo-page-hero";
import SeoRealityCard from "../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../components/seo/seo-cta-cluster";
import ResultsExperience from "../../components/results/results-experience";
import PageSnapshot from "../../components/results/page-snapshot";
import EmailCapturePanel from "../../components/shared/email-capture-panel";
import { demoScenarioInput, demoScenarioResult } from "../../lib/tax/demo-scenario";
import { TAX_YEAR_LABEL } from "../../lib/tax/config";

export default function SalaryToolsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Salary tools"
            title="Test raises, bonuses, and salary moves"
            description="This page is for the practical salary questions users care about most after they have seen the first take-home answer."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={`This page uses a standard UK employee example under ${TAX_YEAR_LABEL}-style assumptions to explore salary decisions more clearly.`}
              points={[
                `Using ${TAX_YEAR_LABEL} UK assumptions`,
                "Built for salary decisions",
                "Focused on raises, bonuses, and comparison logic",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Decision layer">
              This is where salary moves from explanation into action. Users can
              test whether a raise, bonus, or salary change actually improves
              take-home pay in a meaningful way.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Compare two salaries",
                  description:
                    "Test a job move or raise against another salary side by side.",
                },
                {
                  href: "/reverse-tax",
                  title: "Reverse from a target income",
                  description:
                    "Find the gross salary needed to reach a stronger monthly number.",
                },
                {
                  href: "/reality-check",
                  title: "Open the reality-check view",
                  description:
                    "See salary through weekly, daily, and practical net-income meaning.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <PageSnapshot values={demoScenarioInput} result={demoScenarioResult} />
          </div>

          <div className="mt-10">
            <ResultsExperience
              result={demoScenarioResult}
              values={demoScenarioInput}
              view="tools"
            />
          </div>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            <Link
              href="/compare-salary"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Compare salary outcomes
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                See whether a higher salary really creates a stronger monthly result.
              </p>
            </Link>

            <Link
              href="/reality-check"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Reality-check the salary
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Translate the result into a more real-life money view.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Browse more salary pages
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Explore more salary bands and linked decision routes.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <EmailCapturePanel
              title="Send your salary tools view to your email"
              description="Save your raise, bonus, or scenario reading so you can revisit the decision later."
              buttonLabel="Send tools report"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}