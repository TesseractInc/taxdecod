import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the TaxDecod disclaimer about estimates, limitations, and how outputs should be used.",
};

const disclaimerPoints = [
  "TaxDecod provides estimate-based informational tools only.",
  "Nothing on the platform is legal, tax, financial, payroll, or regulated advice.",
  "Results may differ from employer payroll, accountant calculations, or official statements.",
  "Users remain responsible for checking their own tax code, payslip, payroll treatment, and personal circumstances.",
  "TaxDecod does not guarantee that every output will match a user's exact real-world payslip or employer system.",
];

export default function DisclaimerPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Disclaimer"
            title="TaxDecod outputs are informational estimates, not personal advice"
            description="This page clarifies the limitations of salary calculation outputs and how users should treat the information shown across the platform."
            ctaLabel="View methodology"
            ctaHref="/methodology"
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="app-card p-6 sm:p-7">
              <div className="space-y-4">
                {disclaimerPoints.map((item) => (
                  <div key={item} className="app-soft rounded-2xl px-4 py-4">
                    <p className="text-sm leading-7 app-copy">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border px-5 py-5 app-card-strong">
                <h2 className="text-xl font-semibold app-title">
                  Important practical meaning
                </h2>
                <p className="mt-3 text-sm leading-7 app-copy">
                  TaxDecod should help users understand salary outcomes more
                  clearly, compare scenarios more intelligently, and spot areas
                  that may need closer checking. It should not be relied on as a
                  final legal or payroll determination.
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="app-card p-6">
                <h2 className="text-xl font-semibold app-title">
                  Best next action
                </h2>
                <p className="mt-3 text-sm leading-7 app-copy">
                  Use the calculator for quick salary understanding, then use
                  payslip checking or personal advice where exact payroll
                  precision matters.
                </p>
              </div>

              <div className="app-card p-6">
                <h2 className="text-xl font-semibold app-title">
                  Related links
                </h2>
                <div className="mt-4 space-y-3 text-sm">
                  <Link href="/assumptions" className="block app-copy hover:underline">
                    Assumptions
                  </Link>
                  <Link href="/methodology" className="block app-copy hover:underline">
                    Methodology
                  </Link>
                  <Link href="/payslip-checker" className="block app-copy hover:underline">
                    Payslip checker
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