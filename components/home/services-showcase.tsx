"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Blocks,
  Globe,
  Layers3,
  Shield,
  Puzzle,
} from "lucide-react";
import Reveal from "../ui/reveal";

const services = [
  {
    title: "AI Products",
    desc: "Advanced AI tools, assistants, and business-facing systems.",
    href: "https://parallexa.com",
    icon: Bot,
    accent: "from-sky-500/20 to-cyan-500/10",
  },
  {
    title: "Chrome Extensions",
    desc: "Security, productivity, and conversion-focused browser products.",
    href: "https://parallexa.com",
    icon: Puzzle,
    accent: "from-emerald-500/20 to-sky-500/10",
  },
  {
    title: "Web Platforms",
    desc: "Modern startup-grade web experiences and niche traffic products.",
    href: "https://parallexa.com",
    icon: Globe,
    accent: "from-violet-500/20 to-sky-500/10",
  },
  {
    title: "Security Tools",
    desc: "Trust-focused software products designed around protection.",
    href: "https://parallexa.com",
    icon: Shield,
    accent: "from-rose-500/20 to-amber-500/10",
  },
  {
    title: "Automation Systems",
    desc: "Workflow systems, integrations, and operational AI solutions.",
    href: "https://parallexa.com",
    icon: Layers3,
    accent: "from-cyan-500/20 to-emerald-500/10",
  },
  {
    title: "Custom Services",
    desc: "Bespoke builds, product strategy, and high-end execution.",
    href: "https://parallexa.com",
    icon: Blocks,
    accent: "from-amber-500/20 to-sky-500/10",
  },
];

export default function ServicesShowcase() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Other services</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight app-title">
              Explore the wider product universe
            </h2>
            <p className="mt-4 app-copy">
              TaxDecod is one part of a broader set of tools, products, and
              digital services.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.04}>
                <Link
                  href={service.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group app-card overflow-hidden p-0 hover-lift"
                >
                  <div className={`bg-gradient-to-br ${service.accent} p-6`}>
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.06 }}
                      className="inline-flex rounded-3xl p-4"
                      style={{
                        background:
                          "color-mix(in srgb, var(--card-strong) 88%, transparent)",
                      }}
                    >
                      <Icon className="h-7 w-7 app-accent" />
                    </motion.div>

                    <h3 className="mt-5 text-xl font-semibold app-title">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 app-copy">
                      {service.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between px-6 py-4">
                    <span className="text-sm font-medium app-accent">
                      Visit service
                    </span>
                    <span className="text-sm app-subtle transition group-hover:translate-x-1">
                      →
                    </span>
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