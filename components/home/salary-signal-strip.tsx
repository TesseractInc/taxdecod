"use client";

import {
  BadgePoundSterling,
  FileSearch,
  TrendingUp,
  WalletCards,
  BarChart3,
} from "lucide-react";

const items = [
  {
    icon: BadgePoundSterling,
    label: "After-tax salary checks",
    value: "See real take-home pay",
  },
  {
    icon: FileSearch,
    label: "Tax code clarity",
    value: "Understand assumptions faster",
  },
  {
    icon: TrendingUp,
    label: "Raise impact",
    value: "See what you actually keep",
  },
  {
    icon: WalletCards,
    label: "Payslip reading",
    value: "Understand each deduction",
  },
  {
    icon: BarChart3,
    label: "Salary comparison",
    value: "Compare net pay, not just gross",
  },
];

export default function SalarySignalStrip() {
  return (
    <section className="py-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="rounded-xl bg-white p-2 dark:bg-slate-950">
                    <Icon className="h-4 w-4 app-accent" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium app-title">
                      {item.label}
                    </p>
                    <p className="truncate text-xs app-subtle">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}