"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgePoundSterling,
  Compass,
  Mail,
  Receipt,
  SearchCheck,
  Target,
} from "lucide-react";
import Reveal from "../ui/reveal";

const primaryRoutes = [
  {
    title: "Compare two salaries properly",
    desc: "Use this when the real question is whether a raise or offer actually improves monthly life.",
    href: "/compare-salary",
    tag: "Decision route",
    icon: Compass,
  },
  {
    title: "Reverse from a monthly target",
    desc: "Use this when you care about the amount you want to keep, not the gross headline salary.",
    href: "/reverse-tax",
    tag: "Planning route",
    icon: Target,
  },
  {
    title: "Check payslip or refund routes",
    desc: "Use these when the question shifts from salary estimation into payroll correctness.",
    href: "/payslip-checker",
    tag: "Verification",
    icon: Receipt,
  },
];

const secondaryRoutes = [
  {
    title: "Benchmarks hub",
    desc: "Add role and city salary context before checking take-home outcomes.",
    href: "/benchmarks",
    icon: BadgePoundSterling,
  },
  {
    title: "Methodology",
    desc: "Read how TaxDecod frames salary outputs and how they should be interpreted.",
    href: "/methodology",
    icon: SearchCheck,
  },
  {
    title: "Contact",
    desc: "Use the contact page for support, partnerships, or commercial enquiries.",
    href: "/contact",
    icon: Mail,
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
              Move into the next route that matches the real salary question
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
              TaxDecod works best when users move from the first result into the
              next route that fits the actual problem: compare, reverse-plan,
              verify, benchmark, or understand the result more deeply.
            </p>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {primaryRoutes.map((item, index) => {
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
                    className="relative flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:bg-sky-50/20 dark:border-slate-800 dark:bg-slate-950/88 dark:hover:border-sky-800 dark:hover:bg-slate-900"
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
          <div className="mt-7 grid gap-4 lg:grid-cols-[1.15fr_0.95fr_0.95fr_0.95fr]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/78">
              <p className="text-sm app-subtle">Platform logic</p>

              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Different salary questions need different tools
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-400">
                A salary estimate, a city benchmark page, a reverse planner, and a
                payslip check are not the same job. TaxDecod should make that
                distinction feel obvious and trustworthy.
              </p>
            </div>

            {secondaryRoutes.map((item) => {
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

                  <p className="mt-5 text-sm font-semibold app-accent">
                    Open page →
                  </p>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}