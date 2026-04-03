import { calculateIncomeTax } from "./income-tax";
import { calculateNationalInsurance } from "./national-insurance";
import {
  STUDENT_LOAN_RATES,
  STUDENT_LOAN_THRESHOLDS,
} from "../rules/uk-tax-rules";
import { CalculatorInput, TakeHomeResult } from "../../../types/tax";

export function calculateTakeHome(input: CalculatorInput): TakeHomeResult {
  const grossAnnual =
    input.payPeriod === "monthly" ? input.salary * 12 : input.salary;

  const incomeTaxAnnual = calculateIncomeTax(grossAnnual, input.region);
  const nationalInsuranceAnnual = calculateNationalInsurance(grossAnnual);
  const pensionAnnual = grossAnnual * (input.pensionPercent / 100);

  const studentLoanThreshold = STUDENT_LOAN_THRESHOLDS[input.studentLoanPlan];
  const studentLoanRate = STUDENT_LOAN_RATES[input.studentLoanPlan];

  const studentLoanAnnual =
    input.studentLoanPlan === "none"
      ? 0
      : Math.max(0, grossAnnual - studentLoanThreshold) * studentLoanRate;

  const totalDeductionsAnnual =
    incomeTaxAnnual +
    nationalInsuranceAnnual +
    pensionAnnual +
    studentLoanAnnual;

  const netAnnual = grossAnnual - totalDeductionsAnnual;
  const netMonthly = netAnnual / 12;

  return {
    grossAnnual,
    incomeTaxAnnual,
    nationalInsuranceAnnual,
    pensionAnnual,
    studentLoanAnnual,
    totalDeductionsAnnual,
    netAnnual,
    netMonthly,
  };
}