import type { Metadata } from "next";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the TaxDecod privacy policy.",
};

const sections = [
  {
    title: "Overview",
    body: "TaxDecod aims to operate transparently. This page explains, at a high level, how user information may be handled when someone visits the platform, uses salary tools, or submits an enquiry.",
  },
  {
    title: "Calculator inputs",
    body: "Salary and tax-related values entered into the platform are used to generate tool outputs. Users should avoid entering sensitive personal information that is not needed for the intended calculation experience.",
  },
  {
    title: "Contact and enquiry information",
    body: "If a user contacts TaxDecod, the details they provide may be used to respond to the enquiry, maintain communication, and manage support or business conversations.",
  },
  {
    title: "Analytics and product improvement",
    body: "TaxDecod may use website analytics, performance monitoring, or similar tools to understand product usage, improve the platform, and identify high-friction areas in the user journey.",
  },
  {
    title: "Retention and protection",
    body: "Information should only be retained for as long as reasonably necessary for the purpose for which it was collected, and appropriate steps should be taken to protect data and access.",
  },
  {
    title: "Policy updates",
    body: "This policy may be updated as the platform, infrastructure, and data practices evolve. Users should review the page periodically for the latest position.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Privacy Policy"
            title="Privacy and data handling overview"
            description="This page explains the general privacy position for TaxDecod and sets expectations around calculator use, enquiries, and platform improvement."
            ctaLabel="Contact TaxDecod"
            ctaHref="/contact"
          />

          <div className="space-y-6">
            {sections.map((section) => (
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