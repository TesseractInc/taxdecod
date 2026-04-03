"use client";

import Link from "next/link";
import { BarChart3, Receipt, Sparkles, Trophy, Wallet2 } from "lucide-react";
import Reveal from "../ui/reveal";

const items = [
  {
    title: "Core salary calculator",
    desc: "Start with the main salary view and see take-home pay, deductions, and salary reality in one place.",
    href: "/calculator",
    icon: BarChart3,
  },
  {
    title: "Salary leaderboard",
    desc: "See where your salary stands and understand the pressure around income levels.",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Payslip explained",
    desc: "Understand PAYE, NI, pension, student loan, and tax code in plain English.",
    href: "/payslip-explained",
    icon: Receipt,
  },
  {
    title: "Salary tools",
    desc: "Explore raises, bonuses, and comparison-focused salary scenarios.",
    href: "/salary-tools",
    icon: Sparkles,
  },
  {
    title: "Reality check",
    desc: "Translate salary into hourly, daily, weekly, and real-life pay visibility.",
    href: "/reality-check",
    icon: Wallet2,
  },
];

export default function JourneyCards() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Guided journey</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
              Start with one calculator. Then go exactly where you need.
            </h2>
            <p className="mt-4 app-copy">
              TaxDecod should feel like a guided product, not a messy list of
              tools. Start with salary clarity, then move into the next question
              that matters.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.href} delay={index * 0.04}>
                <Link
                  href={item.href}
                  className="app-card hover-lift flex h-full flex-col rounded-[28px] p-6"
                >
                  <div className="inline-flex rounded-2xl p-3 app-soft">
                    <Icon className="h-6 w-6 app-accent" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold app-title">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 app-copy">
                    {item.desc}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-medium app-accent">
                      Open page
                    </span>
                    <span className="text-sm app-subtle">→</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}