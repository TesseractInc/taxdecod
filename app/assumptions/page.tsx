import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export const metadata: Metadata = {
  title: "Assumptions",
  description:
    "See the main assumptions behind TaxDecod salary and take-home pay estimates.",
};

const assumptions = [
  "The platform assumes the user provides accurate salary inputs.",
  "Results are estimate-led and may not perfectly match payroll software or employer-specific configuration.",
  "Different tax codes can materially change net pay.",
  "Pension treatment can vary depending on arrangement and payroll setup.",
  "Student loan deductions depend on the plan selected and applicable thresholds.",
  "Scottish tax treatment can differ from England, Wales, and Northern Ireland.",
  "Bonuses, benefits, salary sacrifice, deductions, and payroll timing can alter final take-home amounts.",
  "The platform is intended to improve salary understanding, not replace payslip verification or professional advice.",
];

export default function AssumptionsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Assumptions"
            title="The assumptions behind TaxDecod results"
            description="Salary tools become more trustworthy when users can see the assumptions clearly. This page sets those expectations directly."
            ctaLabel="Back to calculator"
            ctaHref="/calculator"
          />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="app-card p-6 sm:p-7">
              <div className="space-y-4">
                {assumptions.map((item, index) => (
                  <div key={item} className="app-soft rounded-2xl px-4 py-4">
                    <p className="text-sm leading-7 app-copy">
                      <span className="mr-2 font-semibold app-title">
                        {index + 1}.
                      </span>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="app-card p-6">
                <h2 className="text-xl font-semibold app-title">
                  Why this page matters
                </h2>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Users should know what a calculator can and cannot assume
                  automatically. Visible assumptions reduce confusion, improve
                  trust, and make the product feel more serious.
                </p>
              </div>

              <div className="app-card p-6">
                <h2 className="text-xl font-semibold app-title">
                  Related pages
                </h2>
                <div className="mt-4 space-y-3 text-sm">
                  <Link href="/methodology" className="block app-copy hover:underline">
                    Methodology
                  </Link>
                  <Link href="/disclaimer" className="block app-copy hover:underline">
                    Disclaimer
                  </Link>
                  <Link href="/contact" className="block app-copy hover:underline">
                    Contact
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}