import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { CalculatorInput } from "../../types/tax";

export function parseSalaryFromSlug(slug: string): number | null {
  const match = slug.match(/^(\d+)-after-tax-uk$/);
  if (!match) return null;

  const salary = Number(match[1]);

  if (!Number.isFinite(salary) || salary <= 0) return null;
  return salary;
}

export function formatSalaryTitle(salary: number): string {
  return `£${salary.toLocaleString("en-GB")} After Tax UK`;
}

export function getSalaryPageInput(salary: number): CalculatorInput {
  return {
    salary,
    payPeriod: "yearly",
    region: "uk",
    pensionPercent: 5,
    studentLoanPlan: "none",
    taxCode: "1257L",
  };
}

export function getSalaryPageData(salary: number) {
  const input = getSalaryPageInput(salary);
  const result = calculateTakeHome(input);

  const monthlyGross = result.grossAnnual / 12;
  const weeklyGross = result.grossAnnual / 52;
  const weeklyNet = result.netAnnual / 52;

  return {
    input,
    result,
    monthlyGross,
    weeklyGross,
    weeklyNet,
  };
}

export function getPopularSalarySlugs(): { salary: string }[] {
  const salaries = [
    12000, 15000, 18000, 20000, 22000, 25000, 27000, 30000, 32000, 35000,
    38000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 80000, 100000,
  ];

  return salaries.map((salary) => ({
    salary: `${salary}-after-tax-uk`,
  }));
}