"use client";

import Link from "next/link";
import { BarChart3, Receipt, Sparkles, Trophy, Wallet2 } from "lucide-react";
import Reveal from "../ui/reveal";

const items = [
  {
    title: "Start with the core salary view",
    desc: "See score, take-home pay, deductions, and money flow.",
    href: "/calculator",
    icon: BarChart3,
  },
  {
    title: "See where your salary stands",
    desc: "Open the leaderboard and under-pressure signal page.",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Understand your payslip",
    desc: "Decode tax code, PAYE, NI, pension, and student loan.",
    href: "/payslip-explained",
    icon: Receipt,
  },
  {
    title: "Use salary tools",
    desc: "Test raises, bonuses, and comparisons in one focused place.",
    href: "/salary-tools",
    icon: Sparkles,
  },
  {
    title: "Feel your pay in real life",
    desc: "Check hourly, daily, and weekly net income.",
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
            <p className="text-sm font-medium app-accent">Journey</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight app-title">
              Explore TaxDecod like a guided product
            </h2>
            <p className="mt-4 app-copy">
              Move through focused pages instead of reading everything at once.
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
                  className="app-card flex h-full flex-col p-6 hover-lift"
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
                  <p className="mt-5 text-sm font-medium app-accent">
                    Open page →
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}