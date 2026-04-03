import { TakeHomeResult } from "../../../types/tax";

export function calculateSalaryScore(result: TakeHomeResult) {
  const netRatio =
    result.grossAnnual > 0 ? result.netAnnual / result.grossAnnual : 0;

  // scoring components (weighted)
  const netRatioScore = netRatio * 50; // max 50

  const monthlyScore =
    result.netMonthly >= 3000
      ? 20
      : result.netMonthly >= 2000
      ? 15
      : result.netMonthly >= 1500
      ? 10
      : 5;

  const hourly =
    result.netAnnual / (37.5 * 52);

  const hourlyScore =
    hourly >= 25 ? 15 : hourly >= 15 ? 10 : hourly >= 10 ? 6 : 3;

  const deductionLoad =
    result.totalDeductionsAnnual / result.grossAnnual;

  const deductionScore =
    deductionLoad < 0.25
      ? 15
      : deductionLoad < 0.35
      ? 10
      : deductionLoad < 0.45
      ? 6
      : 3;

  const total = Math.round(
    netRatioScore + monthlyScore + hourlyScore + deductionScore
  );

  let label = "";
  let message = "";

  if (total >= 80) {
    label = "Excellent";
    message = "You are keeping a strong portion of your income.";
  } else if (total >= 65) {
    label = "Good";
    message = "Solid salary, but there is room to optimise.";
  } else if (total >= 50) {
    label = "Average";
    message = "Your income is okay, but deductions are noticeable.";
  } else {
    label = "Low";
    message = "Your take-home is being heavily reduced.";
  }

  return {
    score: Math.min(total, 100),
    label,
    message,
  };
}