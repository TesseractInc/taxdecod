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
  if (!items.length) return null;

  return (
    <section className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="app-card p-6">
          <p className="font-semibold app-title">{item.title}</p>
          <p className="mt-2 text-sm app-copy">{item.description}</p>
        </Link>
      ))}
    </section>
  );
}