"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgePoundSterling,
  ContactRound,
  FileSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const coreLinks = [
  { label: "Calculator", href: "/calculator" },
  { label: "Compare", href: "/compare-salary" },
  { label: "Reverse", href: "/reverse-tax" },
  { label: "Salary Hub", href: "/salary-hub" },
  { label: "Benchmarks", href: "/benchmarks" },
];

const trustLinks = [
  { label: "Methodology", href: "/methodology" },
  { label: "Assumptions", href: "/assumptions" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

const supportLinks = [
  { label: "Salary Tools", href: "/salary-tools" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const footerCards = [
  {
    title: "Updated for 2025/26",
    description:
      "The platform is framed for current UK salary interpretation, not timeless generic calculator use.",
    icon: ShieldCheck,
  },
  {
    title: "Methodology visible",
    description:
      "Assumptions, methodology, and disclaimer routes are part of the product, not hidden away.",
    icon: FileSearch,
  },
  {
    title: "Built for salary decisions",
    description:
      "TaxDecod is designed for take-home clarity, comparison, reverse planning, and salary interpretation.",
    icon: Sparkles,
  },
];

export default function SiteFooter() {
  return (
    <footer className="pb-10 pt-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-950">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.08fr_0.72fr_0.72fr_0.86fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3"
              >
                <div className="site-header-mark">
                  <BadgePoundSterling className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    TaxDecod
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    UK salary intelligence platform
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="mt-5 max-w-md text-sm leading-8 text-slate-600 dark:text-slate-300"
              >
                Built for salary understanding, take-home clarity, comparison,
                reverse planning, and better UK salary decisions.
              </motion.p>

              <div className="mt-6 grid gap-3">
                {footerCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.3, delay: 0.06 * index }}
                      whileHover={{ y: -2 }}
                      className="rounded-[22px] border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/72"
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          whileHover={{ rotate: 6, scale: 1.05 }}
                          className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950"
                        >
                          <Icon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                        </motion.div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                Core
              </p>

              <div className="mt-4 space-y-3">
                {coreLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.26, delay: 0.03 * index }}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                Trust
              </p>

              <div className="mt-4 space-y-3">
                {trustLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.26, delay: 0.03 * index }}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                Support
              </p>

              <div className="mt-4 space-y-3">
                {supportLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.26, delay: 0.03 * index }}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.32, delay: 0.12 }}
                whileHover={{ y: -2 }}
                className="mt-5"
              >
                <Link
                  href="/contact"
                  className="group flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/72 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.06 }}
                    className="inline-flex rounded-[14px] bg-white p-2 shadow-sm dark:bg-slate-950"
                  >
                    <ContactRound className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  </motion.div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Contact TaxDecod
                    </p>
                    <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Support, editorial, or commercial queries
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800 md:px-8">
            <div className="flex flex-col gap-3 text-xs text-slate-500 dark:text-slate-400 lg:flex-row lg:items-center lg:justify-between">
              <p>
                © 2026 TaxDecod. Results are estimate-based salary guidance for UK decision support.
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {trustLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition hover:text-slate-900 dark:hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}