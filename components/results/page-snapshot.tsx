import { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

type PageSnapshotProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
};

export default function PageSnapshot({
  values,
  result,
}: PageSnapshotProps) {
  return (
    <section className="app-card p-6">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-medium app-accent">Reference scenario</p>
          <h2 className="mt-2 text-2xl font-semibold app-title">
            £{values.salary.toLocaleString("en-GB")} salary example
          </h2>
          <p className="mt-3 text-sm leading-7 app-copy">
            This page uses one realistic example so the content stays focused.
            Visitors can jump into the full calculator to personalise everything.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="app-soft p-4">
            <p className="text-sm app-subtle">Net annual</p>
            <p className="mt-2 text-xl font-semibold app-title">
              {formatCurrency(result.netAnnual)}
            </p>
          </div>

          <div className="app-soft p-4">
            <p className="text-sm app-subtle">Net monthly</p>
            <p className="mt-2 text-xl font-semibold app-title">
              {formatCurrency(result.netMonthly)}
            </p>
          </div>

          <div className="app-soft p-4">
            <p className="text-sm app-subtle">Tax code</p>
            <p className="mt-2 text-xl font-semibold app-title">
              {values.taxCode}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}