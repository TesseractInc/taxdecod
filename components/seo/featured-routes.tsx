import Link from "next/link";

type FeaturedRoute = {
  href: string;
  title: string;
  description: string;
};

export default function FeaturedRoutes({
  title,
  description,
  routes,
}: {
  title: string;
  description?: string;
  routes: FeaturedRoute[];
}) {
  return (
    <section className="mt-16">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold app-title">{title}</h2>
        {description && (
          <p className="mt-3 app-copy">{description}</p>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="rounded-[28px] border px-6 py-6 hover-lift"
            style={{
              borderColor: "var(--line)",
              background: "var(--card-strong)",
            }}
          >
            <p className="font-semibold app-title">{route.title}</p>
            <p className="mt-2 text-sm app-copy">{route.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}