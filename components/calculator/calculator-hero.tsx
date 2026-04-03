"use client";

import { motion } from "framer-motion";
import CalculatorCard from "./calculator-card";

export default function CalculatorHero() {
  return (
    <section className="relative py-16">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.18), transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold app-title sm:text-5xl">
            Calculate your real salary
          </h1>

          <p className="mt-4 text-lg app-copy">
            See exactly what you take home after tax, NI, pension,
            and student loan.
          </p>
        </div>

        <div className="mt-12">
          <div className="rounded-[36px] border p-4 app-card-strong shadow-[0_30px_100px_-40px_rgba(0,0,0,0.4)]">
            <CalculatorCard />
          </div>
        </div>
      </div>
    </section>
  );
}