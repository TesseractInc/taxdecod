import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const privacySections = [
  {
    title: "General privacy position",
    body: "TaxDecod aims to handle platform and usage information responsibly. This page explains the general categories of information that may be processed while using the site and how that information supports platform operation.",
  },
  {
    title: "Information users may enter",
    body: "Depending on the feature used, users may enter salary figures, deduction inputs, tax-code details, payslip-related values, or an email address where a feature offers email delivery or account-linked saving.",
  },
  {
    title: "How information is used",
    body: "User-provided information is used to generate salary-related outputs, support feature operation, improve product quality, and maintain core platform functionality. It is not intended to be used for unrelated purposes outside the operation of the service.",
  },
  {
    title: "Analytics and usage data",
    body: "TaxDecod may use analytics tools to understand traffic, route usage, feature engagement, and general site performance. This supports platform quality, usability, and stability improvements.",
  },
  {
    title: "User responsibility",
    body: "Users should avoid entering unnecessary personal or highly sensitive information into tools designed primarily for salary estimation and deduction interpretation. Where formal tax, payroll, or legal handling is required, the appropriate official or professional channel should be used instead.",
  },
  {
    title: "Policy updates",
    body: "This privacy policy may be updated as the platform evolves. Continued use of the site means users accept the latest published version of the policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Privacy policy"
            title="How TaxDecod handles platform and usage information"
            description="This page provides a plain-language overview of how platform, input, and analytics-related information may be handled while using TaxDecod."
          />

          <section
            className="mt-8 rounded-[28px] border px-6 py-5 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
              Policy framing
            </p>
            <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
              This page is intended to explain the general privacy position of
              TaxDecod in plain English. It should be read alongside the platform’s
              trust, methodology, and contact pages.
            </p>
          </section>

          <div className="mt-10 grid gap-4">
            {privacySections.map((section) => (
              <section
                key={section.title}
                className="rounded-[30px] border px-6 py-6 sm:px-7"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-strong)",
                }}
              >
                <h2 className="text-2xl font-semibold tracking-tight app-title">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
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