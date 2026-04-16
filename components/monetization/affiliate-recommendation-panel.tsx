import Link from "next/link";

type AffiliateItem = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

type AffiliateRecommendationPanelProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: AffiliateItem[];
};

export default function AffiliateRecommendationPanel({
  eyebrow = "Recommended next step",
  title,
  description,
  items,
}: AffiliateRecommendationPanelProps) {
  return (
    <section
      className="overflow-hidden rounded-[30px] border"
      style={{
        borderColor: "var(--line)",
        background: "var(--card-strong)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="border-b px-6 py-6 sm:px-7"
        style={{ borderColor: "var(--line)" }}
      >
        <p className="text-sm font-medium app-accent">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-8 app-copy sm:text-[15px]">
          {description}
        </p>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-3 sm:p-7">
        {items.map((item) => (
          <Link
            key={item.href + item.title}
            href={item.href}
            className="group rounded-[24px] border px-5 py-5 transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            {item.badge ? (
              <span
                className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{
                  border: "1px solid var(--line)",
                  background: "var(--surface-1)",
                  color: "var(--muted)",
                }}
              >
                {item.badge}
              </span>
            ) : null}

            <p className="mt-3 text-lg font-semibold app-title">{item.title}</p>
            <p className="mt-3 text-sm leading-7 app-copy">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}