import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";

export default function ContactPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Contact"
            title="Contact TaxDecod"
            description="Use this page for general platform contact, issue reporting, and trust-related questions about how TaxDecod works."
          />

          <section
            className="mt-8 rounded-[28px] border px-6 py-5 sm:px-7"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
              Contact framing
            </p>
            <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
              This route is for platform-level questions, issue reporting, and
              general clarification about how TaxDecod should be interpreted.
              It is not a route for personal legal, payroll, or regulated tax advice.
            </p>
          </section>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <section
              className="rounded-[30px] border px-6 py-6 sm:px-7"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <h2 className="text-2xl font-semibold tracking-tight app-title">
                General contact
              </h2>
              <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
                For general site questions, issue reporting, or trust-related
                clarification, contact:
              </p>

              <div
                className="mt-5 rounded-[22px] border px-4 py-4"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--surface-2)",
                }}
              >
                <p className="text-sm font-semibold app-title">
                  contact@taxdecod.com
                </p>
                <p className="mt-2 text-sm leading-7 app-copy">
                  Replace this with your real contact address if different.
                </p>
              </div>
            </section>

            <section
              className="rounded-[30px] border px-6 py-6 sm:px-7"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <h2 className="text-2xl font-semibold tracking-tight app-title">
                Important note
              </h2>
              <p className="mt-4 text-sm leading-8 app-copy sm:text-[15px]">
                TaxDecod can provide general clarification about the platform and
                how its pages should be interpreted, but cannot provide personal
                payroll processing, regulated tax advice, or legal advice.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/methodology" className="app-button-secondary">
                  Read methodology
                </Link>
                <Link href="/disclaimer" className="app-button-secondary">
                  Read disclaimer
                </Link>
              </div>
            </section>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}