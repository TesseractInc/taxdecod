type TaxYearTrustBarProps = {
  title?: string;
  description: string;
  points: string[];
};

export default function TaxYearTrustBar({
  title = "Trust and interpretation",
  description,
  points,
}: TaxYearTrustBarProps) {
  const safePoints = points.filter(Boolean).slice(0, 6);

  return (
    <section
      className="rounded-[28px] border px-5 py-5 sm:px-6 sm:py-6"
      style={{
        borderColor: "var(--line)",
        background: "var(--card-strong)",
      }}
    >
      <div className="max-w-3xl">
        <p className="text-sm font-medium app-accent">{title}</p>
        <p className="mt-2 text-sm leading-8 app-copy sm:text-[15px]">
          {description}
        </p>
      </div>

      {safePoints.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2.5">
          {safePoints.map((point) => (
            <div
              key={point}
              className="inline-flex rounded-full border px-3.5 py-2 text-xs font-medium"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-1)",
                color: "var(--text)",
              }}
            >
              {point}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}