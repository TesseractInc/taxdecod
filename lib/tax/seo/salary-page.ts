import { calculateTakeHome } from "../calculators/take-home";
import type { CalculatorInput } from "../../../types/tax";

export function getSalaryFromParams(rawSalary: string): number {
  const numeric = Number(String(rawSalary).replace(/[^0-9]/g, ""));

  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 30000;
  }

  return numeric;
}

export function getSalaryPageData(salary: number) {
  const input: CalculatorInput = {
    salary,
    payPeriod: "yearly",
    region: "uk",
    pensionPercent: 5,
    studentLoanPlan: "plan2",
    taxCode: "1257L",
  };

  const result = calculateTakeHome(input);

  return {
    input,
    result,
    monthlyGross: salary / 12,
    weeklyGross: salary / 52,
    weeklyNet: result.netAnnual / 52,
  };
}

export function buildSalaryPageMetadata(salary: number) {
  return {
    title: `£${salary.toLocaleString("en-GB")} after tax in the UK | TaxDecod`,
    description: `See how much £${salary.toLocaleString(
      "en-GB"
    )} is after tax in the UK, including estimated monthly take-home pay, deductions, and salary breakdown.`,
  };
}