import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";
import ResultsExperience from "../../components/results/results-experience";
import PageSnapshot from "../../components/results/page-snapshot";
import { demoScenarioInput, demoScenarioResult } from "../../lib/tax/demo-scenario";

export default function PayslipExplainedPage() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Payslip explained"
            title="Understand the labels on your payslip"
            description="Decode tax code, PAYE, National Insurance, pension, and student loan in a calmer, clearer format."
          />

          <PageSnapshot values={demoScenarioInput} result={demoScenarioResult} />

          <div className="mt-8">
            <ResultsExperience
              result={demoScenarioResult}
              values={demoScenarioInput}
              view="payslip"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link href="/payslip-checker" className="app-card p-6">
              <p className="font-semibold app-title">Check your payslip to date</p>
              <p className="mt-2 text-sm app-copy">
                Use gross pay to date, tax paid to date, and NI paid to date for
                a quick first-check against your current payslip pattern.
              </p>
            </Link>

            <Link href="/calculator" className="app-card p-6">
              <p className="font-semibold app-title">Open calculator</p>
              <p className="mt-2 text-sm app-copy">
                Personalise the full salary reading with your own exact inputs.
              </p>
            </Link>

            <Link href="/salary-tools" className="app-card p-6">
              <p className="font-semibold app-title">Explore salary tools</p>
              <p className="mt-2 text-sm app-copy">
                Move into raise, bonus, and salary comparison scenarios.
              </p>
            </Link>
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/insights", label: "Salary leaderboard" }}
              next={{ href: "/salary-tools", label: "Salary tools" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}