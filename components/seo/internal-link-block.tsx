import Link from "next/link";

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
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm font-medium text-sky-300">Related links</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
        {description}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 text-sm text-slate-300 transition hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}