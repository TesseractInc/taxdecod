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
          box: "bg-rose-50 dark:bg-rose-950/30",
          text: "text-rose-700 dark:text-rose-300",
          border: "border-rose-200 dark:border-rose-900",
          fill: "bg-rose-500",
        }
      : data.badge === "mid"
      ? {
          box: "bg-amber-50 dark:bg-amber-950/30",
          text: "text-amber-700 dark:text-amber-300",
          border: "border-amber-200 dark:border-amber-900",
          fill: "bg-amber-500",
        }
      : data.badge === "good"
      ? {
          box: "bg-sky-50 dark:bg-sky-950/30",
          text: "text-sky-700 dark:text-sky-300",
          border: "border-sky-200 dark:border-sky-900",
          fill: "bg-sky-500",
        }
      : {
          box: "bg-emerald-50 dark:bg-emerald-950/30",
          text: "text-emerald-700 dark:text-emerald-300",
          border: "border-emerald-200 dark:border-emerald-900",
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

  return (
    <section className="app-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium app-accent">Salary leaderboard</p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            Where your salary roughly sits
          </h2>
          <p className="mt-3 text-sm leading-7 app-copy">
            A broad position signal to help users understand how strong their
            salary looks before they dive deeper.
          </p>
        </div>

        <div className={`rounded-2xl p-3 ${tone.box} ${tone.text}`}>
          <Trophy className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
        <div className={`rounded-[24px] border p-5 ${tone.box} ${tone.border}`}>
          <div className="flex items-center gap-3">
            <div className={`rounded-xl p-2 ${tone.box} ${tone.text}`}>
              {data.badge === "high" ? (
                <Crown className="h-5 w-5" />
              ) : data.badge === "good" ? (
                <Trophy className="h-5 w-5" />
              ) : (
                <Medal className="h-5 w-5" />
              )}
            </div>

            <div>
              <p className={`text-sm font-medium ${tone.text}`}>Current band</p>
              <p className="mt-1 text-xl font-semibold app-title">{data.band}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white/80 px-4 py-4 dark:bg-slate-950/55">
            <p className="text-sm app-subtle">Position signal</p>
            <p className="mt-1 text-lg font-semibold app-title">
              {data.percentileLabel}
            </p>
          </div>
        </div>

        <div className="app-soft p-5">
          <p className="text-sm font-medium app-accent">Visual rank</p>
          <p className="mt-3 text-sm leading-7 app-copy">{data.summary}</p>

          <div className="mt-6">
            <div className="h-4 overflow-hidden rounded-full bg-white dark:bg-slate-950">
              <div className={`h-full rounded-full ${tone.fill}`} style={{ width: rankWidth }} />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs app-subtle">
              <span>Lower</span>
              <span>Mid</span>
              <span>Higher</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Below pressure", "Lower cash room"],
              ["Stable zone", "More manageable"],
              ["Strong zone", "Better flexibility"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-white px-4 py-4 dark:bg-slate-950">
                <p className="text-sm font-medium app-title">{title}</p>
                <p className="mt-2 text-xs leading-6 app-copy">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}