import Link from "next/link";

type SeoCtaItem = {
  href: string;
  title: string;
  description: string;
};

type SeoCtaClusterProps = {
  items: SeoCtaItem[];
};

export default function SeoCtaCluster({ items }: SeoCtaClusterProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-5 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/72 dark:hover:border-sky-800 dark:hover:bg-slate-900"
        >
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {item.title}
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
}