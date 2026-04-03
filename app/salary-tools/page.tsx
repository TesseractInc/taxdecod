import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";
import ResultsExperience from "../../components/results/results-experience";
import PageSnapshot from "../../components/results/page-snapshot";
import { demoScenarioInput, demoScenarioResult } from "../../lib/tax/demo-scenario";

export default function SalaryToolsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Salary tools"
            title="Test raises, bonuses, and salary comparisons"
            description="A focused page for the practical decisions users care about most."
          />

          <PageSnapshot values={demoScenarioInput} result={demoScenarioResult} />

          <div className="mt-8">
            <ResultsExperience
              result={demoScenarioResult}
              values={demoScenarioInput}
              view="tools"
            />
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/payslip-explained", label: "Payslip explained" }}
              next={{ href: "/reality-check", label: "Reality check" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}