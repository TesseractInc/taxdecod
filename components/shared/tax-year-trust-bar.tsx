type TaxYearTrustBarProps = {
  description: string;
  points: string[];
};

export default function TaxYearTrustBar({
  description,
  points,
}: TaxYearTrustBarProps) {
  return (
    <section
      className="overflow-hidden rounded-[28px] border"
      style={{
        borderColor: "var(--line)",
        background: "var(--card-strong)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="border-b px-5 py-5 sm:px-6"
        style={{ borderColor: "var(--line)" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] app-accent">
          Current tax-year framing
        </p>
        <p className="mt-3 text-sm leading-7 app-copy sm:text-[15px]">
          {description}
        </p>
      </div>

      <div className="grid gap-3 px-5 py-5 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        {points.map((point) => (
          <div
            key={point}
            className="rounded-[20px] border px-4 py-3.5"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <p className="text-sm leading-6 app-copy">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}