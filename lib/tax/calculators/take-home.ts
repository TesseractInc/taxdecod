import type { CalculatorInput, TakeHomeResult } from "../../../types/tax";

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;

const STUDENT_LOAN_THRESHOLDS = {
  none: 0,
  plan1: 24990,
  plan2: 27295,
  plan4: 31395,
  plan5: 25000,
  postgrad: 21000,
} as const;

const STUDENT_LOAN_RATES = {
  none: 0,
  plan1: 0.09,
  plan2: 0.09,
  plan4: 0.09,
  plan5: 0.09,
  postgrad: 0.06,
} as const;

function calculateIncomeTax(annualSalary: number) {
  if (annualSalary <= PERSONAL_ALLOWANCE) return 0;

  const basicBand = Math.max(
    0,
    Math.min(annualSalary, BASIC_RATE_LIMIT) - PERSONAL_ALLOWANCE
  );
  const higherBand = Math.max(
    0,
    Math.min(annualSalary, HIGHER_RATE_LIMIT) - BASIC_RATE_LIMIT
  );
  const additionalBand = Math.max(0, annualSalary - HIGHER_RATE_LIMIT);

  return basicBand * 0.2 + higherBand * 0.4 + additionalBand * 0.45;
}

function calculateNationalInsurance(annualSalary: number) {
  const monthlySalary = annualSalary / 12;
  const primaryThresholdMonthly = 1048;
  const upperEarningsLimitMonthly = 4189;

  const monthlyNi =
    Math.max(
      0,
      Math.min(monthlySalary, upperEarningsLimitMonthly) - primaryThresholdMonthly
    ) *
      0.08 +
    Math.max(0, monthlySalary - upperEarningsLimitMonthly) * 0.02;

  return monthlyNi * 12;
}

export function calculateTakeHome(input: CalculatorInput): TakeHomeResult {
  const grossAnnual =
    input.payPeriod === "monthly" ? input.salary * 12 : input.salary;

  const pensionAnnual = grossAnnual * (input.pensionPercent / 100);
  const taxableAnnual = Math.max(0, grossAnnual - pensionAnnual);

  const studentLoanThreshold = STUDENT_LOAN_THRESHOLDS[input.studentLoanPlan];
  const studentLoanRate = STUDENT_LOAN_RATES[input.studentLoanPlan];

  const studentLoanAnnual =
    input.studentLoanPlan === "none"
      ? 0
      : Math.max(0, taxableAnnual - studentLoanThreshold) * studentLoanRate;

  const incomeTaxAnnual = calculateIncomeTax(taxableAnnual);
  const nationalInsuranceAnnual = calculateNationalInsurance(taxableAnnual);

  const totalDeductionsAnnual =
    incomeTaxAnnual +
    nationalInsuranceAnnual +
    pensionAnnual +
    studentLoanAnnual;

  const netAnnual = Math.max(0, grossAnnual - totalDeductionsAnnual);
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