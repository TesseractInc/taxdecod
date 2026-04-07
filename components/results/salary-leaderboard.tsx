"use client";

import Link from "next/link";
import { Crown, Medal, Sparkles, Trophy, TrendingUp } from "lucide-react";
import { TakeHomeResult } from "../../types/tax";
import { getSalaryLeaderboard } from "../../lib/tax/explanations/salary-leaderboard";
import { formatCurrency } from "../../lib/tax/utils/currency";

type Props = {
  result: TakeHomeResult;
};

const topSalaryCheckpoints = [
  25000,
  30000,
  35000,
  40000,
  45000,
  50000,
  55000,
  60000,
  70000,
  80000,
];

export default function SalaryLeaderboard({ result }: Props) {
  const data = getSalaryLeaderboard(result);
  const gross = result.grossAnnual;

  const nearest = topSalaryCheckpoints.reduce((prev, current) =>
    Math.abs(current - gross) < Math.abs(prev - gross) ? current : prev
  );

  const tone =
    data.badge === "low"
      ? {
          fill: "var(--rose)",
          box: "color-mix(in srgb, var(--rose) 10%, var(--card-soft))",
          border: "color-mix(in srgb, var(--rose) 32%, var(--line))",
          textClass: "money-negative",
          icon: Medal,
          label: "Pressure zone",
        }
      : data.badge === "mid"
      ? {
          fill: "var(--amber)",
          box: "color-mix(in srgb, var(--amber) 10%, var(--card-soft))",
          border: "color-mix(in srgb, var(--amber) 32%, var(--line))",
          textClass: "money-warn",
          icon: Medal,
          label: "Developing zone",
        }
      : data.badge === "good"
      ? {
          fill: "var(--primary)",
          box: "color-mix(in srgb, var(--primary) 10%, var(--card-soft))",
          border: "color-mix(in srgb, var(--primary) 32%, var(--line))",
          textClass: "app-accent",
          icon: Trophy,
          label: "Strong zone",
        }
      : {
          fill: "var(--emerald)",
          box: "color-mix(in srgb, var(--emerald) 10%, var(--card-soft))",
          border: "color-mix(in srgb, var(--emerald) 32%, var(--line))",
          textClass: "money-positive",
          icon: Crown,
          label: "Higher zone",
        };

  const rankWidth =
    data.badge === "low"
      ? "26%"
      : data.badge === "mid"
      ? "45%"
      : data.badge === "good"
      ? "66%"
      : "84%";

  const Icon = tone.icon;

  return (
    <section className="app-card p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] app-accent">
            Salary leaderboard
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight app-title sm:text-3xl">
            Where this salary sits among common UK salary checkpoints
          </h2>
          <p className="mt-3 text-sm leading-8 app-copy">
            This is not a fake user leaderboard. It is a more useful ranking
            view built around common salary checkpoints, deduction pressure, and
            likely next salary moves.
          </p>
        </div>

        <div
          className="rounded-[20px] border p-3"
          style={{
            borderColor: tone.border,
            background: tone.box,
          }}
        >
          <Icon className={`h-5 w-5 ${tone.textClass}`} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[0.42fr_0.58fr]">
        <div
          className="rounded-[28px] border p-5 sm:p-6"
          style={{
            borderColor: tone.border,
            background: tone.box,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="app-chip flex h-11 w-11 items-center justify-center">
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <p className={`text-sm font-semibold ${tone.textClass}`}>
                Current signal
              </p>
              <p className="mt-1 text-xl font-bold app-title">{data.band}</p>
            </div>
          </div>

          <div
            className="mt-6 rounded-[22px] border px-4 py-4"
            style={{
              borderColor: "var(--line)",
              background: "var(--card)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] app-subtle">
              Position signal
            </p>
            <p className="mt-2 text-lg font-semibold app-title">
              {data.percentileLabel}
            </p>
            <p className="mt-2 text-sm app-copy">{tone.label}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div
              className="rounded-[20px] border px-4 py-4"
              style={{
                borderColor: "var(--line)",
                background: "var(--card)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] app-subtle">
                Gross salary
              </p>
              <p className="mt-2 text-lg font-semibold app-title">
                {formatCurrency(gross)}
              </p>
            </div>

            <div
              className="rounded-[20px] border px-4 py-4"
              style={{
                borderColor: "var(--line)",
                background: "var(--card)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] app-subtle">
                Net monthly
              </p>
              <p className="mt-2 text-lg font-semibold app-title">
                {formatCurrency(result.netMonthly)}
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-[28px] border p-5 sm:p-6"
          style={{
            borderColor: "var(--line)",
            background: "var(--card-soft)",
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 app-accent" />
            <p className="text-sm font-semibold app-accent">Visual rank</p>
          </div>

          <p className="mt-3 text-sm leading-8 app-copy">{data.summary}</p>

          <div className="mt-6">
            <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: rankWidth,
                  background: tone.fill,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs app-subtle">
              <span>Lower</span>
              <span>Mid</span>
              <span>Higher</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 app-accent" />
              <p className="text-sm font-semibold app-title">
                Top 10 salary checkpoints
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {topSalaryCheckpoints.map((salary, index) => {
                const active = salary === nearest;

                return (
                  <Link
                    key={salary}
                    href={`/${salary}-after-tax-uk`}
                    className="rounded-[18px] border px-4 py-3 transition hover-lift"
                    style={{
                      borderColor: active
                        ? "color-mix(in srgb, var(--primary) 28%, var(--line))"
                        : "var(--line)",
                      background: active
                        ? "color-mix(in srgb, var(--primary) 10%, var(--card))"
                        : "var(--card)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                          Rank {index + 1}
                        </p>
                        <p className="mt-1 text-sm font-semibold app-title">
                          {formatCurrency(salary)}
                        </p>
                      </div>

                      {active ? (
                        <div className="app-chip px-3 py-1 text-[11px] font-semibold">
                          Closest to you
                        </div>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div
            className="mt-6 rounded-[22px] border p-4"
            style={{
              borderColor: "var(--line)",
              background: "var(--card)",
            }}
          >
            <p className="text-sm font-semibold app-title">
              Better next action
            </p>
            <p className="mt-2 text-sm leading-7 app-copy">
              Compare your current result with the next salary checkpoint above
              and below it. That gives users a stronger sense of whether a pay
              rise really changes their monthly reality.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/compare-salary"
                className="rounded-full border px-4 py-2 text-xs font-semibold transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-soft)",
                }}
              >
                Compare salary jump
              </Link>

              <Link
                href="/reverse-tax"
                className="rounded-full border px-4 py-2 text-xs font-semibold transition hover-lift"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card-soft)",
                }}
              >
                Reverse target pay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}