import { CalculatorInput, TakeHomeResult } from "../../../types/tax";
import { formatCurrency } from "../utils/currency";

export type PayslipExplanationItem = {
  label: string;
  value: string;
  meaning: string;
  whyItMatters: string;
};

export function getPayslipExplanationItems(
  values: CalculatorInput,
  result: TakeHomeResult
): PayslipExplanationItem[] {
  return [
    {
      label: "Gross Pay",
      value: formatCurrency(result.grossAnnual),
      meaning:
        "Gross pay is your total salary before tax, National Insurance, pension, and other deductions are taken off.",
      whyItMatters:
        "This is the headline salary number, but it is not the amount you actually receive in your bank account.",
    },
    {
      label: "PAYE / Income Tax",
      value: formatCurrency(result.incomeTaxAnnual),
      meaning:
        "PAYE is the system employers use to collect Income Tax from your salary automatically before you are paid.",
      whyItMatters:
        "If this number feels too high or too low, your tax code or income setup may need checking.",
    },
    {
      label: "National Insurance",
      value: formatCurrency(result.nationalInsuranceAnnual),
      meaning:
        "National Insurance is deducted from earnings above a threshold and helps fund certain state benefits and services.",
      whyItMatters:
        "Many employees focus only on tax, but NI can also take a noticeable amount from pay.",
    },
    {
      label: "Pension",
      value: formatCurrency(result.pensionAnnual),
      meaning:
        "Pension contributions are amounts taken from your pay to support retirement savings through your workplace scheme.",
      whyItMatters:
        "This reduces your immediate take-home pay, but contributes to long-term financial planning.",
    },
    {
      label: "Student Loan",
      value: formatCurrency(result.studentLoanAnnual),
      meaning:
        "Student loan repayments are deducted automatically once your income goes above the threshold for your loan plan.",
      whyItMatters:
        "This is often one of the biggest reasons a payslip feels lower than expected for graduates.",
    },
    {
      label: "Tax Code",
      value: values.taxCode || "—",
      meaning:
        "Your tax code helps determine how much tax-free income you can receive and how PAYE is applied to your salary.",
      whyItMatters:
        "A tax code can strongly affect your deductions, especially if it is unusual, temporary, or assigned incorrectly.",
    },
    {
      label: "Net Pay",
      value: formatCurrency(result.netAnnual),
      meaning:
        "Net pay is what remains after deductions. This is the money you actually keep.",
      whyItMatters:
        "This is the most useful number for budgeting, comparing job offers, and understanding real earnings.",
    },
  ];
}