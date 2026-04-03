"use client";

import { motion } from "framer-motion";
import Reveal from "../ui/reveal";

export default function MoneyExplainer() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
          <Reveal>
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Visual salary story
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Salary is not one number.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                A salary starts as gross pay, then gets split by tax, NI, pension,
                and other deductions. TaxDecod helps users see that flow clearly,
                so the final net amount feels explained, not mysterious.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Gross pay is the headline number",
                  "Deductions reduce what reaches your bank",
                  "Net pay is what matters for real life",
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
              <div className="space-y-5">
                {[
                  { label: "Gross Salary", value: 100, color: "bg-slate-900 dark:bg-slate-100" },
                  { label: "Tax", value: 22, color: "bg-sky-500" },
                  { label: "National Insurance", value: 8, color: "bg-cyan-500" },
                  { label: "Pension", value: 5, color: "bg-emerald-500" },
                  { label: "Net Pay", value: 65, color: "bg-emerald-600 dark:bg-emerald-500" },
                ].map((item, index) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        {item.label}
                      </span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {item.value}%
                      </span>
                    </div>

                    <div className="h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.07 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}