"use client";

import Reveal from "../ui/reveal";
import CountUp from "../ui/count-up";
import { BadgeCheck, FileText, ShieldCheck, Users } from "lucide-react";

export default function TrustStrip() {
  const items = [
    {
      icon: Users,
      label: "Salary checks guided",
      value: <CountUp end={12480} suffix="+" />,
    },
    {
      icon: FileText,
      label: "Salary reports generated",
      value: <CountUp end={3860} suffix="+" />,
    },
    {
      icon: ShieldCheck,
      label: "Calculation logic",
      value: "UK-focused clarity",
    },
    {
      icon: BadgeCheck,
      label: "Best used for",
      value: "offers • payslips • raises",
    },
  ];

  return (
    <section className="pb-8 pt-2">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-white p-2 dark:bg-slate-950">
                      <Icon className="h-4 w-4 app-accent" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] app-subtle">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold app-title">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}