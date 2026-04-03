"use client";

import { AlertCircle, Coins, ShieldCheck } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { getLowerPayInsight } from "../../lib/tax/explanations/lower-pay-insight";

type LowerPayInsightProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
};

export default function LowerPayInsight({
  values,
  result,
}: LowerPayInsightProps) {
  const insight = getLowerPayInsight(values, result);
  const keyPoints = insight.points.slice(0, 4);

  return (
    <section className="app-card p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-amber-50 p-3 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          <AlertCircle className="h-5 w-5" />
        </div>

        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Lower pay insight
          </p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            Why your pay feels smaller than expected
          </h2>
          <p className="mt-3 text-sm leading-7 app-copy">
            Headline salary and spendable income are very different. These are
            the biggest reasons your banked pay can feel smaller than the salary
            you had in mind.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {keyPoints.map((point, index) => (
          <div key={`${point}-${index}`} className="app-soft p-5">
            <div className="mb-3 flex items-center gap-2">
              {index % 3 === 0 ? (
                <Coins className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              ) : (
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              )}
              <span className="text-sm font-medium app-title">Key driver</span>
            </div>
            <p className="text-sm leading-7 app-copy">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}