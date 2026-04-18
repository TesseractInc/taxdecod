import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy | TaxDecod",
  description:
    "Read the TaxDecod privacy policy to understand how platform inputs, analytics, cookies, and account-related information may be handled while using the site.",
};

const privacySections = [
  {
    title: "General privacy position",
    body: "TaxDecod aims to handle platform and usage information responsibly. This page explains the main categories of information that may be processed while using the site and why that information may be needed to operate, improve, and secure the platform.",
  },
  {
    title: "Information users may enter",
    body: "Depending on the feature used, users may enter salary figures, deduction inputs, tax-code details, payslip values, benchmark selections, or an email address where a feature offers account-linked saving, export, or delivery.",
  },
  {
    title: "How information is used",
    body: "User-provided inputs may be used to generate salary-related outputs, power feature logic, support saved-scenario functionality, improve platform quality, investigate technical issues, and maintain product performance.",
  },
  {
    title: "Analytics and usage data",
    body: "TaxDecod may use analytics and performance tools to understand traffic patterns, route usage, device behaviour, page performance, and feature engagement. This helps improve usability, quality, stability, and product decision-making.",
  },
  {
    title: "Cookies and similar technologies",
    body: "The site may use cookies or similar technologies for essential site operation, analytics, performance measurement, user preferences, and, where enabled, advertising-related functionality. Browser controls may allow users to manage some cookie behaviour.",
  },
  {
    title: "Advertising and monetization",
    body: "If advertising is enabled on TaxDecod, ad partners may use cookies or similar technologies to serve, measure, or improve ad delivery, subject to their own policies and applicable requirements. Advertising-related processing may evolve as monetization features are introduced or expanded.",
  },
  {
    title: "Email and account-linked features",
    body: "Where a feature allows account creation, scenario saving, or email-based delivery, the minimum information needed to support that functionality may be processed and stored through the relevant technical providers used by the platform.",
  },
  {
    title: "Data minimisation and user judgment",
    body: "Users should avoid entering unnecessary personal or highly sensitive information into tools that are primarily designed for salary estimation and deduction interpretation. TaxDecod is not intended to act as a secure document vault for highly sensitive financial records.",
  },
  {
    title: "Third-party services",
    body: "TaxDecod may rely on third-party infrastructure, analytics, authentication, hosting, database, or monetization providers to operate the platform. Those services may process technical or usage information as part of delivering their role in the service.",
  },
  {
    title: "Policy updates",
    body: "This privacy policy may be updated as the platform evolves. Continued use of the site after an update means users accept the latest published version of the policy.",
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
            description="This page provides a plain-language overview of how platform inputs, analytics, cookies, and account-related information may be handled while using TaxDecod."
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
              This is a plain-language privacy overview intended to help users
              understand the general privacy position of TaxDecod. It should be
              read alongside the platform’s terms, disclaimer, methodology, and
              contact pages.
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

          <section
            className="mt-10 rounded-[30px] border px-6 py-6 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--card-strong)",
            }}
          >
            <h2 className="text-2xl font-semibold tracking-tight app-title">
              Related trust pages
            </h2>
            <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
              For more detail on how TaxDecod should be interpreted, review the
              related trust and platform pages below.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/terms" className="app-button-secondary">
                Read terms
              </Link>
              <Link href="/disclaimer" className="app-button-secondary">
                Read disclaimer
              </Link>
              <Link href="/methodology" className="app-button-secondary">
                Read methodology
              </Link>
              <Link href="/contact" className="app-button-primary">
                Contact TaxDecod
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}