import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Salary Reality Check | TaxDecod",
  description:
    "A salary reality-check experience inside TaxDecod. Kept live for users but not indexed while the page is being upgraded from demo content to a full production-quality tool route.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RealityCheckPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Reality check"
            title="Feel your salary in real-life terms"
            description="This page shifts salary away from the annual headline and into weekly, daily, hourly, and practical net-income reality."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={`This page uses a standard UK employee example under ${TAX_YEAR_LABEL}-style assumptions to make salary feel more practical and real-life focused.`}
              points={[
                `Using ${TAX_YEAR_LABEL} UK assumptions`,
                "Built for real-life salary meaning",
                "Focused on practical take-home context",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Reality check">
              Users often understand annual salary on paper but still do not
              feel what it means in real life. This page helps translate salary
              into time-based and practical money context.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Run your own salary",
                  description:
                    "Enter your own number and see a personalised take-home reading.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary jumps",
                  description:
                    "See whether another salary meaningfully changes real monthly life.",
                },
                {
                  href: "/salary-pages",
                  title: "Browse salary pages",
                  description:
                    "Move across common salary bands and related after-tax routes.",
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
              view="reality"
            />
          </div>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            <Link
              href="/salary-tools"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Salary tools
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Move into raise, bonus, and decision-focused salary scenarios.
              </p>
            </Link>

            <Link
              href="/compare-salary"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Compare salaries
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Check whether a bigger gross salary really feels better after tax.
              </p>
            </Link>

            <Link
              href="/salary-pages"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Browse salary pages
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Explore common salary levels and linked take-home paths.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <EmailCapturePanel
              title="Send your salary reality view to your email"
              description="Save the practical salary view so you can compare it later against another option."
              buttonLabel="Send reality report"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}