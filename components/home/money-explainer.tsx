"use client";

import { ArrowDownRight, BadgePoundSterling } from "lucide-react";
import Reveal from "../ui/reveal";

const factors = [
  {
    title: "Gross pay attracts attention",
    body: "Job ads, raises, and offers are framed around gross salary because it feels bigger and more emotional.",
    icon: BadgePoundSterling,
  },
  {
    title: "Deductions reshape reality",
    body: "Income tax, NI, pension, and loan repayments decide what reaches your account, not the headline number.",
    icon: ArrowDownRight,
  },
];

const bars = [
  {
    label: "Gross salary",
    helper: "The headline number people emotionally anchor to first",
    value: "100%",
    width: "100%",
    className: "bg-slate-900 dark:bg-slate-100",
  },
  {
    label: "Income tax",
    helper: "Usually the largest deduction pressure",
    value: "22%",
    width: "22%",
    className: "bg-sky-500",
  },
  {
    label: "National Insurance",
    helper: "A second major layer that changes final reality",
    value: "8%",
    width: "8%",
    className: "bg-cyan-500",
  },
  {
    label: "Pension",
    helper: "Good long term, but it reduces what you keep now",
    value: "5%",
    width: "5%",
    className: "bg-emerald-500",
  },
  {
    label: "Net pay",
    helper: "The part that actually shapes real life",
    value: "65%",
    width: "65%",
    className: "bg-slate-700 dark:bg-slate-200",
  },
];

export default function MoneyExplainer() {
  return (
    <section className="pt-10 pb-10 sm:pt-12 sm:pb-11">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                Salary explained visually
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                The wrong salary number gets most of the attention
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Most people think emotionally in gross pay, but real life is shaped by take-home pay. TaxDecod should make that shift feel obvious, visual, and easy to understand.
              </p>

              <div className="mt-6 space-y-4">
                {factors.map((factor) => {
                  const Icon = factor.icon;

                  return (
                    <div
                      key={factor.title}
                      className="rounded-[24px] border border-slate-200 bg-slate-50/78 px-5 py-5 dark:border-slate-800 dark:bg-slate-900/72"
                    >
                      <div className="flex items-start gap-4">
                        <div className="inline-flex rounded-[16px] bg-white p-3 shadow-sm dark:bg-slate-950">
                          <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                        </div>

                        <div>
                          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {factor.title}
                          </p>
                          <p className="mt-2 text-sm leading-8 text-slate-600 dark:text-slate-400">
                            {factor.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
              <div className="border-b border-slate-200 px-7 py-7 dark:border-slate-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Visual salary flow
                    </p>
                    <h3 className="mt-3 text-[2.65rem] font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-slate-100">
                      What starts at 100% does not stay 100%
                    </h3>
                  </div>

                  <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    Better understood visually
                  </div>
                </div>
              </div>

              <div className="px-7 py-7">
                <div className="space-y-6">
                  {bars.map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-2 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                            {bar.label}
                          </p>
                          <p className="mt-1 text-sm leading-7 text-slate-500 dark:text-slate-400">
                            {bar.helper}
                          </p>
                        </div>

                        <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                          {bar.value}
                        </span>
                      </div>

                      <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className={`h-full rounded-full ${bar.className}`}
                          style={{ width: bar.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}