"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Sparkles,
  Trophy,
} from "lucide-react";

const actions = [
  {
    title: "Compare another salary",
    desc: "Test different income levels and see how take-home pay changes.",
    href: "/calculator",
    icon: BarChart3,
  },
  {
    title: "See where your salary stands",
    desc: "Open the leaderboard and explore salary rank and pressure signals.",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Explore salary tools",
    desc: "Go deeper with bonus, raise, and salary comparison scenarios.",
    href: "/salary-tools",
    icon: Sparkles,
  },
];

export default function NextActions() {
  return (
    <section>
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">What next?</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
          Keep moving through the product
        </h2>
        <p className="mt-4 text-base leading-8 app-copy">
          After seeing your take-home pay, the next step is usually more
          specific. Compare salaries, check your ranking, or move into deeper
          salary scenarios.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 rounded-[30px] opacity-0 blur-xl transition group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.20), rgba(16,185,129,0.12))",
                }}
              />

              <Link
                href={item.href}
                className="relative app-card block rounded-[30px] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-[22px] p-3 app-soft">
                    <Icon className="h-5 w-5 app-accent" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 app-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="mt-5 text-lg font-semibold app-title">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 app-copy">
                  {item.desc}
                </p>

                <p className="mt-5 text-sm font-medium app-accent">
                  Open →
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}