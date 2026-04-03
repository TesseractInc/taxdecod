"use client";

import { motion } from "framer-motion";
import { Gauge, TrendingUp } from "lucide-react";
import { TakeHomeResult } from "../../types/tax";
import { calculateSalaryScore } from "../../lib/tax/explanations/salary-score";

type Props = {
  result: TakeHomeResult;
};

export default function SalaryScore({ result }: Props) {
  const { score, label, message } = calculateSalaryScore(result);

  const color =
    score >= 80
      ? "var(--emerald)"
      : score >= 65
      ? "var(--primary)"
      : score >= 50
      ? "var(--amber)"
      : "var(--rose)";

  return (
    <section className="app-card p-6">
      <div className="flex items-start justify-between">
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

      {/* score visual */}
      <div className="mt-8 flex items-center gap-6">
        <div className="relative h-28 w-28">
          <svg className="h-full w-full">
            <circle
              cx="56"
              cy="56"
              r="50"
              stroke="var(--line)"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="56"
              cy="56"
              r="50"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray="314"
              strokeDashoffset={314 - (score / 100) * 314}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 314 }}
              animate={{ strokeDashoffset: 314 - (score / 100) * 314 }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold app-title">{score}</span>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold app-title">{label}</p>
          <p className="mt-2 text-sm app-copy">{message}</p>
        </div>
      </div>

      {/* share trigger */}
      <div className="mt-6 app-soft p-4 flex items-center justify-between">
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