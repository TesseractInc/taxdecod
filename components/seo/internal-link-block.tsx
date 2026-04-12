import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
};

type InternalLinkBlockProps = {
  title: string;
  description: string;
  links: LinkItem[];
};

export default function InternalLinkBlock({
  title,
  description,
  links,
}: InternalLinkBlockProps) {
  if (!links.length) return null;

  return (
    <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Related salary paths
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
          {description}
        </p>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-2 sm:p-7">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start justify-between gap-4 rounded-[24px] border border-slate-200 bg-slate-50/80 px-5 py-5 text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-900"
          >
            <span className="leading-7">{link.label}</span>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}