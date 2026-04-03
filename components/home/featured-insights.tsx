"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const insights = [
  {
    id: "bonus",
    title: "Bonus reality",
    headline: "A bonus never feels like the headline number",
    text: "TaxDecod should show the real amount you actually keep after tax, NI, pension, and student loan deductions — visually, not just in text.",
    accent: "from-sky-500/15 to-cyan-500/10",
  },
  {
    id: "raise",
    title: "Raise impact",
    headline: "A raise changes less than most people expect",
    text: "Users need to see the extra net pay per year and per month, not just the gross increase. That is where real salary psychology happens.",
    accent: "from-emerald-500/15 to-sky-500/10",
  },
  {
    id: "payslip",
    title: "Payslip clarity",
    headline: "Most people do not actually understand their payslip",
    text: "Turn PAYE, NI, pension, and tax code into instant visual clarity so users stop feeling like payroll is a black box.",
    accent: "from-cyan-500/15 to-slate-500/10",
  },
];

export default function FeaturedInsights() {
  const [active, setActive] = useState(insights[0].id);
  const selected = insights.find((item) => item.id === active) ?? insights[0];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Focused insights
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Explore the salary angles people actually care about
            </h2>

            <div className="mt-6 grid gap-3">
              {insights.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={`rounded-[22px] border px-4 py-4 text-left transition ${
                    active === item.id
                      ? "border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-950/40"
                      : "border-slate-200 bg-slate-50 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-950"
                  }`}
                >
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className={`min-h-[340px] bg-gradient-to-br ${selected.accent} p-8`}
              >
                <div className="max-w-2xl">
                  <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
                    {selected.title}
                  </p>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    {selected.headline}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-700 dark:text-slate-300">
                    {selected.text}
                  </p>

                  <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Better than
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        raw tables
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        What users need
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        visual clarity
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Best outcome
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        better decisions
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}