"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const [salary, setSalary] = useState("");

  const handleCalculate = () => {
    const value = Number(salary.replace(/,/g, ""));

    if (!value || value < 1000) return;

    const calculatorSection = document.getElementById("calculator-section");

    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth" });

      // dispatch event so calculator can pick it up
      window.dispatchEvent(
        new CustomEvent("prefillSalary", { detail: value })
      );
    }
  };

  return (
    <section className="pb-6 pt-6 sm:pb-8 sm:pt-8">
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* Headline */}
        <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
          Know exactly what your salary really pays
        </h1>

        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Accurate UK take-home pay, deductions, and real salary insights — instantly.
        </p>

        {/* 🔥 CORE INPUT (NEW) */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <span className="mr-2 text-slate-500">£</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter salary (e.g. 30000)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-[180px] bg-transparent outline-none text-slate-900 dark:text-white"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Calculate
          </button>
        </div>

        {/* TRUST */}
        <div className="mt-4 flex justify-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Updated for 2025/26
          </span>
          <span>UK tax logic</span>
        </div>
      </div>
    </section>
  );
}