import Link from "next/link";
import FreshnessChip from "./freshness-chip";

type HmrcReferencePanelProps = {
  title?: string;
  description?: string;
  reviewDate?: string;
  compact?: boolean;
};

const references = [
  {
    label: "Income Tax rates and bands",
    href: "https://www.gov.uk/income-tax-rates",
  },
  {
    label: "National Insurance rates and thresholds",
    href: "https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions",
  },
  {
    label: "Repaying your student loan",
    href: "https://www.gov.uk/repaying-your-student-loan",
  },
  {
    label: "Maternity, paternity, holiday and sick pay guidance",
    href: "https://www.gov.uk/browse/working/time-off",
  },
];

export default function HmrcReferencePanel({
  title = "Official UK reference points",
  description = "TaxDecod is designed to be read alongside official GOV.UK guidance where formal confirmation is needed. These references support the trust and interpretation layer across the platform.",
  reviewDate = "16 April 2026",
  compact = false,
}: HmrcReferencePanelProps) {
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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <p className="text-sm font-medium app-accent">HMRC / GOV.UK trust layer</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy sm:text-[15px]">
              {description}
            </p>
          </div>

          <FreshnessChip reviewDate={reviewDate} />
        </div>
      </div>

      <div className={`grid gap-3 px-6 py-6 sm:px-7 ${compact ? "md:grid-cols-2" : "lg:grid-cols-2"}`}>
        {references.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-[22px] border px-4 py-4 text-sm transition hover-lift"
            style={{
              borderColor: "var(--line)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {!compact ? (
        <div
          className="border-t px-6 py-5 sm:px-7"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex flex-wrap gap-3">
            <Link href="/methodology" className="app-button-secondary">
              Read methodology
            </Link>
            <Link href="/assumptions" className="app-button-secondary">
              Read assumptions
            </Link>
            <Link href="/about" className="app-button-primary">
              About TaxDecod
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}