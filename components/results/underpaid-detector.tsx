"use client";

import { AlertTriangle, ShieldCheck, Siren } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { getUnderpaidDetector } from "../../lib/tax/explanations/underpaid-detector";

type Props = {
  values: CalculatorInput;
  result: TakeHomeResult;
};

export default function UnderpaidDetector({ values, result }: Props) {
  const data = getUnderpaidDetector(values, result);

  const tone =
    data.status === "solid"
      ? {
          box: "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30",
          text: "text-emerald-700 dark:text-emerald-300",
          icon: <ShieldCheck className="h-5 w-5" />,
        }
      : data.status === "borderline"
      ? {
          box: "border-amber-200 bg-amber-50/80 dark:border-amber-900 dark:bg-amber-950/30",
          text: "text-amber-700 dark:text-amber-300",
          icon: <AlertTriangle className="h-5 w-5" />,
        }
      : {
          box: "border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/30",
          text: "text-rose-700 dark:text-rose-300",
          icon: <Siren className="h-5 w-5" />,
        };

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Under-pressure signal
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Does this salary look under pressure?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              This is not a market salary verdict. It is a practical signal about
              whether the real take-home result may feel financially stretched.
            </p>
          </div>

          <div className={`rounded-2xl border p-3 ${tone.box} ${tone.text}`}>
            {tone.icon}
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[0.42fr_0.58fr] sm:p-7">
        <div className={`rounded-[28px] border p-6 ${tone.box}`}>
          <p className={`text-sm font-medium ${tone.text}`}>Current signal</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {data.title}
          </h3>
          <p className="mt-3 text-sm leading-8 text-slate-600 dark:text-slate-400">
            {data.summary}
          </p>
        </div>

        <div className="grid gap-3">
          {data.points.map((point, index) => (
            <div
              key={`${point}-${index}`}
              className="rounded-[22px] border border-slate-200 bg-slate-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                {point}
              </p>
            </div>
          ))}

          {!data.points.length ? (
            <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                No major pressure signals are standing out in this reading beyond
                the normal deduction load.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}