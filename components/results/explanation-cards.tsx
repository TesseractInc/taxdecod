import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";
import Reveal from "../ui/reveal";

type ExplanationCardsProps = {
  result: TakeHomeResult;
};

export default function ExplanationCards({
  result,
}: ExplanationCardsProps) {
  const cards = [
    {
      title: "Income Tax",
      value: result.incomeTaxAnnual,
      description:
        "Income Tax is charged on earnings above your tax-free allowance. As income increases, parts of your salary can fall into higher tax bands.",
    },
    {
      title: "National Insurance",
      value: result.nationalInsuranceAnnual,
      description:
        "National Insurance is usually deducted automatically through payroll once your earnings go above the NI threshold.",
    },
    {
      title: "Pension",
      value: result.pensionAnnual,
      description:
        "Pension contributions reduce your immediate take-home pay, but help build long-term retirement savings.",
    },
    {
      title: "Student Loan",
      value: result.studentLoanAnnual,
      description:
        "Student loan repayments depend on your plan type and only apply once your income passes the repayment threshold.",
    },
  ].filter((card) => card.value > 0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {cards.map((card, index) => (
        <Reveal key={card.title} delay={index * 0.04}>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                {card.title}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(card.value)}
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {card.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}