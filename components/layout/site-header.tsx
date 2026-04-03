"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgePoundSterling } from "lucide-react";
import Container from "../ui/container";
import ThemeToggle from "../ui/theme-toggle";
import { primaryNavLinks } from "./page-links";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl">
      <div
        className="border-b"
        style={{
          borderColor: "var(--line)",
          background:
            "color-mix(in srgb, var(--card) 82%, transparent)",
        }}
      >
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-md transition group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--primary-2))",
                color: "white",
              }}
            >
              <BadgePoundSterling className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide app-title">
                TaxDecod
              </p>
              <p className="text-xs app-subtle">
                Salary clarity engine
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {primaryNavLinks.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative rounded-2xl px-4 py-2 text-sm font-medium transition"
                  style={{
                    color: active ? "var(--primary)" : "var(--muted)",
                  }}
                >
                  {active && (
                    <span
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "color-mix(in srgb, var(--primary) 12%, transparent)",
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
              className="hidden md:inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-medium text-white transition hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-2), var(--primary))",
              }}
            >
              Open calculator
            </Link>

            <ThemeToggle />
          </div>
        </Container>
      </div>
    </header>
  );
}