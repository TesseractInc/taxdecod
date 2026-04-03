"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import CalculatorCard from "../calculator/calculator-card";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.25), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-10%] top-[10%] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.18), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium app-chip"
            >
              <Sparkles className="h-4 w-4" />
              UK Salary Intelligence Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl app-title"
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
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-6 max-w-2xl text-lg leading-8 app-copy"
            >
              See exactly what you keep after tax, NI, pension, and student loan.
              Understand every deduction without guessing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                "Real take-home clarity",
                "Visual money flow",
                "Payslip explained",
                "Raise & bonus insight",
              ].map((item) => (
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
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-10 flex flex-wrap gap-4"
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
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative lg:max-w-[560px] lg:ml-auto"
          >
            <div className="absolute -top-6 right-0 hidden rounded-2xl border px-4 py-3 text-xs shadow-sm md:block app-card">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 app-accent" />
                <span className="app-title font-medium">
                  Real salary clarity in seconds
                </span>
              </div>
            </div>

            <CalculatorCard mode="compact" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}