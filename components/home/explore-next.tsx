"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgePoundSterling,
  BriefcaseBusiness,
  Compass,
  Mail,
  Receipt,
  RefreshCcw,
  Target,
} from "lucide-react";
import Reveal from "../ui/reveal";

const links = [
  {
    title: "Compare two salaries properly",
    desc: "See whether a higher salary actually improves monthly life or mainly increases deductions.",
    href: "/compare-salary",
    tag: "Decision tool",
    icon: Compass,
  },
  {
    title: "Reverse from a monthly target",
    desc: "Work backwards from the amount you actually want to keep and find the salary behind it.",
    href: "/reverse-tax",
    tag: "Planning",
    icon: Target,
  },
  {
    title: "Explore hourly and monthly routes",
    desc: "Use faster entry points when the question is about hourly pay or a target take-home figure.",
    href: "/salary-hub",
    tag: "Intent hub",
    icon: BadgePoundSterling,
  },
  {
    title: "Check a payslip or refund route",
    desc: "Move into payroll validation when the question is no longer just about gross salary.",
    href: "/payslip-checker",
    tag: "Verification",
    icon: Receipt,
    featured: true,
  },
];

const supportCards = [
  {
    title: "Benchmarks",
    desc: "Add role and city salary context before moving into take-home comparison.",
    href: "/benchmarks",
    icon: BadgePoundSterling,
  },
  {
    title: "Contact",
    desc: "Use the contact page for support, partnerships, or commercial questions.",
    href: "/contact",
    icon: Mail,
  },
  {
    title: "Services",
    desc: "See wider offerings, business-facing support, and connected tools.",
    href: "/services",
    icon: BriefcaseBusiness,
  },
];

export default function ExploreNext() {
  return (
    <section className="pb-12 pt-12 sm:pb-14 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">What to do next</p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Move into the right next salary route
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
              TaxDecod works best when users move from the first result into the
              next route that matches the real question: compare, reverse, benchmark,
              payslip check, or refund exploration.
            </p>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {links.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.href} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="group relative h-full"
                >
                  <Link
                    href={item.href}
                    className={`relative flex h-full flex-col rounded-[28px] border p-5 shadow-sm transition ${
                      item.featured
                        ? "border-sky-300 bg-sky-50/22 hover:border-sky-400 dark:border-sky-700 dark:bg-sky-950/18 dark:hover:border-sky-600"
                        : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/20 dark:border-slate-800 dark:bg-slate-950/88 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex rounded-[18px] bg-slate-100 p-3 dark:bg-slate-900">
                        <Icon className="h-5 w-5 app-accent" />
                      </div>

                      <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                    </div>

                    <div className="mt-5 inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                      {item.tag}
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>

                    <div className="mt-5 text-sm font-semibold app-accent">
                      Open now →
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-7 grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/78">
              <p className="text-sm app-subtle">Platform logic</p>

              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Different salary questions need different routes
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-400">
                A salary estimate, a city judgment page, a benchmark page, and a payslip
                check are not the same question. TaxDecod should make that journey obvious.
              </p>
            </div>

            {supportCards.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[26px] border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:bg-sky-50/20 dark:border-slate-800 dark:bg-slate-950/88 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <div className="inline-flex rounded-[18px] bg-slate-100 p-3 dark:bg-slate-900">
                    <Icon className="h-5 w-5 app-accent" />
                  </div>

                  <p className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>

                  <p className="mt-5 text-sm font-semibold app-accent">Open page →</p>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}