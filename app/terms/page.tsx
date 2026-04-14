import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export const metadata: Metadata = {
  title: "Terms",
  description: "Read the TaxDecod terms of use.",
};

const termsBlocks = [
  {
    title: "Use of the platform",
    body: "By using TaxDecod, users accept that the platform is intended for informational salary understanding and decision support purposes.",
  },
  {
    title: "No guarantee of exact payroll match",
    body: "Tool outputs are designed to be useful and directionally strong, but they may not match an employer's exact payroll system or a user's final payslip in every case.",
  },
  {
    title: "User responsibility",
    body: "Users are responsible for reviewing their own tax code, payroll treatment, deductions, and personal circumstances where precision matters.",
  },
  {
    title: "No regulated advice",
    body: "Nothing on TaxDecod should be treated as legal, financial, tax, or regulated professional advice.",
  },
  {
    title: "Platform evolution",
    body: "TaxDecod may update, improve, remove, or expand features, page structures, and content as the product develops.",
  },
];

export default function TermsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Terms"
            title="Terms of use"
            description="These terms explain the basis on which TaxDecod is made available and how users should treat the outputs shown on the platform."
            ctaLabel="Use calculator"
            ctaHref="/calculator"
          />

          <div className="space-y-6">
            {termsBlocks.map((section) => (
              <section key={section.title} className="app-card p-6 sm:p-7">
                <h2 className="text-2xl font-semibold app-title">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 app-copy">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}