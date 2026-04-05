"use client";

import { useMemo, useState } from "react";
import CalculatorForm from "@/components/calculator/calculator-form";
import ResultPreview from "@/components/calculator/result-preview";
import ResultsExperience from "@/components/results/results-experience";
import { calculateTakeHome } from "@/lib/tax/calculators/take-home";
import type { CalculatorInput } from "@/types/tax";

type ReverseInput = {
  targetNet: number;
  payPeriod: "yearly" | "monthly";
};

const initialValues: CalculatorInput = {
  salary: 40000,
  payPeriod: "yearly",
  region: "uk",
  pensionPercent: 5,
  studentLoanPlan: "plan2",
  taxCode: "1257L",
};

export default function ReverseTaxCalculator() {
  const [values, setValues] = useState<CalculatorInput>(initialValues);

  const [reverseInput, setReverseInput] = useState<ReverseInput>({
    targetNet: 3000,
    payPeriod: "monthly",
  });

  // 🧠 Core solver
  const calculatedGross = useMemo(() => {
    const targetAnnual =
      reverseInput.payPeriod === "monthly"
        ? reverseInput.targetNet * 12
        : reverseInput.targetNet;

    let low = 0;
    let high = 200000;
    let mid = 0;

    for (let i = 0; i < 40; i++) {
      mid = (low + high) / 2;

      const result = calculateTakeHome({
        ...values,
        salary: mid,
        payPeriod: "yearly",
      });

      if (result.netAnnual < targetAnnual) {
        low = mid;
      } else {
        high = mid;
      }
    }

    return Math.round(mid);
  }, [reverseInput, values]);

  const result = useMemo(() => {
    return calculateTakeHome({
      ...values,
      salary: calculatedGross,
      payPeriod: "yearly",
    });
  }, [calculatedGross, values]);

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        <h3 className="text-xl font-semibold app-title">
          Target your take-home
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium app-copy">
              Desired take-home
            </label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                £
              </span>
              <input
                type="number"
                value={reverseInput.targetNet}
                onChange={(e) =>
                  setReverseInput({
                    ...reverseInput,
                    targetNet: Number(e.target.value),
                  })
                }
                className="app-input pl-8"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium app-copy">
              Pay period
            </label>
            <select
              value={reverseInput.payPeriod}
              onChange={(e) =>
                setReverseInput({
                  ...reverseInput,
                  payPeriod: e.target.value as "monthly" | "yearly",
                })
              }
              className="app-input mt-2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🎯 RESULT STATEMENT */}
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm app-copy">Required salary</p>
        <h2 className="mt-2 text-4xl font-bold app-title">
          £{calculatedGross.toLocaleString()}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          to take home £{reverseInput.targetNet.toLocaleString()}{" "}
          {reverseInput.payPeriod === "monthly" ? "per month" : "per year"}
        </p>
      </div>

      {/* 🔧 reuse your system */}
      <div className="grid gap-0 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="border-r p-6">
          <CalculatorForm values={values} onChange={setValues} />
        </div>

        <div className="bg-slate-50 p-6">
          <ResultPreview result={result} values={values} />
        </div>
      </div>

      <ResultsExperience result={result} values={values} view="full" />
    </div>
  );
}