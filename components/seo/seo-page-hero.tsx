type SeoPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlightValue?: string;
  highlightSubtext?: string;
};

export default function SeoPageHero({
  eyebrow,
  title,
  description,
  highlightValue,
  highlightSubtext,
}: SeoPageHeroProps) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-7 dark:border-slate-800 sm:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            {eyebrow}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
            {description}
          </p>
        </div>
      </div>

      {highlightValue ? (
        <div className="grid gap-5 px-6 py-6 sm:px-8 sm:py-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Highlight reading
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 sm:text-5xl">
              {highlightValue}
            </h2>

            {highlightSubtext ? (
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {highlightSubtext}
              </p>
            ) : null}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              What this page is for
            </p>
            <p className="mt-3 text-sm leading-8 text-slate-600 dark:text-slate-400">
              This page is designed to turn a salary or take-home figure into a
              clearer monthly reality, then guide the user into comparison,
              reverse planning, or nearby salary paths.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}