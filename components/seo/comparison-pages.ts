import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import type { CalculatorInput } from "../../types/tax";
import { getStandardUkEmployeeInput } from "../../lib/tax/config";
import {
  SEO_GROWTH_CONFIG,
  dedupePairs,
  expandComparisonLadders,
} from "../../components/seo/growth-config";

export function parseComparisonSlug(
  slug: string
): { salaryA: number; salaryB: number } | null {
  const match = slug.match(/^(\d+)-vs-(\d+)-after-tax$/);

  if (!match) return null;

  const salaryA = Number(match[1]);
  const salaryB = Number(match[2]);

  if (
    !Number.isFinite(salaryA) ||
    !Number.isFinite(salaryB) ||
    salaryA < 10000 ||
    salaryB < 10000
  ) {
    return null;
  }

  if (salaryA === salaryB) return null;
  if (salaryA > salaryB) return null;

  return { salaryA, salaryB };
}

export function getComparisonBaseInput(salary: number): CalculatorInput {
  return getStandardUkEmployeeInput({
    salary,
    payPeriod: "yearly",
    region: "uk",
    studentLoanPlan: "none",
  });
}

export function getComparisonSeoPairs() {
  return dedupePairs([
    ...expandComparisonLadders(SEO_GROWTH_CONFIG.comparisonSeo.ladders),
    ...SEO_GROWTH_CONFIG.comparisonSeo.featuredPairs,
  ]);
}

export function getComparisonSeoSlugs() {
  return getComparisonSeoPairs().map(([salaryA, salaryB]) => ({
    comparison: `${salaryA}-vs-${salaryB}-after-tax`,
  }));
}

export function getComparisonPageData(salaryA: number, salaryB: number) {
  const inputA = getComparisonBaseInput(salaryA);
  const inputB = getComparisonBaseInput(salaryB);

  const resultA = calculateTakeHome(inputA);
  const resultB = calculateTakeHome(inputB);

  const grossDifference = salaryB - salaryA;
  const netAnnualDifference = resultB.netAnnual - resultA.netAnnual;
  const netMonthlyDifference = resultB.netMonthly - resultA.netMonthly;
  const taxDrag = grossDifference - netAnnualDifference;

  const keepPercent =
    grossDifference > 0 ? (netAnnualDifference / grossDifference) * 100 : 0;

  const taxDragPercent =
    grossDifference > 0 ? (taxDrag / grossDifference) * 100 : 0;

  return {
    inputA,
    inputB,
    resultA,
    resultB,
    grossDifference,
    netAnnualDifference,
    netMonthlyDifference,
    taxDrag,
    keepPercent,
    taxDragPercent,
  };
}