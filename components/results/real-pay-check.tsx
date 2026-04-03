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
      tone: "money-positive",
    },
    {
      label: "Take-home per week",
      value: formatCurrency(calculations.weeklyTakeHome),
      icon: Wallet,
      tone: "app-title",
    },
    {
      label: "Take-home per day",
      value: formatCurrency(calculations.dailyTakeHome),
      icon: Coins,
      tone: "app-title",
    },
    {
      label: "Work hours per year",
      value: calculations.annualWorkHours.toLocaleString("en-GB", {
        maximumFractionDigits: 0,
      }),
      icon: CalendarDays,
      tone: "app-title",
    },
  ];

  return (
    <section className="app-card p-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">Reality check</p>
        <h2 className="mt-2 text-2xl font-semibold app-title">
          What your salary feels like in real life
        </h2>
        <p className="mt-3 text-sm leading-7 app-copy">
          This converts annual pay into weekly, daily, and hourly net income so
          users can feel what the salary actually means.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="app-soft p-5">
          <div>
            <label className="mb-2 block text-sm font-medium app-title">
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
            <label className="mb-2 block text-sm font-medium app-title">
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
                  hoursPerWeek === hours ? "tab-active" : "tab-inactive"
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
              <div key={item.label} className="app-soft p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm app-subtle">{item.label}</p>
                  <Icon className="h-5 w-5 app-accent" />
                </div>
                <p className={`mt-3 text-2xl font-semibold ${item.tone}`}>
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