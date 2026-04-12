"use client";

import { Crown, Medal, Trophy } from "lucide-react";
import { TakeHomeResult } from "../../types/tax";
import { getSalaryLeaderboard } from "../../lib/tax/explanations/salary-leaderboard";

type Props = {
  result: TakeHomeResult;
};

export default function SalaryLeaderboard({ result }: Props) {
  const data = getSalaryLeaderboard(result);

  const tone =
    data.badge === "low"
      ? {
          box: "border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/30",
          text: "text-rose-700 dark:text-rose-300",
          fill: "bg-rose-500",
        }
      : data.badge === "mid"
      ? {
          box: "border-amber-200 bg-amber-50/80 dark:border-amber-900 dark:bg-amber-950/30",
          text: "text-amber-700 dark:text-amber-300",
          fill: "bg-amber-500",
        }
      : data.badge === "good"
      ? {
          box: "border-sky-200 bg-sky-50/80 dark:border-sky-900 dark:bg-sky-950/30",
          text: "text-sky-700 dark:text-sky-300",
          fill: "bg-sky-500",
        }
      : {
          box: "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30",
          text: "text-emerald-700 dark:text-emerald-300",
          fill: "bg-emerald-500",
        };

  const rankWidth =
    data.badge === "low"
      ? "28%"
      : data.badge === "mid"
      ? "48%"
      : data.badge === "good"
      ? "68%"
      : "84%";

  const icon =
    data.badge === "high" ? (
      <Crown className="h-5 w-5" />
    ) : data.badge === "good" ? (
      <Trophy className="h-5 w-5" />
    ) : (
      <Medal className="h-5 w-5" />
    );

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Salary leaderboard
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Where this salary roughly sits
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              This is a broad context signal to help users understand how strong
              the salary looks before they go deeper.
            </p>
          </div>

          <div className={`rounded-2xl border p-3 ${tone.box} ${tone.text}`}>
            {icon}
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[0.42fr_0.58fr] sm:p-7">
        <div className={`rounded-[28px] border p-6 ${tone.box}`}>
          <p className={`text-sm font-medium ${tone.text}`}>Current band</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {data.band}
          </h3>

          <div className="mt-5 rounded-[22px] border border-white/70 bg-white/85 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Position signal
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {data.percentileLabel}
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            What this means
          </p>
          <p className="mt-3 text-sm leading-8 text-slate-600 dark:text-slate-400">
            {data.summary}
          </p>

          <div className="mt-6">
            <div className="h-4 overflow-hidden rounded-full bg-white dark:bg-slate-950">
              <div className={`h-full rounded-full ${tone.fill}`} style={{ width: rankWidth }} />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Lower</span>
              <span>Mid</span>
              <span>Higher</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Lower band", "Tighter room after deductions"],
              ["Middle band", "More stable, but still deduction-sensitive"],
              ["Higher band", "Stronger salary, but drag becomes more visible"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[20px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80"
              >
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {title}
                </p>
                <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}