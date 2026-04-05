"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "../ui/reveal";

const links = [
  {
    title: "Open the full salary calculator",
    desc: "Start with your exact take-home pay and see your real monthly income after deductions.",
    href: "/calculator",
    tag: "Start here",
  },
  {
    title: "Compare two salaries properly",
    desc: "See if a higher salary actually improves your monthly life or just increases tax.",
    href: "/compare-salary",
    tag: "Decision tool",
  },
  {
    title: "Reverse your target income",
    desc: "Find what salary you need to reach your ideal monthly take-home pay.",
    href: "/reverse-tax",
    tag: "Planning tool",
  },
];

export default function ExploreNext() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">
              What to do next
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
              Don’t stop at one number
            </h2>

            <p className="mt-4 text-base leading-8 app-copy">
              The real value comes when you go beyond your first result.
              Compare, reverse, and explore multiple salary scenarios to
              understand what actually changes your life.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {links.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="group relative"
              >
                <div
                  className="absolute inset-0 rounded-[32px] opacity-0 blur-xl transition group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(16,185,129,0.15))",
                  }}
                />

                <Link
                  href={item.href}
                  className="relative flex h-full flex-col rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm transition hover:border-sky-200 hover:bg-sky-50/30 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  {/* TAG */}
                  <div className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                    {item.tag}
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-4 text-xl font-semibold app-title">
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p className="mt-3 text-sm leading-7 app-copy">
                    {item.desc}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 text-sm font-semibold app-accent">
                    Open now →
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* 🔥 FINAL PUSH */}
        <Reveal>
          <div className="mt-16 rounded-[32px] border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm app-subtle">Important</p>

            <p className="mt-3 text-lg font-semibold app-title">
              Most people misunderstand their salary
            </p>

            <p className="mt-4 max-w-2xl mx-auto text-sm leading-8 app-copy">
              A higher salary does not always mean better real income.
              Use TaxDecod properly — calculate, compare, and reverse —
              before making decisions.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}