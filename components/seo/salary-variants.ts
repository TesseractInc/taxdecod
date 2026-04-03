import { calculateTakeHome } from "../calculators/take-home";
import { CalculatorInput } from "../../../types/tax";

export function parseNumericSalary(slug: string): number | null {
  const salary = Number(slug);

  if (!Number.isFinite(salary) || salary <= 0) return null;
  return salary;
}

export function getBaseSalaryInput(salary: number): CalculatorInput {
  return {
    salary,
    payPeriod: "yearly",
    region: "uk",
    pensionPercent: 5,
    studentLoanPlan: "none",
    taxCode: "1257L",
  };
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

export function getVariantSalaryParams() {
  const salaries = [
    20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000,
  ];

  return salaries.map((salary) => ({
    salary: String(salary),
  }));
}