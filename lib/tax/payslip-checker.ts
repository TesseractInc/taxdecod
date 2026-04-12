import type {
  CalculatorInput,
  Region,
  StudentLoanPlan,
  TakeHomeResult,
} from "../../types/tax";
import { calculateTakeHome } from "./calculators/take-home";

export type PayslipCheckerInput = {
  grossPayYtd: number;
  taxPaidYtd: number;
  niPaidYtd: number;
  monthsCompleted: number;
  region: Region;
  taxCode: string;
  pensionPercent: number;
  studentLoanPlan: StudentLoanPlan;
};

export type PayslipCheckerResult = {
  annualisedGrossSalary: number;
  expectedYtdTax: number;
  expectedYtdNi: number;
  expectedYtdPension: number;
  expectedYtdStudentLoan: number;
  expectedYtdNet: number;
  taxDifference: number;
  niDifference: number;
  taxStatus: "over" | "under" | "close";
  niStatus: "over" | "under" | "close";
  headline: string;
  explanation: string;
  confidenceNote: string;
  annualisedResult: TakeHomeResult;
};

const DIFF_THRESHOLD = 75;

function getStatus(diff: number): "over" | "under" | "close" {
  if (diff > DIFF_THRESHOLD) return "over";
  if (diff < -DIFF_THRESHOLD) return "under";
  return "close";
}

export function estimatePayslipYtd(input: PayslipCheckerInput): PayslipCheckerResult {
  const safeMonths = Math.min(Math.max(Math.floor(input.monthsCompleted || 1), 1), 12);
  const grossPayYtd = Math.max(0, input.grossPayYtd || 0);
  const taxPaidYtd = Math.max(0, input.taxPaidYtd || 0);
  const niPaidYtd = Math.max(0, input.niPaidYtd || 0);

  const annualisedGrossSalary =
    safeMonths > 0 ? (grossPayYtd / safeMonths) * 12 : grossPayYtd;

  const annualisedInput: CalculatorInput = {
    salary: annualisedGrossSalary,
    payPeriod: "yearly",
    region: input.region,
    pensionPercent: Math.max(0, input.pensionPercent || 0),
    studentLoanPlan: input.studentLoanPlan,
    taxCode: input.taxCode || "1257L",
  };

  const annualisedResult = calculateTakeHome(annualisedInput);

  const expectedYtdTax = (annualisedResult.incomeTaxAnnual / 12) * safeMonths;
  const expectedYtdNi =
    (annualisedResult.nationalInsuranceAnnual / 12) * safeMonths;
  const expectedYtdPension = (annualisedResult.pensionAnnual / 12) * safeMonths;
  const expectedYtdStudentLoan =
    (annualisedResult.studentLoanAnnual / 12) * safeMonths;
  const expectedYtdNet = (annualisedResult.netAnnual / 12) * safeMonths;

  const taxDifference = taxPaidYtd - expectedYtdTax;
  const niDifference = niPaidYtd - expectedYtdNi;

  const taxStatus = getStatus(taxDifference);
  const niStatus = getStatus(niDifference);

  const headline =
    taxStatus === "close" && niStatus === "close"
      ? "Your payslip looks roughly on track"
      : taxStatus === "over" || niStatus === "over"
      ? "Your deductions may be running high"
      : "Your deductions may be running low";

  const explanation =
    taxStatus === "close" && niStatus === "close"
      ? "Based on your gross pay to date and current assumptions, the Income Tax and National Insurance already paid look broadly close to the estimated year-to-date amounts."
      : taxStatus === "over" || niStatus === "over"
      ? "Based on your year-to-date pay, one or more deductions look higher than the estimated year-to-date amount. This can happen because of tax code changes, payroll timing, irregular income, or cumulative PAYE effects."
      : "Based on your year-to-date pay, one or more deductions look lower than the estimated year-to-date amount. This can happen when tax catches up later, or when payroll timing and cumulative PAYE have not fully evened out yet.";

  const confidenceNote =
    "This is a year-to-date estimator using annualised pay. It is useful for a first check, but PAYE timing, bonuses, tax code changes, salary sacrifice, and irregular income can make actual payslips differ.";

  return {
    annualisedGrossSalary,
    expectedYtdTax,
    expectedYtdNi,
    expectedYtdPension,
    expectedYtdStudentLoan,
    expectedYtdNet,
    taxDifference,
    niDifference,
    taxStatus,
    niStatus,
    headline,
    explanation,
    confidenceNote,
    annualisedResult,
  };
}