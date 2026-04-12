"use client";

import { useTheme } from "next-themes";
import { MoonStar, Sparkles, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  compact?: boolean;
};

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark =
    mounted && (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group inline-flex items-center rounded-2xl border transition ${
        compact
          ? "h-11 w-11 justify-center"
          : "h-11 gap-2 px-3 pr-4 text-sm font-medium"
      }`}
      style={{
        background: "var(--card)",
        borderColor: "var(--line)",
        color: "var(--text)",
      }}
      aria-label="Toggle theme"
      title={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
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

      {!compact ? (
        <span>{mounted ? (isDark ? "Light" : "Dark") : "Theme"}</span>
      ) : null}
    </button>
  );
}