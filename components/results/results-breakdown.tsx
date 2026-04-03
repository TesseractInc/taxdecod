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

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <DeductionChart result={result} />
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-sky-600">Net pay snapshot</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            What you actually keep
          </h3>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Per year</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                £
                {result.netAnnual.toLocaleString("en-GB", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Per month</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                £
                {result.netMonthly.toLocaleString("en-GB", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total deductions</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                £
                {result.totalDeductionsAnnual.toLocaleString("en-GB", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

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