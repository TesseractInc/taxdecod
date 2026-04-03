"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ScanSearch,
  CircleDollarSign,
} from "lucide-react";
import CalculatorCard from "../calculator/calculator-card";

const heroPills = [
  "See real take-home pay",
  "Understand every deduction",
  "Compare salary scenarios",
  "Built for payslips, raises, and offers",
];

const floatingSignals = [
  {
    icon: ShieldCheck,
    label: "Built for clear salary decisions",
    className:
      "left-2 top-10 md:left-8 md:top-12",
  },
  {
    icon: TrendingUp,
    label: "Instant take-home visibility",
    className:
      "right-2 top-8 md:right-8 md:top-16",
  },
  {
    icon: ScanSearch,
    label: "Simple enough to understand fast",
    className:
      "left-6 bottom-10 hidden lg:flex",
  },
  {
    icon: CircleDollarSign,
    label: "Visual salary reality",
    className:
      "right-8 bottom-8 hidden lg:flex",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-18 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] top-[-12%] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.22), transparent 72%)",
          }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-12%] top-[8%] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.16), transparent 72%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[26%] h-[320px] w-[320px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.10), transparent 75%)",
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
            transition={{ duration: 0.52, delay: 0.05 }}
            className="mx-auto mt-6 max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.2rem] app-title"
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
            transition={{ duration: 0.52, delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 app-copy sm:text-xl"
          >
            See exactly what you take home after tax, NI, pension, and student
            loan. TaxDecod turns confusing salary numbers into a clear visual
            experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.14 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {heroPills.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.18 + index * 0.04 }}
                className="rounded-full border px-4 py-2 text-sm app-subtle"
                style={{ borderColor: "var(--line)" }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.2 }}
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
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.18 }}
          className="relative mx-auto mt-12 max-w-6xl"
        >
          {floatingSignals.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute z-10 rounded-full border px-4 py-3 text-xs shadow-sm app-card ${item.className}`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 app-accent" />
                  <span className="app-title font-medium">{item.label}</span>
                </div>
              </motion.div>
            );
          })}

          <div className="rounded-[36px] border p-3 shadow-[0_24px_90px_-36px_rgba(15,23,42,0.32)] app-card-strong sm:p-5">
            <CalculatorCard mode="compact" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}