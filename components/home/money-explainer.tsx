"use client";

import { motion } from "framer-motion";
import Reveal from "../ui/reveal";

const flow = [
  { label: "Gross salary", value: 100, color: "bg-slate-900 dark:bg-slate-100" },
  { label: "Income tax", value: 20, color: "bg-sky-500" },
  { label: "National Insurance", value: 8, color: "bg-cyan-500" },
  { label: "Pension", value: 5, color: "bg-emerald-500" },
  { label: "Take-home pay", value: 67, color: "bg-emerald-600 dark:bg-emerald-500" },
];

export default function MoneyExplainer() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <Reveal>
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Visual salary story
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                See where your salary actually goes
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                Salary should not feel mysterious. TaxDecod helps users move from
                gross pay to real take-home pay with a visual understanding of tax,
                National Insurance, pension, and the money that actually reaches
                their bank.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Gross pay is the headline number",
                  "Deductions reshape the real outcome",
                  "Net pay is what matters for actual life decisions",
                ].map((line) => (
                  <div
                    key={line}
                    className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Typical visual view
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                      You keep roughly 67%
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm dark:bg-slate-950">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      What users want
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Instant clarity
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-5">
                  {flow.map((item, index) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          {item.label}
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {item.value}%
                        </span>
                      </div>

                      <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.65, delay: index * 0.08 }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Best insight
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                      Take-home first
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Best format
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                      Visual + simple
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Best use
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                      Real decisions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}