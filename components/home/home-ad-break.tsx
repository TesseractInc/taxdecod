"use client";

import Link from "next/link";
import { BadgeInfo, ShieldCheck } from "lucide-react";

export default function HomeAdBreak() {
  return (
    <section className="pb-8 pt-2 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[28px] border border-slate-200 bg-white/88 p-4 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.18)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/86 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                <BadgeInfo className="h-3.5 w-3.5" />
                Advertisement area
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                This is the first safe in-content break after the hero. Use it
                later for a clearly labelled ad unit or sponsored placement,
                without making it look like site navigation or a calculator
                control.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
              <div className="rounded-[20px] border border-slate-200 bg-slate-50/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white p-2 shadow-sm dark:bg-slate-950">
                    <ShieldCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Ad-safe placement
                    </p>
                    <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Separate from nav, CTAs, and calculator controls.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/methodology"
                className="rounded-[20px] border border-slate-200 bg-slate-50/90 px-4 py-4 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-sky-800 dark:hover:bg-slate-950"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Trust first
                </p>
                <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                  Link methodology and sources nearby, not inside the ad block.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}