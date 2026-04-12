"use client";

import { Calculator, ClipboardList, MoveRight, Sparkles } from "lucide-react";
import Reveal from "../ui/reveal";

const steps = [
  {
    title: "Enter the salary signal",
    body: "Start with gross pay, then add region, pension, tax code, and student loan only when needed.",
    icon: Calculator,
    step: "Step 1",
    tone: "border-sky-200 bg-sky-50/55 dark:border-sky-900/70 dark:bg-sky-950/18",
  },
  {
    title: "Read what actually reaches you",
    body: "See yearly and monthly take-home pay immediately, with a cleaner reading of what is kept.",
    icon: Sparkles,
    step: "Step 2",
    tone: "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/70 dark:bg-emerald-950/18",
  },
  {
    title: "Understand why the number changed",
    body: "Turn income tax, NI, pension, and loan deductions into something more readable than raw payroll lines.",
    icon: ClipboardList,
    step: "Step 3",
    tone: "border-cyan-200 bg-cyan-50/50 dark:border-cyan-900/70 dark:bg-cyan-950/18",
  },
  {
    title: "Move into the next salary decision",
    body: "Compare salaries, check a refund, or explore what a raise, bonus, or offer really means.",
    icon: MoveRight,
    step: "Step 4",
    tone: "border-violet-200 bg-violet-50/48 dark:border-violet-900/70 dark:bg-violet-950/18",
  },
];

export default function HowItWorks() {
  return (
    <section className="pt-14 pb-10 sm:pt-16 sm:pb-11">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                How TaxDecod works
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                From salary input to real money understanding
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                The goal is to guide users from gross salary to a clearer reading of what reaches them and what to do next.
              </p>
            </div>

            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Structured for clarity
            </div>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-4 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.title}>
                <div className={`rounded-[26px] border p-5 ${step.tone}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex rounded-[18px] bg-white p-3 shadow-sm dark:bg-slate-900">
                      <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    </div>

                    <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-400">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-8 text-slate-600 dark:text-slate-300">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}