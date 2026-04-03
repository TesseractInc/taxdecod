"use client";

import { motion } from "framer-motion";
import { Gauge, TrendingUp } from "lucide-react";
import { TakeHomeResult } from "../../types/tax";
import { calculateSalaryScore } from "../../lib/tax/explanations/salary-score";

export default function SalaryScore({ result }: { result: TakeHomeResult }) {
  const { score, label, message } = calculateSalaryScore(result);

  const color =
    score >= 80
      ? "#10b981"
      : score >= 65
      ? "#0ea5e9"
      : score >= 50
      ? "#f59e0b"
      : "#ef4444";

  return (
    <section className="relative app-card p-7 overflow-hidden">
      {/* glow */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(circle at center, rgba(14,165,233,0.12), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium app-accent">
            Salary Reality Score
          </p>

          <h2 className="mt-2 text-2xl font-semibold app-title">
            How strong is your real income?
          </h2>

          <p className="mt-2 text-sm app-copy">
            This score reflects how much of your salary you actually keep and how usable it is in real life.
          </p>
        </div>

        <Gauge className="h-6 w-6 app-accent" />
      </div>

      <div className="mt-8 flex items-center gap-8">
        {/* circle */}
        <div className="relative h-32 w-32">
          <svg className="h-full w-full">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="var(--line)"
              strokeWidth="8"
              fill="none"
            />

            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray="352"
              strokeDashoffset={352 - (score / 100) * 352}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 352 }}
              animate={{ strokeDashoffset: 352 - (score / 100) * 352 }}
              transition={{ duration: 1 }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold app-title">{score}</span>
            <span className="text-xs app-subtle">/100</span>
          </div>
        </div>

        {/* text */}
        <div className="max-w-sm">
          <p className="text-lg font-semibold app-title">{label}</p>
          <p className="mt-2 text-sm app-copy">{message}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-7 flex items-center justify-between rounded-[20px] border p-4 app-soft">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 app-accent" />
          <span className="text-sm app-title">
            Compare your score with others
          </span>
        </div>

        <span className="text-sm app-accent font-medium">
          Coming soon →
        </span>
      </div>
    </section>
  );
}