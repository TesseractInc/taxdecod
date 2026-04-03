"use client";

import Link from "next/link";
import Reveal from "../ui/reveal";

const links = [
  {
    title: "Open the full calculator",
    desc: "Start with the complete interactive engine.",
    href: "/calculator",
  },
  {
    title: "See where your salary stands",
    desc: "Open the leaderboard page for rank and pressure signals.",
    href: "/leaderboard",
  },
  {
    title: "Explore other services",
    desc: "Move from TaxDecod into your wider product ecosystem.",
    href: "/services",
  },
];

export default function ExploreNext() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Explore next</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight app-title">
              Keep moving through the product
            </h2>
            <p className="mt-4 app-copy">
              Start with salary clarity, then go deeper into rankings, payslip help,
              tools, and related services.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {links.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.05}>
              <Link href={item.href} className="app-card flex h-full flex-col p-6 hover-lift">
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