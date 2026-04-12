"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const insights = [
  {
    id: "bonus",
    title: "Bonus reality",
    headline: "A bonus rarely feels like the number you are promised",
    text: "The emotional mistake people make is thinking in gross pay. TaxDecod should show the amount that really lands after income tax, National Insurance, pension, and student loan pressure.",
    accent:
      "from-sky-500/15 via-cyan-500/10 to-teal-500/10 dark:from-sky-500/10 dark:via-cyan-500/8 dark:to-teal-500/6",
    points: ["Gross pay feels bigger than real pay", "Monthly impact matters more than headline size", "Visual clarity reduces salary regret"],
    href: "/salary-tools",
  },
  {
    id: "raise",
    title: "Raise impact",
    headline: "A raise can feel smaller than most people expect",
    text: "People usually judge a raise emotionally, not mathematically. The smarter reading is what changes in monthly take-home pay, not what changed in the offer letter.",
    accent:
      "from-emerald-500/15 via-sky-500/10 to-cyan-500/10 dark:from-emerald-500/10 dark:via-sky-500/8 dark:to-cyan-500/6",
    points: ["Net change matters more than gross change", "Tax pressure changes how raises feel", "Useful for job offers and pay reviews"],
    href: "/compare-salary",
  },
  {
    id: "payslip",
    title: "Payslip clarity",
    headline: "Most people do not fully understand why their payslip looks smaller",
    text: "Income tax, NI, pension, and student loan deductions often feel like a black box. TaxDecod should make that feel visual, calm, and understandable in seconds.",
    accent:
      "from-violet-500/15 via-sky-500/10 to-slate-500/10 dark:from-violet-500/10 dark:via-sky-500/8 dark:to-slate-500/6",
    points: ["Plain-English explanation builds trust", "Users stay longer when confusion gets resolved", "Payslip understanding drives repeat visits"],
    href: "/payslip-explained",
  },
];

export default function FeaturedInsights() {
  const [active, setActive] = useState(insights[0].id);
  const selected = insights.find((item) => item.id === active) ?? insights[0];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Salary thinking layers
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Go deeper than the first number you see
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              These are the salary questions that hold attention, create repeat
              visits, and make the platform feel more useful than a one-screen
              calculator.
            </p>

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
                className={`min-h-[360px] bg-gradient-to-br ${selected.accent} p-8`}
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

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {selected.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-white/50 bg-white/70 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60"
                      >
                        <p className="text-sm font-medium leading-7 text-slate-900 dark:text-slate-100">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={selected.href}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-sky-200 hover:text-sky-700 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:text-sky-300"
                  >
                    Open this path
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}