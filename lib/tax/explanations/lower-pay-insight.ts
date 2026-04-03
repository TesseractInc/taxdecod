import { CalculatorInput, TakeHomeResult } from "../../../types/tax";
import { formatCurrency } from "../utils/currency";

export type LowerPayInsight = {
  headline: string;
  summary: string;
  points: string[];
};

export function getLowerPayInsight(
  values: CalculatorInput,
  result: TakeHomeResult
): LowerPayInsight {
  const points: string[] = [];

  if (result.incomeTaxAnnual > 0) {
    points.push(
      `Income Tax is reducing your pay by about ${formatCurrency(
        result.incomeTaxAnnual
      )} per year.`
    );
  }

  if (result.nationalInsuranceAnnual > 0) {
    points.push(
      `National Insurance is also taking about ${formatCurrency(
        result.nationalInsuranceAnnual
      )} per year from your salary.`
    );
  }

  if (result.pensionAnnual > 0) {
    points.push(
      `Your pension contribution reduces take-home pay by around ${formatCurrency(
        result.pensionAnnual
      )} per year, even though it supports your long-term savings.`
    );
  }

  if (result.studentLoanAnnual > 0) {
    points.push(
      `Your student loan repayments are reducing your take-home by about ${formatCurrency(
        result.studentLoanAnnual
      )} per year.`
    );
  }

  if (values.taxCode && values.taxCode.toUpperCase() !== "1257L") {
    points.push(
      `Your tax code is ${values.taxCode.toUpperCase()}, which may change how much tax is being deducted compared with a standard tax code.`
    );
  }

  const totalDeductionsShare =
    result.grossAnnual > 0
      ? (result.totalDeductionsAnnual / result.grossAnnual) * 100
      : 0;

  if (totalDeductionsShare >= 30) {
    points.push(
      "A noticeable share of your salary is being removed before it reaches your bank account, which is why gross pay can feel very different from real pay."
    );
  }

  if (result.netMonthly > 0) {
    points.push(
      `Your estimated real monthly take-home pay is ${formatCurrency(
        result.netMonthly
      )}, which is usually the best number to use for budgeting and lifestyle decisions.`
    );
  }

  return {
    headline: "Why your pay may feel lower than expected",
    summary:
      "Your headline salary is not the same as your real spendable income. Tax, National Insurance, pension contributions, student loan repayments, and tax code treatment can all reduce what you actually receive.",
    points,
  };
}