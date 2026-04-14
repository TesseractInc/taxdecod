"use client";

import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Container from "@/components/ui/container";
import ReverseTaxCalculator from "@/components/reverse-tax/ReverseTaxCalculator";
import TaxYearTrustBar from "@/components/shared/tax-year-trust-bar";
import SeoPageHero from "@/components/seo/seo-page-hero";
import SeoRealityCard from "@/components/seo/seo-reality-card";
import SeoCtaCluster from "@/components/seo/seo-cta-cluster";
import EmailCapturePanel from "@/components/shared/email-capture-panel";
import { TRUST_COPY } from "@/lib/tax/config";

export default function ReverseTaxPageClient() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Reverse salary tool"
            title="Start from the take-home pay you want"
            description="Reverse salary planning helps users think in real monthly income first, then work backwards to the gross salary needed to reach it."
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.reversePage.description}
              points={[...TRUST_COPY.reversePage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Why this tool matters">
              Most people judge salary using the gross headline number. This
              tool flips that logic and starts from the amount you actually want
              to keep each month or year, which makes it far more useful for
              planning rent, savings, and real affordability.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/calculator",
                  title: "Use the full salary calculator",
                  description:
                    "Start with a known gross salary and see the full deduction breakdown.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare salary outcomes",
                  description:
                    "Test whether a higher salary creates a meaningful monthly improvement.",
                },
                {
                  href: "/salary-hub",
                  title: "Explore salary pages",
                  description:
                    "Move through nearby salaries, variants, and take-home routes.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <ReverseTaxCalculator />
          </div>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            <Link
              href="/calculator"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Open the main calculator
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Start with your gross salary and read the full yearly and monthly
                outcome after deductions.
              </p>
            </Link>

            <Link
              href="/compare-salary"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Compare two salaries
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                See whether a salary increase really improves your monthly life.
              </p>
            </Link>

            <Link
              href="/salary-hub"
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
            >
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Browse salary pages
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Explore high-intent salary lookups and related take-home routes.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <EmailCapturePanel
              title="Send your reverse salary result to your email"
              description="Save your target-income scenario so you can compare it later with other salary options."
              buttonLabel="Send reverse report"
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}