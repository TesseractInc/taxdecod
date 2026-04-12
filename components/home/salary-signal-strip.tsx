"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgePoundSterling,
  BarChart3,
  Briefcase,
  FileSearch,
  ReceiptText,
  WalletCards,
} from "lucide-react";

const items = [
  {
    icon: BadgePoundSterling,
    label: "£30k after tax",
    value: "Quick salary lookup",
    href: "/30000-after-tax-uk",
  },
  {
    icon: BadgePoundSterling,
    label: "£40k after tax",
    value: "See the real take-home",
    href: "/40000-after-tax-uk",
  },
  {
    icon: BadgePoundSterling,
    label: "£50k after tax",
    value: "Open full breakdown",
    href: "/50000-after-tax-uk",
  },
  {
    icon: FileSearch,
    label: "Tax code explained",
    value: "Plain-English reading",
    href: "/payslip-explained",
  },
  {
    icon: ReceiptText,
    label: "Payslip clarity",
    value: "Understand each deduction",
    href: "/payslip-explained",
  },
  {
    icon: Briefcase,
    label: "Job offer check",
    value: "Compare real outcomes",
    href: "/compare-salary",
  },
  {
    icon: BarChart3,
    label: "Raise impact",
    value: "See what you actually keep",
    href: "/salary-tools",
  },
  {
    icon: WalletCards,
    label: "Reverse take-home",
    value: "Start from monthly income",
    href: "/reverse-tax",
  },
];

export default function SalarySignalStrip() {
  const repeated = [...items, ...items];

  return (
    <section className="py-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <motion.div
            className="flex w-max gap-4 px-4 py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {repeated.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={`${item.label}-${index}`}
                  href={item.href}
                  className="group flex min-w-[270px] items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:bg-slate-950"
                >
                  <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-slate-950">
                    <Icon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 transition group-hover:text-sky-700 dark:text-slate-100 dark:group-hover:text-sky-300">
                      {item.label}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {item.value}
                    </p>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}