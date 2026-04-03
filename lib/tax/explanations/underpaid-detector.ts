import { CalculatorInput, TakeHomeResult } from "../../../types/tax";

export type UnderpaidDetectorResult = {
  status: "likely-under-pressure" | "borderline" | "solid";
  title: string;
  summary: string;
  points: string[];
};

export function getUnderpaidDetector(
  values: CalculatorInput,
  result: TakeHomeResult
): UnderpaidDetectorResult {
  const points: string[] = [];

  const netRatio =
    result.grossAnnual > 0 ? result.netAnnual / result.grossAnnual : 0;

  const hourlyNet = result.netAnnual / (37.5 * 52);

  if (result.netMonthly < 1800) {
    points.push(
      "Your monthly take-home is on the lower side, which can make day-to-day affordability feel tighter."
    );
  }

  if (netRatio < 0.68) {
    points.push(
      "A relatively large share of your salary is being lost to deductions before it reaches you."
    );
  }

  if (result.studentLoanAnnual > 0) {
    points.push(
      "Student loan deductions are reducing the amount you actually feel from your salary."
    );
  }

  if (result.pensionAnnual > 0) {
    points.push(
      "Pension contributions are useful long-term, but they also reduce your short-term spendable pay."
    );
  }

  if (hourlyNet < 11) {
    points.push(
      "Your effective take-home per hour looks quite low once deductions are accounted for."
    );
  }

  if (values.region === "scotland") {
    points.push(
      "Scottish income tax treatment can make take-home differ from the rest of the UK."
    );
  }

  if (result.netMonthly < 1800 || hourlyNet < 11) {
    return {
      status: "likely-under-pressure",
      title: "Your pay may feel lower than it should",
      summary:
        "This does not prove you are underpaid in a market sense, but it does suggest your real take-home may feel financially stretched.",
      points,
    };
  }

  if (result.netMonthly < 2400 || netRatio < 0.72) {
    return {
      status: "borderline",
      title: "Your pay is okay, but under pressure",
      summary:
        "Your salary is not weak on paper, but deductions may be reducing the real benefit more than expected.",
      points,
    };
  }

  return {
    status: "solid",
    title: "Your pay looks reasonably strong",
    summary:
      "Your take-home appears relatively healthy compared with the deduction load shown here.",
    points,
  };
}