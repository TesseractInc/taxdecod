"use client";

import Link from "next/link";

export default function SeoCTACluster() {
  return (
    <section className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        What should you do next?
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Link href="/compare-salary" className="seo-card">
          Compare salaries
        </Link>

        <Link href="/reverse-tax" className="seo-card">
          Reverse from take-home
        </Link>

        <Link href="/" className="seo-card">
          Open calculator
        </Link>
      </div>
    </section>
  );
}