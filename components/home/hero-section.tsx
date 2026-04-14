"use client";

import { useState } from "react";
import { CheckCircle2, FileSearch, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  const [salary, setSalary] = useState("");

  const handleCalculate = () => {
    const value = Number(salary.replace(/,/g, ""));

    if (!value || value < 1000) return;

    const calculatorSection = document.getElementById("calculator-section");

    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth" });

      window.dispatchEvent(new CustomEvent("prefillSalary", { detail: value }));
    }
  };

  return (
    <section className="pb-6 pt-6 sm:pb-8 sm:pt-8">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">
          <ShieldCheck className="h-4 w-4" />
          Updated for 2025/26 UK salary interpretation
        </div>

        <h1 className="mt-6 text-[clamp(2.4rem,5vw,4rem)] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
          Know exactly what your salary really pays
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Accurate UK take-home pay, deduction visibility, and salary decision
          context — built to help users interpret salary properly, not just read a raw number.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <span className="mr-2 text-slate-500">£</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter salary (e.g. 30000)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-[180px] bg-transparent text-slate-900 outline-none dark:text-white"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Calculate
          </button>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Estimate-based outputs, not financial advice
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:text-sm">
            <FileSearch className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            Methodology and assumptions visible
          </div>
        </div>
      </div>
    </section>
  );
}