export function calculateNationalInsurance(annualSalary: number): number {
  const monthlySalary = annualSalary / 12;

  const primaryThreshold = 1048;
  const upperEarningsLimit = 4189;

  const monthlyNi =
    Math.max(0, Math.min(monthlySalary, upperEarningsLimit) - primaryThreshold) * 0.08 +
    Math.max(0, monthlySalary - upperEarningsLimit) * 0.02;

  return monthlyNi * 12;
}