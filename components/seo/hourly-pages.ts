import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { getStandardUkEmployeeInput } from "../../lib/tax/config";

export function getHourlyRates() {
  const rates: number[] = [];

  for (let rate = 10; rate <= 25; rate += 1) rates.push(rate);
  for (let rate = 26; rate <= 50; rate += 2) rates.push(rate);
  for (let rate = 55; rate <= 100; rate += 5) rates.push(rate);

  return rates;
}

export function getHourlyRateParams() {
  return getHourlyRates().map((rate) => ({
    rate: String(rate),
  }));
}

export function parseHourlyRate(value: string) {
  const rate = Number(value);
  if (!Number.isFinite(rate) || rate < 1 || rate > 500) return null;
  return rate;
}

export function getHourlyPageData(rate: number) {
  const weeklyHours = 37.5;
  const annualHours = weeklyHours * 52;
  const grossAnnual = rate * annualHours;

  const input = getStandardUkEmployeeInput({
    salary: grossAnnual,
    payPeriod: "yearly",
    region: "uk",
    studentLoanPlan: "none",
  });

  const result = calculateTakeHome(input);

  return {
    rate,
    weeklyHours,
    annualHours,
    grossAnnual,
    grossMonthly: grossAnnual / 12,
    input,
    result,
    netHourlyApprox: result.netAnnual / annualHours,
  };
}