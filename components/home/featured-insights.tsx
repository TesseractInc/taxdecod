"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const insights = [
  {
    id: "bonus",
    title: "Bonus shock",
    headline: "A £2,000 bonus never feels like £2,000",
    text: "TaxDecod shows the real amount you actually keep after tax, NI, pension, and student loan deductions.",
    accent: "from-sky-500/15 to-cyan-500/10",
  },
  {
    id: "raise",
    title: "Raise reality",
    headline: "A raise changes less than most people expect",
    text: "See the extra net pay per year and per month, not just the headline increase.",
    accent: "from-emerald-500/15 to-sky-500/10",
  },
  {
    id: "payslip",
    title: "Payslip clarity",
    headline: "Most people do not really understand their payslip",
    text: "Turn PAYE, NI, pension, and tax code into simple explanations that make sense instantly.",
    accent: "from-cyan-500/15 to-slate-500/10",
  },
];

export default function FeaturedInsights() {
  const [active, setActive] = useState(insights[0].id);
  const selected = insights.find((item) => item.id === active) ?? insights[0];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Featured insights
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Explore the most useful salary angles
            </h2>

            <div className="mt-6 grid gap-3">
              {insights.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    active === item.id
                      ? "border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-950/40"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                  }`}
                >
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className={`min-h-[320px] bg-gradient-to-br ${selected.accent} p-8`}
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
                        Real net effect
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Visual
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Payslip clarity
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Plain English
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Decision support
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Actionable
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