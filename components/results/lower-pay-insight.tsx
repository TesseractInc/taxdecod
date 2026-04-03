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
    <section className="relative app-card p-7 overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(circle at top, rgba(245,158,11,0.15), transparent 70%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <div className="rounded-2xl bg-amber-50 p-3 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="max-w-3xl">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
            Reality insight
          </p>

          <h2 className="mt-2 text-2xl font-semibold app-title">
            Why your salary feels smaller than expected
          </h2>

          <p className="mt-3 text-sm leading-7 app-copy">
            The number you see and the money you feel are different. These are the
            main reasons your real income feels lower than your headline salary.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {keyPoints.map((point, index) => (
          <div
            key={index}
            className="rounded-[22px] border p-5 bg-white dark:bg-slate-900 transition hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-2">
              {index % 2 === 0 ? (
                <Coins className="h-4 w-4 text-sky-500" />
              ) : (
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              )}

              <span className="text-sm font-medium app-title">
                Key impact
              </span>
            </div>

            <p className="text-sm leading-7 app-copy">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}