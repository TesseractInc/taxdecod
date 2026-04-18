import Link from "next/link";
import type { ContextualLinkItem } from "./contextual-link-engine";

type ContextualLinkSectionProps = {
  title: string;
  description?: string;
  items: ContextualLinkItem[];
};

export default function ContextualLinkSection({
  title,
  description,
  items,
}: ContextualLinkSectionProps) {
  const safeItems = items.filter(
    (item) => item.href && item.title && item.description
  );

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold app-title">{title}</h2>
        {description ? <p className="mt-3 app-copy">{description}</p> : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
            <p className="mt-3 text-sm leading-8 app-copy">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}