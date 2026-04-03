"use client";

import { motion } from "framer-motion";
import Reveal from "../ui/reveal";

const flow = [
  { label: "Gross Salary", value: 100, color: "bg-slate-900 dark:bg-slate-100" },
  { label: "Income Tax", value: 22, color: "bg-sky-500" },
  { label: "National Insurance", value: 8, color: "bg-cyan-500" },
  { label: "Pension", value: 5, color: "bg-emerald-500" },
  { label: "Net Pay", value: 65, color: "bg-emerald-600 dark:bg-emerald-500" },
];

export default function MoneyExplainer() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <Reveal>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Salary explained visually
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                Salary is not one number.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                A salary starts as gross pay, then gets reshaped by tax, NI,
                pension, and other deductions. TaxDecod helps users see that
                flow clearly so the final net amount feels explained, not
                mysterious.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Gross pay is the headline number",
                  "Deductions change what actually reaches your bank",
                  "Net pay is what matters for real life",
                ].map((line) => (
                  <motion.div
                    key={line}
                    whileHover={{ y: -2 }}
                    className="rounded-[20px] bg-slate-50 px-4 py-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Simple salary flow
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                      What starts at 100% does not stay 100%
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-slate-950">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      Best understood visually
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Salary → deductions → net pay
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
                      Better than
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                      raw tables
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Best outcome
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                      fast clarity
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Best use
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                      real decisions
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