"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ExperiencePager({
  previous,
  next,
}: {
  previous?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {previous ? (
        <motion.div whileHover={{ y: -4 }}>
          <Link
            href={previous.href}
            className="group relative block rounded-[30px] p-6 app-card"
          >
            <div
              className="absolute inset-0 rounded-[30px] opacity-0 blur-xl transition group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)",
              }}
            />

            <div className="relative flex items-center gap-4">
              <div className="rounded-2xl p-3 app-soft">
                <ArrowLeft className="h-5 w-5 app-accent" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] app-subtle">
                  Previous
                </p>
                <p className="mt-1 text-lg font-semibold app-title">
                  {previous.label}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ) : (
        <div />
      )}

      {next ? (
        <motion.div whileHover={{ y: -4 }}>
          <Link
            href={next.href}
            className="group relative block rounded-[30px] p-6 app-card"
          >
            <div
              className="absolute inset-0 rounded-[30px] opacity-0 blur-xl transition group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14,165,233,0.18), rgba(16,185,129,0.12))",
              }}
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] app-subtle">
                  Next
                </p>
                <p className="mt-1 text-lg font-semibold app-title">
                  {next.label}
                </p>
              </div>

              <div className="rounded-2xl p-3 app-soft">
                <ArrowRight className="h-5 w-5 app-accent" />
              </div>
            </div>
          </Link>
        </motion.div>
      ) : null}
    </div>
  );
}