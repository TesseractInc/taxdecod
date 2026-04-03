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
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        borderColor: "var(--line)",
        background: "color-mix(in srgb, var(--card) 86%, transparent)",
      }}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)",
              color: "white",
            }}
          >
            <BadgePoundSterling className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide app-title">
              TaxDecod
            </p>
            <p className="text-xs app-subtle">Decode your salary</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {primaryNavLinks.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-2 text-sm font-medium transition"
                style={{
                  color: active ? "var(--primary)" : "var(--muted)",
                  background: active
                    ? "color-mix(in srgb, var(--primary) 12%, transparent)"
                    : "transparent",
                  border: active
                    ? "1px solid color-mix(in srgb, var(--primary) 22%, transparent)"
                    : "1px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/calculator"
            className="hidden rounded-2xl px-4 py-2 text-sm font-medium text-white hover-lift md:inline-flex"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-2) 0%, var(--primary) 100%)",
            }}
          >
            Open calculator
          </Link>

          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}