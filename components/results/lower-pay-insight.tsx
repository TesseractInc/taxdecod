"use client";

import { AlertTriangle, Coins, ShieldCheck } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { getLowerPayInsight } from "../../lib/tax/explanations/lower-pay-insight";

export default function LowerPayInsight({
  values,
  result,
}: {
  values: CalculatorInput;
  result: TakeHomeResult;
}) {
  const insight = getLowerPayInsight(values, result);
  const keyPoints = insight.points.slice(0, 4);

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-amber-50 p-3 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="max-w-3xl">
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Reality insight
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Why your salary can feel smaller than expected
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              The salary headline and the money you feel in real life are not the
              same thing. These are the main reasons the result may feel lower
              than expected.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 lg:grid-cols-2 sm:p-7">
        {keyPoints.map((point, index) => (
          <div
            key={index}
            className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 transition hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="mb-3 flex items-center gap-2">
              {index % 2 === 0 ? (
                <Coins className="h-4.5 w-4.5 text-sky-500" />
              ) : (
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
              )}

              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Key impact
              </span>
            </div>

            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
              {point}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}