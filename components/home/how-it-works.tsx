"use client";

import { Calculator, CircleDollarSign, ReceiptText } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "../ui/reveal";

const steps = [
  {
    icon: Calculator,
    title: "Start with your salary",
    desc: "Enter salary, region, pension, tax code, and student loan details.",
    tone: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/40",
  },
  {
    icon: CircleDollarSign,
    title: "See real take-home pay",
    desc: "Understand yearly net pay, monthly net pay, and total deductions immediately.",
    tone: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: ReceiptText,
    title: "Make a better decision",
    desc: "Compare salaries, reverse target income, and decode what your number really means.",
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
              From headline salary to real money clarity
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
              TaxDecod is not built to give you just one number. It is built to
              help you understand what actually reaches you and what to do next.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Reveal key={step.title} delay={index * 0.06}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="app-card rounded-[30px] p-6"
                >
                  <div
                    className={`mb-5 inline-flex rounded-[22px] p-3 ${step.bg} ${step.tone}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] app-accent">
                    Step {index + 1}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}