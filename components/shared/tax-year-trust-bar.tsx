import Link from "next/link";
import {
  CalendarClock,
  FileSearch,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

type TaxYearTrustBarProps = {
  description: string;
  points?: string[];
};

const fallbackPoints = [
  "Updated for 2025/26 UK salary logic",
  "Estimate-based outputs, not financial advice",
  "Methodology and assumptions are visible",
];

export default function TaxYearTrustBar({
  description,
  points = fallbackPoints,
}: TaxYearTrustBarProps) {
  const finalPoints = points.length > 0 ? points : fallbackPoints;

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">
            <ShieldCheck className="h-4 w-4" />
            Trust and interpretation
          </div>

          <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {finalPoints.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/72">
            <div className="flex items-start gap-3">
              <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Reviewed for 2025/26 salary interpretation
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  TaxDecod pages should be read as current UK salary-guidance
                  routes, not timeless generic calculator pages.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
            <div className="flex items-start gap-3">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300" />
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                  Estimate-based, not regulated advice
                </p>
                <p className="mt-2 text-sm leading-7 text-amber-700 dark:text-amber-300">
                  Results are designed for salary understanding and decision
                  support. Exact payroll outcomes can vary.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-start gap-3">
              <FileSearch className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Read how TaxDecod frames results
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <Link
                    href="/methodology"
                    className="font-medium text-sky-700 hover:underline dark:text-sky-300"
                  >
                    Methodology
                  </Link>
                  <Link
                    href="/assumptions"
                    className="font-medium text-sky-700 hover:underline dark:text-sky-300"
                  >
                    Assumptions
                  </Link>
                  <Link
                    href="/disclaimer"
                    className="font-medium text-sky-700 hover:underline dark:text-sky-300"
                  >
                    Disclaimer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}