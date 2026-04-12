"use client";

import { Gauge, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { TakeHomeResult } from "../../types/tax";
import { calculateSalaryScore } from "../../lib/tax/explanations/salary-score";

type SalaryScoreProps = {
  result: TakeHomeResult;
};

export default function SalaryScore({ result }: SalaryScoreProps) {
  const { score, label, message } = calculateSalaryScore(result);

  const color =
    score >= 80
      ? "#059669"
      : score >= 65
      ? "#0ea5e9"
      : score >= 50
      ? "#d97706"
      : "#e11d48";

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Salary Reality Score
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              How strong is your real income?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              This score is a quick signal based on what you keep, how visible
              deduction pressure is, and how usable the salary looks in real life.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
            <Gauge className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-center sm:p-7">
        <div className="flex items-center justify-center">
          <div className="relative h-40 w-40">
            <svg className="h-full w-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="68"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-slate-200 dark:text-slate-800"
              />

              <motion.circle
                cx="80"
                cy="80"
                r="68"
                stroke={color}
                strokeWidth="10"
                fill="none"
                strokeDasharray={427}
                strokeDashoffset={427 - (score / 100) * 427}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 427 }}
                animate={{ strokeDashoffset: 427 - (score / 100) * 427 }}
                transition={{ duration: 1 }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {score}
              </span>
              <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                out of 100
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Current signal
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {label}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {message}
            </p>
          </div>

          <div className="rounded-[26px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-sky-50 p-3 dark:bg-sky-950/40">
                <TrendingUp className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Why this is useful
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  This is not a market salary verdict. It is a quick reading of how
                  usable your salary looks after deductions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}