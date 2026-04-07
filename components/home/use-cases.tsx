"use client";

import { motion } from "framer-motion";
import Reveal from "../ui/reveal";

export default function UseCases() {
  const cases = [
    {
      title: "Compare job offers properly",
      desc: "Judge whether a higher salary really improves your monthly life after deductions.",
    },
    {
      title: "Understand your payslip better",
      desc: "Break down PAYE, NI, pension, student loan, and tax code in clearer language.",
    },
    {
      title: "Budget with real numbers",
      desc: "Focus on take-home pay rather than gross salary when planning rent and bills.",
    },
    {
      title: "Check raises and bonuses",
      desc: "See how much of extra pay you actually keep instead of assuming the full increase reaches you.",
    },
  ];

  return (
    <section className="py-16" id="use-cases">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Real use cases
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Built for the salary decisions people actually make
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
              The best salary tools are not just informative. They help users
              compare, decide, and act with more confidence.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <motion.div whileHover={{ y: -4 }} className="app-card rounded-[30px] p-6">
                <div className="inline-flex rounded-full app-chip px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Use case
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}