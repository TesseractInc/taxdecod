"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  BadgePoundSterling,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Container from "../ui/container";
import ThemeToggle from "../ui/theme-toggle";
import { primaryNavLinks } from "./page-links";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <div className="top-trust-bar">
        <Container>
          <div className="top-trust-inner">
            <span className="top-trust-badge">
              <ShieldCheck className="h-3.5 w-3.5" />
              UK PAYE-aligned logic
            </span>

            <span className="hidden sm:inline-flex items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 app-accent" />
              Updated for 2025/26 assumptions
            </span>

            <span className="hidden md:inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 app-accent" />
              Built for salary decisions, not just raw numbers
            </span>
          </div>
        </Container>
      </div>

      <header className="sticky top-10 z-50 backdrop-blur-xl">
        <div
          className="border-b"
          style={{
            borderColor: "var(--line)",
            background: "color-mix(in srgb, var(--card) 84%, transparent)",
          }}
        >
          <Container className="flex h-[74px] items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[18px] shadow-md transition group-hover:scale-[1.04]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--primary-2))",
                  color: "white",
                  boxShadow: "0 16px 34px rgba(14,165,233,0.22)",
                }}
              >
                <BadgePoundSterling className="h-5 w-5" />
              </div>

              <div className="leading-tight">
                <p className="text-[1.02rem] font-bold tracking-[-0.03em] app-title">
                  TaxDecod
                </p>
                <p className="text-xs app-subtle">UK salary clarity engine</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {primaryNavLinks.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative rounded-2xl px-4 py-2.5 text-sm font-medium transition"
                    style={{
                      color: active ? "var(--text)" : "var(--muted)",
                    }}
                  >
                    {active && (
                      <span
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background:
                            "color-mix(in srgb, var(--primary) 12%, transparent)",
                          border: "1px solid color-mix(in srgb, var(--primary) 18%, var(--line))",
                        }}
                      />
                    )}

                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/calculator"
                className="hidden items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] md:inline-flex"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-2), var(--primary))",
                  boxShadow: "0 16px 34px rgba(14,165,233,0.24)",
                }}
              >
                Open calculator
              </Link>

              <ThemeToggle />
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}