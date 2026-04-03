import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";

const salaryPages = [
  20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000,
];

export default function SalaryPagesHubPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Salary pages"
            title="Browse high-intent UK salary breakdown pages"
            description="Explore focused salary landing pages built for search intent, quick comparisons, and direct take-home pay checks."
            ctaLabel="Open full calculator"
            ctaHref="/calculator"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {salaryPages.map((salary) => (
              <Link
                key={salary}
                href={`/${salary}-after-tax-uk`}
                className="app-card p-5 hover-lift"
              >
                <p className="text-sm app-subtle">Core page</p>
                <p className="mt-2 text-xl font-semibold app-title">
                  £{salary.toLocaleString("en-GB")}
                </p>
                <p className="mt-3 text-sm app-copy">After-tax breakdown</p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/reality-check", label: "Reality check" }}
              next={{ href: "/services", label: "Services and other platforms" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}