import Link from "next/link";

type LinkItem = {
  title: string;
  href: string;
};

type RelatedLinksProps = {
  title?: string;
  links: LinkItem[];
};

export default function RelatedLinks({
  title = "Related tools and guides",
  links,
}: RelatedLinksProps) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold app-title">{title}</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-[22px] border px-4 py-4 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-sm font-medium app-title">{link.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}