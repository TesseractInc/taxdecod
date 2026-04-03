import {
  PERSONAL_ALLOWANCE,
  UK_BASIC_RATE_LIMIT,
  UK_HIGHER_RATE_LIMIT,
} from "../rules/uk-tax-rules";
import { Region } from "../../../types/tax";

export function calculateIncomeTax(
  annualSalary: number,
  region: Region
): number {
  if (annualSalary <= 0) return 0;

  if (region === "scotland") {
    return calculateScottishIncomeTax(annualSalary);
  }

  return calculateRestOfUKIncomeTax(annualSalary);
}

function calculateRestOfUKIncomeTax(annualSalary: number): number {
  const taxableIncome = Math.max(0, annualSalary - PERSONAL_ALLOWANCE);

  if (taxableIncome <= 0) return 0;

  const basicBand = Math.max(
    0,
    Math.min(annualSalary, UK_BASIC_RATE_LIMIT) - PERSONAL_ALLOWANCE
  );
  const higherBand = Math.max(
    0,
    Math.min(annualSalary, UK_HIGHER_RATE_LIMIT) - UK_BASIC_RATE_LIMIT
  );
  const additionalBand = Math.max(0, annualSalary - UK_HIGHER_RATE_LIMIT);

  return basicBand * 0.2 + higherBand * 0.4 + additionalBand * 0.45;
}

function calculateScottishIncomeTax(annualSalary: number): number {
  const bands = [
    { from: 12570, to: 15197, rate: 0.19 },
    { from: 15197, to: 27491, rate: 0.2 },
    { from: 27491, to: 43662, rate: 0.21 },
    { from: 43662, to: 75000, rate: 0.42 },
    { from: 75000, to: 125140, rate: 0.45 },
    { from: 125140, to: Infinity, rate: 0.48 },
  ];

  let tax = 0;

  for (const band of bands) {
    const taxableInBand = Math.max(0, Math.min(annualSalary, band.to) - band.from);
    tax += taxableInBand * band.rate;
  }

  return tax;
}