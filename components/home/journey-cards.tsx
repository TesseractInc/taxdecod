"use client";

import Link from "next/link";
import { ArrowUpRight, BarChart3, Receipt, RefreshCcw, Trophy, Wallet } from "lucide-react";
import Reveal from "../ui/reveal";

const cards = [
  {
    title: "Open the core calculator",
    description: "Start with a full salary reading and see monthly reality after deductions.",
    href: "/calculator",
    icon: BarChart3,
    tag: "Start here",
    featured: true,
  },
  {
    title: "Compare two salaries",
    description: "See whether an offer, raise, or switch improves monthly outcome.",
    href: "/compare-salary",
    icon: RefreshCcw,
    tag: "Decision",
  },
  {
    title: "Check a payslip",
    description: "Turn PAYE, NI, pension, and student loan lines into clearer meaning.",
    href: "/payslip-checker",
    icon: Receipt,
    tag: "Clarity",
  },
  {
    title: "Estimate a tax refund",
    description: "Sense-check whether you may have paid too much tax.",
    href: "/tax-refund-calculator",
    icon: RefreshCcw,
    tag: "Refund",
  },
  {
    title: "See salary position",
    description: "Use the leaderboard to understand where a salary sits in context.",
    href: "/leaderboard",
    icon: Trophy,
    tag: "Context",
  },
  {
    title: "Reality-check your money",
    description: "Move from gross salary into a more practical monthly view.",
    href: "/reality-check",
    icon: Wallet,
    tag: "Real life",
  },
];

export default function JourneyCards() {
  return (
    <section className="pt-16 pb-10 sm:pt-20 sm:pb-11">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Start with the right tool
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                The next useful step should always be obvious
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                TaxDecod should guide people like a salary decision system, not a pile of disconnected pages.
              </p>
            </div>

            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Built to reduce hesitation
            </div>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal key={card.href} delay={index * 0.04}>
                <Link
                  href={card.href}
                  className={`group flex h-full flex-col rounded-[28px] border p-6 transition ${
                    card.featured
                      ? "border-sky-200 bg-sky-50/65 dark:border-sky-900 dark:bg-sky-950/20"
                      : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/88"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex rounded-[18px] bg-slate-100 p-3 shadow-sm dark:bg-slate-900">
                      <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    </div>

                    <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                  </div>

                  <div className="mt-5 inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                    {card.tag}
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-400">
                    {card.description}
                  </p>

                  <div className="mt-6 text-sm font-medium text-sky-700 dark:text-sky-300">
                    Open page
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}