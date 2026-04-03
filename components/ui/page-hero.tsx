import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  ctaLabel = "Personalise in calculator",
  ctaHref = "/calculator",
}: PageHeroProps) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className="text-sm font-medium uppercase tracking-[0.2em] app-accent">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight app-title">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-8 app-copy">
        {description}
      </p>

      <div className="mt-6">
        <Link
          href={ctaHref}
          className="inline-flex rounded-2xl px-5 py-3 text-sm font-medium text-white hover-lift"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-2) 0%, var(--primary) 100%)",
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}