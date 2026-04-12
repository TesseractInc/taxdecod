"use client";

import { ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function TrustStrip() {
  return (
    <div className="w-full border-b border-[var(--line)] bg-[var(--card-soft)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 py-3 text-xs font-medium sm:gap-6">
        <div className="flex items-center gap-2 app-subtle">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          UK PAYE-aligned logic
        </div>

        <div className="flex items-center gap-2 app-subtle">
          <Clock className="h-4 w-4 text-sky-400" />
          Updated for 2025/26 assumptions
        </div>

        <div className="flex items-center gap-2 app-subtle">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          Built for salary decisions, not guesses
        </div>
      </div>
    </div>
  );
}