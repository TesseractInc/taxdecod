"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
  Receipt,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import Reveal from "../ui/reveal";

const links = [
  {
    title: "Compare two salaries properly",
    desc: "See whether a higher salary actually improves monthly life or mainly increases deductions.",
    href: "/compare-salary",
    tag: "Decision tool",
    icon: Sparkles,
  },
  {
    title: "Check a payslip to date",
    desc: "Use year-to-date values to see if payroll looks roughly on track.",
    href: "/payslip-checker",
    tag: "Payslip check",
    icon: Receipt,
  },
  {
    title: "Estimate a tax refund",
    desc: "Sense-check whether you may have paid too much tax.",
    href: "/tax-refund-calculator",
    tag: "Refund tool",
    icon: RefreshCcw,
  },
  {
    title: "Explore services or contact",
    desc: "Find business services, support routes, and ways to reach the team.",
    href: "/services",
    tag: "Business",
    icon: BriefcaseBusiness,
    featured: true,
  },
];

const supportCards = [
  {
    title: "Services",
    desc: "See wider offerings, business-facing support, and connected tools.",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Contact",
    desc: "Use the contact page for support, partnerships, or commercial questions.",
    href: "/contact",
    icon: Mail,
  },
];

export default function ExploreNext() {
  return (
    <section className="pt-12 pb-12 sm:pt-14 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">What to do next</p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Keep moving with the right next step
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
              After the first result, TaxDecod should guide users into comparison, payslip checks, refund exploration, or support routes.
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
          <div className="mt-7 grid gap-4 lg:grid-cols-[1.16fr_0.84fr_0.84fr]">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/78">
              <p className="text-sm app-subtle">Important</p>

              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Salary estimate and payslip check are not the same question
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-400">
                A salary calculation shows what should happen. A payslip check helps judge whether payroll looks roughly right.
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