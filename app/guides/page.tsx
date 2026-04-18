import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import CrossLinkRail from "../../components/seo/cross-link-rail";
import { GUIDE_EXPANSION_SET } from "../../components/seo/guide-expansion-config";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { TAX_YEAR_LABEL } from "../../lib/tax/config";

export const metadata: Metadata = {
  title: "UK Salary Guides | TaxDecod",
  description:
    "Explore UK salary guides covering take-home pay, tax breakdowns, raise decisions, and real-life salary interpretation.",
};

function groupGuides() {
  const salaryGuides = GUIDE_EXPANSION_SET.filter(
    (g) => g.type === "isGoodSalary"
  );

  const taxGuides = GUIDE_EXPANSION_SET.filter(
    (g) => g.type === "taxOnSalary"
  );

  const decisionGuides = GUIDE_EXPANSION_SET.filter(
    (g) => g.type === "decision"
  );

  return { salaryGuides, taxGuides, decisionGuides };
}

function prettifyDecisionSlug(slug: string) {
  return slug
    .replaceAll("-", " ")
    .replace(/\buk\b/gi, "UK")
    .replace(/\bvs\b/gi, "vs")
    .replace(/\bi\b/g, "I");
}

export default function GuidesHubPage() {
  const { salaryGuides, taxGuides, decisionGuides } = groupGuides();

  const featured = [
    "is-30000-a-good-salary-uk",
    "is-50000-a-good-salary-uk",
    "is-60000-a-good-salary-uk",
    "how-much-tax-on-50000",
  ];

  const featuredDecisionGuides = decisionGuides.slice(0, 4);

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">
              Salary knowledge layer
            </p>
            <h1 className="mt-3 text-3xl font-bold app-title sm:text-5xl">
              UK salary guides and explanations
            </h1>
            <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
              These guides help users understand what salaries actually mean
              beyond tax calculations — including monthly reality, salary
              comparisons, raise decisions, and real-life affordability.
              Guides should work as a bridge into salary pages, compare pages,
              reverse planning, and city-intent judgment routes.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={`Guides are designed to support salary decisions using ${TAX_YEAR_LABEL}-style UK assumptions and connected route families.`}
              points={[
                "Connected to live salary tools",
                "Focused on real-world interpretation",
                "Supports planning and decision-making",
                "Not financial advice",
              ]}
            />
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Featured salary guides
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featured.map((slug) => {
                const guide = GUIDE_EXPANSION_SET.find((g) => g.slug === slug);
                if (!guide) return null;

                return (
                  <Link
                    key={slug}
                    href={`/guides/${slug}`}
                    className="rounded-[28px] border px-6 py-6 hover-lift"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--card-strong)",
                    }}
                  >
                    <p className="text-lg font-semibold app-title">
                      {guide.type === "isGoodSalary"
                        ? `Is ${formatCurrency(guide.salary)} a good salary?`
                        : `Tax on ${formatCurrency(guide.salary)}`}
                    </p>
                    <p className="mt-3 text-sm leading-8 app-copy">
                      Open this guide to understand what this salary actually means in practice.
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Salary decision guides
            </h2>

            <p className="mt-3 text-sm leading-8 app-copy">
              These routes are the strongest editorial bridge between curiosity
              and action. They feed users into compare pages, reverse salary
              planning, and nearby salary bands.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredDecisionGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="rounded-[28px] border px-6 py-6 hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  <p className="text-lg font-semibold app-title">
                    {prettifyDecisionSlug(guide.slug)}
                  </p>
                  <p className="mt-3 text-sm leading-8 app-copy">
                    Open a decision guide built around salary jumps, role changes, and whether more gross pay is actually worth it.
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Salary judgement guides
            </h2>

            <p className="mt-3 text-sm leading-8 app-copy">
              These guides help answer whether a salary is “good” based on
              real-life context, not just tax output.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {salaryGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="rounded-full border px-4 py-2 text-sm hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  {formatCurrency(g.salary)}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Tax breakdown guides
            </h2>

            <p className="mt-3 text-sm leading-8 app-copy">
              These pages explain how much tax is taken from each salary band.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {taxGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="rounded-full border px-4 py-2 text-sm hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                  }}
                >
                  {formatCurrency(g.salary)}
                </Link>
              ))}
            </div>
          </section>

          <CrossLinkRail
            eyebrow="Funnel bridges"
            title="Use guides as a bridge into practical salary action"
            description="These are the strongest next-step routes once a user has understood the explanation layer and wants a practical answer."
            items={[
              {
                href: "/salary-hub",
                title: "Salary hub",
                description:
                  "Move into full salary, monthly, compare, and city-intent route families.",
              },
              {
                href: "/compare-salary",
                title: "Compare salaries",
                description:
                  "See how salary jumps actually affect take-home instead of relying on gross numbers.",
              },
              {
                href: "/reverse-tax",
                title: "Plan monthly income",
                description:
                  "Work backwards from a target monthly amount and move into reverse salary planning.",
              },
              {
                href: "/salary-pages",
                title: "Browse salary pages",
                description:
                  "Jump directly into the wider after-tax salary route cluster.",
              },
            ]}
          />

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            <Link
              href="/salary-hub"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Explore salary pages
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move into full after-tax salary breakdowns and nearby salary bands.
              </p>
            </Link>

            <Link
              href="/benchmarks"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Add benchmark context
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Layer role and region market context onto the salary decision.
              </p>
            </Link>

            <Link
              href="/salary-tools"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Use salary tools
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Move into calculators, compare routes, reverse planning, and payslip tools.
              </p>
            </Link>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}