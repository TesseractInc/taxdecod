import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";
import ResultsExperience from "../../components/results/results-experience";
import PageSnapshot from "../../components/results/page-snapshot";
import { demoScenarioInput, demoScenarioResult } from "../../lib/tax/demo-scenario";

export default function RealityCheckPage() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Reality check"
            title="Feel your salary in real life"
            description="Shift from annual numbers to hourly, daily, and weekly net income, then share a clean result snapshot."
          />

          <PageSnapshot values={demoScenarioInput} result={demoScenarioResult} />

          <div className="mt-8">
            <ResultsExperience
              result={demoScenarioResult}
              values={demoScenarioInput}
              view="reality"
            />
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/salary-tools", label: "Salary tools" }}
              next={{ href: "/salary-pages", label: "Salary pages hub" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}