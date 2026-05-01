import Link from "next/link";

type LinkItem = {
  title: string;
  href: string;
  description?: string;
};

type RelatedLinksProps = {
  title?: string;
  description?: string;
  links: LinkItem[];
};

export default function RelatedLinks({
  title = "Related tools and guides",
  description,
  links,
}: RelatedLinksProps) {
  return (
    <section className="mt-12 rounded-[34px] border border-slate-200 bg-white/72 p-6 shadow-[0_24px_80px_-55px_rgba(15,23,42,0.36)] backdrop-blur-2xl sm:p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
            Continue exploring
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50/70 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_100%_15%,rgba(99,102,241,0.10),transparent_32%)]" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <p className="text-base font-semibold tracking-tight text-slate-950">
                  {link.title}
                </p>

                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-950 text-sm text-white transition group-hover:translate-x-1">
                  →
                </span>
              </div>

              {link.description ? (
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {link.description}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}