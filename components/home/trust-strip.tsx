"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  FileText,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "UK-focused tax logic",
    text: "Built around PAYE-style salary calculations for UK users.",
  },
  {
    icon: RefreshCcw,
    title: "Current tax-year assumptions",
    text: "Positioned around 2025/26 assumptions and salary decision use cases.",
  },
  {
    icon: FileText,
    title: "Payslip-first clarity",
    text: "Designed to explain deductions in plain English, not just show totals.",
  },
  {
    icon: BadgeCheck,
    title: "Decision-oriented output",
    text: "Useful for offers, raises, comparisons, and real monthly planning.",
  },
];

export default function TrustStrip() {
  return (
    <section className="pb-10 pt-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="app-card overflow-hidden rounded-[32px] p-5 md:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
                Accuracy and trust
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
                Built to feel clearer and more reliable
              </h2>
              <p className="mt-3 text-sm leading-7 app-copy sm:text-base">
                TaxDecod is designed around UK salary interpretation. It is not
                a replacement for official HMRC guidance or payroll advice, but
                it is built to make salary numbers easier to understand and use.
              </p>
            </div>

            <div className="rounded-[22px] border px-4 py-3 text-sm app-soft">
              <p className="font-semibold app-title">Trust signal</p>
              <p className="mt-1 app-subtle">
                UK PAYE-focused • current assumptions • plain-English breakdowns
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="rounded-[26px] border p-5 app-soft"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-white p-2.5 shadow-sm dark:bg-slate-950">
                      <Icon className="h-4 w-4 app-accent" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold app-title">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-6 app-subtle">
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