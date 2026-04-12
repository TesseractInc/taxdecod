import { TakeHomeResult, CalculatorInput } from "../../types/tax";
import SummaryCards from "./summary-cards";
import DeductionChart from "./deduction-chart";
import ExplanationCards from "./explanation-cards";
import RaiseSimulator from "./raise-simulator";
import SalaryComparison from "./salary-comparison";
import RealPayCheck from "./real-pay-check";
import BonusSimulator from "./bonus-simulator";
import TaxCodeInsight from "./tax-code-insight";
import PayslipExplanation from "./payslip-explanation";
import LowerPayInsight from "./lower-pay-insight";
import ShareResultCard from "./share-result-card";
import { formatCurrency } from "../../lib/tax/utils/currency";

type ResultsBreakdownProps = {
  result: TakeHomeResult;
  values: CalculatorInput;
};

export default function ResultsBreakdown({
  result,
  values,
}: ResultsBreakdownProps) {
  return (
    <section className="space-y-8">
      <SummaryCards result={result} />

      <section className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <DeductionChart result={result} />

        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
          <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Net pay snapshot
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              What actually reaches you
            </h2>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-7">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Per year
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {formatCurrency(result.netAnnual)}
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Per month
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {formatCurrency(result.netMonthly)}
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total deductions
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {formatCurrency(result.totalDeductionsAnnual)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <LowerPayInsight values={values} result={result} />
      <ExplanationCards result={result} />
      <PayslipExplanation values={values} result={result} />
      <TaxCodeInsight values={values} />
      <ShareResultCard values={values} result={result} />
      <RealPayCheck result={result} />
      <RaiseSimulator values={values} currentResult={result} />
      <BonusSimulator values={values} currentResult={result} />
      <SalaryComparison values={values} currentResult={result} />
    </section>
  );
}