"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BadgeCheck,
  BadgePoundSterling,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import Container from "../ui/container";
import ThemeToggle from "../ui/theme-toggle";
import { primaryNavLinks } from "./page-links";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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
              Built for salary decisions
            </span>
          </div>
        </Container>
      </div>

      <header className="sticky top-10 z-50">
        <div
          className="border-b backdrop-blur-xl"
          style={{
            borderColor: "var(--line)",
            background: "color-mix(in srgb, var(--card-strong) 86%, transparent)",
          }}
        >
          <Container className="flex h-[74px] items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[18px] transition group-hover:scale-[1.03]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--primary-2))",
                  color: "white",
                  boxShadow: "0 16px 34px rgba(14,165,233,0.20)",
                }}
              >
                <BadgePoundSterling className="h-5 w-5" />
              </div>

              <div className="leading-tight">
                <p className="text-[1.02rem] font-bold tracking-[-0.03em] app-title">
                  TaxDecod
                </p>
                <p className="text-xs app-subtle">
                  UK salary clarity engine
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 xl:flex">
              {primaryNavLinks.slice(0, 6).map((item) => {
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
                          border:
                            "1px solid color-mix(in srgb, var(--primary) 18%, var(--line))",
                        }}
                      />
                    )}

                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/calculator"
                className="hidden items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] md:inline-flex"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-2), var(--primary))",
                  boxShadow: "0 16px 34px rgba(14,165,233,0.22)",
                }}
              >
                Open calculator
              </Link>

              <ThemeToggle />

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border xl:hidden"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--card)",
                  color: "var(--text)",
                }}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </Container>

          {mobileOpen ? (
            <div
              className="border-t xl:hidden"
              style={{ borderColor: "var(--line)" }}
            >
              <Container className="py-4">
                <div className="grid gap-2">
                  {primaryNavLinks.map((item) => {
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-2xl px-4 py-3 text-sm font-medium transition"
                        style={{
                          background: active
                            ? "color-mix(in srgb, var(--primary) 12%, transparent)"
                            : "transparent",
                          color: active ? "var(--text)" : "var(--muted)",
                          border: active
                            ? "1px solid color-mix(in srgb, var(--primary) 18%, var(--line))"
                            : "1px solid transparent",
                        }}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  <Link
                    href="/calculator"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary-2), var(--primary))",
                    }}
                  >
                    Open calculator
                  </Link>
                </div>
              </Container>
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}