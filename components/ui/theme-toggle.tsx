"use client";

import { useTheme } from "next-themes";
import { MoonStar, Sparkles, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark =
    mounted && (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group inline-flex h-11 items-center gap-2 rounded-2xl border px-3 pr-4 text-sm font-medium hover-lift"
      style={{
        background: "var(--card)",
        borderColor: "var(--line)",
        color: "var(--text)",
      }}
      aria-label="Toggle theme"
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-xl"
        style={{
          background: "color-mix(in srgb, var(--primary) 12%, transparent)",
          color: "var(--primary)",
        }}
      >
        {mounted ? (
          isDark ? (
            <SunMedium className="h-4 w-4" />
          ) : (
            <MoonStar className="h-4 w-4" />
          )
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
      </span>
      <span>{mounted ? (isDark ? "Light" : "Dark") : "Theme"}</span>
    </button>
  );
}