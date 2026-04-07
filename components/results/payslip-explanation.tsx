"use client";

import { ReceiptText, ShieldCheck, Wallet2 } from "lucide-react";
import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { getPayslipExplanationItems } from "../../lib/tax/explanations/payslip-items";
import { formatCurrency } from "../../lib/tax/utils/currency";

type PayslipExplanationProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
};

export default function PayslipExplanation({
  values,
  result,
}: PayslipExplanationProps) {
  const items = getPayslipExplanationItems(values, result);

  const monthlyRows = [
    ["Gross monthly", formatCurrency(result.grossAnnual / 12)],
    ["Income Tax", formatCurrency(result.incomeTaxAnnual / 12)],
    ["National Insurance", formatCurrency(result.nationalInsuranceAnnual / 12)],
    ["Pension", formatCurrency(result.pensionAnnual / 12)],
    ["Student Loan", formatCurrency(result.studentLoanAnnual / 12)],
    ["Estimated net pay", formatCurrency(result.netMonthly)],
  ];

  return (
    <section id="payslip-explanation" className="space-y-6">
      <div className="app-card p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl app-chip p-3">
            <ReceiptText className="h-5 w-5" />
          </div>

          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">Payslip explained</p>
            <h2 className="mt-2 text-2xl font-semibold app-title">
              Read your payslip without guessing
            </h2>
            <p className="mt-3 text-sm leading-7 app-copy">
              This section turns common payslip labels into plain English and
              also gives you a monthly-style estimate so the numbers feel more
              familiar and usable.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="app-soft p-5">
            <div className="flex items-center gap-2">
              <Wallet2 className="h-4 w-4 app-accent" />
              <p className="text-sm font-semibold app-title">
                Estimated monthly payslip view
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {monthlyRows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3"
                >
                  <p className="text-sm app-copy">{label}</p>
                  <p className="text-sm font-semibold app-title">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="app-soft p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 app-accent" />
              <p className="text-sm font-semibold app-title">
                Why payslips feel confusing
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "People compare gross salary with net monthly bank money, which creates false expectations.",
                "Student loan and pension deductions often make a payslip feel weaker than expected.",
                "Tax code changes can shift what you keep without changing the salary headline.",
                "A monthly-style breakdown is usually easier to trust than one big annual figure.",
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-4 text-sm leading-7 app-copy"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="app-card p-6 sm:p-7">
        <div className="max-w-3xl">
          <p className="text-sm font-medium app-accent">Common payslip labels</p>
          <h3 className="mt-2 text-2xl font-semibold app-title">
            What each line actually means
          </h3>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <div key={item.label} className="app-soft p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium app-accent">{item.label}</p>
                <p className="text-sm font-semibold app-title">{item.value}</p>
              </div>

              <p className="mt-4 text-sm leading-7 app-copy">{item.meaning}</p>

              <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-3 text-sm app-copy">
                <span className="font-medium app-title">Why it matters:</span>{" "}
                {item.whyItMatters}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}