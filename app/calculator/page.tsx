import CalculatorCard from "../../components/calculator/calculator-card";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import ExperiencePager from "../../components/ui/experience-pager";

export default function CalculatorPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
              Calculator
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight app-title">
              Core salary overview
            </h1>
            <p className="mt-4 app-copy">
              Start with the essentials: take-home pay, score, deductions, and
              visual money flow. Then continue the journey into deeper pages.
            </p>
          </div>

          <CalculatorCard mode="overview" />

          <div className="mt-10">
            <ExperiencePager
              next={{ href: "/insights", label: "Salary leaderboard and insights" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}