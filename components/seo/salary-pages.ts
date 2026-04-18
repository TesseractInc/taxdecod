import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import {
  getExpandedSalaryValues,
  getFlagshipSalaryValues,
} from "./programmatic-expansion-config";
import { TAX_YEAR_LABEL } from "../../lib/tax/config";

type SalaryPageData = {
  input: CalculatorInput;
  result: TakeHomeResult;
  monthlyGross: number;
  weeklyGross: number;
  weeklyNet: number;
};

function clampSalary(value: number) {
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

function calculateScottishIncomeTax(grossAnnual: number) {
  const personalAllowance = getPersonalAllowance(grossAnnual);
  const taxableIncome = Math.max(0, grossAnnual - personalAllowance);

  const bands = [
    { width: 3967, rate: 0.19 },
    { width: 12990, rate: 0.2 },
    { width: 14136, rate: 0.21 },
    { width: 31338, rate: 0.42 },
    { width: 50140, rate: 0.45 },
  ];

  let remaining = taxableIncome;
  let totalTax = 0;

  for (const band of bands) {
    if (remaining <= 0) break;
    const amount = Math.min(remaining, band.width);
    totalTax += amount * band.rate;
    remaining -= amount;
  }

  if (remaining > 0) {
    totalTax += remaining * 0.48;
  }

  return totalTax;
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

function getStudentLoanThreshold(plan: CalculatorInput["studentLoanPlan"]) {
  switch (plan) {
    case "plan1":
      return 24990;
    case "plan2":
      return 28470;
    case "plan4":
      return 31395;
    case "plan5":
      return 25000;
    case "postgrad":
      return 21000;
    default:
      return 0;
  }
}

function getStudentLoanRate(plan: CalculatorInput["studentLoanPlan"]) {
  switch (plan) {
    case "postgrad":
      return 0.06;
    case "plan1":
    case "plan2":
    case "plan4":
    case "plan5":
      return 0.09;
    default:
      return 0;
  }
}

function calculateStudentLoan(
  grossAnnual: number,
  plan: CalculatorInput["studentLoanPlan"]
) {
  if (!plan || plan === "none") return 0;

  const threshold = getStudentLoanThreshold(plan);
  const rate = getStudentLoanRate(plan);

  return Math.max(0, grossAnnual - threshold) * rate;
}

function buildTakeHomeResult(
  grossAnnual: number,
  input: CalculatorInput
): TakeHomeResult {
  const pensionAnnual = grossAnnual * ((input.pensionPercent ?? 0) / 100);

  const taxableSalary = Math.max(0, grossAnnual - pensionAnnual);

  const incomeTaxAnnual =
    input.region === "scotland"
      ? calculateScottishIncomeTax(taxableSalary)
      : calculateUkIncomeTax(taxableSalary);

  const nationalInsuranceAnnual = calculateNationalInsurance(taxableSalary);
  const studentLoanAnnual = calculateStudentLoan(
    taxableSalary,
    input.studentLoanPlan
  );

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

export function parseSalaryFromSlug(slug: string): number | null {
  const match = slug.match(/^(\d+)-after-tax-uk$/i);
  if (!match) return null;

  const salary = Number(match[1]);
  if (!Number.isFinite(salary) || salary <= 0) return null;

  return clampSalary(salary);
}

export function formatSalaryTitle(salary: number) {
  return `£${salary.toLocaleString(
    "en-GB"
  )} after tax in the UK (${TAX_YEAR_LABEL}) | TaxDecod`;
}

export function getPopularSalarySlugs() {
  return getFlagshipSalaryValues().map((salary) => ({
    salary: `${salary}-after-tax-uk`,
  }));
}

export function getExpandedSalarySlugs() {
  return getExpandedSalaryValues().map((salary) => ({
    salary: `${salary}-after-tax-uk`,
  }));
}

export function getSalaryPageData(salary: number): SalaryPageData {
  const grossAnnual = clampSalary(salary);

  const input: CalculatorInput = {
    salary: grossAnnual,
    payPeriod: "yearly",
    region: "uk",
    pensionPercent: 5,
    studentLoanPlan: "none",
    taxCode: "1257L",
  } as CalculatorInput;

  const result = buildTakeHomeResult(grossAnnual, input);
  const monthlyGross = grossAnnual / 12;
  const weeklyGross = grossAnnual / 52;
  const weeklyNet = result.netAnnual / 52;

  return {
    input,
    result,
    monthlyGross,
    weeklyGross,
    weeklyNet,
  };
}