"use client";

import { useMemo, useState } from "react";
import CalculatorForm from "./calculator-form";
import ResultPreview from "./result-preview";
import ResultsExperience from "../results/results-experience";
import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { CalculatorInput } from "../../types/tax";

type CalculatorCardProps = {
  mode?: "compact" | "full" | "overview" | "insights" | "payslip" | "tools" | "reality";
};

const initialValues: CalculatorInput = {
  salary: 40000,
  payPeriod: "yearly",
  region: "uk",
  pensionPercent: 5,
  studentLoanPlan: "plan2",
  taxCode: "1257L",
};

export default function CalculatorCard({
  mode = "full",
}: CalculatorCardProps) {
  const [values, setValues] = useState<CalculatorInput>(initialValues);
  const result = useMemo(() => calculateTakeHome(values), [values]);

  const isCompact = mode === "compact";

  return (
    <div className="space-y-8">
      <div
        className={`grid gap-6 ${
          isCompact
            ? "xl:grid-cols-[1fr_0.95fr]"
            : "lg:grid-cols-[1fr_0.92fr]"
        }`}
      >
        <div className="app-card p-6">
          <div className="mb-6">
            <p className="text-sm font-medium app-accent">
              Instant salary calculator
            </p>
            <h3 className="mt-2 text-2xl font-semibold app-title">
              Estimate your take-home pay
            </h3>
            <p className="mt-2 text-sm leading-6 app-copy">
              Start with your salary, then adjust pension, region, and student
              loan to see what you really keep.
            </p>
          </div>

          <CalculatorForm values={values} onChange={setValues} />
        </div>

        <div className={isCompact ? "xl:max-w-[430px] xl:ml-auto" : ""}>
          <ResultPreview result={result} />
        </div>
      </div>

      {!isCompact ? (
        <ResultsExperience
          result={result}
          values={values}
          view={mode === "full" ? "full" : mode}
        />
      ) : null}
    </div>
  );
}