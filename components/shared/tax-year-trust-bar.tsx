type TaxYearTrustBarProps = {
  title?: string;
  description: string;
  points: string[];
};

export default function TaxYearTrustBar({
  title = "Tax-year trust system",
  description,
  points,
}: TaxYearTrustBarProps) {
  if (!points.length) return null;

  return (
    <div className="rounded-[28px] border app-card p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium app-title">{title}</p>
          <p className="mt-1 text-sm app-copy">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {points.map((item) => (
            <div
              key={item}
              className="app-soft rounded-full px-4 py-2 text-xs font-medium app-subtle"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}