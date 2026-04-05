type SeoPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlightValue?: string;
  highlightSubtext?: string;
};

export default function SeoPageHero({
  eyebrow,
  title,
  description,
  highlightValue,
  highlightSubtext,
}: SeoPageHeroProps) {
  return (
    <section className="max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
        {eyebrow}
      </p>

      <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
        {title}
      </h1>

      <p className="mt-4 text-lg leading-8 app-copy">{description}</p>

      {highlightValue ? (
        <div className="mt-6">
          <h2 className="text-5xl font-bold text-emerald-600">
            {highlightValue}
          </h2>

          {highlightSubtext ? (
            <p className="mt-2 text-sm app-subtle">{highlightSubtext}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}