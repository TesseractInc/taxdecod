type TaxYearTrustBarProps = {
  title?: string;
  description: string;
  points: string[];
};

export default function TaxYearTrustBar({
  title = "Tax-year trust system",
  description,
  points,
}: TaxYearTrustBarProps) {
  if (!points.length) return null;

  return (
    <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end sm:px-7">
        <div>
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            {title}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          {points.map((item) => (
            <div
              key={item}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}