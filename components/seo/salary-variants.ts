import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import type { CalculatorInput } from "../../types/tax";
import { getStandardUkEmployeeInput } from "../../lib/tax/config";
import { SEO_GROWTH_CONFIG, expandNumericRanges } from "../../components/seo/growth-config";

export function parseNumericSalary(slug: string): number | null {
  const salary = Number(slug);

  if (!Number.isFinite(salary) || salary < 10000) return null;
  return salary;
}

export function getBaseSalaryInput(salary: number): CalculatorInput {
  return getStandardUkEmployeeInput({
    salary,
    payPeriod: "yearly",
    region: "uk",
    studentLoanPlan: "none",
  });
}

export function getMonthlySalaryPageData(salary: number) {
  const input = getBaseSalaryInput(salary);
  const result = calculateTakeHome(input);

  return {
    input,
    result,
    monthlyGross: result.grossAnnual / 12,
    monthlyNet: result.netMonthly,
  };
}

export function getStudentLoanSalaryPageData(salary: number) {
  const input: CalculatorInput = {
    ...getBaseSalaryInput(salary),
    studentLoanPlan: "plan2",
  };

  const result = calculateTakeHome(input);

  return {
    input,
    result,
    monthlyNet: result.netMonthly,
  };
}

export function getScotlandSalaryPageData(salary: number) {
  const input: CalculatorInput = {
    ...getBaseSalaryInput(salary),
    region: "scotland",
  };

  const result = calculateTakeHome(input);

  return {
    input,
    result,
    monthlyNet: result.netMonthly,
  };
}

export function getVariantSalaryNumbers() {
  return expandNumericRanges(SEO_GROWTH_CONFIG.variantSalarySeo.ranges);
}

export function getVariantSalaryParams() {
  return getVariantSalaryNumbers().map((salary) => ({
    salary: String(salary),
  }));
}