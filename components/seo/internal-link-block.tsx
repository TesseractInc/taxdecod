import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
};

type InternalLinkBlockProps = {
  title: string;
  description: string;
  primaryAction?: LinkItem;
  adjacentLinks?: LinkItem[];
  understandingLinks?: LinkItem[];
  retentionAction?: LinkItem;
};

function LinkCard({
  link,
  subtle = false,
}: {
  link: LinkItem;
  subtle?: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={`group flex items-start justify-between gap-4 rounded-[24px] border px-5 py-5 text-sm transition hover:-translate-y-0.5 ${
        subtle
          ? "border-slate-200 bg-slate-50/80 text-slate-700 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-sky-800 dark:hover:bg-slate-900"
          : "border-sky-200 bg-sky-50/70 text-slate-800 hover:border-sky-300 hover:bg-white dark:border-sky-900 dark:bg-sky-950/20 dark:text-slate-200 dark:hover:border-sky-800 dark:hover:bg-slate-900"
      }`}
    >
      <span className="leading-7">{link.label}</span>
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
    </Link>
  );
}

export default function InternalLinkBlock({
  title,
  description,
  primaryAction,
  adjacentLinks = [],
  understandingLinks = [],
  retentionAction,
}: InternalLinkBlockProps) {
  const hasContent =
    primaryAction ||
    adjacentLinks.length > 0 ||
    understandingLinks.length > 0 ||
    retentionAction;

  if (!hasContent) return null;

  return (
    <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800 sm:px-7">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Next routes
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
          {description}
        </p>
      </div>

      <div className="space-y-6 p-6 sm:p-7">
        {primaryAction ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Primary next action
            </p>
            <Link
              href={primaryAction.href}
              className="mt-3 group flex items-start justify-between gap-4 rounded-[26px] border border-sky-200 bg-sky-50/70 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-white dark:border-sky-900 dark:bg-sky-950/20 dark:hover:border-sky-800 dark:hover:bg-slate-900"
            >
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {primaryAction.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  This is the strongest next move from the current page.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-950">
                <MoveRight className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
            </Link>
          </div>
        ) : null}

        {adjacentLinks.length > 0 ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Adjacent scenarios
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {adjacentLinks.map((link) => (
                <LinkCard key={link.href} link={link} subtle />
              ))}
            </div>
          </div>
        ) : null}

        {understandingLinks.length > 0 ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Understand this better
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {understandingLinks.map((link) => (
                <LinkCard key={link.href} link={link} subtle />
              ))}
            </div>
          </div>
        ) : null}

        {retentionAction ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              Retention route
            </p>
            <div className="mt-3">
              <LinkCard link={retentionAction} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}