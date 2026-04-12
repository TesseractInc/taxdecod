"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-12 pt-10 sm:pb-14 sm:pt-12 lg:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium"
            style={{
              borderColor: "color-mix(in srgb, var(--primary) 12%, var(--line))",
              background: "color-mix(in srgb, var(--surface-1) 92%, transparent)",
              color: "var(--text)",
            }}
          >
            <Sparkles className="h-4 w-4 app-accent" />
            UK Salary Intelligence Platform
          </div>

          <h1 className="mt-8 max-w-5xl text-balance text-[clamp(3.35rem,7vw,6.25rem)] font-black leading-[0.95] tracking-[-0.06em]">
            <span className="block text-slate-950 dark:text-white">
              Know your salary.
            </span>
            <span className="mt-2 block bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Not just the number — the reality.
            </span>
          </h1>

          <p className="mt-7 max-w-3xl text-balance text-[1.08rem] leading-9 text-slate-600 dark:text-slate-300">
            See what you actually keep after income tax, National Insurance, pension, and student loan deductions.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/calculator" className="app-button-primary">
              Open calculator
            </Link>
            <Link href="/compare-salary" className="app-button-secondary">
              Compare salaries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}