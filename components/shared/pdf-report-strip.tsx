"use client";

import DownloadReportButton from "../results/download-report-button";

type CalculatorInput = Record<string, unknown>;
type TakeHomeResult = Record<string, unknown>;

type PdfReportStripProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
  filename?: string;
  title?: string;
  description?: string;
};

export default function PdfReportStrip({
  values,
  result,
  filename,
  title = "Save a clean PDF copy",
  description = "Download a shareable salary report with your current inputs and result summary.",
}: PdfReportStripProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[260px]">
          <DownloadReportButton
            values={values}
            result={result}
            filename={filename}
            label="Download PDF report"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}