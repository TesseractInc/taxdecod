"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  ReceiptText,
  Sparkles,
  Trophy,
} from "lucide-react";

const actions = [
  {
    title: "Compare another salary",
    desc: "See how a higher or lower salary changes your take-home pay.",
    href: "/compare-salary",
    icon: BarChart3,
  },
  {
    title: "Check your payslip",
    desc: "Use year-to-date tax and NI to sense-check your deductions.",
    href: "/payslip-checker",
    icon: ReceiptText,
  },
  {
    title: "View salary leaderboard",
    desc: "See where this salary sits and how it compares.",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Explore more salary tools",
    desc: "Go deeper with raise, bonus, and reverse salary scenarios.",
    href: "/salary-tools",
    icon: Sparkles,
  },
];

export default function NextActions() {
  return (
    <section>
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] app-accent sm:text-sm">
          What next
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title sm:text-4xl">
          Continue from your result
        </h2>
        <p className="mt-3 text-sm leading-7 app-copy sm:text-base sm:leading-8">
          After checking your take-home pay, the next useful step is usually
          more specific.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 rounded-[24px] opacity-0 blur-xl transition group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.14), rgba(16,185,129,0.08))",
                }}
              />

              <Link
                href={item.href}
                className="relative block rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.2)] transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-[18px] p-3 app-soft">
                    <Icon className="h-5 w-5 app-accent" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 app-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="mt-4 text-base font-semibold app-title sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-7 app-copy">
                  {item.desc}
                </p>

                <p className="mt-4 text-sm font-medium app-accent">Open →</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}