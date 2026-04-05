import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { getStandardUkEmployeeInput, TAX_YEAR_LABEL } from "../../lib/tax/config";
import { SEO_GROWTH_CONFIG, expandNumericRanges } from "../../components/seo/growth-config";

export function parseSalaryFromSlug(slug: string): number | null {
  const match = slug.match(/^(\d+)-after-tax-uk$/);
  if (!match) return null;

  const salary = Number(match[1]);

  if (!Number.isFinite(salary) || salary < 10000) return null;
  return salary;
}

export function formatSalaryTitle(salary: number): string {
  return `£${salary.toLocaleString("en-GB")} After Tax UK (${TAX_YEAR_LABEL}) – Take Home Pay Breakdown`;
}

export function getSalaryPageInput(salary: number) {
  return getStandardUkEmployeeInput({
    salary,
    payPeriod: "yearly",
    region: "uk",
    studentLoanPlan: "none",
  });
}

export function getSalaryPageData(salary: number) {
  const input = getSalaryPageInput(salary);
  const result = calculateTakeHome(input);

  const monthlyGross = result.grossAnnual / 12;
  const weeklyGross = result.grossAnnual / 52;
  const weeklyNet = result.netAnnual / 52;
  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;
  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  return {
    input,
    result,
    monthlyGross,
    weeklyGross,
    weeklyNet,
    totalDeductions,
    keepPercent,
  };
}

export function getSeoSalaryNumbers() {
  return expandNumericRanges(SEO_GROWTH_CONFIG.mainSalarySeo.ranges);
}

export function getPopularSalarySlugs(): { salary: string }[] {
  return getSeoSalaryNumbers().map((salary) => ({
    salary: `${salary}-after-tax-uk`,
  }));
}