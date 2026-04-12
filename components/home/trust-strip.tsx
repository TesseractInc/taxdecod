"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  FileText,
  Landmark,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "UK PAYE-aligned",
    text: "Built around the salary deductions most UK employees actually see.",
    tone:
      "border-sky-200 bg-sky-50/80 dark:border-sky-900 dark:bg-sky-950/30",
  },
  {
    icon: RefreshCcw,
    title: "Current tax-year logic",
    text: "Structured around current tax-year assumptions so the reading feels usable now.",
    tone:
      "border-cyan-200 bg-cyan-50/80 dark:border-cyan-900 dark:bg-cyan-950/30",
  },
  {
    icon: FileText,
    title: "Payslip-first clarity",
    text: "Designed to explain income tax, NI, pension, and student loan in plain English.",
    tone:
      "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30",
  },
  {
    icon: Landmark,
    title: "Built for decisions",
    text: "Useful for job offers, raises, overtime, bonuses, and monthly budgeting.",
    tone:
      "border-violet-200 bg-violet-50/80 dark:border-violet-900 dark:bg-violet-950/30",
  },
  {
    icon: BadgeCheck,
    title: "Take-home comes first",
    text: "The focus is the money that reaches you, not just the salary headline.",
    tone:
      "border-slate-300 bg-slate-50/90 dark:border-slate-700 dark:bg-slate-900/70",
  },
  {
    icon: Sparkles,
    title: "Modern by design",
    text: "Cleaner, calmer, and easier to trust than older calculator-style tax tools.",
    tone:
      "border-teal-200 bg-teal-50/80 dark:border-teal-900 dark:bg-teal-950/30",
  },
];

export default function TrustStrip() {
  return (
    <section className="pb-10 pt-2">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.24)] dark:border-slate-800 dark:bg-slate-950">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Why users should trust this reading
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                A salary tool only works when it feels credible, clear, and easy
                to use
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                TaxDecod is being designed to feel more reassuring than a
                typical tax calculator and more useful than a static salary
                table.
              </p>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3 sm:p-7">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  whileHover={{ y: -3 }}
                  className={`rounded-[26px] border p-5 ${item.tone}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-white/85 p-2.5 shadow-sm dark:bg-slate-950/70">
                      <Icon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}