import { formatCurrency } from "../../lib/tax/utils/currency";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";
import {
  getRelatedSalaryLinks,
  getVariantLinks,
} from "../../components/seo/internal-links";

type SalaryPageContentProps = {
  salary: number;
  input: CalculatorInput;
  result: TakeHomeResult;
  monthlyGross: number;
  weeklyGross: number;
  weeklyNet: number;
};

function getSalaryPositioning(salary: number) {
  if (salary < 30000) {
    return {
      label: "Lower salary range",
      copy:
        "At this level, budgeting pressure tends to be higher, so monthly take-home pay matters more than the headline annual figure.",
    };
  }

  if (salary < 60000) {
    return {
      label: "Mid-range salary",
      copy:
        "This is a salary zone where many users compare lifestyle comfort, rent affordability, and whether extra income meaningfully changes monthly cash flow.",
    };
  }

  if (salary < 90000) {
    return {
      label: "Upper-middle salary range",
      copy:
        "At this level, tax becomes more noticeable and gross salary increases do not translate into equal take-home gains.",
    };
  }

  return {
    label: "Higher salary range",
    copy:
      "At higher earnings, marginal tax pressure becomes more visible, so it is especially important to compare net pay rather than headline salary alone.",
  };
}

export default function SalaryPageContent({
  salary,
  input,
  result,
  monthlyGross,
  weeklyGross,
  weeklyNet,
}: SalaryPageContentProps) {
  const relatedSalaryLinks = getRelatedSalaryLinks(salary);
  const variantLinks = getVariantLinks(salary);

  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const salaryPositioning = getSalaryPositioning(salary);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-medium text-sky-300">UK salary breakdown</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          £{salary.toLocaleString("en-GB")} after tax in the UK
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          If you earn £{salary.toLocaleString("en-GB")} per year in the UK,
          this page shows an estimated breakdown of your take-home pay after
          Income Tax, National Insurance, and a standard 5% pension contribution.
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
          <p className="text-sm text-slate-400">Estimated weekly take-home</p>
          <p className="mt-3 text-2xl font-semibold text-white">
            {formatCurrency(weeklyNet)}
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-medium text-sky-300">Salary reality</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            What you really keep from £{salary.toLocaleString("en-GB")}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">You keep</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-400">
                {keepPercent.toFixed(0)}%
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Total deducted</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {formatCurrency(totalDeductions)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Gross per month</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {formatCurrency(monthlyGross)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-8 text-slate-400">
            <p>
              This means a £{salary.toLocaleString("en-GB")} salary turns into
              around <span className="font-medium text-white">{formatCurrency(result.netMonthly)}</span>{" "}
              per month after estimated deductions.
            </p>
            <p>
              You lose about{" "}
              <span className="font-medium text-white">{formatCurrency(totalDeductions)}</span>{" "}
              per year to tax, National Insurance, pension, and other standard
              deductions included in this setup.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-medium text-sky-300">Positioning</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {salaryPositioning.label}
          </h2>
          <p className="mt-4 text-sm leading-8 text-slate-400">
            {salaryPositioning.copy}
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4">
              <p className="text-sm text-slate-400">Gross per week</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {formatCurrency(weeklyGross)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4">
              <p className="text-sm text-slate-400">Tax code used</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {input.taxCode}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4">
              <p className="text-sm text-slate-400">Pension assumption</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {input.pensionPercent}%
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-medium text-sky-300">Explanation</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Is £{salary.toLocaleString("en-GB")} a good salary in the UK?
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-8 text-slate-400">
          <p>
            Whether £{salary.toLocaleString("en-GB")} is a good salary depends on
            where you live, your housing costs, your pension contributions, and
            whether you have other deductions such as student loan repayments.
          </p>

          <p>
            Based on this estimate, your take-home pay is around{" "}
            <span className="font-medium text-white">
              {formatCurrency(result.netMonthly)}
            </span>{" "}
            per month. That is the figure most people should focus on when
            budgeting, comparing offers, or checking whether a salary feels
            comfortable in practice.
          </p>

          <p>
            This page assumes a standard UK-style employee setup using tax code{" "}
            <span className="font-medium text-white">{input.taxCode}</span>, no
            student loan repayment, and a pension contribution of{" "}
            <span className="font-medium text-white">{input.pensionPercent}%</span>.
            Your real payslip may differ if your tax code, workplace pension, or
            deductions are different.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-medium text-sky-300">Frequently asked</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Common questions about £{salary.toLocaleString("en-GB")} after tax
        </h2>

        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <h3 className="text-lg font-semibold text-white">
              How much is £{salary.toLocaleString("en-GB")} after tax per month?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              On this estimate, the monthly take-home pay is about{" "}
              <span className="font-medium text-white">
                {formatCurrency(result.netMonthly)}
              </span>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <h3 className="text-lg font-semibold text-white">
              How much tax do you pay on £{salary.toLocaleString("en-GB")}?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              On this setup, estimated Income Tax is{" "}
              <span className="font-medium text-white">
                {formatCurrency(result.incomeTaxAnnual)}
              </span>{" "}
              per year, plus National Insurance of{" "}
              <span className="font-medium text-white">
                {formatCurrency(result.nationalInsuranceAnnual)}
              </span>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <h3 className="text-lg font-semibold text-white">
              Why might my actual payslip be different?
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Your real payslip can differ because of tax code changes, pension
              structure, student loan deductions, salary sacrifice, bonuses,
              overtime, benefits, or payroll timing.
            </p>
          </div>
        </div>
      </section>

      <InternalLinkBlock
        title="Explore nearby salary pages"
        description="These nearby salaries help users compare whether a small pay change actually creates a meaningful net difference."
        links={relatedSalaryLinks}
      />

      <InternalLinkBlock
        title="Explore more salary scenarios"
        description="These links take users into related variations like monthly intent, student loan, Scotland treatment, and core tools."
        links={variantLinks}
      />
    </div>
  );
}