"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import CalculatorCard from "../calculator/calculator-card";

const highlights = [
  "See real take-home pay",
  "Understand every deduction",
  "Visual salary breakdowns",
  "Compare salary scenarios",
];

const previewStats = [
  {
    label: "Updated for",
    value: "UK tax year",
  },
  {
    label: "Built for",
    value: "salary clarity",
  },
  {
    label: "Best for",
    value: "offers • payslips • raises",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.18), transparent 72%)",
          }}
        />
        <div
          className="absolute right-[-8%] top-[18%] h-[320px] w-[320px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.12), transparent 72%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium app-chip"
          >
            <Sparkles className="h-4 w-4" />
            UK Salary Intelligence Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl app-title"
          >
            Know your salary.
            <br />
            <span className="app-accent">
              Not just the number — the reality.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 app-copy"
          >
            See exactly what you take home after tax, NI, pension, and student
            loan. TaxDecod turns confusing salary numbers into a clear visual
            experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-full border px-4 py-2 text-sm app-subtle"
                style={{ borderColor: "var(--line)" }}
              >
                {item}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium text-white hover-lift"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-2) 0%, var(--primary) 100%)",
              }}
            >
              Start calculation
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#seo-links"
              className="inline-flex items-center rounded-2xl border px-6 py-3 text-sm font-medium hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card)",
                color: "var(--text)",
              }}
            >
              Explore salary pages
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          <div className="absolute -top-5 left-6 hidden rounded-2xl border px-4 py-3 text-xs shadow-sm md:block app-card">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 app-accent" />
              <span className="app-title font-medium">
                Built for clear salary decisions
              </span>
            </div>
          </div>

          <div className="absolute -top-5 right-6 hidden rounded-2xl border px-4 py-3 text-xs shadow-sm md:block app-card">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 app-accent" />
              <span className="app-title font-medium">
                Instant take-home visibility
              </span>
            </div>
          </div>

          <div className="rounded-[32px] border p-3 shadow-[0_20px_80px_-30px_rgba(2,12,27,0.35)] app-card-strong sm:p-5">
            <CalculatorCard mode="compact" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {previewStats.map((item) => (
              <div
                key={item.label}
                className="app-soft rounded-3xl px-5 py-5 text-center"
              >
                <p className="text-xs uppercase tracking-[0.16em] app-subtle">
                  {item.label}
                </p>
                <p className="mt-2 text-base font-semibold app-title">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}