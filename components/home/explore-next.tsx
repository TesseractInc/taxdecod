"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "../ui/reveal";

const links = [
  {
    title: "Open the full calculator",
    desc: "Go into the complete interactive salary engine.",
    href: "/calculator",
  },
  {
    title: "See where your salary stands",
    desc: "Open the leaderboard for salary rank and pressure signals.",
    href: "/leaderboard",
  },
  {
    title: "Explore salary tools",
    desc: "Move into comparisons, salary scenarios, and deeper journeys.",
    href: "/salary-tools",
  },
];

export default function ExploreNext() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Explore next</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
              Keep moving through the product
            </h2>
            <p className="mt-4 text-base leading-8 app-copy">
              Start with clarity. Then go deeper into salary insights,
              comparisons, and decisions.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {links.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-[32px] opacity-0 blur-xl transition group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(16,185,129,0.15))",
                  }}
                />

                <Link
                  href={item.href}
                  className="relative app-card flex h-full flex-col rounded-[32px] p-7 transition"
                >
                  <h3 className="text-xl font-semibold app-title">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 app-copy">
                    {item.desc}
                  </p>

                  <div className="mt-6 text-sm font-medium app-accent">
                    Open →
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}