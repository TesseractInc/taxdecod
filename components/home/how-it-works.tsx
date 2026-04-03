"use client";

import { Calculator, CircleDollarSign, ReceiptText } from "lucide-react";
import Reveal from "../ui/reveal";

const steps = [
  {
    icon: Calculator,
    title: "Enter salary details",
    desc: "Start with salary, pension, tax code, region, and student loan setup.",
    tone: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/40",
  },
  {
    icon: CircleDollarSign,
    title: "See real take-home pay",
    desc: "Instantly understand net pay, total deductions, and how much you actually keep.",
    tone: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: ReceiptText,
    title: "Move into deeper tools",
    desc: "Go into payslip understanding, raise impact, bonus reality, and salary comparisons.",
    tone: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              From salary confusion to visual clarity
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              The homepage should guide users clearly: start with the main
              calculator, understand the money flow, then move into more specific
              salary questions.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.title} delay={index * 0.06}>
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                  <div
                    className={`mb-5 inline-flex rounded-2xl p-3 ${step.bg} ${step.tone}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {step.desc}
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