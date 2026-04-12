"use client";

import Link from "next/link";
import { ArrowUpRight, BadgePoundSterling, BriefcaseBusiness, Receipt, TrendingUp } from "lucide-react";
import Reveal from "../ui/reveal";

const items = [
  {
    title: "Compare job offers properly",
    description:
      "A bigger salary title does not always mean a better monthly reality. Compare offers using the number that actually reaches you.",
    href: "/compare-salary",
    icon: BriefcaseBusiness,
    tag: "Decision",
    featured: true,
  },
  {
    title: "Understand your payslip",
    description:
      "Turn income tax, NI, pension, and student loan deductions into a clear explanation you can actually use.",
    href: "/payslip-checker",
    icon: Receipt,
    tag: "Clarity",
  },
  {
    title: "Plan using real income",
    description:
      "Budget with take-home pay instead of gross salary so rent, bills, savings, and lifestyle choices feel realistic.",
    href: "/reality-check",
    icon: BadgePoundSterling,
    tag: "Planning",
  },
  {
    title: "Check raises and bonuses",
    description:
      "See how much of extra pay really stays with you before you judge a raise, a bonus, or extra work.",
    href: "/salary-tools",
    icon: TrendingUp,
    tag: "Growth",
  },
];

export default function UseCases() {
  return (
    <section className="pt-10 pb-10 sm:pt-12 sm:pb-11">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Real salary situations
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                Built around the decisions people actually make with salary
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                TaxDecod should feel useful the moment a user asks: what do I really get, why is my payslip smaller, is this raise worth it, or should I take this job?
              </p>
            </div>

            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Product-led salary clarity
            </div>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex h-full flex-col rounded-[28px] border p-6 transition ${
                    item.featured
                      ? "border-sky-200 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-950/20"
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
                    {item.tag}
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-6 text-sm font-medium text-sky-700 dark:text-sky-300">
                    Open path
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