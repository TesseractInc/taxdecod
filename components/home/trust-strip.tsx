"use client";

import { motion } from "framer-motion";
import { BadgeCheck, FileText, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Easy to understand",
    text: "Clear enough for anyone",
  },
  {
    icon: FileText,
    title: "Payslip focused",
    text: "Built around real needs",
  },
  {
    icon: BadgeCheck,
    title: "Real take-home first",
    text: "Net pay clarity matters",
  },
  {
    icon: Sparkles,
    title: "Modern experience",
    text: "Visual, not confusing",
  },
];

export default function TrustStrip() {
  return (
    <section className="pb-10 pt-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-[26px] opacity-0 blur-xl transition group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(14,165,233,0.18), transparent 70%)",
                  }}
                />

                <div className="relative rounded-[26px] border p-5 app-card">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-slate-950">
                      <Icon className="h-4 w-4 app-accent" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold app-title">
                        {item.title}
                      </p>
                      <p className="text-xs app-subtle">{item.text}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}