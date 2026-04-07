"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import CalculatorCard from "../calculator/calculator-card";

const heroPills = [
  "Take-home pay clarity",
  "UK PAYE-style logic",
  "Pension and student loan aware",
  "Visual payslip understanding",
];

const trustStats = [
  {
    icon: ShieldCheck,
    title: "Built around UK salary rules",
    text: "Designed around UK payroll-style deductions, regions and current tax-year assumptions.",
  },
  {
    icon: BadgeCheck,
    title: "Made for decisions",
    text: "Useful for job offers, pay rises, monthly budgeting and salary reality checks.",
  },
  {
    icon: WalletCards,
    title: "More than one number",
    text: "See what reaches you, what gets deducted, and where to go next.",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-10 pt-8 sm:pb-12 sm:pt-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 10% 0%, rgba(14,165,233,0.14), transparent 25%), radial-gradient(circle at 90% 10%, rgba(16,185,129,0.10), transparent 20%), radial-gradient(circle at 50% 35%, rgba(59,130,246,0.08), transparent 30%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full app-chip px-4 py-2 text-sm font-semibold"
          >
            <Sparkles className="h-4 w-4" />
            Welcome to TaxDecod
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.05 }}
            className="mx-auto mt-6 max-w-5xl text-4xl font-bold tracking-tight app-title sm:text-5xl lg:text-6xl xl:text-[4.15rem]"
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
            TaxDecod is a UK salary intelligence platform built to help you
            understand take-home pay, deductions, payslips, and salary
            decisions more clearly than old-style calculator sites.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.14 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {heroPills.map((item) => (
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
            transition={{ duration: 0.52, delay: 0.18 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white hover-lift"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-2) 0%, var(--primary) 100%)",
                boxShadow: "0 18px 40px rgba(14,165,233,0.20)",
              }}
            >
              Start with your salary
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/compare-salary"
              className="inline-flex items-center rounded-2xl border px-6 py-3 text-sm font-semibold hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card)",
                color: "var(--text)",
              }}
            >
              Compare two salaries
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.22 }}
          className="mx-auto mt-12 max-w-6xl"
        >
          <div className="rounded-[36px] border p-3 shadow-[0_28px_100px_-40px_rgba(15,23,42,0.30)] app-card-strong sm:p-5">
            <CalculatorCard mode="compact" />
          </div>
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-3">
          {trustStats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.28 + index * 0.05 }}
                className="app-soft rounded-[26px] px-5 py-5"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-[18px] p-3 app-chip">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-base font-semibold app-title">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 app-copy">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}