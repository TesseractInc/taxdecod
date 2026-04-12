import { CircleDollarSign, GraduationCap, Landmark, PiggyBank } from "lucide-react";
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
        "Income Tax is charged on earnings above your tax-free allowance. As pay rises, more of the salary can fall into taxed bands.",
      icon: CircleDollarSign,
      tone:
        "border-sky-200 bg-sky-50/80 dark:border-sky-900 dark:bg-sky-950/30",
    },
    {
      title: "National Insurance",
      value: result.nationalInsuranceAnnual,
      description:
        "National Insurance is usually deducted automatically through payroll once your earnings go above the NI threshold.",
      icon: Landmark,
      tone:
        "border-cyan-200 bg-cyan-50/80 dark:border-cyan-900 dark:bg-cyan-950/30",
    },
    {
      title: "Pension",
      value: result.pensionAnnual,
      description:
        "Pension contributions reduce immediate take-home pay, but they are building longer-term savings in the background.",
      icon: PiggyBank,
      tone:
        "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30",
    },
    {
      title: "Student Loan",
      value: result.studentLoanAnnual,
      description:
        "Student loan repayments depend on plan type and only begin once your income passes the repayment threshold.",
      icon: GraduationCap,
      tone:
        "border-violet-200 bg-violet-50/80 dark:border-violet-900 dark:bg-violet-950/30",
    },
  ].filter((card) => card.value > 0);

  if (!cards.length) return null;

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            Deduction explanations
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            What each deduction actually means
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            These explanation cards help users move from raw payroll labels into
            simpler salary understanding.
          </p>
        </div>
      </div>

      <div className="grid gap-4 p-6 lg:grid-cols-2 sm:p-7">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Reveal key={card.title} delay={index * 0.04}>
              <div className={`rounded-[28px] border p-6 shadow-sm ${card.tone}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
                      {card.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      {formatCurrency(card.value)}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-white/85 p-3 shadow-sm dark:bg-slate-950/70">
                    <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {card.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}