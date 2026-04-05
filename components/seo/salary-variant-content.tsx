import { formatCurrency } from "../../lib/tax/utils/currency";
import type { TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";
import {
  getRelatedSalaryLinks,
  getVariantLinks,
} from "../../components/seo/internal-links";

type SalaryVariantContentProps = {
  title: string;
  intro: string;
  salary: number;
  result: TakeHomeResult;
  bullets: string[];
};

export default function SalaryVariantContent({
  title,
  intro,
  salary,
  result,
  bullets,
}: SalaryVariantContentProps) {
  const relatedSalaryLinks = getRelatedSalaryLinks(salary);
  const variantLinks = getVariantLinks(salary);

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-medium text-sky-300">UK salary breakdown</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          {intro}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Gross annual salary</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {formatCurrency(result.grossAnnual)}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Estimated net annual pay</p>
          <p className="mt-3 text-2xl font-semibold text-emerald-400">
            {formatCurrency(result.netAnnual)}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Estimated net monthly pay</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {formatCurrency(result.netMonthly)}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">You keep</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {keepPercent.toFixed(0)}%
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-medium text-sky-300">Estimated deductions</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Breakdown for £{salary.toLocaleString("en-GB")}
          </h2>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
              <span className="text-slate-300">Income Tax</span>
              <span className="font-semibold text-white">
                {formatCurrency(result.incomeTaxAnnual)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
              <span className="text-slate-300">National Insurance</span>
              <span className="font-semibold text-white">
                {formatCurrency(result.nationalInsuranceAnnual)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
              <span className="text-slate-300">Pension</span>
              <span className="font-semibold text-white">
                {formatCurrency(result.pensionAnnual)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
              <span className="text-slate-300">Student Loan</span>
              <span className="font-semibold text-white">
                {formatCurrency(result.studentLoanAnnual)}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-medium text-sky-300">What this page covers</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Useful context
          </h2>

          <div className="mt-6 space-y-3">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 text-sm leading-7 text-slate-300"
              >
                {bullet}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-medium text-sky-300">Important note</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          These are estimated results
        </h2>
        <p className="mt-4 text-sm leading-8 text-slate-400">
          Your real payslip can differ depending on tax code changes, pension
          structure, student loan deductions, salary sacrifice, bonus timing,
          overtime, benefits, and payroll treatment. These pages are designed to
          help users understand likely take-home pay outcomes, not replace an
          official payslip.
        </p>
      </section>

      <InternalLinkBlock
        title="Compare nearby salaries"
        description="Use these nearby salary pages to compare small changes in take-home pay across similar pay levels."
        links={relatedSalaryLinks}
      />

      <InternalLinkBlock
        title="Explore more related salary pages"
        description="Jump into related page variations, including monthly, student loan, Scotland, and the full calculator."
        links={variantLinks}
      />
    </div>
  );
}