"use client";

import { motion } from "framer-motion";
import { BadgePoundSterling, FileSearch, TrendingUp, WalletCards } from "lucide-react";

const items = [
  {
    icon: BadgePoundSterling,
    label: "£30k salary",
    value: "Real take-home view",
  },
  {
    icon: FileSearch,
    label: "Tax code",
    value: "Explained simply",
  },
  {
    icon: TrendingUp,
    label: "Raise impact",
    value: "See what you keep",
  },
  {
    icon: WalletCards,
    label: "Payslip clarity",
    value: "Decoded visually",
  },
  {
    icon: BadgePoundSterling,
    label: "Job offer comparison",
    value: "Net pay first",
  },
];

export default function SalarySignalStrip() {
  const repeated = [...items, ...items];

  return (
    <section className="py-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <motion.div
            className="flex gap-4 px-4 py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {repeated.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={`${item.label}-${index}`}
                  className="flex min-w-[250px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}