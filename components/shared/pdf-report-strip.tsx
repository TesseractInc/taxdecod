import DownloadReportButton from "../results/download-report-button";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";

type PdfReportStripProps = {
  title?: string;
  description?: string;
  values: CalculatorInput;
  result: TakeHomeResult;
  filename?: string;
};

export default function PdfReportStrip({
  title = "Take this result with you",
  description = "Download a polished PDF report for yourself, job comparisons, budgeting, or sharing later.",
  values,
  result,
  filename,
}: PdfReportStripProps) {
  return (
    <section className="app-card-strong rounded-[30px] p-6 sm:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] app-accent">
            PDF report
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight app-title sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-8 app-copy">{description}</p>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[280px]">
          <DownloadReportButton
            values={values}
            result={result}
            filename={filename}
            label="Download PDF report"
            fullWidth
          />
        </div>
      </div>
    </section>
  );
}