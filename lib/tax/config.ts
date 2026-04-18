import type { CalculatorInput } from "../../types/tax";

export const TAX_YEAR_LABEL = "2026/27";

export const DEFAULT_UK_TAX_CODE = "1257L";
export const DEFAULT_PENSION_PERCENT = 5;

export function getStandardUkEmployeeInput(
  overrides: Partial<CalculatorInput> = {}
): CalculatorInput {
  return {
    salary: 40000,
    payPeriod: "yearly",
    region: "uk",
    pensionPercent: DEFAULT_PENSION_PERCENT,
    studentLoanPlan: "none",
    taxCode: DEFAULT_UK_TAX_CODE,
    ...overrides,
  };
}

export const TRUST_COPY = {
  salaryPage: {
    description: `This page uses a standard UK employee setup with ${TAX_YEAR_LABEL}-style tax assumptions.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Standard employee setup",
      "Designed for real take-home understanding",
    ],
  },
  reversePage: {
    description: `This page is designed around a standard UK employee setup using ${TAX_YEAR_LABEL}-style assumptions for salary planning.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Standard employee setup",
      "Best used for planning target take-home pay",
    ],
  },
  reverseSeoPage: {
    description: `This reverse salary page uses a standard UK employee setup with ${TAX_YEAR_LABEL}-style assumptions.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Standard employee setup",
      "Built for reverse salary planning",
    ],
  },
  comparisonPage: {
    description: `This comparison uses a standard UK employee setup with ${TAX_YEAR_LABEL}-style assumptions and Plan 2 student loan selected in the current page configuration.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Plan 2 student loan included in this page setup",
      "Built for real decision-making, not headline salary comparison",
    ],
  },
  comparisonSeoPage: {
    description: `This salary comparison page uses a standard UK employee setup with ${TAX_YEAR_LABEL}-style assumptions.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Standard employee setup",
      "Built for real salary decision-making",
    ],
  },
  salaryHub: {
    description: `Salary hub pages are built around a standard UK employee setup using ${TAX_YEAR_LABEL}-style tax assumptions for consistency.`,
    points: [
      `Using ${TAX_YEAR_LABEL}-style UK salary assumptions`,
      "Built for quick salary discovery",
      "Connected to reverse and comparison tools",
    ],
  },
  payslipChecker: {
    description: `This payslip checker uses ${TAX_YEAR_LABEL}-style UK salary assumptions and annualised pay to estimate whether your year-to-date Income Tax and National Insurance look broadly on track.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Annualised year-to-date estimate",
      "Best with payslip YTD values",
      "Built for first-check PAYE clarity",
    ],
  },
  studentLoan: {
    description: `This page uses ${TAX_YEAR_LABEL}-style UK deduction assumptions to show how student loan repayment can change take-home pay.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Plan-based student loan logic",
      "Built for repayment drag comparison",
      "Best used for take-home planning",
    ],
  },
  taxRefund: {
    description: `This page uses ${TAX_YEAR_LABEL}-style UK tax assumptions to provide a first-check refund signal where too much Income Tax may have been paid.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Estimate-based refund signal",
      "Built for first-check review",
      "Not an HMRC decision",
    ],
  },
  bonus: {
    description: `This page uses ${TAX_YEAR_LABEL}-style UK deduction assumptions to estimate how bonus pay may affect take-home income.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Built for bonus take-home clarity",
      "Estimate-based, not payroll exact",
      "Useful for salary decision context",
    ],
  },
  overtime: {
    description: `This page uses ${TAX_YEAR_LABEL}-style UK deduction assumptions to estimate how overtime pay may affect take-home income.`,
    points: [
      `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
      "Built for overtime take-home clarity",
      "Estimate-based, not payroll exact",
      "Useful for extra-hours decisions",
    ],
  },
} as const;