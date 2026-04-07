import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";
import ResultsExperience from "../../components/results/results-experience";
import PageSnapshot from "../../components/results/page-snapshot";
import { demoScenarioInput, demoScenarioResult } from "../../lib/tax/demo-scenario";

const toolLaunchCards = [
  {
    title: "Leave pay calculators",
    description:
      "Estimate statutory maternity, paternity, and sick pay using current GOV.UK-style rates and assumptions.",
    href: "/leave-pay",
    eyebrow: "New cluster",
  },
  {
    title: "Salary benchmarks",
    description:
      "Explore the benchmark layer for role, region, and city comparison pages powered by ONS earnings data.",
    href: "/benchmarks",
    eyebrow: "Data layer",
  },
];

export default function SalaryToolsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Salary tools"
            title="Test pro-rata, bonus, sacrifice, tax-year and leave-pay scenarios"
            description="This is the practical decision layer of TaxDecod. Use it to test real-world salary situations beyond the core calculator."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {toolLaunchCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="app-card-strong rounded-[28px] p-6 transition hover-lift"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] app-accent">
                  {card.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold app-title">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-8 app-copy">
                  {card.description}
                </p>
                <p className="mt-5 text-sm font-semibold app-accent">
                  Open now →
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <PageSnapshot values={demoScenarioInput} result={demoScenarioResult} />
          </div>

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