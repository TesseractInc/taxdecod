"use client";

import Link from "next/link";
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
    desc: "Move into comparisons, salary scenarios, and deeper calculation journeys.",
    href: "/salary-tools",
  },
];

export default function ExploreNext() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Explore next</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight app-title sm:text-4xl">
              Keep moving through the product
            </h2>
            <p className="mt-4 app-copy">
              Start with salary clarity, then move into rankings, comparisons,
              payslip help, and other focused salary journeys.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {links.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.05}>
              <Link
                href={item.href}
                className="app-card hover-lift flex h-full flex-col rounded-[28px] p-6"
              >
                <h3 className="text-xl font-semibold app-title">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 app-copy">{item.desc}</p>
                <p className="mt-5 text-sm font-medium app-accent">Open page →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}