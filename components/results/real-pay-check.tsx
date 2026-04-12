"use client";

import { useMemo, useState } from "react";
import { Clock3, CalendarDays, Coins, Wallet } from "lucide-react";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

type RealPayCheckProps = {
  result: TakeHomeResult;
};

export default function RealPayCheck({ result }: RealPayCheckProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState(37.5);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const calculations = useMemo(() => {
    const safeHoursPerWeek = hoursPerWeek > 0 ? hoursPerWeek : 1;
    const safeDaysPerWeek = daysPerWeek > 0 ? daysPerWeek : 1;

    const annualWorkHours = safeHoursPerWeek * 52;
    const weeklyTakeHome = result.netAnnual / 52;
    const dailyTakeHome = weeklyTakeHome / safeDaysPerWeek;
    const hourlyTakeHome = result.netAnnual / annualWorkHours;

    return {
      annualWorkHours,
      weeklyTakeHome,
      dailyTakeHome,
      hourlyTakeHome,
    };
  }, [hoursPerWeek, daysPerWeek, result.netAnnual]);

  const stats = [
    {
      label: "Take-home per hour",
      value: formatCurrency(calculations.hourlyTakeHome),
      icon: Clock3,
      valueClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Take-home per week",
      value: formatCurrency(calculations.weeklyTakeHome),
      icon: Wallet,
      valueClass: "text-slate-900 dark:text-slate-100",
    },
    {
      label: "Take-home per day",
      value: formatCurrency(calculations.dailyTakeHome),
      icon: Coins,
      valueClass: "text-slate-900 dark:text-slate-100",
    },
    {
      label: "Work hours per year",
      value: calculations.annualWorkHours.toLocaleString("en-GB", {
        maximumFractionDigits: 0,
      }),
      icon: CalendarDays,
      valueClass: "text-slate-900 dark:text-slate-100",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Reality check
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            What your salary feels like in real life
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            This view translates annual pay into weekly, daily, and hourly
            take-home money so the salary feels more practical and immediate.
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-6 xl:grid-cols-[0.84fr_1.16fr] sm:p-7">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
              Hours worked per week
            </label>
            <input
              type="number"
              min="1"
              step="0.5"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value) || 0)}
              className="app-input"
              placeholder="37.5"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100">
              Days worked per week
            </label>
            <input
              type="number"
              min="1"
              max="7"
              step="1"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value) || 0)}
              className="app-input"
              placeholder="5"
            />
          </div>

          <div className="mt-5 grid gap-3">
            {[20, 30, 37.5, 40].map((hours) => (
              <button
                key={hours}
                type="button"
                onClick={() => setHoursPerWeek(hours)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  hoursPerWeek === hours
                    ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:text-sky-300"
                }`}
              >
                {hours} hours / week
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-slate-950">
                    <Icon className="h-4.5 w-4.5 text-sky-600 dark:text-sky-400" />
                  </div>
                </div>
                <p className={`mt-3 text-2xl font-semibold ${item.valueClass}`}>
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}