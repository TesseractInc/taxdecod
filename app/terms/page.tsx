import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

const termSections = [
  {
    title: "Use of the service",
    body: "By using TaxDecod, users agree to use the site lawfully and responsibly. The platform is provided as an informational salary and deduction guidance service, not as payroll software or a regulated advisory service.",
  },
  {
    title: "No guarantee of official outcome",
    body: "TaxDecod does not guarantee that any estimate, benchmark, comparison, or interpretation produced on the site will exactly match employer payroll results, HMRC records, or future tax outcomes.",
  },
  {
    title: "Content and tool availability",
    body: "TaxDecod may update, improve, pause, or remove features, pages, or routes as the platform develops. The service is provided on an ongoing-improvement basis rather than a guarantee of uninterrupted availability.",
  },
  {
    title: "User judgment and verification",
    body: "Users remain responsible for verifying important decisions against official documents, employer payroll information, HMRC records, or qualified professional advice where appropriate.",
  },
  {
    title: "Limitation of reliance",
    body: "TaxDecod is intended to support understanding and decision preparation. It should not be treated as the sole basis for employment, salary-negotiation, tax, legal, or financial decisions without additional verification.",
  },
  {
    title: "Acceptance of terms",
    body: "By continuing to use the platform, users accept these terms and the published trust, disclaimer, and privacy framing associated with the site.",
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
            title="Terms for using TaxDecod"
            description="These terms explain the basis on which TaxDecod is offered and how the platform should be used and interpreted."
          />

          <div className="mt-10 grid gap-4">
            {termSections.map((section) => (
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