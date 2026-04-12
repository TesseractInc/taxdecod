type SeoRealityCardProps = {
  label?: string;
  children: React.ReactNode;
};

export default function SeoRealityCard({
  label = "Salary reality",
  children,
}: SeoRealityCardProps) {
  return (
    <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:px-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          {label}
        </p>
      </div>

      <div className="px-6 py-6 sm:px-7">
        <div className="text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
          {children}
        </div>
      </div>
    </section>
  );
}