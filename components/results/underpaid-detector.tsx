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
          box: "bg-emerald-50 dark:bg-emerald-950/30",
          text: "text-emerald-700 dark:text-emerald-300",
          border: "border-emerald-200 dark:border-emerald-900",
          icon: <ShieldCheck className="h-5 w-5" />,
        }
      : data.status === "borderline"
      ? {
          box: "bg-amber-50 dark:bg-amber-950/30",
          text: "text-amber-700 dark:text-amber-300",
          border: "border-amber-200 dark:border-amber-900",
          icon: <AlertTriangle className="h-5 w-5" />,
        }
      : {
          box: "bg-rose-50 dark:bg-rose-950/30",
          text: "text-rose-700 dark:text-rose-300",
          border: "border-rose-200 dark:border-rose-900",
          icon: <Siren className="h-5 w-5" />,
        };

  return (
    <section className="app-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium app-accent">Underpaid detector</p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            Does your pay look under pressure?
          </h2>
          <p className="mt-3 text-sm leading-7 app-copy">
            This is not a market salary audit. It is a practical signal showing
            whether your real pay may feel weaker than expected after deductions.
          </p>
        </div>

        <div className={`rounded-2xl p-3 ${tone.box} ${tone.text}`}>
          {tone.icon}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
        <div className={`rounded-[24px] border p-5 ${tone.box} ${tone.border}`}>
          <p className={`text-sm font-medium ${tone.text}`}>Current signal</p>
          <h3 className="mt-2 text-2xl font-semibold app-title">{data.title}</h3>
          <p className="mt-3 text-sm leading-7 app-copy">{data.summary}</p>
        </div>

        <div className="grid gap-3">
          {data.points.map((point, index) => (
            <div key={`${point}-${index}`} className="app-soft p-4">
              <p className="text-sm leading-7 app-copy">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}