import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import type { CalculatorInput } from "../../types/tax";
import { getStandardUkEmployeeInput } from "../../lib/tax/config";
import { SEO_GROWTH_CONFIG, expandNumericRanges } from "./growth-config";

export function parseMonthlyTakeHomeFromSlug(value: string): number | null {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount < 500 || amount > 20000) {
    return null;
  }

  return amount;
}

export function getReverseSeoAmounts(): number[] {
  return expandNumericRanges(SEO_GROWTH_CONFIG.reverseSeo.ranges);
}

export function getReverseSeoSlugs() {
  return getReverseSeoAmounts().map((amount) => ({
    amount: String(amount),
  }));
}

export function getReverseBaseInput(grossSalary: number): CalculatorInput {
  return getStandardUkEmployeeInput({
    salary: grossSalary,
    payPeriod: "yearly",
    region: "uk",
    studentLoanPlan: "none",
  });
}

export function solveGrossForTargetMonthlyNet(targetMonthlyNet: number) {
  const targetAnnualNet = targetMonthlyNet * 12;

  let low = 0;
  let high = 300000;

  for (let i = 0; i < 45; i++) {
    const mid = (low + high) / 2;
    const candidate = calculateTakeHome(getReverseBaseInput(mid));

    if (candidate.netAnnual < targetAnnualNet) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const grossAnnual = Math.round(high);
  const finalInput = getReverseBaseInput(grossAnnual);
  const finalResult = calculateTakeHome(finalInput);

  const totalDeductions =
    finalResult.incomeTaxAnnual +
    finalResult.nationalInsuranceAnnual +
    finalResult.pensionAnnual +
    finalResult.studentLoanAnnual;

  const keepPercent =
    finalResult.grossAnnual > 0
      ? (finalResult.netAnnual / finalResult.grossAnnual) * 100
      : 0;

  return {
    targetMonthlyNet,
    targetAnnualNet,
    grossAnnual,
    input: finalInput,
    result: finalResult,
    totalDeductions,
    keepPercent,
  };
}