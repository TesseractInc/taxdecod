import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const privacySections = [
  {
    title: "General privacy position",
    body: "TaxDecod is committed to handling user data responsibly. This page explains the basic categories of information that may be processed through the site and how that information is used to operate and improve the platform.",
  },
  {
    title: "Information users may provide",
    body: "Depending on the feature used, users may provide salary figures, deduction inputs, tax-code information, payslip-related values, or an email address where a feature offers email delivery or account-linked scenario saving.",
  },
  {
    title: "How information is used",
    body: "User-provided information is used to generate salary-related outputs, support feature operation, improve product performance, and maintain core platform functionality. Information is not intended to be used for unrelated purposes outside the operation of the service.",
  },
  {
    title: "Analytics and usage data",
    body: "TaxDecod may use analytics tools to understand traffic, page usage, feature engagement, and general product performance. This helps improve site quality, navigation, and overall platform stability.",
  },
  {
    title: "User responsibility",
    body: "Users should avoid submitting unnecessary personal or highly sensitive information through tools that are designed primarily for salary estimation and deduction interpretation. Where formal tax, payroll, or legal handling is required, users should rely on the appropriate official or professional channel.",
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