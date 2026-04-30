import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";
import PageSnapshot from "../../components/results/page-snapshot";
import SalaryLeaderboard from "../../components/results/salary-leaderboard";
import UnderpaidDetector from "../../components/results/underpaid-detector";
import DownloadReportButton from "../../components/results/download-report-button";
import { demoScenarioInput, demoScenarioResult } from "../../lib/tax/demo-scenario";

export const metadata: Metadata = {
  title: "Salary Leaderboard | TaxDecod",
  description:
    "A salary ranking and pressure-signal page inside TaxDecod. Kept live for product exploration but not indexed while the page is being upgraded.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LeaderboardPage() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Leaderboard"
            title="See where your salary stands"
            description="A dedicated page for rank, salary strength, and real-world pressure signals. Cleaner, more focused, and easier to compare."
          />

          <PageSnapshot values={demoScenarioInput} result={demoScenarioResult} />

          <div className="mt-8 space-y-6">
            <SalaryLeaderboard result={demoScenarioResult} />
            <UnderpaidDetector
              values={demoScenarioInput}
              result={demoScenarioResult}
            />

            <div className="app-card p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium app-accent">Take it with you</p>
                  <h2 className="mt-2 text-2xl font-semibold app-title">
                    Download this salary report as PDF
                  </h2>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Save a polished report for yourself, a job comparison, or a discussion.
                  </p>
                </div>

                <DownloadReportButton
                  values={demoScenarioInput}
                  result={demoScenarioResult}
                  filename="taxdecod-leaderboard-report.pdf"
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/calculator", label: "Core salary overview" }}
              next={{ href: "/payslip-explained", label: "Payslip explained" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}