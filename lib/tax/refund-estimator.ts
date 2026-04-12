import type { Region } from "../../types/tax";
import { calculateTakeHome } from "./calculators/take-home";

export type RefundEstimatorMode = "full-year" | "year-to-date";
export type IncomeSource = "employment" | "paye-pension";

export type TaxRefundEstimatorInput = {
  grossIncome: number;
  taxPaid: number;
  mode: RefundEstimatorMode;
  payPeriodsCompleted: number;
  region: Region;
  taxCode: string;
  pensionPercent: number;
  incomeSource: IncomeSource;
};

export type TaxRefundEstimatorResult = {
  status: "refund" | "underpayment" | "balanced";
  difference: number;
  expectedIncomeTaxAnnual: number;
  expectedIncomeTaxReference: number;
  paidTaxReference: number;
  referenceLabel: string;
  headline: string;
  supportingText: string;
  confidenceLabel: string;
};

const BALANCED_THRESHOLD = 75;

export function estimateTaxRefund(
  input: TaxRefundEstimatorInput
): TaxRefundEstimatorResult {
  const safeGrossIncome = Math.max(0, input.grossIncome || 0);
  const safeTaxPaid = Math.max(0, input.taxPaid || 0);
  const safePeriods = Math.min(Math.max(Math.floor(input.payPeriodsCompleted || 1), 1), 12);

  const takeHomeResult = calculateTakeHome({
    salary: safeGrossIncome,
    payPeriod: "yearly",
    region: input.region,
    pensionPercent: Math.max(0, input.pensionPercent || 0),
    studentLoanPlan: "none",
    taxCode: input.taxCode || "1257L",
  });

  const expectedIncomeTaxAnnual = takeHomeResult.incomeTaxAnnual;

  const expectedIncomeTaxReference =
    input.mode === "full-year"
      ? expectedIncomeTaxAnnual
      : (expectedIncomeTaxAnnual / 12) * safePeriods;

  const difference = safeTaxPaid - expectedIncomeTaxReference;

  const status =
    difference > BALANCED_THRESHOLD
      ? "refund"
      : difference < -BALANCED_THRESHOLD
      ? "underpayment"
      : "balanced";

  const referenceLabel =
    input.mode === "full-year"
      ? "full tax year"
      : `year to date (${safePeriods} month${safePeriods === 1 ? "" : "s"})`;

  const sourceLabel =
    input.incomeSource === "paye-pension" ? "PAYE pension" : "PAYE employment";

  const headline =
    status === "refund"
      ? "You may have overpaid Income Tax"
      : status === "underpayment"
      ? "You may have underpaid Income Tax"
      : "Your Income Tax looks roughly on track";

  const supportingText =
    status === "refund"
      ? `Based on this ${sourceLabel.toLowerCase()} estimate, the Income Tax already paid looks higher than the estimated tax due for the ${referenceLabel}.`
      : status === "underpayment"
      ? `Based on this ${sourceLabel.toLowerCase()} estimate, the Income Tax already paid looks lower than the estimated tax due for the ${referenceLabel}.`
      : `Based on this ${sourceLabel.toLowerCase()} estimate, the Income Tax already paid looks close to the estimated tax due for the ${referenceLabel}.`;

  const confidenceLabel =
    input.mode === "full-year"
      ? "Stronger estimate when using a completed-year salary and total tax paid"
      : "Rougher estimate because year-to-date refunds depend on cumulative PAYE timing";

  return {
    status,
    difference,
    expectedIncomeTaxAnnual,
    expectedIncomeTaxReference,
    paidTaxReference: safeTaxPaid,
    referenceLabel,
    headline,
    supportingText,
    confidenceLabel,
  };
}