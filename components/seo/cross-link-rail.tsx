import Link from "next/link";

export type CrossLinkItem = {
  href: string;
  title: string;
  description: string;
};

type CrossLinkRailProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: CrossLinkItem[];
};

export default function CrossLinkRail({
  eyebrow = "Next step routes",
  title,
  description,
  items,
}: CrossLinkRailProps) {
  const safeItems = items.filter(
    (item) => item.href && item.title && item.description
  );

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-8 app-copy sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {safeItems.map((item) => (
          <Link
            key={`${item.href}-${item.title}`}
            href={item.href}
            className="rounded-[28px] border px-6 py-6 transition hover-lift"
            style={{
              borderColor: "var(--line)",
              background: "var(--card-strong)",
            }}
          >
            <p className="text-lg font-semibold app-title">{item.title}</p>
            <p className="mt-3 text-sm leading-8 app-copy">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}