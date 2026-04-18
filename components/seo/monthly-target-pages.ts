import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { getExpandedMonthlyTakeHomeValues } from "./programmatic-expansion-config";

type MonthlyTakeHomePageData = {
  targetMonthlyNet: number;
  targetAnnualNet: number;
  grossAnnual: number;
  input: CalculatorInput;
  result: TakeHomeResult;
  totalDeductions: number;
  keepPercent: number;
};

function clampAmount(value: number) {
  return Math.max(0, Math.round(value));
}

function getPersonalAllowance(salary: number) {
  if (salary <= 100000) return 12570;
  if (salary >= 125140) return 0;

  const reduction = Math.floor((salary - 100000) / 2);
  return Math.max(0, 12570 - reduction);
}

function calculateUkIncomeTax(grossAnnual: number) {
  const personalAllowance = getPersonalAllowance(grossAnnual);
  const taxableIncome = Math.max(0, grossAnnual - personalAllowance);

  const basicBand = 37700;
  const higherBandLimit = 125140 - personalAllowance;

  const basicTaxable = Math.min(taxableIncome, basicBand);
  const higherTaxable = Math.max(
    0,
    Math.min(taxableIncome - basicBand, higherBandLimit - basicBand)
  );
  const additionalTaxable = Math.max(0, taxableIncome - higherBandLimit);

  return basicTaxable * 0.2 + higherTaxable * 0.4 + additionalTaxable * 0.45;
}

function calculateNationalInsurance(grossAnnual: number) {
  const primaryThreshold = 12570;
  const upperEarningsLimit = 50270;

  if (grossAnnual <= primaryThreshold) return 0;

  const mainBand = Math.max(
    0,
    Math.min(grossAnnual, upperEarningsLimit) - primaryThreshold
  );
  const upperBand = Math.max(0, grossAnnual - upperEarningsLimit);

  return mainBand * 0.08 + upperBand * 0.02;
}

function buildTakeHomeResult(
  grossAnnual: number,
  input: CalculatorInput
): TakeHomeResult {
  const pensionAnnual = grossAnnual * ((input.pensionPercent ?? 0) / 100);
  const taxableSalary = Math.max(0, grossAnnual - pensionAnnual);
  const incomeTaxAnnual = calculateUkIncomeTax(taxableSalary);
  const nationalInsuranceAnnual = calculateNationalInsurance(taxableSalary);
  const studentLoanAnnual = 0;

  const totalDeductions =
    incomeTaxAnnual +
    nationalInsuranceAnnual +
    pensionAnnual +
    studentLoanAnnual;

  const netAnnual = Math.max(0, grossAnnual - totalDeductions);
  const netMonthly = netAnnual / 12;

  return {
    grossAnnual,
    netAnnual,
    netMonthly,
    incomeTaxAnnual,
    nationalInsuranceAnnual,
    pensionAnnual,
    studentLoanAnnual,
  } as TakeHomeResult;
}

function estimateNetMonthlyFromGross(grossAnnual: number) {
  const input: CalculatorInput = {
    salary: grossAnnual,
    payPeriod: "yearly",
    region: "uk",
    pensionPercent: 5,
    studentLoanPlan: "none",
    taxCode: "1257L",
  } as CalculatorInput;

  return buildTakeHomeResult(grossAnnual, input);
}

function findGrossAnnualForTargetMonthly(targetMonthlyNet: number) {
  const targetAnnualNet = targetMonthlyNet * 12;

  let low = 0;
  let high = 250000;
  let bestGross = targetAnnualNet;

  for (let i = 0; i < 40; i += 1) {
    const mid = Math.round((low + high) / 2);
    const result = estimateNetMonthlyFromGross(mid);

    if (result.netAnnual >= targetAnnualNet) {
      bestGross = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return Math.max(0, Math.round(bestGross / 100) * 100);
}

export function parseMonthlyTakeHomeAmount(value: string): number | null {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) return null;

  return clampAmount(amount);
}

export function getMonthlyTakeHomeAmounts(): number[] {
  return getExpandedMonthlyTakeHomeValues();
}

export function getMonthlyTakeHomePageData(
  targetMonthlyNet: number
): MonthlyTakeHomePageData {
  const cleanTargetMonthly = clampAmount(targetMonthlyNet);
  const targetAnnualNet = cleanTargetMonthly * 12;
  const grossAnnual = findGrossAnnualForTargetMonthly(cleanTargetMonthly);

  const input: CalculatorInput = {
    salary: grossAnnual,
    payPeriod: "yearly",
    region: "uk",
    pensionPercent: 5,
    studentLoanPlan: "none",
    taxCode: "1257L",
  } as CalculatorInput;

  const result = buildTakeHomeResult(grossAnnual, input);

  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  return {
    targetMonthlyNet: cleanTargetMonthly,
    targetAnnualNet,
    grossAnnual,
    input,
    result,
    totalDeductions,
    keepPercent,
  };
}