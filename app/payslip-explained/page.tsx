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