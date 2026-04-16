type FreshnessChipProps = {
  label?: string;
  reviewDate: string;
};

export default function FreshnessChip({
  label = "Last reviewed",
  reviewDate,
}: FreshnessChipProps) {
  return (
    <div
      className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-medium"
      style={{
        borderColor: "var(--line)",
        background: "var(--surface-2)",
        color: "var(--muted)",
      }}
    >
      <span>{label}: {reviewDate}</span>
    </div>
  );
}