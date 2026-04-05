"use client";

import Link from "next/link";
import ReverseTaxCalculator from "@/components/reverse-tax/ReverseTaxCalculator";
import SiteHeader from "@/components/layout/site-header";
import TaxYearTrustBar from "@/components/shared/tax-year-trust-bar";
import { TRUST_COPY } from "@/lib/tax/config";

export default function ReverseTaxPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
              Reverse salary tool
            </p>

            <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
              Reverse salary calculator
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 app-copy">
              Know how much you need to earn to take home your target income.
              This is the goal-based version of TaxDecod — useful when you care
              about the real monthly number, not just the gross salary.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.reversePage.description}
              points={[...TRUST_COPY.reversePage.points]}
            />
          </div>

          <div className="mt-10">
            <ReverseTaxCalculator />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Link href="/calculator" className="app-card p-6">
              <p className="font-semibold app-title">Main calculator</p>
              <p className="mt-2 text-sm app-copy">
                Start with a gross salary and see your full take-home breakdown.
              </p>
            </Link>

            <Link href="/compare-salary" className="app-card p-6">
              <p className="font-semibold app-title">Compare salaries</p>
              <p className="mt-2 text-sm app-copy">
                Test whether a higher salary actually changes your real pay.
              </p>
            </Link>

            <Link href="/salary-hub" className="app-card p-6">
              <p className="font-semibold app-title">Explore salary pages</p>
              <p className="mt-2 text-sm app-copy">
                Browse high-intent salary pages across different pay levels.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}