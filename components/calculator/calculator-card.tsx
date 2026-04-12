"use client";

import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Sparkles,
  WalletCards,
} from "lucide-react";

type DeductionItem = {
  label: string;
  value: string;
  percent: number;
  colorClass: string;
  helper?: string;
};

const deductionItems: DeductionItem[] = [
  {
    label: "Income Tax",
    value: "£5,486",
    percent: 34,
    colorClass: "bg-sky-500",
    helper: "Usually the largest deduction pressure",
  },
  {
    label: "National Insurance",
    value: "£2,194",
    percent: 16,
    colorClass: "bg-cyan-500",
    helper: "A second layer that changes the final take-home",
  },
  {
    label: "Pension",
    value: "£2,000",
    percent: 14,
    colorClass: "bg-emerald-500",
    helper: "Good long term, but it reduces what you keep now",
  },
  {
    label: "Student Loan",
    value: "£1,038",
    percent: 10,
    colorClass: "bg-violet-500",
    helper: "Loan repayments can materially shape real monthly pay",
  },
];

const darkCard =
  "rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/86";
const darkPanel =
  "rounded-[26px] border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/88";

export default function CalculatorCard() {
  return (
    <section className="pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-slate-200 p-7 dark:border-slate-800 lg:border-b-0 lg:border-r">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] app-accent">
                Step 1
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Salary details
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
                Start with your gross salary, then adjust region, pension, and student loan only if needed.
              </p>

              <div className="mt-6 space-y-5">
                <div className={darkPanel}>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex rounded-[16px] bg-white p-3 shadow-sm dark:bg-slate-900">
                      <Sparkles className="h-5 w-5 app-accent" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        Pay period
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Choose yearly or monthly input.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className={darkCard}>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex rounded-[16px] bg-white p-3 shadow-sm dark:bg-slate-900">
                        <Building2 className="h-5 w-5 app-accent" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                          Region
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          England, Wales & NI rules.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={darkCard}>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex rounded-[16px] bg-white p-3 shadow-sm dark:bg-slate-900">
                        <GraduationCap className="h-5 w-5 app-accent" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                          Student loan
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Select the correct plan only if relevant.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={darkPanel}>
                  <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Tax code
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    Leave the standard code unless your payslip shows a different one.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] app-accent">
                Step 2
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Take-home result
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
                Your annual and monthly net pay update instantly.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className={darkCard}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Take-home per year
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
                    £29,282
                  </p>
                </div>

                <div className={darkCard}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Take-home per month
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
                    £2,440
                  </p>
                </div>

                <div className={darkCard}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Biggest deduction
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Income Tax
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[26px] border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/88">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                      Deduction breakdown
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                      Which deductions shape your take-home most
                    </p>
                  </div>

                  <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                    Live interpretation
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  {deductionItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * index }}
                    >
                      <div className="mb-2 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                            {item.label}
                          </p>
                          {item.helper ? (
                            <p className="mt-1 text-sm leading-7 text-slate-500 dark:text-slate-400">
                              {item.helper}
                            </p>
                          ) : null}
                        </div>

                        <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                          {item.value}
                        </span>
                      </div>

                      <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percent}%` }}
                          transition={{ duration: 0.8, delay: 0.12 * index }}
                          className={`h-full rounded-full ${item.colorClass}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex rounded-[16px] bg-slate-100 p-3 dark:bg-slate-950">
                      <WalletCards className="h-5 w-5 app-accent" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Take-home drives decisions
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        Rent, bills, savings, and lifestyle all depend on the money left after deductions, not the gross figure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}